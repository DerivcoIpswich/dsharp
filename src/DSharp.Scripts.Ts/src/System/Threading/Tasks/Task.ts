import { CancellationToken } from "../CancellationToken";
import { Queue } from "../../Collections/Queue";
import { bind } from "../../Delegate";
import { ExceptionHelper } from "../../ExceptionHelper";
import { toArray } from "../../Collections/CollectionHelpers";
import { createGenericType, getTypeArgument } from "../../Generics";
import { Exception } from "../../Exception";

import { TaskStatus } from "./TaskStatus";
import { TaskCanceledException } from "./TaskCanceledException";

let taskId = 0;

export class Task {
    private _resolvedPromise: Promise<any> | undefined = undefined;
    private _promiseFactory: () => Promise<any>;
    private _cancellationToken: CancellationToken = CancellationToken.None;
    
    protected _taskContinuations: any;
    protected _taskCompletionsActions: ((task: Task) => void)[] = [];
    protected _rejectionMethod: Function | undefined = undefined;
    protected _invocationMethod: Function = () => {};
    protected _createPromise: () => Promise<any>;

    Status: TaskStatus = 0;
    Exception: Error | undefined = undefined;
    Id: number = taskId++;
    static delay: (...args: any[]) => Task;
    static whenAll: (...args: any[]) => Task;

    constructor(action?: Function, cancellationToken?: CancellationToken) {
        this._taskContinuations = new Queue();
        this._createPromise = this._createTaskPromise;

        if ((cancellationToken !== undefined)) {
            this.CancellationToken = cancellationToken;
        }

        if (!(action === undefined)) {
            this._invocationMethod = action;
        }
        this._promiseFactory = function () {
            return this._createPromise();
        };
    }

    get IsCanceled() {
        return this.Status === TaskStatus.canceled;
    }
    get IsCancellationRequested() {
        return this._cancellationToken.IsCancellationRequested;
    }
    get IsCompleted() {
        return this.Status === TaskStatus.ranToCompletion 
            || this.Status === TaskStatus.faulted 
            || this.Status === TaskStatus.canceled;
    }
    get IsCompletedSuccessfully(){
        return this.Status === TaskStatus.ranToCompletion;
    }
    get IsFaulted() {
        return this.Status === TaskStatus.faulted;
    }
    get CancellationToken() {
        return this._cancellationToken;
    }
    set CancellationToken(value) {
        this._cancellationToken = value;
        this._cancellationToken.register(bind('onCancellationRequested', this));
    }
    get IsTaskPending() {
        return !this.Status 
            || this.Status === TaskStatus.waitingToRun 
            || this.Status === TaskStatus.waitingForActivation;
    }
    get ReturnsResult() {
        return false;
    }
    private _createTaskPromise() : Promise<any> {
        var $this = this;

        return new Promise(function (resolve, reject) {
            $this._executeTask(resolve, reject);
        });
    }
    _executeTask(resolve, reject) {
        if (this._cancellationToken.IsCancellationRequested) {
            this.completeTask(TaskStatus.canceled);
            return;
        }
        this.Status = TaskStatus.running;
        this._rejectionMethod = reject;
        var result;
        try {
            result = this.executeDelegatedWork(this._invocationMethod);
        }
        catch (e) {
            console.log(e);
            this.Exception = e;
            this.completeTask(TaskStatus.faulted);
            reject(e);
            return;
        }
        if (this._cancellationToken.IsCancellationRequested) {
            this.completeTask(TaskStatus.canceled);
            return;
        }
        if (!this.ReturnsResult) {
            (resolve)();
        }
        else {
            this.setResult();
            resolve(result);
        }
        if (!this._taskContinuations.count) {
            this.completeTask(TaskStatus.ranToCompletion);
        }
    }
    setResult() {
    }
    executeDelegatedWork(invocationMethod) {
        (invocationMethod)();
        return null;
    }
    start() {
        if (this._promiseFactory == null || this._invocationMethod == null) {
            throw ExceptionHelper.throwArgumentNullException('invocationMethod');
        }
        if (this._resolvedPromise != null || !this.IsTaskPending) {
            return;
        }
        this.asPromise();
    }
    continueWith(continuation) {
        var $this = this;
        let $continuation = continuation;

        var continuationTask = new Task(function () {
            $continuation($this);
        });
        if (this.IsCompleted) {
            continuationTask.start();
        }
        else {
            this._taskContinuations.enqueue(continuationTask);
        }
        return continuationTask;
    }
    dispose() {
    }
    onCancellationRequested() {
        switch (this.Status) {
            case TaskStatus.ranToCompletion:
            case TaskStatus.faulted:
            case TaskStatus.canceled:
                return;
            case TaskStatus.created:
            case TaskStatus.waitingForActivation:
            case TaskStatus.waitingToRun:
                this.Status = TaskStatus.canceled;
                this._promiseFactory = () => Promise.resolve();
                break;
            case TaskStatus.running:
                break;
        }
        if (this._rejectionMethod != null) {
            this?._rejectionMethod(null);
        }
    }
    _trySetException(exceptionObject: Error) {
        var $this = this;

        if (this.IsCompleted) {
            return false;
        }
        this.Exception = exceptionObject;
        this.Status = TaskStatus.faulted;
        if (this._rejectionMethod != null) {
            this._rejectionMethod(exceptionObject);
        }
        this.invokeContinuations().then(function () {
            return $this.Status = TaskStatus.faulted;
        });
        return true;
    }
    _trySetCanceled(cancellationToken: CancellationToken) {
        var $this = this;

        if (this.IsCompleted) {
            return false;
        }
        this.CancellationToken = cancellationToken;
        if (cancellationToken.IsCancellationRequested) {
            this.onCancellationRequested();
        }
        this.invokeContinuations().then(function () {
            return $this.Status = TaskStatus.canceled;
        });
        return this.IsCanceled;
    }
    invokeContinuations(): Promise<any> {
        if (!this._taskContinuations.count) {
            return Promise.resolve();
        }
        this.Status = TaskStatus.waitingForChildrenToComplete;
        var promises: Promise<any>[] = [];
        while (this._taskContinuations.count > 0) {
            var innerTask = this._taskContinuations.dequeue();
            promises.push(innerTask.asPromise());
        }
        return Promise.all(toArray(promises));
    }
    asPromise(): Promise<any> {
        var $this = this;

        if (this._resolvedPromise != null) {
            return this._resolvedPromise;
        }
        this.Status = TaskStatus.waitingToRun;
        this._resolvedPromise = this._promiseFactory();
        this._resolvedPromise.then(function () {
            return $this.invokeContinuations().then(function () {
                $this.completeTask(TaskStatus.ranToCompletion);
                return $this.Status
            });
        }, function () {
        });
        return this._resolvedPromise;
    }
    _addCompletionAction(action: (task: Task) => void){
        if(this.IsCompleted){
           action(this);
           return; 
        }

        this._taskCompletionsActions.push(action);
    }

