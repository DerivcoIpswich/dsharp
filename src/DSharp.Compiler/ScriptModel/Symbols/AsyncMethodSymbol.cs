namespace DSharp.Compiler.ScriptModel.Symbols
{
    internal class AsyncMethodSymbol : MethodSymbol
    {
        public AsyncMethodSymbol(string name, TypeSymbol parent, TypeSymbol returnType, bool isExtensionMethod = false)
            : base(SymbolType.Method, name, parent, returnType, isExtensionMethod)
        {
        }
    }
}
