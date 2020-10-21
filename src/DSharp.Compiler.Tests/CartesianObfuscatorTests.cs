using System;
using DSharp.Compiler.Obfuscation;
using Xunit;

namespace DSharp.Compiler.Tests
{
    public class CartesianObfuscatorTests
    {
        [Fact]
        public void GeneratesNames()
        {
            var subject = new CartesianObfuscator("abc");

            Action<string> check = (string v) => Assert.Equal(v, subject.Obfuscate(v));
            check("a");
            check("b");
            check("c");
            check("aa");
            check("ab");
            check("ac");
            check("ba");
            check("bb");
            check("bc");
            check("ca");
            check("cb");
            check("cc");
            check("aaa");
        }
    }
}
