import { defineModule, defineClass, defineInterface, isClass, isInterface, typeOf, type, typeName, canCast, safeCast, canAssign, instanceOf, baseProperty, getConstructorParams, createInstance, getMembers, extendModule } from "./TypeSystem";
import { Dictionary_$2 } from './System/Collections/Dictionary';
import { Enum } from "./System/Enum";
import { _modules } from "./Modules";
import { IServiceProvider, IDisposable, IEnumerable, IEquatable_$1, IComparable_$1, ICloneable, IEnumerable_$1, IEnumerator, IEnumerator_$1, IComparer, IComparer_$1, IEqualityComparer, IEqualityComparer_$1, IComparable } from "./System/SystemInterfaces";
import { DateTime, compareDates } from "./System/DateTime";
import { ICollection, ICollection_$1, IReadOnlyCollection_$1, IDictionary, IDictionary_$2, IReadOnlyDictionary_$2, IList, IList_$1, IReadOnlyList_$1 } from "./System/Collections/CollectionInteraces";
import { List_$1 } from "./System/Collections/List";
import { Queue } from "./System/Collections/Queue";
import { Stack } from "./System/Collections/Stack";
import { Lazy } from "./System/Lazy";
import { Guid } from "./System/Guid";
import { Nullable } from "./System/Nullable";
import { EventArgs, CancelEventArgs } from "./System/EventArgs";
import { StringBuilder } from "./System/Text/StringBuilder";
import { isValue, value } from "./Helpers";
import { keys, values, keyCount, keyExists, clearKeys, toArray, removeItem, contains, insert, clear, addRange, getItem, setItem, removeAt, addKeyValue } from "./System/Collections/CollectionHelpers";
import { enumerate } from "./System/Collections/Enumerator";
import { parseBoolean, parseRegExp, parseNumber, parseDate, truncate, now, today, error, paramsGenerator, namedFunction, assertFail } from "./System/Misc";
import { string, emptyString, whitespace, compareStrings, startsWith, endsWith, padLeft, padRight, trim, trimStart, trimEnd, insertString, removeString, replaceString } from "./System/String";
import { format } from "./System/Formatter";
import { formatters } from "./System/FormatterStore";
import { bind, baseBind, bindAdd, bindSub, bindExport } from "./System/Delegate";
import { createPropertyGet, createPropertySet, createReadonlyProperty, defineProperty, initializeObject } from "./System/Properties";
import { copyArray } from "./System/Array";
import { getGenericTemplate, makeGenericType, createGenericType, getGenericConstructor, getTypeArgument } from "./System/Generics";
import { culture } from "./System/Globalization/Culture";
import { TimeSpan } from "./System/TimeSpan";
import { commaFormatNumber } from "./System/Formatter.Number";
import { CallbackInsertionIndex } from "./System/Threading/CallbackInsertionIndex";
import { CancellationCallbacks } from "./System/Threading/CancellationCallbacks";
import { CancellationCallbackInfo } from "./System/Threading/CancellationCallbackInfo";
import { CancellationTokenSource } from "./System/Threading/CancellationTokenSource";
import { ExceptionHelper } from "./System/ExceptionHelper";
import { DelayTask } from "./System/Threading/Tasks/DelayTask";
import { CancellationToken } from "./System/Threading/CancellationToken";
import { Task, Task_$1 } from "./System/Threading/Tasks/Task";
import { WhenAllTask } from "./System/Threading/Tasks/WhenAllTask";
import { TaskContinuationOptions } from "./System/Threading/Tasks/TaskContinuationOptions";
import { TaskStatus } from "./System/Threading/Tasks/TaskStatus";
import { CancellationTokenRegistration } from "./System/Threading/CancellationTokenRegistration";
import { TaskCompletionSource_$1 } from "./System/Threading/Tasks/TaskCompletionSource";

const SCRIPT_NAME = "ss";

