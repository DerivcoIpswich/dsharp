using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace System
{
    // NOTE: Keep in sync with ArrayList and List
    [ScriptIgnoreNamespace]
    [ScriptImport]
    [ScriptName("Array")]
    public sealed class Array : ICollection // Array implents  ICloneable, IList, IStructuralComparable, IStructuralEquatable on CLR
    {
        [ScriptField]
        [ScriptName("length")]
        public extern int Length { get; }

        [ScriptField]
        [ScriptName("length")]
        // This is not on CLR
        public extern int Count { get; }

        [ScriptField]
        public extern object this[int index] { get; set; }

        // This is not on CLR
        public extern Array Concat(params object[] objects);

        // This is not on CLR
        public extern bool Contains(object item);

        // Every and Filter are not part of CLR. We might want to have them into an abstraction class.
        public extern bool Every(ArrayFilterCallback filterCallback);

        public extern bool Every(ArrayItemFilterCallback itemFilterCallback);

        public extern Array Filter(ArrayFilterCallback filterCallback);

        public extern Array Filter(ArrayItemFilterCallback itemFilterCallback);

        // I guess these two fro each methods are just js forEach.
        // ForEach in CLR looks like this -> static void ForEach<T>(T[] array, Action<T> action)
        public extern void ForEach(ArrayCallback callback);

        public extern void ForEach(ArrayItemCallback itemCallback);

        public extern IEnumerator GetEnumerator();

        // No GetRange methods in CLR
        public extern Array GetRange(int index);

        public extern Array GetRange(int index, int count);

        // IndexOf is always static in CLR
        // The most similar in CLR is -> static int IndexOf(Array array, object? value)
        public extern int IndexOf(object item);

        // The most similar in CLR is -> static int IndexOf(Array array, object? value, int startIndex)
        public extern int IndexOf(object item, int startIndex);

        // These Join methods should be implemented as part of Linq. There's no Join methods on Array in CLR
        public extern string Join();

        public extern string Join(string delimiter);

        // LastIndexOf is always static in CLR
        // The most similar in CLR is -> static int LastIndexOf(Array array, object? value)
        public extern int LastIndexOf(object item);

        // The most similar in CLR is -> static int LastIndexOf(Array array, object? value, int startIndex)
        public extern int LastIndexOf(object item, int fromIndex);

        // These Map methods should be implemented as part of Linq. There's no Map methods on Array in CLR
        public extern Array Map(ArrayMapCallback mapCallback);

        public extern Array Map(ArrayItemMapCallback mapItemCallback);

        [DSharpScriptMemberName("array")]
        // Parse method is not part of CLR. We might want to have it into an abstraction class.
        public extern static Array Parse(string s);

        // These Reduce and ReduceRight methods should be implemented as part of Linq. There's no Reduce and ReduceRight methods on Array in CLR
        public extern object Reduce(ArrayReduceCallback callback);

        public extern object Reduce(ArrayReduceCallback callback, object initialValue);

        public extern object Reduce(ArrayItemReduceCallback callback);

        public extern object Reduce(ArrayItemReduceCallback callback, object initialValue);

        public extern object ReduceRight(ArrayReduceCallback callback);

        public extern object ReduceRight(ArrayReduceCallback callback, object initialValue);

        public extern object ReduceRight(ArrayItemReduceCallback callback);

        public extern object ReduceRight(ArrayItemReduceCallback callback, object initialValue);

        // This method is static in the CLR -> void Reverse(Array array)
        public extern void Reverse();

        // Shift method is not part of CLR. We might want to have it into an abstraction class.
        public extern object Shift();

        // Slice methods are not part of CLR. We might want to have them into an abstraction class.
        public extern Array Slice(int start);

        public extern Array Slice(int start, int end);

        // This some methods are not part of CLR. As far as I know, they're not even in Linq as Linq implements something different (Any ?)
        public extern bool Some(ArrayFilterCallback filterCallback);

        public extern bool Some(ArrayItemFilterCallback itemFilterCallback);

        // All of the Sort methods in CLR are static.
        // This should be -> static void Sort(Array array)
        public extern void Sort();

        // This should be -> static void Sort(Array array, IComparer? comparer)
        public extern void Sort(CompareCallback compareCallback);

        // Splice methods are not part of CLR. We might want to have them into an abstraction class.
        public extern void Splice(int start, int deleteCount);

        public extern void Splice(int start, int deleteCount, params object[] itemsToInsert);

        // None of the following methods exist in CLR Array
        [DSharpScriptMemberName("array")]
        public extern static Array ToArray(object o);

        public extern void Unshift(params object[] items);

        public extern static explicit operator ArrayList(Array array);

        public extern static explicit operator List<object>(Array array);
    }
}
