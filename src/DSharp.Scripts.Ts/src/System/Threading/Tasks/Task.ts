import { CancellationToken } from "../CancellationToken";
import { Queue } from "../../Collections/Queue";
import { bind } from "../../Delegate";
import { ExceptionHelper } from "../../ExceptionHelper";
import { toArray } from "../../Collections/CollectionHelpers";
import { createGenericType, getTypeArgument } from "../../Generics";
import { typeOf, instanceOf } from "../../../TypeSystem";
import { TimeSpan } from "../../TimeSpan";
import { truncate } from "../../Misc";
import { DelayTask } from "./DelayTask";
import { IEnumerable } from "../../SystemInterfaces";
import { enumerate } from "../../Collections/Enumerator";
import { Exception } from "../../Exception";
import { WhenAllTask } from "./WhenAllTask";

let taskId = 0;

export class Task {
    private _invocationMethod: Function | undefined = undefined;
    private _resolvedPromise: Promise<any> | undefined = undefined;
    private _promiseFactory: () => Promise<any>;
    private _cancellationToken: CancellationToken = CancellationToken.None;
    
    protected _taskContinuations: any;
    protected _rejectionMethod: Function | undefined = undefined;

    Status: number = 0;
    Exception: Error | undefined = undefined;
    Id: number = taskId++;

    constructor(action?: Function, cancellationToken?: CancellationToken) {
        this._taskContinuations = new Queue();
        var $this = this;

        if ((cancellationToken !== undefined)) {
            this.CancellationToken = cancellationToken;
        }

        if (!(action === undefined)) {
            this._invocationMethod = action;
        }
        this._promiseFactory = function () {
            return $this.createTaskPromise();
        };
    }

    get IsCanceled() {
        return this.Status === 6;
    }
    get IsCancellationRequested() {
        return this._cancellationToken.IsCancellationRequested;
    }
    get IsCompleted() {
        return this.Status === 5 || this.Status === 7 || this.Status === 6;
    }
    get IsFaulted() {
        return this.Status === 7;
    }
    get CancellationToken() {
        return this._cancellationToken;
    }
    set CancellationToken(value) {
        this._cancellationToken = value;
        this._cancellationToken.register(bind('onCancellationRequested', this));
    }
    get IsTaskPending() {
        return !this.Status || this.Status === 1 || this.Status === 2;
    }
    get ReturnsResult() {
        return false;
    }
    createTaskPromise() {
        var $this = this;

        return new Promise(function (resolve, reject) {
            $this._executeTask(resolve, reject);
        });
    }
    _executeTask(resolve, reject) {
        if (this._cancellationToken.IsCancellationRequested) {
            this.Status = 6;
            return;
        }
        this.Status = 3;
        this._rejectionMethod = reject;
        var result;
        try {
            result = this.executeDelegatedWork(this._invocationMethod);
        }
        catch (e) {
            console.log(e);
            this.Exception = e;
            this.Status = 7;
            reject(e);
            return;
        }
        if (this._cancellationToken.IsCancellationRequested) {
            this.Status = 6;
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
            this.Status = 5;
        }
    }
    setResult(result?: any) {
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
    continueWith(continuation, ...args: any[]) {
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
            case 5:
            case 7:
            case 6:
                return;
            case 0:
            case 1:
            case 2:
                this.Status = 6;
                this._promiseFactory = () => Promise.resolve();
                break;
            case 3:
                break;
        }
        if (this._rejectionMethod != null) {
            this._rejectionMethod(null);
        }
    }
    _trySetException(exceptionObject: Error) {
        var $this = this;

        if (this.IsCompleted) {
            return false;
        }
        this.Exception = exceptionObject;
        this.Status = 7;
        if (this._rejectionMethod != null) {
            this._rejectionMethod(exceptionObject);
        }
        this.invokeContinuations().then(function () {
            return $this.Status = 7;
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
            return $this.Status = 6;
        });
        return this.IsCanceled;
    }
    invokeContinuations(): Promise<any> {
        if (!this._taskContinuations.count) {
            return Promise.resolve();
        }
        this.Status = 4;
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
        this.Status = 2;
        this._resolvedPromise = this._promiseFactory();
        this._resolvedPromise.then(function () {
            return $this.invokeContinuations().then(function () {
                return $this.Status = 5;
            });
        }, function () {
        });
        return this._resolvedPromise;
    }

    public static get CompletedTask() {
        var task = new Task();
        task.Status = 5;
        return task;
    }

    public static fromResult($TArgs, result) {
        var task = createGenericType(Task_$1, { TResult: $TArgs['T'] });
        task.Result = result;
        task.Status = 5;
        return task;
    }

    public static fromException(exception: Error) {
        var task = new Task();
        task.Exception = exception;
        task.Status = 7;
        return task;
    }

    public static fromCancelled(token) {
        if (!token.IsCancellationRequested) {
            throw ExceptionHelper.throwArgumentOutOfRangeException('token');
        }
        var task = new Task(undefined, token);
        task.Status = 6;
        return task;
    }

    public static run(action, cancellationToken) {
        return Task._runTask(new Task(action, cancellationToken));
    }

    public static runWithArgs(func, cancellationToken) {
        return Task._runTask(createGenericType(Task_$1, { TResult: getTypeArgument(this, 'TResult') }, func, cancellationToken));
    }

    public static delay(...args: any[]) {
        var firstArg = args[0];
        var token = args[1];
        if (typeOf(firstArg) === TimeSpan) {
            return Task._runTask(new DelayTask(truncate((firstArg).TotalMilliseconds), token));
        }
        else {
            return Task._runTask(new DelayTask(firstArg, token));
        }
    };

    public static whenAll(...args: any[]) {
        var obj = args[0];
        if (instanceOf((IEnumerable), obj)) {
            var enumerableTasks = obj;
            var taskCollection: any[] = [];
            var $enum1 = enumerate(enumerableTasks);
            while ($enum1.moveNext()) {
                var t = $enum1.current;
                taskCollection.push(t);
            }
            return new WhenAllTask(toArray(taskCollection), CancellationToken.None);
        }
        else {
            var tasksAsArray = obj;
            return new WhenAllTask(tasksAsArray, CancellationToken.None);
        }
    }

    public static whenAny() {
        throw new Exception();
    }

    private static _runTask = function (task) {
        task.start();
        return task;
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
                return $this.Status = 5;
            });
            return true;
        }
        this.Status = 5;
        return true;
    }
    continueWith(continuation, ...args: any[]) {
        return Task.prototype.continueWith.call(this, function (t) {
            return continuation(t);
        });
    }
}