import { formatters } from "./FormatterStore";
import { neutralCulture } from "./Globalization/Culture";
import { StringBuilder } from "./Text/StringBuilder";
import { padLeft } from "./String";

var _dateFormatRE = /'.*?[^\\]'|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z/g;

formatters.setFormatter("Date", function (dt, format, culture) {
    if (format == 'iso') {
        return dt.toISOString();
    }
    else if (format.charAt(0) == 'i') {
        var fnName = 'String';
        switch (format) {
            case 'id': fnName = 'DateString'; break;
            case 'it': fnName = 'TimeString'; break;
        }
        return culture == neutralCulture ? dt['to' + fnName]() : dt['toLocale' + fnName]();
    }

    var dtf = culture.dtf;

    if (format.length == 1) {
        switch (format) {
            case 'f': format = dtf.ld + ' ' + dtf.st; break;
            case 'F': format = dtf.dt; break;

            case 'd': format = dtf.sd; break;
            case 'D': format = dtf.ld; break;

            case 't': format = dtf.st; break;
            case 'T': format = dtf.lt; break;

            case 'g': format = dtf.sd + ' ' + dtf.st; break;
            case 'G': format = dtf.sd + ' ' + dtf.lt; break;

            case 'R': case 'r':
                dtf = neutralCulture.dtf;
                format = dtf.gmt;
                break;
            case 'u': format = dtf.uni; break;
            case 'U':
                format = dtf.dt;
                dt = new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(),
                    dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds());
                break;

            case 's': format = dtf.sort; break;
        }
    }

    if (format.charAt(0) == '%') {
        format = format.substr(1);
    }

    var sb = new StringBuilder();

    _dateFormatRE.lastIndex = 0;
    while (true) {
        var index = _dateFormatRE.lastIndex;
        var match = _dateFormatRE.exec(format);

        sb.append(format.slice(index, match ? match.index : format.length));
        if (!match) {
            break;
        }

        var fs = match[0];
        var part = fs;
        switch (fs) {
            case 'dddd':
                part = dtf.day[dt.getDay()];
                break;
            case 'ddd':
                part = dtf.sday[dt.getDay()];
                break;
            case 'dd':
                part = padLeft(dt.getDate().toString(), 2, '0');
                break;
            case 'd':
                part = dt.getDate();
                break;
            case 'MMMM':
                part = dtf.mon[dt.getMonth()];
                break;
            case 'MMM':
                part = dtf.smon[dt.getMonth()];
                break;
            case 'MM':
                part = padLeft((dt.getMonth() + 1).toString(), 2, '0');
                break;
            case 'M':
                part = (dt.getMonth() + 1);
                break;
            case 'yyyy':
                part = dt.getFullYear();
                break;
            case 'yy':
                part = padLeft((dt.getFullYear() % 100).toString(), 2, '0');
                break;
            case 'y':
                part = (dt.getFullYear() % 100).toString();
                break;
            case 'h': case 'hh':
                part = (dt.getHours() % 12).toString();
                if (!part) {
                    part = '12';
                }
                else if (fs == 'hh') {
                    part = padLeft(part.toString(), 2, '0');
                }
                break;
            case 'HH':
                part = padLeft(dt.getHours().toString(), 2, '0');
                break;
            case 'H':
                part = dt.getHours();
                break;
            case 'mm':
                part = padLeft(dt.getMinutes().toString(), 2, '0');
                break;
            case 'm':
                part = dt.getMinutes();
                break;
            case 'ss':
                part = padLeft(dt.getSeconds().toString(), 2, '0');
                break;
            case 's':
                part = dt.getSeconds();
                break;
            case 't': case 'tt':
                part = (dt.getHours() < 12) ? dtf.am : dtf.pm;
                if (fs == 't') {
                    part = part.charAt(0);
                }
                break;
            case 'fff':
                part = padLeft(dt.getMilliseconds().toString(), 3, '0');
                break;
            case 'ff':
                part = padLeft(dt.getMilliseconds().toString(), 3).substr(0, 2);
                break;
            case 'f':
                part = padLeft(dt.getMilliseconds().toString(), 3).charAt(0);
                break;
            case 'z':
                var num = dt.getTimezoneOffset() / 60;
                part = ((num >= 0) ? '-' : '+') + Math.floor(Math.abs(num));
                break;
            case 'zz': case 'zzz':
                var num = dt.getTimezoneOffset() / 60;
                part = ((num >= 0) ? '-' : '+') + padLeft(Math.floor(Math.abs(num)).toString(), 2, '0');
                if (fs == 'zzz') {
                    part += dtf.ts + padLeft(Math.abs(dt.getTimezoneOffset() % 60).toString(), 2, '0');
                }
                break;
            default:
                if (part.charAt(0) == '\'') {
                    part = part.substr(1, part.length - 2).replace(/\\'/g, '\'');
                }
                break;
        }
        sb.append(part);
    }

    return sb.toString();
});