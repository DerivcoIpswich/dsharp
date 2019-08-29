using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using DSharp.Compiler.ScriptModel.Symbols;
using DSharp.Compiler.ScriptModel.Expressions;
using System.Text;

namespace DSharp.Compiler.Generator
{
    //TODO: Make this class work with the current expression generation mechanism.
    internal static class ScriptTextWriterExtensions
    {
        public static ScriptGenerator GenerateGenericTypeArguments(this ScriptGenerator generator, IList<TypeSymbol> typeArguments, IList<GenericParameterSymbol> typeParameters)
        {
            ScriptTextWriter writer = generator.Writer;

            if (typeArguments.Count == 0 || typeArguments.Count != typeParameters.Count)
            {
                Debug.Fail($"Unable to generate generic type map as the arguments don't match the parameters");
                return generator;
            }

            GenerateGenericTypeArguments(writer.Write, typeArguments, typeParameters);

            return generator;
        }

        private static void GenerateObject(Action<string> writeFunc, IDictionary<string, string> properties)
        {
            writeFunc("{");
            foreach (var property in properties)
            {
                writeFunc($"{property.Key} : {property.Value}");
            }
            writeFunc("}");
        }

        private static void GenerateGenericTypeArguments(Action<string> write, IList<TypeSymbol> typeArguments, IList<GenericParameterSymbol> typeParameters)
        {
            var dictionary = new Dictionary<string, string>();
            for (int i = 0; i < typeArguments.Count; i++)
            {
                var typeArgument = typeArguments[i];
                var typeParameter = typeParameters[i];

                var typeExpression = CreateTypeArgumentName(typeArgument);
                dictionary.Add(typeParameter.FullName, typeExpression);
            }

            GenerateObject(write, dictionary);
        }

        private static string CreateTypeArgumentName(TypeSymbol typeArgument)
        {
            if(typeArgument is GenericParameterSymbol)
            {
                return $"{DSharpStringResources.GeneratedScript.GENERIC_ARGS_PARAMETER_NAME}['{typeArgument.FullGeneratedName}']";
            }

            if(typeArgument.IsGeneric)
            {
                StringBuilder stringBuilder = new StringBuilder();

                //Local method to recursively write the string.
                void Write(string value) => stringBuilder.Append(value);

                stringBuilder.Append(DSharpStringResources.ScriptExportMember("getGenericConstructor"));
                stringBuilder.Append("(");
                stringBuilder.Append(typeArgument.FullGeneratedName);
                stringBuilder.Append(", ");
                GenerateGenericTypeArguments(Write, typeArgument.GenericArguments, typeArgument.GenericParameters);
                stringBuilder.Append(")");
                return stringBuilder.ToString();
            }

            return typeArgument.FullGeneratedName;
        }
    }
}
