import { createFallbackFunction } from "../../Helpers";
import { instanceOf } from "../../TypeSystem";
import { IEnumerable } from "../SystemInterfaces";
import { enumerate } from "./Enumerator";

export function toArray(obj) {
    if (instanceOf((IEnumerable), obj)) {
        var array: any[] = [];
        var enumerable = enumerate(obj);
        while (enumerable.moveNext()) {
            var t = enumerable.current;
            array.push(t);
        }
        return array;
    }

    return obj
        ? typeof obj === "string"
            ? JSON.parse("(" + obj + ")")
            : Array.prototype.slice.call(obj)
        : null;
}

export var removeAt = createFallbackFunction("removeAt", function (obj, index) {
    return index >= 0
        ? (obj.splice(index, 1), true)
        : false;
});

export var removeItem = createFallbackFunction("remove", function (obj, item) {
    var index = obj.indexOf(item);
    return index >= 0
        ? (obj.splice(index, 1), true)
        : false;
});

export function getRange(obj, start, end) {
    return obj.slice(start, end);
};

export function clearKeys(obj) {
    for (var key in obj) {
        delete obj[key];
    }
}
export function keyExists(obj, key) {
    return obj[key] !== undefined;
}
export function keyValueExists(obj, keyValue) {
    return obj[keyValue.key] === keyValue.value;
}

export function addKeyValue(obj, key, value) {
    return obj[key] = value;
}

export function keys(obj) {
    if (Object.keys) {
        return Object.keys(obj);
    }
    var keys: string[] = [];
    for (var key in obj) {
        keys.push(key);
    }
    return keys;
}

export function values(obj) {
    if (Object.values) {
        return Object.values(obj);
    }
    var values: object[] = [];
    for (var key in obj) {
        values.push(obj[key]);
    }
    return values;
}

export function keyCount(obj) {
    return keys(obj).length;
}

export var contains = createFallbackFunction("contains", function (obj, value) {
    return obj.indexOf(value) >= 0;
});

export var insert = createFallbackFunction("insert", function (obj, index, value) {
    obj.splice(index, 0, value);
});

export var clear = createFallbackFunction("clear", function (obj) {
    obj.length = 0;
});

export var addRange = createFallbackFunction("addRange", function (obj, range) {
    if (Array.isArray(range)) {
        for (var i = 0; i < range.length; ++i) {
            obj.push(range[i]);
        }

        return;
    }

    while (range.moveNext()) {
        obj.push(range.current);
    }
});

export function addRangeParams(obj) {
    var params = Array.from(arguments).slice(1);
    addRange(obj, params);
}

export let getItem = createFallbackFunction("get_item", function (obj, key) {
    return obj[key];
});

export var setItem = createFallbackFunction("set_item", function (obj, key, val) {
    return obj[key] = val;
});