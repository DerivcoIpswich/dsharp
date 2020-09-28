using System.ComponentModel;

namespace System.Runtime.CompilerServices
{
    [AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]
    [EditorBrowsable(EditorBrowsableState.Never)]
    [ScriptIgnore]
    public sealed class IteratorStateMachineAttribute : StateMachineAttribute
    {
        public IteratorStateMachineAttribute(Type stateMachineType)
            :base(stateMachineType)
        {
        }
    }
}
