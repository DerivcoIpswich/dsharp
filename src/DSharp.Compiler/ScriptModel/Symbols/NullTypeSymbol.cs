namespace DSharp.Compiler.ScriptModel.Symbols
{
    internal class NullTypeSymbol : TypeSymbol
    {
        public NullTypeSymbol()
            : base(SymbolType.Namespace, "", new NamespaceSymbol("", new SymbolSet()))
        {
        }
    }
}
