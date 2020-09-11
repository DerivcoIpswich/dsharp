import { isValue } from "../Helpers";
import { endsWith } from "./String";
import { createPropertyGet } from "./Properties";
import { typeOf } from "../TypeSystem";
import { culture } from "./Globalization/Culture";
import { format } from "./Formatter";

export function compareDates(d1, d2) {
    return (d1 === d2)
        ? true
        : ((isValue(d1) && isValue(d2))
            ? (d1.getTime() == d2.getTime())
            : false);
}

export class DateTime {
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) {
        let constructorArgs: any[] = [];
        if (year != null) constructorArgs.push(year);
        if (month != null) constructorArgs.push(month - 1);
        if (day != null) constructorArgs.push(day);
        if (hour != null) constructorArgs.push(hour);
        if (minute != null) constructorArgs.push(minute);
        if (second != null) constructorArgs.push(second);
        if (millisecond != null) constructorArgs.push(millisecond);

        return new (Function.prototype.bind.apply(
            Date, [null, ...constructorArgs]
        ));
    }

    static get Now() {
        return new Date();
    }

    static get Today() {
        var today = DateTime.Now;
        today.setHours(0, 0, 0, 0);
        return today;
    }

    static Equals(d1, d2) {
        var parsedDate1 = DateTime._parseIfString(d1);
        var parsedDate2 = DateTime._parseIfString(d2);

        if (parsedDate1 == null || parsedDate2 == null) {
            return compareDates(parsedDate1, parsedDate2);
        }

        return parsedDate1.getTime() === parsedDate2.getTime();
    }

    static CompareTo(d1, d2) {
        var parsedDate1 = DateTime._parseIfString(d1);
        var parsedDate2 = DateTime._parseIfString(d2);

        if (parsedDate1 == null || parsedDate2 == null) {
            throw new Error("Cannot compare null Dates");
        }

        var d1t = parsedDate1.getTime();
        var d2t = parsedDate2.getTime();

        return d1t === d2t
            ? 0
            : d1t < d2t
                ? -1
                : 1;
    }

    static _parseIfString(obj: any) {
        if (typeOf(obj) === Date) {
            return obj;
        }

        if (typeOf(obj) === String) {
            var dateString = obj;

            if (!(endsWith(dateString, 'z') || endsWith(dateString, 'Z'))) {
                dateString += 'Z';
            }

            var date = new Date(dateString);

            if (isNaN(date.getTime())) {
                date = DateTime._manuallyParseDateFromJsonString(obj);
            }

            return date;
        }

        return null;
    }

    static _manuallyParseDateFromJsonString(str) {
        var s = str.split(new RegExp('\\D'));
        var s2 = new Array(7);

        for (var i = 0; i < 7; ++i) {
            s2[i] = (s[i] == null) ? 0 : parseInt(s[i]);
        }

        return new Date(Date.UTC(s2[0], s2[1] - 1, s2[2], s2[3], s2[4], s2[5]));
    }

    static _getFormatter(pattern) {
        return '{0:' + pattern + '}';
    }

    static GetMilliseconds(date) {
        date = DateTime._parseIfString(date);

        return date.getMilliseconds();
    };

    static AddMilliseconds(date, value) {
        var parsedDate = DateTime._parseIfString(date);

        if (parsedDate == null) {
            return new Date();
        }

        return new Date(value + parsedDate.getTime());
    };

    static AddSeconds(date, value) {
        return DateTime.AddMilliseconds(date, value * 1E3); // 1E3 = 1s
    };

    static AddMinutes(date, value) {
        return DateTime.AddMilliseconds(date, value * 6E4); // 6E4 = 1m
    };

    static AddHours(date, value) {
        return DateTime.AddMilliseconds(date, value * 36E5); // 36E5 = 1h
    };

    static AddDays(date, value) {
        return DateTime.AddMilliseconds(date, value * 864E5); // 864E5 = 1d
    };

    static ToLongDateString(date) {
        return DateTime.ToStringFormatted(date, DateTime._getFormatter(culture.current.dtf.ld));
    };

    static ToLongTimeString(date) {
        return DateTime.ToStringFormatted(date, DateTime._getFormatter(culture.current.dtf.lt));
    };

    static ToShortDateString(date) {
        return DateTime.ToStringFormatted(date, DateTime._getFormatter(culture.current.dtf.sd));
    };

    static ToShortTimeString(date) {
        return DateTime.ToStringFormatted(date, DateTime._getFormatter(culture.current.dtf.st));
    };

    static ToStringFormatted(date, formatter) {
        if (arguments.length === 1) {
            return DateTime.ToString(date);
        }

        date = DateTime._parseIfString(date);

        return format(culture.current, formatter, date);
    };

    static ToString(date) {
        if (date == null) {
            return '';
        }

        return DateTime._parseIfString(date).toString();
    };

    static Parse(date) {
        if (date == null) {
            return null;
        }

        return DateTime._parseIfString(date);
    };

    static GetYear(date) {
        date = DateTime._parseIfString(date);
    
        return date.getFullYear();
    };

    static GetMonth(date) {
        date = DateTime._parseIfString(date);
    
        return date.getMonth() + 1;
    };
    static GetDay(date) {
        date = DateTime._parseIfString(date);
    
        return date.getDate();
    };
    static GetDayOfWeek(date) {
        date = DateTime._parseIfString(date);
    
        return date.getDay();
    };
    
    static GetHours(date) {
        date = DateTime._parseIfString(date);
    
        return date.getHours();
    };
    
    static GetMinutes(date) {
        date = DateTime._parseIfString(date);
    
        return date.getMinutes();
    };
    
    static GetSeconds(date) {
        date = DateTime._parseIfString(date);
    
        return date.getSeconds();
    };
}

declare global {
    interface Date {
        equals(other: Date): boolean;
        compareTo(other: Date): Number;
    }
}


Date.prototype.equals = function (other) {
    return DateTime.Equals(this, other);
}

Date.prototype.compareTo = function (other) {
    return DateTime.CompareTo(this, other);
}

createPropertyGet(Date.prototype, 'Year', function (this: Date) {
    return DateTime.GetYear(this);
});

createPropertyGet(Date.prototype, 'Month', function (this: Date) {
    return DateTime.GetMonth(this);
});

createPropertyGet(Date.prototype, 'Day', function (this: Date) {
    return DateTime.GetDay(this);
});

createPropertyGet(Date.prototype, 'DayOfWeek', function (this: Date) {
    return DateTime.GetDayOfWeek(this);
});

createPropertyGet(Date.prototype, 'Hour', function (this: Date) {
    return DateTime.GetHours(this);
});

createPropertyGet(Date.prototype, 'Minute', function (this: Date) {
    return DateTime.GetMinutes(this);
});

createPropertyGet(Date.prototype, 'Second', function (this: Date) {
    return DateTime.GetSeconds(this);
});

createPropertyGet(Date.prototype, 'Millisecond', function (this: Date) {
    return DateTime.GetMilliseconds(this);
});
