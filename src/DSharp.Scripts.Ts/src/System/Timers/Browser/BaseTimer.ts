import { IBrowserTimer } from "./IBrowserTimer";
import { IBrowserTimerManager } from "./IBrowserTimerFactory";

export abstract class BaseTimer implements IBrowserTimer {
    private static globalId: number = 0;

    private _manager: IBrowserTimerManager;

    protected _callback: () => void;

    readonly id: number = BaseTimer.globalId++;

    constructor(callback: () => void, manager: IBrowserTimerManager) {
        this._manager = manager;
        this._callback = callback;
    }

    abstract start(): void;

    abstract cancel(): void;

    dispose(): void {
        this.cancel();
        this._manager.unregister(this);
    }
}
