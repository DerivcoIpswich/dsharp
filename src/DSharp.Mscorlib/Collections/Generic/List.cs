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
    public sealed class List<T> : ICollection<T>
    {
        public List()
        {
        }

        public List(int capacity)
        {
        }

        public List(params T[] items)
        {
        }

        [ScriptField]
        [ScriptName("length")]
        public int Count { get; }

        [ScriptField]
        public extern T this[int index] { get; set; }

        [ScriptName("push")]
        public extern void Add(T item);

        [ScriptName("push")]
        public extern void AddRange(params T[] items);

        public extern void Clear();

        public extern List<T> Concat(params T[] objects);

        public extern bool Contains(T item);

        public extern bool Every(ListFilterCallback<T> filterCallback);

        public extern bool Every(ListItemFilterCallback<T> itemFilterCallback);

        public extern List<T> Filter(ListFilterCallback<T> filterCallback);

        public extern List<T> Filter(ListItemFilterCallback<T> itemFilterCallback);

        public extern void ForEach(ListCallback<T> callback);

        public extern void ForEach(ListItemCallback<T> itemCallback);

        public extern IEnumerator<T> GetEnumerator();

        extern IEnumerator IEnumerable.GetEnumerator();

        public extern List<T> GetRange(int index);

        public extern List<T> GetRange(int index, int count);

        public extern int IndexOf(T item);

        public extern int IndexOf(T item, int startIndex);

        public extern void Insert(int index, T item);

        public extern void InsertRange(int index, params T[] items);

        public extern string Join();

        public extern string Join(string delimiter);

        public extern int LastIndexOf(object item);

        public extern int LastIndexOf(object item, int fromIndex);

        public extern List<TTarget> Map<TTarget>(ListMapCallback<T, TTarget> mapCallback);

        public extern List<TTarget> Map<TTarget>(ListItemMapCallback<T, TTarget> mapItemCallback);

        public extern static List<T> Parse(string s);

        public extern TReduced Reduce<TReduced>(ListReduceCallback<TReduced, T> callback);

        public extern TReduced Reduce<TReduced>(ListReduceCallback<TReduced, T> callback, TReduced initialValue);

        public extern TReduced Reduce<TReduced>(ListItemReduceCallback<TReduced, T> callback);

        public extern TReduced Reduce<TReduced>(ListItemReduceCallback<TReduced, T> callback, TReduced initialValue);

        public extern TReduced ReduceRight<TReduced>(ListReduceCallback<TReduced, T> callback);

        public extern TReduced ReduceRight<TReduced>(ListReduceCallback<TReduced, T> callback, TReduced initialValue);

        public extern TReduced ReduceRight<TReduced>(ListItemReduceCallback<TReduced, T> callback);

        public extern TReduced ReduceRight<TReduced>(ListItemReduceCallback<TReduced, T> callback, TReduced initialValue);

        [DSharpScriptMemberName("remove")]
        public extern bool Remove(T item);

        public extern void RemoveAt(int index);

        public extern List<T> RemoveRange(int index, int count);

        public extern void Reverse();

        public extern List<T> Slice(int start);

        public extern List<T> Slice(int start, int end);

        public extern bool Some(ListFilterCallback<T> filterCallback);

        public extern bool Some(ListItemFilterCallback<T> itemFilterCallback);

        public extern void Sort();

        public extern void Sort(CompareCallback<T> compareCallback);

        public extern void Splice(int start, int deleteCount);

        public extern void Splice(int start, int deleteCount, params T[] itemsToInsert);

        public extern void Unshift(params T[] items);

        [ScriptSkip]
        public extern T[] ToArray();

        public extern static explicit operator Array(List<T> list);

        public extern static explicit operator object[] (List<T> list);

        public extern static implicit operator T[] (List<T> list);

        public extern static explicit operator ArrayList(List<T> list);

        public extern static explicit operator List<T>(T[] array);
    }
}
