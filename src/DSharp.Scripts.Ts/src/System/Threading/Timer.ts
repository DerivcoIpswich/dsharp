import { TimeSpan } from "../TimeSpan";
import { IDisposable } from "../IDisposable";
import { _browserTimerManager } from "../../Browser/Timers/BrowserTimerManager";
import { IBrowserTimer } from "../../Browser/Timers/IBrowserTimer";

export type TimerCallback = (state?: object) => void;

export class Timer implements IDisposable {
    private _callback: TimerCallback;
    private timeout: IBrowserTimer | null = null;
    private interval: IBrowserTimer | null = null;

    constructor(callback: TimerCallback, state?: object, dueTime?: number | TimeSpan, period?: number | TimeSpan) {
        this._callback = callback;
        if (dueTime && dueTime > 0) {
            this.timeout = _browserTimerManager.createTimer(this._callback, this.getMs(dueTime));
        }
        if (period && period > 0) {
            this.interval = _browserTimerManager.createInterval(this._callback, this.getMs(period));
        }
    }
    change(dueTime: number | TimeSpan, period: number | TimeSpan) {
        if (dueTime > 0) {
            if (this.timeout) {
                this.timeout.dispose();
            }
            this.timeout = _browserTimerManager.createTimer(this._callback, this.getMs(dueTime));
        }
        else {
            this.timeout?.dispose();
            this.timeout = null;
        }

        if (period && period > 0) {
            if (this.interval) {
                this.interval.dispose();
            }
            this.interval = _browserTimerManager.createInterval(this._callback, this.getMs(period));
        }
        else {
            this.interval?.dispose();
            this.interval = null;
        }
    }
    dispose(): void {
        this.timeout?.dispose();
        this.timeout = null;
        this.interval?.dispose();
        this.interval = null;
    }
    private getMs(time: number | TimeSpan): number {
        if (time as number) {
            return time as number;
        }

        let timeSpan = time as TimeSpan;
        return timeSpan.TotalMilliseconds;
    }
}