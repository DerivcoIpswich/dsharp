import { Task } from "./Task";
import { toArray } from "../../Collections/CollectionHelpers";
import { CancellationToken } from "../CancellationToken";

export class WhenAllTask extends Task{
    private _tasks: Task[] = [];

    constructor(tasks: Task[], cancellationToken?: CancellationToken){
        super(undefined, cancellationToken);
        this._tasks = tasks;
    }

    createTaskPromise() {
        var $this = this;
  
        return new Promise(function(resolve, reject) {
          var resolvedPromises = [];
          var $enum1 = ($this._tasks);
          for(var $enum1_index = 0; $enum1_index < $enum1.length; ++$enum1_index) {
            var task = $enum1[$enum1_index];
          }
          Promise.all(toArray(resolvedPromises)).then(resolve, function(e) {
            return reject();
          });
        });
      }
}