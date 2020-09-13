import { IBrowserTimer } from "./IBrowserTimer";
import { BrowserInterval } from "./BrowserInterval";
import { BrowserTimer } from "./BrowserTimer";
import { IBrowserTimerManager } from "./IBrowserTimerFactory";

export class BrowserTimerManager implements IBrowserTimerManager {
    private _timers: Map<number, IBrowserTimer> = new Map();

    createTimer(callback: () => void, deadline: number): IBrowserTimer | null {
        if (callback == null) {
            return null;
        }

        var timer = new BrowserTimer(callback, deadline, this);
        this._timers.set(timer.id, timer);
        return timer;
    }

    createInterval(callback: () => void, interval: number): IBrowserTimer | null {
        if (callback == null) {
            return null;
        }

        var timer = new BrowserInterval(callback, interval, this);
        this._timers.set(timer.id, timer);
        return timer;
    }

    unregister(timer: IBrowserTimer) {
        if (timer == null || !this._timers.has(timer.id)) {
            return;
        }

        this._timers.delete(timer.id);
    }
}

export let _browserTimerManager = new BrowserTimerManager();