using System;
using System.Collections.Generic;

namespace DSharp.Shell.src
{
    public class Usages
    {
        public void Use()
        {
            GenericClass<int> genericClass = new GenericClass<int>();
            genericClass.DoSomethingWith<bool>(false, 1);
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

            if(tnewType == oldType)
            {
                return;
            }
        }
    }
}