let moduleExports = defineModule(SCRIPT_NAME, undefined, {
    CancelEventArgs: defineClass(CancelEventArgs),
    DateTime: defineClass(DateTime, {}, [IEquatable_$1, IComparable_$1]),
    Dictionary_$2: defineClass(Dictionary_$2, {}, [], undefined, [IDictionary, IDictionary_$2, IReadOnlyDictionary_$2]),
    Enum: defineClass(Enum),
    EventArgs: defineClass(EventArgs),
    Guid: defineClass(Guid),
    ICloneable: defineInterface(ICloneable),
    ICollection_$1: defineInterface(ICollection_$1, [IEnumerable_$1, IEnumerable]),
    ICollection: defineInterface(ICollection, [IEnumerable]),
    IComparable_$1: defineInterface(IComparable_$1),
    IComparer_$1: defineInterface(IComparer_$1),
    IComparer: defineInterface(IComparer),
    IDictionary_$2: defineInterface(IDictionary_$2, [IEnumerable_$1, IEnumerable]),
    IDictionary: defineInterface(IDictionary, [IEnumerable]),
    IDisposable: defineInterface(IDisposable),
    IEnumerable_$1: defineInterface(IEnumerable_$1, [IEnumerable]),
    IEnumerable: defineInterface(IEnumerable),
    IEnumerator_$1: defineInterface(IEnumerator_$1, [IEnumerator]),
    IEnumerator: defineInterface(IEnumerator),
    IEqualityComparer_$1: defineInterface(IEqualityComparer_$1),
    IEqualityComparer: defineInterface(IEqualityComparer),
    IEquatable_$1: defineInterface(IEquatable_$1),
    IList_$1: defineInterface(IList_$1, [ICollection_$1]),
    IList: defineInterface(IList, [ICollection]),
    IReadOnlyCollection_$1: defineInterface(IReadOnlyCollection_$1, [IEnumerable_$1, IEnumerable]),
    IReadOnlyDictionary_$2: defineInterface(IReadOnlyDictionary_$2, [IEnumerable_$1, IEnumerable]),
    IReadOnlyList_$1: defineInterface(IReadOnlyList_$1, [IReadOnlyCollection_$1]),
    IServiceProvider: defineInterface(IServiceProvider),
    Lazy: defineClass(Lazy),
    List_$1: defineClass(List_$1, Array, [], undefined, [IList, IList_$1, IReadOnlyList_$1]),
    MemberType: new Enum('MemberType', {
        all: 191,
        constructor: 1,
        custom: 64,
        event: 2,
        field: 4,
        method: 8,
        nestedType: 128,
        property: 16,
        typeInfo: 32
    }),
    Nullable: defineClass(Nullable),
    Queue: defineClass(Queue),
    Stack: defineClass(Stack),
    StringBuilder: defineClass(StringBuilder),
    TimeSpan: defineClass(TimeSpan),
});

moduleExports = extendModule(SCRIPT_NAME, moduleExports, {
    CallbackInsertionIndex: defineClass(CallbackInsertionIndex, undefined, [Number, CancellationCallbacks]),
    CancellationCallbackInfo: defineClass(CancellationCallbackInfo, undefined, [Function, Object, CancellationTokenSource]),
    CancellationCallbacks: defineClass(CancellationCallbacks),
    ExceptionHelper: defineClass(ExceptionHelper),
    DelayTask: defineClass(DelayTask, undefined, [Number, CancellationToken], Task),
    WhenAllTask: defineClass(WhenAllTask, undefined, [Array, CancellationToken], Task)
  },
  {
    TaskContinuationOptions: TaskContinuationOptions,
    TaskStatus: TaskStatus,
    IComparable: defineInterface(IComparable),
    IComparable_$1: defineInterface(IComparable_$1),
    TimeSpan: defineClass(TimeSpan, undefined, [Number, Number, Number, Number, Number], undefined, [IEquatable_$1, IComparable_$1]),
    CancellationToken: defineClass(CancellationToken, undefined, [CancellationTokenSource]),
    CancellationTokenRegistration: defineClass(CancellationTokenRegistration, undefined, [CancellationCallbackInfo, CallbackInsertionIndex], undefined, [IDisposable]),
    CancellationTokenSource: defineClass(CancellationTokenSource, undefined, [], undefined, [IDisposable]),
    Task: defineClass(Task, undefined, [Function, CancellationToken], undefined, [IDisposable]),
    TaskCompletionSource_$1: defineClass(TaskCompletionSource_$1, undefined, [Object]),
    Task_$1: defineClass(Task_$1, undefined, [Function, CancellationToken], Task),

    //TODO: Finish up Scheduler and Factory implementations
    // TaskScheduler: defineClass(TaskScheduler, TaskScheduler$, []),
    // JsTaskScheduler: defineClass(JsTaskScheduler, JsTaskScheduler$, [], TaskScheduler)
  });

moduleExports = Object.assign(moduleExports, {
    created: true,
    isValue: isValue,
    value: value,
    extend: Object.assign,
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
    setFormatter: formatters.setFormatter,
    commaFormatNumber: commaFormatNumber,
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
    namedFunction: namedFunction,
    createPropertyGet: createPropertyGet,
    createPropertySet: createPropertySet,
    createReadonlyProperty: createReadonlyProperty,
    defineProperty: defineProperty,
    copyArray: copyArray,

    module: defineModule,
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
    getMembers: getMembers,
    getGenericTemplate: getGenericTemplate,
    makeGenericType: makeGenericType,

    culture: culture,
    fail: assertFail,
    contains: contains,
    insert: insert,
    clear: clear,
    addRange: addRange,
    getItem: getItem,
    setItem: setItem,
    removeAt: removeAt,
    removeItem: removeItem,
    addKeyValue: addKeyValue,
    createGenericType: createGenericType,
    getGenericConstructor: getGenericConstructor,
    getTypeArgument: getTypeArgument,
    initializeObject: initializeObject,
});

Object.defineProperty(window, SCRIPT_NAME, {
    value: moduleExports,
    writable: false,
    enumerable: true
});