import { Task } from "./Task";
import { CancellationToken } from "../CancellationToken";
import { TaskStatus } from "./TaskStatus";
import { Exception } from "../../Exception";

export class WhenAllTask extends Task {
  private _tasks: Task[] = [];
  private _processCompletion: (task: Task) => void;

  constructor(tasks: Task[], cancellationToken?: CancellationToken) {
    super(undefined, cancellationToken);
    this._tasks = tasks;
    
    this.Status = TaskStatus.waitingToRun;

    this._processCompletion = function(task: Task){
      if(!this._tasks.every(t => t.IsCompleted)){
        return;
      }
  
      if(!task.IsCompletedSuccessfully){
        if(task.IsCanceled){
          return Task.fromCancelled(task.CancellationToken);
        }
        else if(task.IsFaulted){
          return Task.fromException(task.Exception ?? new Exception("Antecedent task faulted"));
        }
      }
  
      Task._runTask(this);
    }

    this._tasks.forEach(t => {
      t._addCompletionAction(this._processCompletion.bind(this));
    });

    this._createPromise = () => {
      return Promise.resolve();
    };
  }

  
}