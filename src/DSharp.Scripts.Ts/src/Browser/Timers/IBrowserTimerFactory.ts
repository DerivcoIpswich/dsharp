import { IBrowserTimer } from "./IBrowserTimer";

export interface IBrowserTimerFactory {
    createTimer(callback: () => void, deadline: number): IBrowserTimer | null;
    createInterval(callback: () => void, interval: number): IBrowserTimer | null;
}

export interface IBrowserTimerManager extends IBrowserTimerFactory {
    unregister(timer: IBrowserTimer): void;
}
