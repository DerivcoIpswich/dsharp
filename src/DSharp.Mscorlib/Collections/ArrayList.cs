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
        // In CLR the signature is -> int Add(object? value). It returns int
        public extern void Add(object item);

        [ScriptName("push")]
        // In CLR this method accept a single ICollection item rather than params object []
        public extern void AddRange(params object[] items);

        public extern void Clear();

        // This method doesn't exist in CLR. Should we move it into a different abstraction?
        public extern ArrayList Concat(params object[] objects);

        public extern bool Contains(object item);

        // These methods (Every, Filter) do not exist in CLR. They belong to Linq.
        public extern bool Every(ArrayFilterCallback filterCallback);

        public extern bool Every(ArrayItemFilterCallback itemFilterCallback);

        public extern Array Filter(ArrayFilterCallback filterCallback);

        public extern Array Filter(ArrayItemFilterCallback itemFilterCallback);

        // ForEach does not belong to ArrayList
        public extern void ForEach(ArrayCallback callback);

        public extern void ForEach(ArrayItemCallback itemCallback);

        public extern IEnumerator GetEnumerator();
        // GetRange does not belong to ArrayList
        public extern Array GetRange(int index);

        public extern Array GetRange(int index, int count);

        public extern int IndexOf(object item);

        public extern int IndexOf(object item, int startIndex);

        public extern void Insert(int index, object item);

        // ICollection c instead of params object[] itmes
        public extern void InsertRange(int index, params object[] items);

        // Join is a Linq method
        public extern string Join();

        public extern string Join(string delimiter);

        public extern int LastIndexOf(object item);

        public extern int LastIndexOf(object item, int fromIndex);
        
        // All the Map and Reduce methods do not belong to this class (mostly Linq methods)
        public extern Array Map(ArrayMapCallback mapCallback);

        public extern Array Map(ArrayItemMapCallback mapItemCallback);
        // ArrayList doesn't Parse strings
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
        // No Shift and Unshift for ArrayList
        public extern object Shift();
        // No Slice and Splice for ArrayList
        public extern Array Slice(int start);

        public extern Array Slice(int start, int end);
        // As already seen, Some is a sort of Linq like method. Not belonging to ArrayList.
        public extern bool Some(ArrayFilterCallback filterCallback);

        public extern bool Some(ArrayItemFilterCallback itemFilterCallback);

        public extern void Sort();

        public extern void Sort(CompareCallback compareCallback);
        // No Slice and Splice for ArrayList
        public extern void Splice(int start, int deleteCount);

        public extern void Splice(int start, int deleteCount, params object[] itemsToInsert);
        // No Shift and Unshift for ArrayList
        public extern void Unshift(params object[] items);

        // All of the following cast operations shouldn't be allowed. 
        // ArrayList provides instead a toArray method ( Array ToArray(Type type) )
        public extern static implicit operator Array(ArrayList list);

        public extern static implicit operator object[](ArrayList list);

        public extern static implicit operator List<object>(ArrayList list);

        public extern static explicit operator ArrayList(object[] array);
    }
}
