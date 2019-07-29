using System;

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
}
