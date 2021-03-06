var _modules = {};
var _meta = []; // array of functions
var _genericConstructorCache = {};

var _classMarker = 'class';
var _interfaceMarker = 'interface';

/// imports metadata info onto the types, this is needed to avoid namespace conflicts
function importMetadata() {
    for (var i = 0; i < _meta.length; ++i) {
        _meta[i]();
    }
}

function registerMetadataImporter(func) {
    _meta.push(func);
}

// resolves an internal dependency (module -> global)
function dependency(name) {
    if (_modules[name] != null) return _modules[name];
    return window[name];
}

function createType(typeName, typeInfo, typeRegistry) {
    // The typeInfo is either an array of information representing
    // classes and interfaces, or an object representing enums and resources
    // or a function, representing a record factory.

    if (Array.isArray(typeInfo)) {
        var typeMarker = typeInfo[0];
        var type = typeInfo[1];
        type.$name = typeName;
        type.$prototypeDescription = typeInfo[2];
        return typeRegistry[typeName] = type;
    }
    else if (typeInfo.constructor === Enum) {
        return typeRegistry[typeName] = typeInfo;
    }

    return typeInfo;
}

function setConstructorParams(registry, type) {
    if (typeof (type.$constructorParams) === "function") {
        type.$constructorParams = type.$constructorParams(registry);
    }
}

function setInheritance(registry, type, prototypeDescription, resolver) {
    var baseType = resolver && !resolver.$type && resolver(registry) || Object;
    if (baseType) {
        // Chain the prototype of the base type (using an anonymous type
        // in case the base class is not creatable, or has side-effects).
        var anonymous = function () { };
        anonymous.prototype = baseType.prototype;
        type.prototype = new anonymous();
        type.prototype.constructor = type;
    }
    prototypeDescription && extendType(type.prototype, prototypeDescription);
    type.$base = baseType;
}

function defineClass(type, prototypeDescription, constructorParams, baseType, interfaces) {
    type.$type = _classMarker;
    type.$constructorParams = constructorParams;
    type.$interfaces = interfaces;
    return [_classMarker, type, prototypeDescription, baseType];
}

function defineInterface(type, interfaces) {
    type.$type = _interfaceMarker;
    type.$interfaces = interfaces;
    return [_interfaceMarker, type];
}

function isClass(fn) {
    return fn.$type === _classMarker;
}

function isInterface(fn) {
    return fn.$type === _interfaceMarker;
}

function typeOf(instance) {
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

function type(s) {
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
function typeName(type) {
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

function canAssign(type, otherType) {
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

function interfaceOf(baseType, otherType) {
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

function instanceOf(type, instance) {
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

function canCast(instance, type) {
    return instanceOf(type, instance);
}

function safeCast(instance, type) {
    return instanceOf(type, instance) ? instance : null;
}

function module(name, implementation, exports) {
    var registry = _modules[name] = { $name: name };

    var api = {};
    var classList = [];
    if (exports) {
        for (var typeName in exports) {
            var type = createType(typeName, exports[typeName], registry);
            if (type.$type == _classMarker) {
                classList.push([type, exports[typeName][2], exports[typeName][3]]);
            }
            api[typeName] = type;
        }
    }

    if (implementation) {
        for (var typeName in implementation) {
            var type = createType(typeName, implementation[typeName], registry);
            if (type.$type == _classMarker) {
                classList.push([type, implementation[typeName][2], implementation[typeName][3]]);
            }
        }
    }

    for (var i = 0; i < classList.length; ++i) {
        var listing = classList[i];
        setInheritance(registry, listing[0], listing[1], listing[2]);
    }

    for (var i = 0; i < classList.length; ++i) {
        var listing = classList[i];
        setConstructorParams(registry, listing[0]);
    }

    return {
        registry: registry,
        api: api
    };
}

function baseProperty(type, propertyName) {
    var baseType = type.$base;
    return Object.getOwnPropertyDescriptor(baseType.prototype, propertyName) || baseProperty(baseType, propertyName);
}

function getConstructorParams(type) {
    return type.$constructorParams;
}

function createInstance(type, parameters) {
    var proto = type.prototype;
    var instance = Object.create(proto);
    proto.constructor.apply(instance, parameters);
    return instance;
}

function getMembers(type) {
    return type ? [].concat(type.$members || [], getMembers(type.$base), getInterfaceMembers(type.$interfaces)) : [];
}

function getInterfaceMembers(types) {
    var members = [];
    if (types) {
        for (var i = 0, ln = types.length; i < ln; ++i) {
            members = members.concat(getMembers(types[i]));
        }
    }
    return members;
}