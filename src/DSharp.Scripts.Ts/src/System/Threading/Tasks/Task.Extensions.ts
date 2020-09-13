import { Task } from "./Task";
import { typeOf, instanceOf } from "../../../TypeSystem";
import { TimeSpan } from "../../TimeSpan";
import { DelayTask } from "./DelayTask";
import { truncate } from "../../Misc";
import { IEnumerable } from "../../SystemInterfaces";
import { enumerate } from "../../Collections/Enumerator";
import { WhenAllTask } from "./WhenAllTask";
import { toArray } from "../../Collections/CollectionHelpers";
import { CancellationToken } from "../CancellationToken";

export function task_delay(...args: any[]): Task {
    if(args.length <= 0){
        return Task.CompletedTask;
    }
    
    var firstArg = args[0];
    var token = args[1];
    if (typeOf(firstArg) === TimeSpan) {
        return Task._runTask(new DelayTask(truncate((firstArg).TotalMilliseconds), token));
    }
    else {
        return Task._runTask(new DelayTask(firstArg, token));
    }
};

export function task_whenAll(...args: any[]): Task {
    if(args.length <= 0){
        return Task.CompletedTask;
    }
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
        return new WhenAllTask(obj as Task[], CancellationToken.None);
    }
}