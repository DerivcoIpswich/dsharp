import { isValue } from "../Helpers";

export function createReadonlyProperty(instance, propertyName , value) {
    Object.defineProperty(instance, propertyName, {
        get: function () { return value; },
        enumerable: true
    });

    return value;
}

export function createPropertyGet(obj, propertyName, fn) {
    Object.defineProperty(obj, propertyName, {
        configurable: true,
        enumerable: true,
        get: fn
    });
}

export function createPropertySet(obj, propertyName, fn) {
    Object.defineProperty(obj, propertyName, {
        configurable: true,
        enumerable: true,
        set: fn
    });
}

export function defineProperty(instance, propertyName, value) {
    var prop = value;

    if (instance.hasOwnProperty(propertyName))
    {
        instance[propertyName] = prop;
        return;
    }

    Object.defineProperty(instance, propertyName, {
        get: function () { return prop; },
        set: function (value) { prop = value; },
        configurable: true,
        enumerable: true,
        writable: true
    });
}
export function initializeObject(obj, initializerMap) {
    if (!isValue(obj) || !isValue(initializerMap)) {
        return obj;
    }

    for (var prop in initializerMap) {
        obj[prop] = initializerMap[prop];
    }

    return obj;
}