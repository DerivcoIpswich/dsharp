using System;
using System.Collections.Generic;

namespace DSharp.Shell.src
{
    public class Usages
    {
        public void Use()
        {
            GenericClass<SimpleWrap> genericClass = new GenericClass<SimpleWrap>(new SimpleWrap());
            Type actualType = genericClass.Type;

            IExpected<SimpleWrap> expectedWrap = new ClassWithGenericMethods().IsExpected(genericClass.Value);
            Type expectedType = genericClass.Type;

            bool shouldBeTrue = actualType == expectedType;
            bool shouldBeFalse = typeof(GenericClass<bool>) == genericClass.GetType();

            IBulkAsyncExecutionManager<string> bulkAsyncExecutionManager = new BulkAsyncExecutionManager<string>(
                delegate (string str, Action success, Action error) { },
                delegate { },
                delegate { });

            bulkAsyncExecutionManager.AddExecutionKeys(new string[] { "1", "2" });
            bulkAsyncExecutionManager.StartExecution();
        }
    }

    public class GenericClass<T>
    {
        private readonly T value;

        public T Value
        {
            get { return value; }
        }

        public Type Type
        {
            get { return typeof(T); }
        }

        public GenericClass(T value)
        {
            this.value = value;
        }
    }

    public class ClassWithGenericMethods
    {
        public IExpected<T> IsExpected<T>(T val)
            where T : class, new()
        {
            return new Expected(val);
        }
    }

    public interface IExpected<T>
        where T : class, new()
    {
        T Value { get; }

        bool IsValid { get; }

        Type Type { get; }
    }

    public class Expected : IExpected<T>
        where T : class, new()
    {
        T Value { get; }

        bool IsSimpleWrap { get; }

        Type Type { get; }

        public Expected(T value)
        {
            Value = value;
            IsSimpleWrap = typeof(T) == typeof(SimpleWrap);
            Type = typeof(T);
        }
    }

    public class SimpleWrap
    {
        public bool Consume { get; set; }
    }

    public class BulkAsyncExecutionManager<T> : IBulkAsyncExecutionManager<T>
    {
        private readonly List<T> outstandingExecutionKeys;
        private readonly List<T> executionKeys;
        private readonly Action<T, Action, Action> operationToExecute;
        private readonly Action onExecutionSuccesful;
        private readonly Action onExecutionFailed;
        private bool executionStarted;
        private bool executionFailed;

        public BulkAsyncExecutionManager(
            Action<T, Action, Action> operationToExecute,
            Action onExecutionSuccesful,
            Action onExecutionFailed)
        {
            this.operationToExecute = operationToExecute;
            this.onExecutionSuccesful = onExecutionSuccesful;
            this.onExecutionFailed = onExecutionFailed;

            outstandingExecutionKeys = new List<T>();
            executionKeys = new List<T>();
        }

        public void AddExecutionKey(T executionKey)
        {
            if (executionKeys.Contains(executionKey) || executionStarted)
            {
                return;
            }

            executionKeys.Add(executionKey);
            outstandingExecutionKeys.Add(executionKey);
        }

        public void AddExecutionKeys(IEnumerable<T> executionKeys)
        {
            if (executionKeys == null || executionStarted)
            {
                return;
            }

            foreach (T executionKey in executionKeys)
            {
                AddExecutionKey(executionKey);
            }
        }

        public void StartExecution()
        {
            if (executionStarted)
            {
                return;
            }

            executionStarted = true;

            for (int i = 0; i < executionKeys.Count && !executionFailed; ++i)
            {
                T executionKey = executionKeys[i];
                operationToExecute(
                    executionKey,
                    GetSuccesfulExecutionDelegate(executionKey),
                    TrySignalExecutionFailed);
            }
        }

        private Action GetSuccesfulExecutionDelegate(T executionKey)
        {
            return delegate ()
            {
                outstandingExecutionKeys.Remove(executionKey);
                TrySignalExecutionSuccessful();
            };
        }

        private void TrySignalExecutionFailed()
        {
            if (executionFailed)
            {
                return;
            }

            executionFailed = true;
            onExecutionFailed();
        }

        private void TrySignalExecutionSuccessful()
        {
            if (outstandingExecutionKeys.Count > 0
                || executionFailed)
            {
                return;
            }

            onExecutionSuccesful();
        }
    }

    public interface IBulkAsyncExecutionManager<T>
    {
        void AddExecutionKey(T executionKey);

        void AddExecutionKeys(IEnumerable<T> executionKeys);

        void StartExecution();
    }
}
