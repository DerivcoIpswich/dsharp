﻿using System.Runtime.CompilerServices;

namespace System.Collections.Generic
{
    [ScriptIgnoreGenericArguments(UseGenericName = true)]
    public interface IReadOnlyDictionary<TKey, TValue>
        : IEnumerable<KeyValuePair<TKey, TValue>>
    {
        [ScriptField]
        TValue this[TKey key] { get; }

        [DSharpScriptMemberName("keyExists")]
        bool ContainsKey(TKey key);

        IEnumerable<TKey> Keys { get; }

        IEnumerable<TValue> Values { get; }
    }
}
