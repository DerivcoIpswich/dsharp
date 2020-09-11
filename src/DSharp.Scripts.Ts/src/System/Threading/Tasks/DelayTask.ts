import { Task } from "./Task";
import { CancellationToken } from "../CancellationToken";
import { isValue } from "../../Misc";

export class DelayTask extends Task {
    private _timeoutInMs: number;
    private _timerHandle: number | undefined = undefined;
    constructor(timeoutInMs: number, cancellationToken?: CancellationToken) {
        super(undefined, cancellationToken)
        this._timeoutInMs = timeoutInMs;
    }

    onCancellationRequested(this: DelayTask) {
        Task.prototype.onCancellationRequested.call(this);
        if (isValue(this._timerHandle)) {
            clearTimeout(this._timerHandle);
            if (this._rejectionMethod != null) {
                this._rejectionMethod();
            }
        }
    }
    createTaskPromise(this: DelayTask) {
        var $this = this;

        return new Promise(function (resolve, reject) {
            $this._rejectionMethod = reject;
            $this._timerHandle = setTimeout(function () {
                if ($this.CancellationToken.IsCancellationRequested) {
                    reject();
                    return;
                }
                resolve();
                $this._timerHandle = undefined;
                $this._rejectionMethod = undefined;
            }, $this._timeoutInMs) as unknown as number;
        });
    }
}