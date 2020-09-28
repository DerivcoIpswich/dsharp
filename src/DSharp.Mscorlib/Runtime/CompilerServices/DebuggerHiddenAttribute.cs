namespace System.Runtime.CompilerServices
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Property | AttributeTargets.Constructor, Inherited = false)]
    [ScriptIgnore]
    public sealed class DebuggerHiddenAttribute : Attribute
    {
    }
}
