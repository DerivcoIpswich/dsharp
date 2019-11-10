using System.Runtime.CompilerServices;

namespace System.Threading.Tasks
{
    [ScriptImport]
    [ScriptName("promise")]
    [ScriptIgnoreNamespace]
    public sealed class Task
    {
        public TaskAwaiter GetAwaiter()
        {
            return null;
        }
    }

    [ScriptImport]
    [ScriptName("promise")]
    [ScriptIgnoreNamespace]
    public sealed class Task<TResult>
    {
        public TaskAwaiter<TResult> GetAwaiter()
        {
            return null;
        }
    }
}
