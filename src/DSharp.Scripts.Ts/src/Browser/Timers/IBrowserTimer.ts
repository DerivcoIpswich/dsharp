export interface IBrowserTimer {
    id: number;
    start(): void;
    cancel(): void;
    dispose(): void;
}
