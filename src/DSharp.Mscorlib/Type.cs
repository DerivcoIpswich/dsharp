using System.Collections;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace System
{
    /// <summary>
    /// The Type data type which is mapped to the Function type in Javascript.
    /// </summary>
    // CLR reference https://source.dot.net/#System.Private.CoreLib/shared/System/Type.cs,3d00eeab9feb80f3
    [ScriptIgnoreNamespace]
    [ScriptImport]
    public sealed class Type // In CLR it inherits from MemberInfo, IReflect. I guess this is not relevant for our purpose
    {
        [ScriptName("$base")]
        [ScriptField]
        public extern Type BaseType { get; }

        // This has been changed from Name to FullName, we need to adjust the usage
        public extern string FullName { get; }

        //TODO: Look at moving out of this class
        [ScriptField]
        // Not part of Type
        [Obsolete("Not compliant with .NET standard", error: false)]
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
        public extern static Type GetTypeFromHandle(RuntimeTypeHandle typeHandle);
    }
}
