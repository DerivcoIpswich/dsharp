export class PerformanceBroker{
    static getTimeStamp(): number{
        return performance.now();
    }
}