// Various Helpers/Utilities

import { startsWith, endsWith } from "./String";
import { createPropertyGet, createPropertySet } from "./Properties";


export function isValue(o) {
    return (o !== null) && (o !== undefined);
}

export function _value(args) {
    for (var i = 2, l = args.length; i < l; i++) {
        if (isValue(args[i])) {
            return args[i];
        }
    }
    return null;
}

export function value(a, b) {
    return isValue(a) ? a : isValue(b) ? b : _value(arguments);
}

export function extendType(o, items) {
    for (var n in items) {
        if (startsWith(n, "$get_")) {
            createPropertyGet(o, n.slice(5), items[n]);
        }
        else if (startsWith(n, "$set_")) {
            createPropertySet(o, n.slice(5), items[n]);
        }
        else {
            o[n] = items[n];
        }
    }
    return o;
}

export function parseBoolean(s) {
    return (s.toLowerCase() == 'true');
}

export function parseRegExp(s) {
    if (s[0] == '/') {
        var endSlashIndex = s.lastIndexOf('/');
        if (endSlashIndex > 1) {
            var expression = s.substring(1, endSlashIndex);
            var flags = s.substr(endSlashIndex + 1);
            return new RegExp(expression, flags);
        }
    }

    return null;
}

export function parseNumber(s) {
    if (!s || !s.length) {
        return 0;
    }
    if ((s.indexOf('.') >= 0) || (s.indexOf('e') >= 0) ||
        endsWith(s, 'f') || endsWith(s, 'F')) {
        return parseFloat(s);
    }
    return parseInt(s, 10);
}

export function parseDate(s) {
    var t = Date.parse(s);
    return isNaN(t) ? undefined : new Date(t);
}

export function truncate(n) {
    return (n >= 0) ? Math.floor(n) : Math.ceil(n);
}

export function now() {
    return new Date();
}

export function today() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function _popStackFrame(e) {
    if (!isValue(e.stack) ||
        !isValue(e.fileName) ||
        !isValue(e.lineNumber)) {
        return;
    }

    var stackFrames = e.stack.split('\n');
    var currentFrame = stackFrames[0];
    var pattern = e.fileName + ':' + e.lineNumber;
    while (isValue(currentFrame) && currentFrame.indexOf(pattern) === -1) {
        stackFrames.shift();
        currentFrame = stackFrames[0];
    }

    var nextFrame = stackFrames[1];
    if (!isValue(nextFrame)) {
        return;
    }

    var nextFrameParts = nextFrame.match(/@(.*):(\d+)$/);
    if (!isValue(nextFrameParts)) {
        return;
    }

    stackFrames.shift();
    e.stack = stackFrames.join('\n');
    e.fileName = nextFrameParts[1];
    e.lineNumber = parseInt(nextFrameParts[2], 10);
}

export function error(message, errorInfo, innerException) {
    var e = new Error(message);
    if (errorInfo) {
        for (var v in errorInfo) {
            e[v] = errorInfo[v];
        }
    }
    if (innerException) {
        Object.defineProperty(e, "innerException", {
            value: innerException
        });
    }

    _popStackFrame(e);
    return e;
}

export function assertFail(message) {
    console.assert(false, message);
    if (self.navigator) {
        eval('debugger;');
    }
}

export function paramsGenerator(n, f) {
    return function (this: any) {
        var slice = Array.prototype.slice;
        var args = slice.call(arguments, 0, n);
        while (args.length < n) { args.push(null); }
        if (arguments.length == n + 1 && Array.isArray(arguments[n])) {
            args.push(arguments[n]);
        }
        else {
            var unnamed = slice.call(arguments, n);
            args.push(unnamed);
        }
        return f.apply(this, args);
    };
}

export function namedFunction(name, fn) {
    return new Function('fn',
        "return function " + name + "(){ return fn.apply(this, arguments)}"
    )(fn);
}