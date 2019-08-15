using System.Runtime.CompilerServices;

namespace System
{
    [ScriptIgnoreNamespace]
    [ScriptImport]
    [ScriptName("console")]
    public static class Console
    {
        [ScriptName("debug")]
        public extern static void WriteLine(string message);
    }
}
