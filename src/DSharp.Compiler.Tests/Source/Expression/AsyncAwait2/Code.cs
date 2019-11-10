using System;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

[assembly: ScriptAssembly("AsyncAwait")]

namespace ExpressionTests
{
    public class TestClass
    {
        public void Test1()
        {
            await DoIt1();
        }

        public void Test2()
        {
            int result = (int)await DoIt1();
        }

        private Promise DoIt1()
        {
            return new Promise(delegate (Action<object> resolved, Action<object> reject)
            {
                resolved(100);
            });
        }
    }

    [ScriptImport]
    [ScriptName("promise")]
    [ScriptIgnoreNamespace]
    public class Promise
    {
        public Promise(Action<Action<object>, Action<object>> promise)
        {
            promise(OnResolved, OnRejected);
        }

        public void Then(Action<object> resolvedCallback, Action<object> rejectCallback)
        {
        }

        public void Catch(Action<object> callback)
        {
        }

        public void Finally(Action callback)
        {
        }

        public TaskAwaiter GetAwaiter()
        {
            return null;
        }

        private void OnResolved(object result)
        {
        }

        private void OnRejected(object reason)
        {
        }
    }
}
