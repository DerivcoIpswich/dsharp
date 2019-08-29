using System;
using System.Collections.Generic;

[assembly: ScriptAssembly("test")]

namespace TypeTests
{
    public class Usages
    {
        public void Use()
        {
            GenericClass<int> genericClass = new GenericClass<int>(1);
            genericClass.DoSomethingWith<bool>(false, 1);
            genericClass.Register<IBase, ImplementsBase>();
        }

        public interface IBase { }

        public class ImplementsBase : IBase { }
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
}
