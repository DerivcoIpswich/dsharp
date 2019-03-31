using System.Collections.Generic;
using System.Linq;
using ScriptSharp.ScriptModel;

namespace ScriptSharp.Extensions
{
    public static class TypeSymbolExtensions
    {
        internal static ICollection<InterfaceSymbol> GetInterfaces(this TypeSymbol symbol)
        {
            if (symbol is ClassSymbol classSymbol)
            {
                return classSymbol.Interfaces ?? new InterfaceSymbol[0];
            }

            if (symbol is InterfaceSymbol interfaceSymbol)
            {
                var interfaces = new List<InterfaceSymbol> { interfaceSymbol };

                if (interfaceSymbol.Interfaces != null)
                {
                    interfaces.AddRange(interfaceSymbol.Interfaces);
                }

                return interfaces;
            }

            return null;
        }

        internal static bool IsCollectionType(this TypeSymbol symbol)
        {
            var interfaces = symbol.GetInterfaces();

            if (interfaces == null)
            {
                return false;
            }

            if (interfaces.Any(i => i.FullName.StartsWith("System.Collections") && i.FullGeneratedName == "ICollection"))
            {
                return true;
            }

            return false;
        }
    }
}
