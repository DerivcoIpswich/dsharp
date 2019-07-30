using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DSharp.Shell.src
{
    public class Lambda
    {
        public void Process()
        {
            var singleLineActionLambda = new Action(DoSomeWork);
            var multiLineActionStatementLambda = new Action(() =>
            {
                DoSomeWork(null);
            });
            var singleLineActionLambdaWithProperty = new Action<string>(str => DoSomeWork(str));
            var singleLineFuncLambdaWithProperty = new Func<string>(str => DoSomeWork(str));

            var functionNoType = str => DoSomeWork(str);
            var functionNoTypeWithStatement = str =>
            {
                DoSomeWork(str);
            };
            var functionNoTypeWithPropertyType = (string str) => DoSomeWork(str);
            var functionNoTypeWithPropertyTypeWithStatement = (string str) =>
            {
                DoSomeWork(str);
            };

            DoSomeWorkWithLambda((str, obj) =>
            {
                return str + obj.ToString();
            });

            DoSomeWorkWithLambda((str, obj) => str + obj.ToString());
        }

        public string DoSomeWork(string data)
        {

        }

        public string DoSomeWorkWithLambda(Func<string, object, string> func)
        {
            return func.Invoke("", new object());
        }
    }
}
