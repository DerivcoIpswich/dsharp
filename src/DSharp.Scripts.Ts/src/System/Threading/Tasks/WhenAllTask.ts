import { Task } from "./Task";
import { CancellationToken } from "../CancellationToken";

export class WhenAllTask extends Task {
  private _tasks: Task[] = [];

  constructor(tasks: Task[], cancellationToken?: CancellationToken) {
    super(undefined, cancellationToken);
    this._tasks = tasks;
  }

  createTaskPromise() {
    var $this = this;

    return new Promise(function (resolve, reject) {
      Promise.all($this._tasks.filter(t => t.asPromise()))
        .then(resolve, function (e) {
          return reject();
        });
    });
  }
}