using System.Runtime.CompilerServices;

namespace System.Threading.Tasks
{
    public sealed class TaskAwaiter : INotifyCompletion
    {
        public bool IsCompleted { get; }

        public void OnCompleted(Action continuation)
        {
        }

        public void GetResult()
        {
        }
    }

    public sealed class TaskAwaiter<TResult> : INotifyCompletion
    {
        public bool IsCompleted { get; }

        public void OnCompleted(Action continuation)
        {
        }

        public TResult GetResult()
        {
            return default(TResult);
        }
    }
}
