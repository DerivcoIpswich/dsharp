﻿using System.Runtime.CompilerServices;

namespace System.Collections
{
    public interface IDictionary : ICollection
    {
        [ScriptField]
        object this[object key]
        {
            get;
            set;
        }

        ICollection Keys { get; }

        ICollection Values { get; }

        [DSharpScriptMemberName("keyExists")]
        bool Contains(object key);

        void Add(object key, object value);

        [DSharpScriptMemberName("clearKeys")]
        void Clear();

        void Remove(object key);
    }
}
