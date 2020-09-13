import { BaseTimer } from "./BaseTimer";
import { IBrowserTimerManager } from "./IBrowserTimerFactory";

export class BrowserInterval extends BaseTimer {
    readonly interval: number;
    private _timerId: number | undefined;

    constructor(callback: () => void, deadline: number, manager: IBrowserTimerManager) {
        super(callback, manager);
        this.interval = deadline;
    }

    start(): void {
        if (this._timerId !== undefined) {
            return;
        }

        this._timerId = setInterval(this._callback, this.interval) as unknown as number;
    }

    cancel(): void {
        if (this._timerId === undefined) {
            return;
        }

        clearInterval(this._timerId);
        this._timerId = undefined;
    }
}
