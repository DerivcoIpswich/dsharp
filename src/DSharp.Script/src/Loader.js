"use strict";

(function (global) {
  function _ss() {
    {{body}}

    return extend(module('ss', null, {
        IServiceProvider: defineInterface(IServiceProvider),
        IDisposable: defineInterface(IDisposable),
        IEnumerable: defineInterface(IEnumerable),
        IEnumerable_$1: defineInterface(IEnumerable_$1, [IEnumerable]),
        IEnumerator: defineInterface(IEnumerator),
        IEnumerator_$1: defineInterface(IEnumerator_$1, [IEnumerator]),
        ICollection: defineInterface(ICollection, [IEnumerable]),
        ICollection_$1: defineInterface(ICollection_$1, [IEnumerable_$1, IEnumerable]),
        IReadOnlyCollection_$1: defineInterface(IReadOnlyCollection_$1, [IEnumerable_$1, IEnumerable]),
        Dictionary_$2: defineClass(Dictionary_$2, {}, [], null, [IDictionary, IDictionary_$2, IReadOnlyDictionary_$2]),
        IDictionary: defineInterface(IDictionary, [IEnumerable]),
        IDictionary_$2: defineInterface(IDictionary_$2, [IEnumerable_$1, IEnumerable]),
        IReadOnlyDictionary_$2: defineInterface(IReadOnlyDictionary_$2, [IEnumerable_$1, IEnumerable]),
        List_$1: defineClass(List_$1, Array, [], null, [IList, IList_$1, IReadOnlyList_$1]),
        IList: defineInterface(IList, [ICollection]),
        IList_$1: defineInterface(IList_$1, [ICollection_$1]),
        IReadOnlyList_$1: defineInterface(IReadOnlyList_$1, [IReadOnlyCollection_$1]),
        EventArgs: defineClass(EventArgs, {}, [], null),
        CancelEventArgs: defineClass(CancelEventArgs, {}, [], null),
        StringBuilder: defineClass(StringBuilder, StringBuilder$, [], null),
        Stack: defineClass(Stack, Stack$, [], null),
        Queue: defineClass(Queue, Queue$, [], null),
        Guid: defineClass(Guid, Guid$, [], null),
        DateTime: defineClass(DateTime, {}, [], null),
        Nullable: defineClass(Nullable, Nullable$, [], null),
    }),
    {
        version: '{{version}}',
        isValue: isValue,
        value: value,
        extend: extend,
        keys: keys,
        values: values,
        keyCount: keyCount,
        keyExists: keyExists,
        clearKeys: clearKeys,
        enumerate: enumerate,
        array: toArray,
        toArray: toArray,
        remove: removeItem,
        boolean: parseBoolean,
        regexp: parseRegExp,
        number: parseNumber,
        date: parseDate,
        truncate: truncate,
        now: now,
        today: today,
        compareDates: compareDates,
        error: error,
        string: string,
        emptyString: emptyString,
        whitespace: whitespace,
        format: format,
        compareStrings: compareStrings,
        startsWith: startsWith,
        endsWith: endsWith,
        padLeft: padLeft,
        padRight: padRight,
        trim: trim,
        trimStart: trimStart,
        trimEnd: trimEnd,
        insertString: insertString,
        removeString: removeString,
        replaceString: replaceString,
        bind: bind,
        baseBind: baseBind,
        bindAdd: bindAdd,
        bindSub: bindSub,
        bindExport: bindExport,
        paramsGenerator: paramsGenerator,
        createPropertyGet: createPropertyGet,
        createPropertySet: createPropertySet,
        createReadonlyProperty: createReadonlyProperty,
        defineProperty: defineProperty,
        copyArray: copyArray,

        module: module,
        modules: _modules,

        isClass: isClass,
        isInterface: isInterface,
        typeOf: typeOf,
        type: type,
        typeName: typeName,
        canCast: canCast,
        safeCast: safeCast,
        canAssign: canAssign,
        instanceOf: instanceOf,
        baseProperty: baseProperty,
        defineClass: defineClass,
        defineInterface: defineInterface,
        getConstructorParams: getConstructorParams,
        createInstance: paramsGenerator(1, createInstance),

        culture: culture,
        fail: fail,
        contains: contains,
        insert: insert,
        clear: clear,
        addRange: addRange,
        getItem: getItem,
        setItem: setItem,
        removeAt: removeAt,
        removeItem: removeItem,
        createGenericType: createGenericType,
        getGenericConstructor: getGenericConstructor,
        getTypeArgument: getTypeArgument,
        initializeObject: initializeObject,
    });
  }


  function _export() {
    var ss = _ss();
    typeof exports == 'object' ? ss.extend(exports, ss) : global.ss = ss;
  }

  global.define ? global.define('ss', [], _ss) : _export();
})(this);