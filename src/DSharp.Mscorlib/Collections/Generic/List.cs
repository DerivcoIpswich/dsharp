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
    // CLR Reference https://source.dot.net/#System.Private.CoreLib/shared/System/Collections/Generic/List.cs,cf7f4095e4de7646,references
    public sealed class List<T> : ICollection<T> /*IList<T>, IList, IReadOnlyList<T>*/ //NOTE: IList<T> inherits from ICollection<T>
    {
        public List()
        {
        }

        public List(int capacity)
        {
        }

        public List(params T[] items) /*items type should be IEnumerable<T> and not params T*/
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
        public extern void AddRange(params T[] items); /*items type should be IEnumerable<T> and not params T*/

        public extern void Clear();

        //This method does not exist in CLR List
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern List<T> Concat(params T[] objects);

        public extern bool Contains(T item);

        //This method does not exist in CLR List
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern bool Every(ListFilterCallback<T> filterCallback);

        //This method does not exist in CLR List
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern bool Every(ListItemFilterCallback<T> itemFilterCallback);

        //This method does not exist in CLR List
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern List<T> Filter(ListFilterCallback<T> filterCallback);

        //This method does not exist in CLR List
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern List<T> Filter(ListItemFilterCallback<T> itemFilterCallback);

        //In CLR we just have a single ForEach method that takes Action<T> as parameter
        public extern void ForEach(ListCallback<T> callback);

        public extern void ForEach(ListItemCallback<T> itemCallback);

        //GetEnumerator in CLR is implemented like this: 
        //public Enumerator GetEnumerator()
        //    => new Enumerator(this);

        //IEnumerator<T> IEnumerable<T>.GetEnumerator()
        //    => new Enumerator(this);

        //IEnumerator IEnumerable.GetEnumerator()
        //    => new Enumerator(this);
        public extern IEnumerator<T> GetEnumerator();

        extern IEnumerator IEnumerable.GetEnumerator();

        //This method doesn't exist in the CLR
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern List<T> GetRange(int index);

        public extern List<T> GetRange(int index, int count);

        public extern int IndexOf(T item);

        public extern int IndexOf(T item, int startIndex);

        //In CLR we also have this signature -> IndexOf(T item, int index, int count)

        public extern void Insert(int index, T item);

        //Instead of params T[] it should be -> IEnumerable<T> collection
        public extern void InsertRange(int index, params T[] items);

        //This doesn't exist in CLR
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern string Join();

        //This doesn't exist in CLR
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern string Join(string delimiter);

        // arg should be -> T item
        public extern int LastIndexOf(object item);
        
        // arg should be -> T item
        public extern int LastIndexOf(object item, int fromIndex);

        // In CLR we have an additional LastIndexOf method -> public int LastIndexOf(T item, int index, int count)

        // There's no Map method in CLR
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern List<TTarget> Map<TTarget>(ListMapCallback<T, TTarget> mapCallback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern List<TTarget> Map<TTarget>(ListItemMapCallback<T, TTarget> mapItemCallback);

        // There's not Parse in CLR
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern static List<T> Parse(string s);

        // There's no Reduce methods in CLR
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern TReduced Reduce<TReduced>(ListReduceCallback<TReduced, T> callback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern TReduced Reduce<TReduced>(ListReduceCallback<TReduced, T> callback, TReduced initialValue);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern TReduced Reduce<TReduced>(ListItemReduceCallback<TReduced, T> callback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern TReduced Reduce<TReduced>(ListItemReduceCallback<TReduced, T> callback, TReduced initialValue);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern TReduced ReduceRight<TReduced>(ListReduceCallback<TReduced, T> callback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern TReduced ReduceRight<TReduced>(ListReduceCallback<TReduced, T> callback, TReduced initialValue);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern TReduced ReduceRight<TReduced>(ListItemReduceCallback<TReduced, T> callback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern TReduced ReduceRight<TReduced>(ListItemReduceCallback<TReduced, T> callback, TReduced initialValue);

        [DSharpScriptMemberName("remove")]
        public extern bool Remove(T item);

        public extern void RemoveAt(int index);

        // Modified to return void. Check implementation
        public extern void RemoveRange(int index, int count);

        public extern void Reverse();

        // There's an additional Reverse method in CLR -> public void Reverse(int index, int count)

        // There's no Slice methods in CLR
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern List<T> Slice(int start);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern List<T> Slice(int start, int end);

        // There's no Some methods in CLR
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern bool Some(ListFilterCallback<T> filterCallback);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern bool Some(ListItemFilterCallback<T> itemFilterCallback);

        public extern void Sort();

        // The compare callback should be instead -> IComparer<T>? comparer
        public extern void Sort(CompareCallback<T> compareCallback);

        // There are additional Sort methods in CLR

        // There's no Splice methods in CLR
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern void Splice(int start, int deleteCount);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern void Splice(int start, int deleteCount, params T[] itemsToInsert);

        // There's no Unshift methods in CLR
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern void Unshift(params T[] items);

        [ScriptSkip]
        public extern T[] ToArray();

        public extern static explicit operator Array(List<T> list);

        public extern static explicit operator object[] (List<T> list);

        public extern static implicit operator T[] (List<T> list);

        public extern static explicit operator ArrayList(List<T> list);

        public extern static explicit operator List<T>(T[] array);

        // NOTE: considering the amount of not-CLR methods we have in this class, is it worth to have a different class, 
        // inheriting from this, to support and isolate all of the not-CLR functionalities ? ListUtils?
    }
}
