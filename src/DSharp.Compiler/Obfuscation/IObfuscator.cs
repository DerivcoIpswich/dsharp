using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace DSharp.Compiler.Obfuscation
{
    public interface IObfuscator
    {
        string Obfuscate(string value);
    }
}
