using System.Collections.Generic;

namespace DSharp.Compiler.References
{
    public class ScriptReferenceProvider : IScriptReferenceProvider
    {
        private static readonly ScriptReferenceProvider instance;
        private readonly Dictionary<string, ScriptReference> references;

        public static IScriptReferenceProvider Instance
        {
            get { return instance; }
        }

        static ScriptReferenceProvider()
        {
            instance = new ScriptReferenceProvider();
        }

        public ScriptReferenceProvider()
        {
            references = new Dictionary<string, ScriptReference>();
        }

        public ScriptReference GetReference(string name, string identifier)
        {
            string referenceKey = identifier ?? name;

            if (!references.TryGetValue(referenceKey, out ScriptReference reference))
            {
                reference = new ScriptReference(name, identifier);
                references.Add(referenceKey, reference);
            }

            return reference;
        }
    }
}
