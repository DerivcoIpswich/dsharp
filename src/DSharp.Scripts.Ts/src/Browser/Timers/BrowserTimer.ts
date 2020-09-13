import { BaseTimer } from "./BaseTimer";
import { IBrowserTimerManager } from "./IBrowserTimerFactory";

export class BrowserTimer extends BaseTimer {
    readonly deadline: number;
    private _timerId: number | undefined;

    constructor(callback: () => void, deadline: number, manager: IBrowserTimerManager) {
        super(callback, manager);
        this.deadline = deadline;
    }

    start(): void {
        if (this._timerId !== undefined) {
            return;
        }

        this._timerId = setTimeout(() => {
            this._callback();
            this._timerId = undefined;
        }, this.deadline) as unknown as number;
    }

    cancel(): void {
        if (this._timerId === undefined) {
            return;
        }

        clearTimeout(this._timerId);
        this._timerId = undefined;
    }
}
