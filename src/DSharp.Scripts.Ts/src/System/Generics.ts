import { isValue } from "../Helpers";
import { isInterface, _interfaceMarker } from "../TypeSystem";
import { emptyString } from "./String";
import { paramsGenerator } from "./Misc";

export let _genericConstructorCache: object = {};

export function createGenericType(ctorMethod, typeArguments) {
    var genericConstructor = getGenericConstructor(ctorMethod, typeArguments);
    var args: any[] = [null].concat(Array.prototype.slice.call(arguments).splice(2));
    return new (Function.prototype.bind.apply(genericConstructor, args as any));
}

export function getGenericConstructor(ctorMethod, typeArguments) {
    if (!isValue(ctorMethod)) {
        return null;
    }

    var key = createGenericConstructorKey(ctorMethod, typeArguments);
    var genericInstance = _genericConstructorCache[key];

    if (!genericInstance) {
        if (isInterface(ctorMethod)) {
            genericInstance = function () { };
            genericInstance.$type = _interfaceMarker;
            genericInstance.$name = ctorMethod.$name;
            genericInstance.$interfaces = ctorMethod.$interfaces;
            genericInstance.$typeArguments = typeArguments || {};
        }
        else {
            genericInstance = function (this: any) {
                this.__proto__.constructor.$typeArguments = typeArguments || {};
                this.__proto__.constructor.$base = this.__proto__.constructor.$base || ctorMethod.$base;
                this.__proto__.constructor.$interfaces = this.__proto__.constructor.$interfaces || ctorMethod.$interfaces;
                this.__proto__.constructor.$type = this.__proto__.constructor.$type || ctorMethod.$type;
                this.__proto__.constructor.$name = this.__proto__.constructor.$name || ctorMethod.$name;
                this.__proto__.constructor.$constructorParams = this.__proto__.constructor.$constructorParams || ctorMethod.$constructorParams;
                ctorMethod.apply(this, Array.prototype.slice.call(arguments));
            };
            genericInstance.prototype = Object.create(ctorMethod.prototype);
            genericInstance.prototype.constructor = genericInstance;
        }
        genericInstance.prototype = Object.create(ctorMethod.prototype);
        genericInstance.prototype.constructor = genericInstance;
        _genericConstructorCache[key] = genericInstance;
    }

    return genericInstance;
}

export function createGenericConstructorKey(ctorMethod, typeArguments) {
    var key = getTypeName(ctorMethod);
    key += "<";
    key += Object.getOwnPropertyNames(typeArguments)
        .map(function (parameterKey) { return getTypeName(typeArguments[parameterKey]); })
        .join(",");
    key += ">";

    return key;
}

export function getTypeName(instance) {
    try {
        return instance["$name"] || instance.constructor.$name || instance["name"];
    }
    catch (ex) {
        return instance.toString();
    }
}

export function getTypeArgument(instance, typeArgumentName) {
    if (!isValue(instance) || emptyString(typeArgumentName) || !isValue(instance.constructor.$typeArguments)) {
        return null;
    }

    return instance.constructor.$typeArguments[typeArgumentName];
}

export function getGenericTemplate(ctorMethod, typeParameters) {
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
        makeGenericType: function (typeArguments) {
            var args = {};
            for (var i = 0, ln = typeParameters.length; i < ln; ++i) {
                args[typeParameters[i]] = typeArguments[i];
            }
            return getGenericConstructor(ctorMethod, args);
        }
    }
}

export var makeGenericType = paramsGenerator(1, function (genericTemplate, typeArguments) {
    if (!isValue(genericTemplate) || !genericTemplate.IsGenericTypeDefinition) {
        return null;
    }

    return genericTemplate.makeGenericType(typeArguments);
});