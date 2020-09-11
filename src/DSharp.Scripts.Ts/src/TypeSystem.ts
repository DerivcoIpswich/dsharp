import { _modules } from "./Modules";
import { createPropertyGet, createPropertySet } from "./System/Properties";
import { startsWith } from "./System/String";
import { Enum } from "./System/Enum";
import { IEquatable_$1, IComparable_$1 } from "./System/SystemInterfaces";
import { IList, IList_$1 } from "./System/Collections/CollectionInteraces";
import { isValue } from "./Helpers";
import { Exception } from "./System/Exception";

export var _classMarker = 'class';
export var _interfaceMarker = 'interface';

export function isClass(fn: Function) {
    let type = asType(fn);
    return type.$type === _classMarker;
}

export function isInterface(fn: Function) {
    let type = asType(fn);
    return type.$type === _interfaceMarker;
}

export function defineClass(constructor: Function, prototypeDescription?: object, constructorParams?: Function[], baseType?: Function, interfaces?: Function[]) {
    let type = asType(constructor);
    type.$type = _classMarker;
    type.$constructorParams = constructorParams;
    type.$interfaces = interfaces;
    return [_classMarker, type, prototypeDescription, baseType];
}

export function defineInterface(constructor: Function, interfaces?: Function[]) {
    let type = asType(constructor);
    type.$type = _interfaceMarker;
    type.$interfaces = interfaces;
    return [_interfaceMarker, type];
}

//TODO: Look at reworking this system to be smaller and cleaner
export function extendModule(name: string, existingApi: object, internalTypes?: object, publicTypes?: object){
    existingApi = existingApi || {};

    let registry = _modules[name];
    if(!registry){
        throw new Exception(`Unable to extend Module as missing module '${name}'`);
    }

    if (publicTypes) {
        for (var typeName in publicTypes) {
            existingApi[typeName] = createType(typeName, publicTypes[typeName], registry);
        }
    }

    if (internalTypes) {
        for (var typeName in internalTypes) {
            createType(typeName, internalTypes[typeName], registry);
        }
    }

    return existingApi;
}

export function defineModule(name: string, internalTypes?: object, publicTypes?: object) {
    var registry = _modules[name] = { $name: name };

    var api = {};
    if (publicTypes) {
        for (var typeName in publicTypes) {
            api[typeName] = createType(typeName, publicTypes[typeName], registry);
        }
    }

    if (internalTypes) {
        for (var typeName in internalTypes) {
            createType(typeName, internalTypes[typeName], registry);
        }
    }

    return api;
}

