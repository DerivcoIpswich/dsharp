import { value } from "../Helpers";
import { truncate } from "./Misc";
import { ExceptionHelper } from "./ExceptionHelper";

export class TimeSpan {
    static _long_MinValue = -9223372036854775808;
    static ticksPerMillisecond = 10000;
    static ticksPerSecond = 10000 * 1000;
    static ticksPerMinute = TimeSpan.ticksPerSecond * 60;
    static ticksPerHour = TimeSpan.ticksPerMinute * 60;
    static ticksPerDay = TimeSpan.ticksPerHour * 24;
    static _maxSeconds = 9223372036854775807 / TimeSpan.ticksPerSecond;
    static _minSeconds = TimeSpan._long_MinValue / TimeSpan.ticksPerSecond;
    static _maxMilliSeconds = 9223372036854775807 / 10000;
    static _minMilliSeconds = TimeSpan._long_MinValue / 10000;
    static _ticksPerTenthSecond = 10000 * 100;
    static zero = new TimeSpan(0);
    static maxValue = new TimeSpan(9223372036854775807);
    static minValue = new TimeSpan(TimeSpan._long_MinValue);

    private _ticks: number;
    constructor(days: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number) {
        this._ticks = 0;
        switch (arguments.length) {
            case 1:
                this._ticks = days;
                break;
            case 3:
                this._ticks = TimeSpan._timeToTicks(days, minutes, seconds);
                break;
            case 4:
            case 5:
                this._ticks = TimeSpan._getTicksFull(days, hours, minutes, seconds, milliseconds);
                break;
        }
    }
    //members
    get Ticks() {
        return this._ticks;
    }

    get Days() {
        return truncate((this._ticks / TimeSpan.ticksPerDay));
    }

    get Hours() {
        return truncate(((this._ticks / TimeSpan.ticksPerHour) % 24));
    }

    get Milliseconds() {
        return truncate(((this._ticks / 10000) % 1000));
    }

    get Minutes() {
        return truncate(((this._ticks / TimeSpan.ticksPerMinute) % 60));
    }

    get Seconds() {
        return truncate(((this._ticks / TimeSpan.ticksPerSecond) % 60));
    }

    get TotalDays() {
        return (this._ticks) / TimeSpan.ticksPerDay;
    }

    get TotalHours() {
        return this._ticks / TimeSpan.ticksPerHour;
    }

    get TotalMinutes() {
        return this._ticks / TimeSpan.ticksPerMinute;
    }

    get TotalSeconds() {
        return this._ticks / TimeSpan.ticksPerSecond;
    }

    get TotalMilliseconds() {
        var temp = this._ticks / 10000;
        if (temp > TimeSpan._maxMilliSeconds) {
            return TimeSpan._maxMilliSeconds;
        }
        if (temp < TimeSpan._minMilliSeconds) {
            return TimeSpan._minMilliSeconds;
        }
        return temp;
    }

    add(ts) {
        var result = this._ticks + ts._ticks;
        if ((this._ticks >> 63 === ts._ticks >> 63) && (this._ticks >> 63 !== result >> 63)) {
            throw ExceptionHelper.throwOverflowException('Timespan too long');
        }
        return new TimeSpan(result);
    }

    equals(other) {
        return this._ticks === other._ticks;
    }

    compareTo(value) {
        var t = value._ticks;
        if (this._ticks > t) {
            return 1;
        }
        if (this._ticks < t) {
            return -1;
        }
        return 0;
    }

    subtract(ts) {
        var result = this._ticks - ts._ticks;
        if ((this._ticks >> 63 !== ts._ticks >> 63) && (this._ticks >> 63 !== result >> 63)) {
            throw ExceptionHelper.throwOverflowException('Timespan too long');
        }
        return new TimeSpan(result);
    }

    multiply(factor) {
        var ticks = Math.round(this._ticks * factor);
        return TimeSpan._intervalFromDoubleTicks(ticks);
    }

    divide(divisor) {
        if (isNaN(divisor)) {
            throw ExceptionHelper.throwArgumentNullException('divisor');
        }
        var ticks = Math.round(this._ticks / divisor);
        return TimeSpan._intervalFromDoubleTicks(ticks);
    }

    //statics
    static fromDays(value) {
        return TimeSpan._interval(value, TimeSpan.ticksPerDay);
    }

    static fromMinutes(value) {
        return TimeSpan._interval(value, TimeSpan.ticksPerMinute);
    }

    static fromHours(value) {
        return TimeSpan._interval(value, TimeSpan.ticksPerHour);
    }

    static fromSeconds(value) {
        return TimeSpan._interval(value, TimeSpan.ticksPerSecond);
    }

    static fromMilliseconds(value) {
        return TimeSpan._interval(value, 10000);
    }

    private static _interval(value, scale) {
        if (isNaN(value)) {
            throw ExceptionHelper.throwArgumentNullException('value');
        }
        var ticks = value * scale;
        return TimeSpan._intervalFromDoubleTicks(ticks);
    }

    private static _intervalFromDoubleTicks(ticks) {
        if ((ticks > Number.MAX_VALUE) || (ticks < Number.MIN_VALUE) || isNaN(ticks)) {
            throw ExceptionHelper.throwOverflowException('Timespan too long');
        }
        if (ticks === Number.MAX_VALUE) {
            return TimeSpan.maxValue;
        }
        return new TimeSpan(ticks);
    }

    private static _timeToTicks(hour, minute, second) {
        var totalSeconds = hour * 3600 + minute * 60 + second;
        if (totalSeconds > TimeSpan._maxSeconds || totalSeconds < TimeSpan._minSeconds) {
            throw ExceptionHelper.throwOverflowException('Timespan too long');
        }
        return totalSeconds * TimeSpan.ticksPerSecond;
    }
    
    private static _getTicksFull(days, hours, minutes, seconds, milliseconds) {
        var actualMilliseconds = value(milliseconds, 0);
        var totalMilliSeconds = (days * 3600 * 24 + hours * 3600 + minutes * 60 + seconds) * 1000 + actualMilliseconds;
        if (totalMilliSeconds > TimeSpan._maxMilliSeconds || totalMilliSeconds < TimeSpan._minMilliSeconds) {
            throw ExceptionHelper.throwOverflowException('Timespan too long');
        }
        return totalMilliSeconds * 10000;
    }
}