    private completeTask(status: TaskStatus){
        if(this.IsCompleted){
            return;
        }
        this.Status = status;
        if(this.IsCompleted)
        {
            this._taskCompletionsActions.forEach(action => action(this));
            this._taskCompletionsActions = [];
        }
    }

    public static get CompletedTask() {
        var task = new Task();
        task.Status = TaskStatus.ranToCompletion;
        return task;
    }

    public static fromResult($TArgs, result) {
        var task = createGenericType(Task_$1, { TResult: $TArgs['T'] });
        task.Result = result;
        task.completeTask(TaskStatus.ranToCompletion);
        return task;
    }

    public static fromException(exception: Error) {
        var task = new Task();
        task.Exception = exception;
        task.completeTask(TaskStatus.faulted);
        return task;
    }

    public static fromCancelled(token) {
        if (!token.IsCancellationRequested) {
            throw ExceptionHelper.throwArgumentOutOfRangeException('token');
        }
        var task = new Task(undefined, token);
        task.completeTask(TaskStatus.canceled);
        return task;
    }

    public static run(action, cancellationToken) {
        return Task._runTask(new Task(action, cancellationToken));
    }

    public static runWithArgs(func, cancellationToken) {
        return Task._runTask(createGenericType(Task_$1, { TResult: getTypeArgument(this, 'TResult') }, func, cancellationToken));
    }

    public static whenAny() {
        throw new Exception();
    }

    public static _runTask = function (task: Task) {
        task.start();
        return task;
    }

    public static async _runTaskAsync(task: Task): Promise<any>{
        return new Promise((resolve, reject) =>{
            task._addCompletionAction(t => {
                if(t.IsCompletedSuccessfully){
                    let tWithResult = t as Task_$1;
                    if(tWithResult?.Result != undefined){
                        resolve(tWithResult.Result)
                    }
                    resolve(t);
                }
                else if (t.IsFaulted){
                    reject(t.Exception);
                }
                else if (t.IsCanceled){
                    reject(new TaskCanceledException())
                }
                else{
                    reject();
                }
            });
            task.start();
        })
    }
}

export class Task_$1 extends Task {
    Result: any | undefined = undefined;
    constructor(action?: Function, cancellationToken?: CancellationToken) {
        super(action, cancellationToken)
    }

    get ReturnsResult() {
        return true;
    }
    executeDelegatedWork(invocationMethod) {
        return (invocationMethod)();
    }
    setResult(result?: any) {
        this.Result = result;
    }
    _trySetResult(result) {
        var $this = this;

        if (this.IsCompleted) {
            return false;
        }
        this.Result = result;
        if (this._taskContinuations.count > 0) {
            this.invokeContinuations().then(function () {
                return $this.Status = TaskStatus.ranToCompletion;
            });
            return true;
        }
        this.Status = TaskStatus.ranToCompletion;
        return true;
    }
    continueWith(continuation, ...args: any[]) {
        return Task.prototype.continueWith.call(this, function (t) {
            return continuation(t);
        });
    }
}