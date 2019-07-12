﻿using System.Runtime.CompilerServices;

namespace System.Collections.Generic
{
    [ScriptImport]
    [ScriptName("IDictionary")]
    public interface IReadOnlyDictionary<TKey, TValue>
        : IReadOnlyCollection<KeyValuePair<TKey, TValue>>
    {
        [ScriptField]
        TValue this[TKey key] { get; }

        [DSharpScriptMemberName("keyExists")]
        bool ContainsKey(TKey key);

        IEnumerable<TKey> Keys { get; }

        IEnumerable<TValue> Values { get; }
    }
}