export function createType(typeName, typeInfo, typeRegistry) {
    // The typeInfo is either an array of information representing
    // classes and interfaces, or an object representing enums and resources
    // or a function, representing a record factory.

    if (Array.isArray(typeInfo)) {
        var typeMarker = typeInfo[0];
        var type = typeInfo[1];
        var prototypeDescription = typeInfo[2];
        var baseType = typeInfo[3];
        // A class is minimally the class type and an object representing
        // its prototype members, and optionally the base type, and references
        // to interfaces implemented by the class.
        if (typeMarker === _classMarker) {
            if (baseType) {
                // Chain the prototype of the base type (using an anonymous type
                // in case the base class is not creatable, or has side-effects).
                var anonymous = function () { };
                anonymous.prototype = baseType.prototype;
                type.prototype = new anonymous();
                type.prototype.constructor = type;
            }

            // Add the type's prototype members if there are any
            prototypeDescription && extendType(type.prototype, prototypeDescription);
            type.$base = baseType || Object;
        }

        type.$name = typeName;
        return typeRegistry[typeName] = type;
    }
    else if (typeInfo.constructor === Enum) {
        return typeRegistry[typeName] = typeInfo;
    }

    return typeInfo;
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


export function typeOf(instance) {
    var ctor;

    // NOTE: We have to catch exceptions because the constructor
    //       cannot be looked up on native COM objects
    try {
        ctor = instance.constructor;
    }
    catch (ex) {
    }
    return ctor || Object;
}

export function type(s) {
    var nsIndex = s.indexOf('.');
    var ns = nsIndex > 0 ? _modules[s.substr(0, nsIndex)] : self;
    var name = nsIndex > 0 ? s.substr(nsIndex + 1) : s;

    return ns ? ns[name] : null;
}

var _typeNames = [
    Number, 'Number',
    String, 'String',
    Boolean, 'Boolean',
    Array, 'Array',
    Date, 'Date',
    RegExp, 'RegExp',
    Function, 'Function'
];
export function typeName(type) {
    if (!(type instanceof Function)) {
        type = type.constructor;
    }
    if (type.$name) {
        return type.$name;
    }
    if (type.name) {
        return type.name;
    }
    for (var i = 0, len = _typeNames.length; i < len; i += 2) {
        if (type === _typeNames[i]) {
            return _typeNames[i + 1];
        }
    }
    return 'Object';
}

export function canAssign(type, otherType) {
    // Checks if the specified type is equal to otherType,
    // or is a parent of otherType

    if ((type === Object) || (type === otherType)) {
        return true;
    }

    // DateTime in CLR implements IEquatable and IComparable
    if (otherType === Date && (
        type === IEquatable_$1
        || type == IComparable_$1)) {
        return true;
    }

    // Arrays in CLR implement IList and IList<T>
    if (otherType === Array && (
        type === IList
        || type == IList_$1)) {
        return true;
    }

    if (type.$type === _classMarker) {
        var baseType = otherType.$base;
        while (baseType) {
            if (type === baseType) {
                return true;
            }
            baseType = baseType.$base;
        }
    }
    else if (type.$type === _interfaceMarker) {
        var baseType = otherType;
        while (baseType) {
            if (interfaceOf(baseType, type)) {
                return true;
            }

            baseType = baseType.$base;
        }
    }
    return false;
}

export function interfaceOf(baseType, otherType) {
    if (baseType === otherType || baseType["$name"] === otherType["$name"]) {
        return true;
    }

    var interfaces = baseType.$interfaces;

    if (interfaces) {
        for (var i = 0, ln = interfaces.length; i < ln; ++i) {
            if (interfaceOf(interfaces[i], otherType)) {
                return true;
            }
        }
    }
    return false;
}

export function instanceOf(type, instance) {
    // Checks if the specified instance is of the specified type

    if (!isValue(instance)) {
        return false;
    }

    if ((type === Object) || (instance instanceof type)) {
        return true;
    }

    var instanceType = typeOf(instance);
    return canAssign(type, instanceType);
}

export function canCast(instance, type) {
    return instanceOf(type, instance);
}

export function safeCast(instance, type) {
    return instanceOf(type, instance) ? instance : null;
}


export function baseProperty(type, propertyName) {
    var baseType = type.$base;
    return Object.getOwnPropertyDescriptor(baseType.prototype, propertyName) || baseProperty(baseType, propertyName);
}

export function getConstructorParams(type) {
    return type.$constructorParams;
}

export function createInstance(type, parameters) {
    var proto = type.prototype;
    var instance = Object.create(proto);
    proto.constructor.apply(instance, parameters);
    return instance;
}

export function getMembers(type) {
    return type ? [].concat(type.$members || [], getMembers(type.$base), getInterfaceMembers(type.$interfaces)) : [];
}

export function getInterfaceMembers(types) {
    var members = [];
    if (types) {
        for (var i = 0, ln = types.length; i < ln; ++i) {
            members = members.concat(getMembers(types[i]));
        }
    }
    return members;
}

export interface Type extends Function{
    $name: string,
    $type: string,
    $constructorParams?: Function[],
    $interfaces?: Function[],
}

export function asType(fn : Function) : Type{
    return fn as unknown as Type;
}