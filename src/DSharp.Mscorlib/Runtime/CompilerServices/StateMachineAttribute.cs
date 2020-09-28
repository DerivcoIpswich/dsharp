using System.ComponentModel;

namespace System.Runtime.CompilerServices
{
    [AttributeUsage(AttributeTargets.All, Inherited = true)]
    [EditorBrowsable(EditorBrowsableState.Never)]
    [ScriptIgnore]
    public class StateMachineAttribute : Attribute
    {
        public Type StateMachineType { get; private set; }

        public StateMachineAttribute(Type stateMachineType)
        {
            this.StateMachineType = stateMachineType;
        }
    }
}
