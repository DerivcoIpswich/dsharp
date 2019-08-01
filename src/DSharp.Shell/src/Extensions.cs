namespace DSharp.Shell.src
{
    public static int Main(string[] args)
    {
        string value = args[0].PadRightC(10, 'F')
            .PadRightC(10, 'F')
            .PadRightC(10, 'F');

        return 0.Increment();
    }

    public static class StringExtensions
    {
        public static string PadRightC(this string str, int times, char value)
        {
            return str + new string(value, times);
        }
    }

    public static class IntExtensions
    {
        public static int Increment(this int source)
        {
            return source.Add(1);
        }
    }

    internal static class InternalIntExtensions
    {
        public static int Add(this int source, int other)
        {
            return source + other;
        }
    }
}
