﻿using System.Collections.ObjectModel;
using System.Runtime.CompilerServices;

namespace System.Collections.Generic
{
    // NOTE: Keep in sync with ArrayList and Array

    /// <summary>
    /// Equivalent to the Array type in Javascript.
    /// </summary>
    [ScriptIgnoreNamespace]
    [ScriptImport]
    [ScriptName("Array")]
    public sealed partial class List<T> : IList<T>, IList
    {
        public List() { }

        public List(int capacity) { }

        public List(params T[] items) { }

        [ScriptField]
        [ScriptName("length")]
        public extern int Count { get; }

        [ScriptField]
        extern T IList<T>.this[int index] { get; set; }

        [ScriptField]
        public extern object this[int index] { get; set; }

        [ScriptName("push")]
        public extern int Add(object value);

        [ScriptName("push")]
        public extern void AddRange(params object[] items);

        [ScriptName("push")]
        public extern void Add(T item);

        [ScriptName("push")]
        public extern void AddRange(params T[] items);

        public extern bool Contains(object value);

        public extern bool Contains(T item);

        public extern void Clear();

        public extern int IndexOf(object value);

        public extern int IndexOf(T item);

        [DSharpScriptMemberName("remove")]
        public extern void Remove(object value);

        [DSharpScriptMemberName("remove")]
        public extern bool Remove(T item);

        public extern void RemoveAt(int index);

        public extern IEnumerator GetEnumerator();

        extern IEnumerator<T> IEnumerable<T>.GetEnumerator();

        public extern void Insert(int index, T item);

        public extern void ForEach(ListCallback<T> callback);

        public extern void ForEach(ListItemCallback<T> itemCallback);

        [ScriptSkip]
        public extern T[] ToArray();

        [ScriptSkip]
        public extern ReadOnlyCollection<T> AsReadOnly();

        public extern static explicit operator Array(List<T> list);

        public extern static explicit operator object[] (List<T> list);

        public extern static implicit operator T[] (List<T> list);

        public extern static explicit operator ArrayList(List<T> list);

        public extern static explicit operator List<T>(T[] array);
    }
}
