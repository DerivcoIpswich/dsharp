﻿using System.Runtime.CompilerServices;

namespace System.Collections.Generic
{
    [ScriptIgnoreNamespace]
    [ScriptName("Object")]
    [ScriptIgnoreGenericArguments]
    public struct KeyValuePair<TKey, TValue>
    {
        internal KeyValuePair(TKey key, TValue value) { }

        [ScriptField]
        public extern TKey Key { get; }

        [ScriptField]
        public extern TValue Value { get; }
    }
}
