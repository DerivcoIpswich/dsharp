import { Task } from "./Task";
import { CancellationToken } from "../CancellationToken";
import { isValue } from "../../Misc";
import { IBrowserTimer } from "../../../Browser/Timers/IBrowserTimer";
import { _browserTimerManager } from "../../../Browser/Timers/BrowserTimerManager";

export class DelayTask extends Task {
    private _timeoutInMs: number;
    private _timer: IBrowserTimer| null = null;

    constructor(timeoutInMs: number, cancellationToken?: CancellationToken) {
        super(undefined, cancellationToken);
        this._timeoutInMs = timeoutInMs;

        let $this = this; 
        this._createPromise = () => {
            return new Promise(function (resolve, reject) {
                $this._timer = _browserTimerManager.createTimer(function () {
                    if ($this.CancellationToken.IsCancellationRequested) {
                        reject();
                        return;
                    }
                    resolve();
                    $this._rejectionMethod = undefined;
                }, $this._timeoutInMs);
                $this._rejectionMethod = reject;
                $this._timer?.start();
            });
        };
    }

    onCancellationRequested(this: DelayTask) {
        if(this._timer != null){
            this._timer.dispose();
            super.onCancellationRequested();
        }
    }
}