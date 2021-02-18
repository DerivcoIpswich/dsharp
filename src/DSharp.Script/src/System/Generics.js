function createGenericType(ctorMethod, typeArguments) {
    var genericConstructor = getGenericConstructor(ctorMethod, typeArguments);
    var args = [null].concat(Array.prototype.slice.call(arguments).splice(2));
    return new (Function.prototype.bind.apply(genericConstructor, args));
}

function mapGenericType(type, typeArguments) {
    return type.IsGenericTypeDefinition
        ? type.makeGenericType(typeArguments)
        : type;
}

function getGenericConstructor(ctorMethod, typeArguments) {
    if (!isValue(ctorMethod)) {
        return null;
    }

    var key = createGenericConstructorKey(ctorMethod, typeArguments);

    if (!_genericConstructorCache[key]) {
        _genericConstructorCache[key] = createGenericConstructorProxy(key, ctorMethod, typeArguments);
    }
    return _genericConstructorCache[key];
}

function createGenericConstructorProxy(key, ctorMethod, typeArguments) {

    function proxyMember(name, impl) {
        Object.defineProperty(genericInstance, name, {
            get: function () { return impl ? impl() : ctorMethod[name]; }
        });
    }

    function getInterfaces() {
        var interfaces;
        return function () {
            if (!interfaces && ctorMethod.$interfaces) {
                interfaces = []
                for (var i = 0; i < ctorMethod.$interfaces.length; ++i) {
                    interfaces.push(mapGenericType(ctorMethod.$interfaces[i], typeArguments))
                }
            }
            return interfaces;
        }
    }

    function getConstructorParams() {
        var constructorParams;
        return function () {
            if (!constructorParams && ctorMethod.$constructorParams) {
                constructorParams = [];
                for (var i = 0; i < ctorMethod.$constructorParams.length; ++i) {
                    constructorParams.push(mapGenericType(ctorMethod.$constructorParams[i], typeArguments))
                }
            }
            return constructorParams;
        }
    }

    function getTypeArguments() {
        return typeArguments;
    }

    var genericInstance = namedFunction(key, function () {
        ctorMethod.apply(this, Array.prototype.slice.call(arguments));
    });

    genericInstance.prototype = Object.create(ctorMethod.prototype);
    genericInstance.prototype.constructor = genericInstance;
    genericInstance.IsGenericTypeDefinition = true;
    genericInstance.$name = key;
    genericInstance.GenericTypeArguments = values(typeArguments || {});

    proxyMember("$type");
    proxyMember("$base");
    proxyMember("$members");
    proxyMember("$interfaces", getInterfaces());
    proxyMember("$constructorParams", getConstructorParams());
    proxyMember("$typeArguments", getTypeArguments);

    return genericInstance;
}

function createGenericConstructorKey(ctorMethod, typeArguments) {
    var key = getTypeName(ctorMethod);
    key += "\u1438";
    key += Object.getOwnPropertyNames(typeArguments)
        .map(function (parameterKey) { return getTypeName(typeArguments[parameterKey]); })
        .join("\u02cf");
    key += "\u1433";

    return key;
}

function getTypeName(instance) {
    try {
        return instance["$name"] || instance.constructor.$name || instance["name"];
    }
    catch (ex) {
        return instance && instance.toString();
    }
}

function getTypeArgument(instance, typeArgumentName) {
    if (!isValue(instance) || emptyString(typeArgumentName) || !isValue(instance.constructor.$typeArguments)) {
        return null;
    }

    return instance.constructor.$typeArguments[typeArgumentName];
}

function getGenericTemplate(ctorMethod, typeParameters) {
    if (!isValue(ctorMethod)) {
        return null;
    }

    var params = {};
    for (var i = 0, ln = typeParameters.length; i < ln; ++i) {
        params[typeParameters[i]] = null;
    }

    return {
        $type: ctorMethod.$type,
        $name: ctorMethod.$name,
        $interfaces: ctorMethod.$interfaces,
        $typeArguments: params,
        IsGenericTypeDefinition: true,
        GenericTypeArguments: values(params || {}),
        makeGenericType: function (typeArguments) {
            var args = {};
            for (var i = 0, ln = typeParameters.length; i < ln; ++i) {
                args[typeParameters[i]] = typeArguments[i];
            }
            return getGenericConstructor(ctorMethod, args);
        }
    }
}

var makeGenericType = paramsGenerator(1, function (genericTemplate, typeArguments) {
    if (!isValue(genericTemplate) || !genericTemplate.IsGenericTypeDefinition) {
        return null;
    }

    return genericTemplate.makeGenericType(typeArguments);
});

function makeMappedGenericTemplate(ctorMethod, typeMap) {
    if (!isValue(ctorMethod)) {
        return null;
    }

    var typeParameters = keys(typeMap);
    var params = {};
    for (var i = 0, ln = typeParameters.length; i < ln; ++i) {
        params[typeParameters[i]] = null;
    }

    return {
        $type: ctorMethod.$type,
        $name: ctorMethod.$name,
        $interfaces: ctorMethod.$interfaces,
        $typeArguments: params,
        IsGenericTypeDefinition: true,
        GenericTypeArguments: values(params || {}),

        makeGenericType: function (typeArguments) {
            var args = {};
            for (var i = 0; i < typeParameters.length; ++i) {
                args[typeParameters[i]] = typeArguments[typeMap[typeParameters[i]]]
            }
            return getGenericConstructor(ctorMethod, args);
        }
    }
}