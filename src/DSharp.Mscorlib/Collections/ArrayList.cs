using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace System.Collections
{
    [ScriptIgnoreNamespace]
    [ScriptImport]
    [ScriptName("Array")]
    // CLR reference https://source.dot.net/#System.Private.CoreLib/shared/System/Collections/ArrayList.cs,3e3f6715773d6643
    public sealed class ArrayList : ICollection // In CLR it inherits from IList, ICloneable
    { 
        public ArrayList() { }

        public ArrayList(int capacity) { }

        // It sould take a single ICollection rather then params object[]
        public ArrayList(params object[] items) { }

        [ScriptField]
        [ScriptName("length")]
        public extern int Count { get; }

        [ScriptField]
        public extern object this[int index] { get; set; }

        [ScriptName("push")]
        // It used to return void. Double check this implementation
        public extern int Add(object item);

        [ScriptName("push")]
        // In CLR this method accept a single ICollection item rather than params object []
        public extern void AddRange(params object[] items);

        public extern void Clear();

        // This method doesn't exist in CLR. Should we move it into a different abstraction?
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern ArrayList Concat(params object[] objects);

        public extern bool Contains(object item);

        // These methods (Every, Filter) do not exist in CLR. They belong to Linq.
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern bool Every(ArrayFilterCallback filterCallback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern bool Every(ArrayItemFilterCallback itemFilterCallback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern Array Filter(ArrayFilterCallback filterCallback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern Array Filter(ArrayItemFilterCallback itemFilterCallback);

        // ForEach does not belong to ArrayList
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern void ForEach(ArrayCallback callback);
        [Obsolete("Not compliant with .NET standard",  error: false)]

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern void ForEach(ArrayItemCallback itemCallback);

        public extern IEnumerator GetEnumerator();
        // GetRange does not belong to ArrayList
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern Array GetRange(int index);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern Array GetRange(int index, int count);

        public extern int IndexOf(object item);

        public extern int IndexOf(object item, int startIndex);

        public extern void Insert(int index, object item);

        // ICollection c instead of params object[] itmes
        public extern void InsertRange(int index, params object[] items);

        // Join is a Linq method
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern string Join();

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern string Join(string delimiter);

        public extern int LastIndexOf(object item);

        public extern int LastIndexOf(object item, int fromIndex);

        // All the Map and Reduce methods do not belong to this class (mostly Linq methods)
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern Array Map(ArrayMapCallback mapCallback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern Array Map(ArrayItemMapCallback mapItemCallback);
        // ArrayList doesn't Parse strings
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern static ArrayList Parse(string s);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern object Reduce(ArrayReduceCallback callback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern object Reduce(ArrayReduceCallback callback, object initialValue);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern object Reduce(ArrayItemReduceCallback callback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern object Reduce(ArrayItemReduceCallback callback, object initialValue);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern object ReduceRight(ArrayReduceCallback callback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern object ReduceRight(ArrayReduceCallback callback, object initialValue);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern object ReduceRight(ArrayItemReduceCallback callback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern object ReduceRight(ArrayItemReduceCallback callback, object initialValue);

        [DSharpScriptMemberName("remove")]
        public extern bool Remove(object item);

        public extern void RemoveAt(int index);

        public extern Array RemoveRange(int index, int count);

        public extern void Reverse();
        // No Shift and Unshift for ArrayList
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern object Shift();
        // No Slice and Splice for ArrayList
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern Array Slice(int start);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern Array Slice(int start, int end);
        // As already seen, Some is a sort of Linq like method. Not belonging to ArrayList.
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern bool Some(ArrayFilterCallback filterCallback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern bool Some(ArrayItemFilterCallback itemFilterCallback);

        public extern void Sort();

        public extern void Sort(CompareCallback compareCallback);
        // No Slice and Splice for ArrayList
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern void Splice(int start, int deleteCount);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern void Splice(int start, int deleteCount, params object[] itemsToInsert);
        // No Shift and Unshift for ArrayList
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern void Unshift(params object[] items);

        // All of the following cast operations shouldn't be allowed. 
        // ArrayList provides instead a toArray method ( Array ToArray(Type type) )
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern static implicit operator Array(ArrayList list);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern static implicit operator object[](ArrayList list);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern static implicit operator List<object>(ArrayList list);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern static explicit operator ArrayList(object[] array);
    }
}
