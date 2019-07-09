using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace System
{
    // NOTE: Keep in sync with ArrayList and List
    [ScriptIgnoreNamespace]
    [ScriptImport]
    [ScriptName("Array")]
    // CLR reference: https://source.dot.net/#System.Private.CoreLib/shared/System/Array.cs,156e066ecc4ccedf
    public sealed class Array : ICollection // Array implents  ICloneable, IList, IStructuralComparable, IStructuralEquatable on CLR
    {
        [ScriptField]
        [ScriptName("length")]
        public extern int Length { get; }

        [ScriptField]
        [ScriptName("length")]
        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern int Count { get; }

        [ScriptField]
        public extern object this[int index] { get; set; }

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern Array Concat(params object[] objects);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern bool Contains(object item);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern bool Every(ArrayFilterCallback filterCallback);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern bool Every(ArrayItemFilterCallback itemFilterCallback);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern Array Filter(ArrayFilterCallback filterCallback);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern Array Filter(ArrayItemFilterCallback itemFilterCallback);

        // I guess these two for each methods are just js forEach.
        // ForEach in CLR looks like this -> static void ForEach<T>(T[] array, Action<T> action)
        public extern void ForEach(ArrayCallback callback);

        public extern void ForEach(ArrayItemCallback itemCallback);

        public extern IEnumerator GetEnumerator();

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern Array GetRange(int index);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern Array GetRange(int index, int count);

        // IndexOf is always static in CLR
        // The most similar in CLR is -> static int IndexOf(Array array, object? value)
        public extern int IndexOf(object item);

        // The most similar in CLR is -> static int IndexOf(Array array, object? value, int startIndex)
        public extern int IndexOf(object item, int startIndex);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern string Join();

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern string Join(string delimiter);

        // LastIndexOf is always static in CLR
        // The most similar in CLR is -> static int LastIndexOf(Array array, object? value)
        public extern int LastIndexOf(object item);

        // The most similar in CLR is -> static int LastIndexOf(Array array, object? value, int startIndex)
        public extern int LastIndexOf(object item, int fromIndex);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern Array Map(ArrayMapCallback mapCallback);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern Array Map(ArrayItemMapCallback mapItemCallback);

        [DSharpScriptMemberName("array")]
        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern static Array Parse(string s);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern object Reduce(ArrayReduceCallback callback);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern object Reduce(ArrayReduceCallback callback, object initialValue);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern object Reduce(ArrayItemReduceCallback callback);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern object Reduce(ArrayItemReduceCallback callback, object initialValue);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern object ReduceRight(ArrayReduceCallback callback);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern object ReduceRight(ArrayReduceCallback callback, object initialValue);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern object ReduceRight(ArrayItemReduceCallback callback);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern object ReduceRight(ArrayItemReduceCallback callback, object initialValue);

        // This method is static in the CLR -> void Reverse(Array array)
        public extern void Reverse();

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern object Shift();

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern Array Slice(int start);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern Array Slice(int start, int end);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern bool Some(ArrayFilterCallback filterCallback);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern bool Some(ArrayItemFilterCallback itemFilterCallback);

        // All of the Sort methods in CLR are static.
        // This should be -> static void Sort(Array array)
        public extern void Sort();

        // This should be -> static void Sort(Array array, IComparer? comparer)
        public extern void Sort(CompareCallback compareCallback);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern void Splice(int start, int deleteCount);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern void Splice(int start, int deleteCount, params object[] itemsToInsert);

        [DSharpScriptMemberName("array")]
        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern static Array ToArray(object o);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern void Unshift(params object[] items);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern static explicit operator ArrayList(Array array);

        [Obsolete("Not compliant with .NET standard", /* error */ true)]
        public extern static explicit operator List<object>(Array array);
    }
}
