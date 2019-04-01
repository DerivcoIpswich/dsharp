using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace System
{
    // NOTE: Keep in sync with ArrayList and List
    [ScriptIgnoreNamespace]
    [ScriptImport]
    [ScriptName("Array")]
    public sealed class Array : ICollection
    {
        [ScriptField]
        [ScriptName("length")]
        public extern int Length { get; }

        [ScriptField]
        [ScriptName("length")]
        public extern int Count { get; }

        [ScriptField]
        public extern object this[int index] { get; set; }

        public extern Array Concat(params object[] objects);

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

        public extern string Join();

        public extern string Join(string delimiter);

        public extern int LastIndexOf(object item);

        public extern int LastIndexOf(object item, int fromIndex);

        public extern Array Map(ArrayMapCallback mapCallback);

        public extern Array Map(ArrayItemMapCallback mapItemCallback);

        [DSharpScriptMemberName("array")]
        public extern static Array Parse(string s);

        public extern object Reduce(ArrayReduceCallback callback);

        public extern object Reduce(ArrayReduceCallback callback, object initialValue);

        public extern object Reduce(ArrayItemReduceCallback callback);

        public extern object Reduce(ArrayItemReduceCallback callback, object initialValue);

        public extern object ReduceRight(ArrayReduceCallback callback);

        public extern object ReduceRight(ArrayReduceCallback callback, object initialValue);

        public extern object ReduceRight(ArrayItemReduceCallback callback);

        public extern object ReduceRight(ArrayItemReduceCallback callback, object initialValue);

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

        [DSharpScriptMemberName("array")]
        public extern static Array ToArray(object o);

        public extern void Unshift(params object[] items);

        public extern static explicit operator ArrayList(Array array);

        public extern static explicit operator List<object>(Array array);
    }
}
