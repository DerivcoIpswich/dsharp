using System.Collections.Generic;

[assembly: ScriptAssembly("test")]

namespace ExpressionTests
{
    public class App
    {
        public IEnumerable<int> Test(int arg)
        {
            yield break;

            for (int i = 0; i < arg; ++i)
            {
                yield return i;
            }
        }
    }
}
