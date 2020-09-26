namespace System
{
    public static class Environment
    {
        public static int CurrentManagedThreadId
        {
            get { throw new NotSupportedException(); }
        }
    }
}
