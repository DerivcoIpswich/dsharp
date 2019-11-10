namespace System.Threading.Tasks
{
    public sealed class TaskCompletionSource<TResult>
    {
        public Task<TResult> Task { get; }

        public void SetResult(TResult result)
        {
        }

        public void SetException(Exception ex)
        {
        }

        public bool TrySetResult(TResult result)
        {
            return true;
        }

        public bool TrySetException(Exception ex)
        {
            return true;
        }
    }
}
