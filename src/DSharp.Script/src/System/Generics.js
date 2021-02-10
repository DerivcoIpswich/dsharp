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
    var genericInstance = _genericConstructorCache[key];

    if (!genericInstance) {
        if (ctorMethod.$interfaces) {
            var interfaces = [];
            for (var i = 0; i < ctorMethod.$interfaces.length; ++i) {
                interfaces.push(mapGenericType(ctorMethod.$interfaces[i], typeArguments))
            }
        }

        if (ctorMethod.$constructorParams) {
            var constructorParams = [];
            for (var i = 0; i < ctorMethod.$constructorParams.length; ++i) {
                constructorParams.push(mapGenericType(ctorMethod.$constructorParams[i], typeArguments))
            }
        }

        if (isInterface(ctorMethod)) {
            genericInstance = namedFunction(key, function () { });
            genericInstance.$type = _interfaceMarker;
            genericInstance.$name = key;
            genericInstance.$interfaces = interfaces;
        }
        else {
            genericInstance = namedFunction(key, function () {
                ctorMethod.apply(this, Array.prototype.slice.call(arguments));
                var ctr = this.__proto__.constructor;
                ctr.$typeArguments = typeArguments || {};
                ctr.$base = ctr.$base || genericInstance.$base;
                ctr.$interfaces = interfaces;
                ctr.$type = ctr.$type || genericInstance.$type;
                ctr.$name = ctr.$name || genericInstance.$name;
                ctr.$constructorParams = constructorParams;
            });
            genericInstance.$base = ctorMethod.$base;
            genericInstance.$interfaces = interfaces;
            genericInstance.$type = ctorMethod.$type;
            genericInstance.$name = key;
            genericInstance.$constructorParams = constructorParams;
        }
        genericInstance.prototype = Object.create(ctorMethod.prototype);
        genericInstance.prototype.constructor = genericInstance;
        genericInstance.$typeArguments = typeArguments || {};
        genericInstance.IsGenericTypeDefinition = true;
        genericInstance.GenericTypeArguments = values(typeArguments || {});
        _genericConstructorCache[key] = genericInstance;
    }

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