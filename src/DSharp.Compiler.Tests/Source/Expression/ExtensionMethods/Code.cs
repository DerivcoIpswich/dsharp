﻿using System;
using System.Runtime.CompilerServices;

[assembly: ScriptAssembly("ExpressionTests.ExtensionMethods")]

namespace ExpressionTests
{
    public static class StringExtensions
    {
        public static string PadRightC(this string str, int times, char value)
        {
            return str + new string(value, times);
        }
    }

    public static class IntExtensions
    {
        public static int Increment(this int source)
        {
            return source.Add(1);
        }
    }

    internal static class InternalIntExtensions
    {
        public static int Add(this int source, int other)
        {
            return source + other;
        }
    }

    internal static class IServiceCollectionExtension
    {
        public static IServiceCollection AddSingleton<T>(this IServiceCollection services)
        {

        }

        public static IServiceCollection AddSingletonMany<TBase, TImp>(this IServiceCollection services, int value)
        {

        }
    }

    public interface IServiceCollection
    {
        IServiceCollection AddSpecialSingleton<T>();

        IServiceCollection AddSpecialSingleton2<T>(int value);
    }

    public abstract class ServiceCollection : IServiceCollection
    {
        public IServiceCollection AddSpecialSingleton<T>() { return null; }

        public IServiceCollection AddSpecialSingleton2<T>(int value) { return null; }
    }

    public class MyServiceCollection : ServiceCollection { }

    public class Program
    {
        public static int Main(string[] args)
        {
            string value = "".PadRightC(10, 'F')
                .PadRightC(10, 'F')
                .PadRightC(10, 'F');

            IServiceCollection services = null;
            services.AddSingleton<Temp>();
            services.AddSingletonMany<ITemp, Temp>(1);
            services.AddSpecialSingleton<Temp>();
            services.AddSpecialSingleton2<Temp>(1);

            ServiceCollection serviceColection = null;
            serviceColection.AddSingleton<Temp>();
            serviceColection.AddSingletonMany<ITemp, Temp>(1);
            serviceColection.AddSpecialSingleton<Temp>();
            serviceColection.AddSpecialSingleton2<Temp>(1);

            MyServiceCollection myServiceColection = null;
            myServiceColection.AddSingleton<Temp>();
            myServiceColection.AddSingletonMany<ITemp, Temp>(1);
            myServiceColection.AddSpecialSingleton<Temp>();
            myServiceColection.AddSpecialSingleton2<Temp>(1);

            return 0.Increment();
        }
    }

    public class Temp : ITemp
    {
    }

    public interface ITemp
    {
    }
}
