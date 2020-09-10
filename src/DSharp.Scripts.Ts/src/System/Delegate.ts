import { string } from "./String";
import { _nop } from "../Helpers";

export function _bindList(fnList) {
    var d: any = function (){
        var args = arguments;
        var result = null;
        for (var i = 0, l = fnList.length; i < l; i++) {
            result = args.length
                ? fnList[i].apply(null, args)
                : fnList[i].call(null);
        }

        return result;
    };
    d._fnList = fnList;
    return d;
}

export function bind(fn, o) {
    if (!o) {
        return fn;
    }

    let name: string | null = null;
    fn = typeof fn === 'string'
        ? o[name = fn]
        : fn;

    return internalBind(fn, o, name);
}

export function baseBind(fn, o) {
    if (!o) {
        return fn;
    }

    let name: string | null = null;
    if (typeof fn === 'string') {
        name = fn;
        fn = o.constructor.$base.prototype[name];
        if (!fn) {
            throw new Error("Unable to find '" + name + "' on any of the prototype hierarcy for " + o);
        }
    }

    return internalBind(fn, o, name);
}

export function internalBind(fn, instance, name) {
    if (typeof fn !== 'function') {
        throw new Error("binding requires a function instance!");
    }
    var cache = name ? instance.$$b || (instance.$$b = {}) : null;
    var binding = cache ? cache[name] : null;

    if (!binding) {
        // Create a function that invokes the specified function, in the
        // context of the specified object.
        binding = function () {
            return fn.apply(instance, arguments);
        };

        if (cache) {
            cache[name] = binding;
        }
    }
    return binding;
}

export function bindAdd(binding, value) {
    if (!binding) {
        return value;
    }
    if (!value) {
        return binding;
    }

    var fnList = [].concat(binding._fnList || binding, value);
    return _bindList(fnList);
}

export function bindSub(binding, value) {
    if (!binding) {
        return null;
    }
    if (!value) {
        return binding;
    }

    var fnList = binding._fnList || [binding];
    var index = fnList.indexOf(value);
    if (index >= 0) {
        if (fnList.length === 1) {
            return null;
        }

        fnList = index ? fnList.slice(0, index).concat(fnList.slice(index + 1)) : fnList.slice(1);
        return _bindList(fnList);
    }
    return binding;
}

export function bindExport(fn, multiUse, name, root) {
    // Generate a unique name if one is not specified
    name = name || '__' + (new Date()).valueOf();

    // If unspecified, exported bindings go on the global object
    // (so they are callable using a simple identifier).
    root = root || self;

    var exp = {
        name: name,
        detach: function () {
            root[name] = _nop;
        },
        dispose: function () {
            try { delete root[name]; } catch (e) { root[name] = undefined; }
        }
    };

    // Multi-use bindings are exported directly; for the rest a stub is exported, and the stub
    // first auto-disposes, and then invokes the actual binding.
    root[name] = multiUse ? fn : function () {
        exp.dispose();
        return fn.apply(null, arguments);
    };

    return exp;
}