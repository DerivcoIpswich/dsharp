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

export type FallBackFunction = (source: object, ...restOfName: any[]) => any;

export function createFallbackFunction(name, fallback) : FallBackFunction{
    return function (instance) {
        if (typeof instance[name] === "function") {
            return instance[name].apply(instance, Array.from(arguments).splice(1, 0));
        }

        return fallback.apply(null, arguments);
    };
}

export function _nop() {
}

export function isArray(obj: any){
    return Array.isArray(obj);
}