using System.Runtime.CompilerServices;

namespace System.Collections
{
    [ScriptIgnoreNamespace]
    [ScriptImport]
    [ScriptName("Oject")]
    // CLR Reference https://source.dot.net/#System.Private.CoreLib/shared/System/Collections/IDictionary.cs,ea6b36745fa51e08
    // In CLR this is an interface and not a class, therefore no ctors are defined there
    public sealed class Dictionary : IEnumerable //In CLR this gui inherits from ICollection that inherits from IEnumerable
    {
        public Dictionary() { }

        public Dictionary(params object[] nameValuePairs) { }

        public extern int Count { get; } // There's no Count property in the CLR

        public extern string[] Keys { get; } // Instead of string[] it should be ICollection

        // We miss the Values property

        [ScriptField]
        public extern object this[string key] { get; set; } // The Key parameter is object type in CLR

        [DSharpScriptMemberName("clearKeys")]
        public extern void Clear();

        [DSharpScriptMemberName("keyExists")]
        public extern bool ContainsKey(string key); // This method should look like this -> bool Contains(object key);

        // I guess this is an utility to convert a literal to a dictionary. If so, shouldn't this belong
        // to some other place like a DictionaryAbstraction Class?
        public extern static Dictionary GetDictionary(object o); 

        public extern void Remove(string key); // The key should be an object

        extern IEnumerator IEnumerable.GetEnumerator(); // This method should return IDictionaryEnumerator
    }
}
