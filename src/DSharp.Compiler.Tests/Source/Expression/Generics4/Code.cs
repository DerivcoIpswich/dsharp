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

            GenericClass<int> newClass = DoSomethingAwesome<int>(1);
            var success1 = newClass.GetType() == typeof(GenericClass<int>);
            var success2 = newClass.GetType() == newClass.GetType();

            //Nested generic type arguments
            var instance = new GenericClass<GenericClass<int>>(1);
        }

        public interface IBase { }

        public class ImplementsBase : IBase { }

        public static GenericClass<T> DoSomethingAwesome<T>(T value)
        {
            return new GenericClass<T>(value);
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
}
