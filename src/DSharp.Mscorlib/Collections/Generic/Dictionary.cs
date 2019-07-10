using System.Runtime.CompilerServices;

namespace System.Collections.Generic
{
    /// <summary>
    /// The Dictionary data type which is mapped to the Object type in Javascript.
    /// </summary>
    [ScriptIgnoreNamespace]
    [ScriptImport]
    [ScriptName("Object")]
    // CLR version https://source.dot.net/#System.Private.CoreLib/shared/System/Collections/Generic/IDictionary.cs,20343df0c96b629b,references
    // In CLR this is an interface (IDictionary) therefore no ctors are defined.
    public sealed class Dictionary<TKey, TValue> : IEnumerable<KeyValuePair<TKey, TValue>> // In CLR is inheriting from ICollection<KeyValuePair<TKey, TValue>> where TKey : notnull.
                                                                                           // ICollection<KeyValuePair<TKey, TValue>> inherits from IEnumerable<T>
    {
        public Dictionary() { }

        public Dictionary(params object[] nameValuePairs) { }

        [Obsolete("This is only for use by the c# compiler, and cannot be used for generating script.", /* error */ true)]
        public extern Dictionary(int count);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern int Count { get; }  // There's no Count property on the CLR

        public extern IReadonlyCollection<TKey> Keys { get; }  // Return type should be ICollection<TKey>

        // We are missing the Values property -> ICollection<TValue> Values { get; }

        [ScriptField]
        public extern TValue this[TKey key] { get; set; }

        [Obsolete("This is only for use by the c# compiler, and cannot be used for generating script.", /* error */ true)]
        public extern void Add(TKey key, TValue value);

        [DSharpScriptMemberName("clearKeys")]
        public extern void Clear();

        [DSharpScriptMemberName("keyExists")]
        public extern bool ContainsKey(TKey key);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern static Dictionary<TKey, TValue> GetDictionary(object o);  // There's no GetDictionary in the clr. As per Dictionary: if this is a method to convert a 
                                                                                // js object to a Dictionary, shouldn't GetDictionary belong to a different class?

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator();  // This doesn't exist in CLR

        [Obsolete("Not compliant with .NET standard", error: false)]
        extern IEnumerator IEnumerable.GetEnumerator(); // This doesn't exist in CLR

        public extern bool Remove(TKey key);  // Modified to return bool. Check implementation.

        [Obsolete("This is only for use by the c# compiler, and cannot be used for generating script.", /* error */ true)]
        public extern bool TryGetValue(TKey key, out TValue value);  // In CLR, the out value is decorated with [MaybeNullWhen(false)] attribute. This is used for
                                                                     // nullbale reference types, introduced in C# 8. We don't need to support it. 
                                                                     // TryGetValue should be ok with the current signature.

        // Are we sure we want to be able to cast from Dictionary to Dictionary<T,V> and viceversa? This sounds like js. Maybe move this into
        // a DictionaryUtils wrapper in spinsport or ace.
        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern static implicit operator Dictionary(Dictionary<TKey, TValue> dictionary);

        [Obsolete("Not compliant with .NET standard", error: false)]
        public extern static implicit operator Dictionary<TKey, TValue>(Dictionary dictionary);
    }
}
