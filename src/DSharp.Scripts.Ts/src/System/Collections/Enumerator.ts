import { _nop, isValue } from "../../Helpers";
import { getItem, keys } from "./CollectionHelpers";

export interface Enumerator {
    current?: any,
    moveNext: () => boolean,
    reset: () => void
}

export function ArrayEnumerator(this: Enumerator, obj: any[]) {
    var index = -1;
    var length = obj.length;
    this.current = null;

    this.moveNext = function () {
        index++;
        this.current = getItem(obj, index);
        return index < length;
    };

    this.reset = function () {
        index = -1;
        this.current = null;
    };
}

export function KeyedEnumerator(this: Enumerator, obj, keys) {
    var index = -1;
    var length = keys.length;
    this.current = null;

    this.moveNext = function () {
        index++;
        this.current = { key: keys[index], value: getItem(obj, keys[index]), };
        return index < length;
    };

    this.reset = function () {
        index = -1;
        this.current = null;
    };
}

export var _nopEnumerator: Enumerator = {
    current: null,
    moveNext: function () {
        return false;
    },
    reset: _nop
};

export function enumerate(o: any): Enumerator {

    if (!isValue(o)) {
        return _nopEnumerator;
    }

    if (typeof o.getEnumerator === "function") {
        return o.getEnumerator();
    }

    if (o.length !== undefined) {
        return new ArrayEnumerator(o);
    }

    return new KeyedEnumerator(o, keys(o));
}