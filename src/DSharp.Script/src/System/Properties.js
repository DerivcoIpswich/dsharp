function createReadonlyProperty(instance, propertyName , value) {
    Object.defineProperty(instance, propertyName, {
        get: function () { return value; }
    });
}

function createPropertyGet(obj, propertyName, fn) {
    Object.defineProperty(obj, propertyName, {
        configurable: true,
        get: fn
    });
}

function createPropertySet(obj, propertyName, fn) {
    Object.defineProperty(obj, propertyName, {
        configurable: true,
        set: fn
    });
}