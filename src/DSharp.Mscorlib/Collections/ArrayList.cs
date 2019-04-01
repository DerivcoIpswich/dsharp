using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace System.Collections
{
    [ScriptIgnoreNamespace]
    [ScriptImport]
    [ScriptName("Array")]
    public sealed class ArrayList : ICollection {

        public ArrayList() { }

        public ArrayList(int capacity) { }

        public ArrayList(params object[] items) { }

        [ScriptField]
        [ScriptName("length")]
        public extern int Count { get; }

        [ScriptField]
        public extern object this[int index] { get; set; }

        [ScriptName("push")]
        public extern void Add(object item);

        [ScriptName("push")]
        public extern void AddRange(params object[] items);

        public extern void Clear();

        public extern ArrayList Concat(params object[] objects);

        public extern bool Contains(object item);

        public extern bool Every(ArrayFilterCallback filterCallback);

        public extern bool Every(ArrayItemFilterCallback itemFilterCallback);

        public extern Array Filter(ArrayFilterCallback filterCallback);

        public extern Array Filter(ArrayItemFilterCallback itemFilterCallback);

        public extern void ForEach(ArrayCallback callback);

        public extern void ForEach(ArrayItemCallback itemCallback);

        public extern IEnumerator GetEnumerator();

        public extern Array GetRange(int index);

        public extern Array GetRange(int index, int count);

        public extern int IndexOf(object item);

        public extern int IndexOf(object item, int startIndex);

        public extern void Insert(int index, object item);

        public extern void InsertRange(int index, params object[] items);

        public extern string Join();

        public extern string Join(string delimiter);

        public extern int LastIndexOf(object item);

        public extern int LastIndexOf(object item, int fromIndex);

        public extern Array Map(ArrayMapCallback mapCallback);

        public extern Array Map(ArrayItemMapCallback mapItemCallback);

        public extern static ArrayList Parse(string s);

        public extern object Reduce(ArrayReduceCallback callback);

        public extern object Reduce(ArrayReduceCallback callback, object initialValue);

        public extern object Reduce(ArrayItemReduceCallback callback);

        public extern object Reduce(ArrayItemReduceCallback callback, object initialValue);

        public extern object ReduceRight(ArrayReduceCallback callback);

        public extern object ReduceRight(ArrayReduceCallback callback, object initialValue);

        public extern object ReduceRight(ArrayItemReduceCallback callback);

        public extern object ReduceRight(ArrayItemReduceCallback callback, object initialValue);

        [DSharpScriptMemberName("remove")]
        public extern bool Remove(object item);

        public extern void RemoveAt(int index);

        public extern Array RemoveRange(int index, int count);

        public extern void Reverse();

        public extern object Shift();

        public extern Array Slice(int start);

        public extern Array Slice(int start, int end);

        public extern bool Some(ArrayFilterCallback filterCallback);

        public extern bool Some(ArrayItemFilterCallback itemFilterCallback);

        public extern void Sort();

        public extern void Sort(CompareCallback compareCallback);

        public extern void Splice(int start, int deleteCount);

        public extern void Splice(int start, int deleteCount, params object[] itemsToInsert);

        public extern void Unshift(params object[] items);

        public extern static implicit operator Array(ArrayList list);

        public extern static implicit operator object[](ArrayList list);

        public extern static implicit operator List<object>(ArrayList list);

        public extern static explicit operator ArrayList(object[] array);
    }
}
