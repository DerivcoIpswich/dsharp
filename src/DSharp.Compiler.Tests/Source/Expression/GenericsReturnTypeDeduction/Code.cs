using System.Collections.Generic;

[assembly: ScriptAssembly("test")]

namespace DSharp.Compiler.Tests.Source.Expression.Generics3
{
    public class Program
    {
        public static void Main(string[] args)
        {
            int length = Cast<string>((object)"TEST_STRING").Length;
            int length2 = ToList(new[] { "asd" })[0].Length;
        }

        private static T Cast<T>(object x)
        {
            return (T)x;
        }

        private static System.Collections.Generic.IList<T> ToList<T>(IEnumerable<T> source)
        {
            return null;
        }
    }
}
