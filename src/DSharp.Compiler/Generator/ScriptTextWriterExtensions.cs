using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using DSharp.Compiler.ScriptModel.Symbols;

namespace DSharp.Compiler.Generator
{
    internal static class ScriptTextWriterExtensions
    {
        public static ScriptTextWriter GenerateGenericTypeArguments(this ScriptTextWriter writer, IList<TypeSymbol> typeArguments, IList<GenericParameterSymbol> typeParameters)
        {
            if (typeArguments.Count == 0 || typeArguments.Count != typeParameters.Count)
            {
                Debug.Fail($"Unable to generate generic type map as the arguments don't match the parameters");
                return writer;
            }

            var dictionary = new Dictionary<string, string>();
            for (int i = 0; i < typeArguments.Count; i++)
            {
                var typeArgument = typeArguments[i];
                var typeParameter = typeParameters[i];

                var typeArgumentName = typeArgument is GenericParameterSymbol
                    ? $"{DSharpStringResources.GeneratedScript.GENERIC_ARGS_PARAMETER_NAME}['{typeArgument.FullGeneratedName}']"
                    : typeArgument.FullGeneratedName;
                dictionary.Add(typeParameter.FullName, typeArgumentName);
            }

            writer.GenerateObject(dictionary);

            return writer;
        }

        public static ScriptTextWriter GenerateObject(this ScriptTextWriter writer, IDictionary<string, string> properties, JSLineFormatting formatting = JSLineFormatting.Consise)
        {
            Action<string> writeFunc = formatting == JSLineFormatting.Consise
                ? writer.Write
                : (Action<string>)writer.WriteLine;
            writeFunc("{");
            foreach (var property in properties)
            {
                writeFunc($"{property.Key} : {property.Value}");
            }
            writeFunc("}");

            return writer;
        }
    }

    public enum JSLineFormatting
    {
        Consise = 0,
        Expanded = 1
    }
}
