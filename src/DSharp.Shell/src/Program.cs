using System;
using System.Collections.Generic;

namespace DSharp.Shell.src
{
    class Usages
    {
        public void Use()
        {
            Wrapper wrapper = new Wrapper();
            wrapper.Invokee.Invoke<GenericClass<int>>("")
                .DoSomethingWith<GenericClass<IList<GenericClass<ICollection>>>>(true, 0);
        }

        public interface IBase { }

        public class ImplementsBase : IBase { }

        public static GenericClass<T> DoSomethingAwesome<T>(T value)
        {
            return new GenericClass<T>(value);
        }

        public IList<T> ParseTheList<T>(IList<T> what)
        {
            return what;
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

        public void DoSomethingWith<TNew>(TNew n, T o)
        {
            Type tnewType = typeof(TNew);
            Type oldType = typeof(T);

            if (tnewType == oldType)
            {
                return;
            }
        }

        public void Register<TBase, TImplementation>()
            where TImplementation : TBase
        {
            Type baseT = typeof(TBase);
            Type implT = typeof(TImplementation);
        }
    }

    public class Wrapper
    {
        public Invoker Invokee { get; }
    }

    public class Invoker
    {
        public T Invoke<T>(string value)
            where T : class
        {
            return null;
        }
    }
}
