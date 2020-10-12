﻿using System.Runtime.CompilerServices;

namespace System
{
    [ScriptImport]
    public abstract class Enum : ValueType
    {
        [ScriptAlias("ss.Enum.hasFlag")]
        public extern bool HasFlag(Enum flag);

        [DSharpScriptMemberName("Enum.isDefined")]
        public extern static bool IsDefined(Type enumType, object value);

        [DSharpScriptMemberName("Enum.getName")]
        public extern static string GetName(Type enumType, object value);

        [DSharpScriptMemberName("Enum.getNames")]
        public extern static string[] GetNames(Type enumType);

        [DSharpScriptMemberName("Enum.getValues")]
        public extern static Array GetValues(Type enumType);

        [DSharpScriptMemberName("Enum.parse")]
        public extern static object Parse(Type enumType, string value, bool ignoreCase);
    }
}
