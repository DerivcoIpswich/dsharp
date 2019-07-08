using System.Collections;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace System
{
    /// <summary>
    /// The Type data type which is mapped to the Function type in Javascript.
    /// </summary>
    [ScriptIgnoreNamespace]
    [ScriptImport]
    public sealed class Type // In CLR it inherits from MemberInfo, IReflect. I guess this is not relevant for our purpose
    {
        [ScriptName("$base")]
        [ScriptField]
        public extern Type BaseType { get; }

        // It should be called FullName
        public extern string Name { get; }

        //TODO: Look at moving out of this class
        [ScriptField]
        // Not part of Type
        public extern Dictionary Prototype { get; }

        [DSharpScriptMemberName("type")]
        public extern static Type GetType(string typeName);

        [DSharpScriptMemberName("canAssign")]
        public extern bool IsAssignableFrom(Type type);

        [DSharpScriptMemberName("isClass")]
        public extern static bool IsClass(Type type);

        [DSharpScriptMemberName("isInterface")]
        public extern static bool IsInterface(Type type);

        [DSharpScriptMemberName("instanceOf")]
        public extern bool IsInstanceOfType(object instance);

        [EditorBrowsable(EditorBrowsableState.Never)]
        // Not part of Type
        public extern static Type GetTypeFromHandle(RuntimeTypeHandle typeHandle);
    }
}
