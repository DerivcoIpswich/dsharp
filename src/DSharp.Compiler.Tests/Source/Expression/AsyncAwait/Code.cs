using System;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

[assembly: ScriptAssembly("test")]

namespace ExpressionTests
{
    public class ResultClass
    {
        private Task<int> test;

        public Task<int> Task1
        {
            get { return test; }
        }
    }

    public class TestClass
    {
        public async Task<int> Test()
        {
            int r1 = await DoIt();
            ResultClass r2 = await DoIt2();

            int r3 = (await DoIt());
            ResultClass r4 = (await DoIt2());
           
            int r5 = await (DoIt());
            ResultClass r6 = await (DoIt2());
          
            string r13 = (await DoIt()).ToString();
           
            return 1;
        }

        public Task<int> DoIt()
        {
            return null;
        }

        public Task<ResultClass> DoIt2()
        {
            return null;
        }
    }
}
