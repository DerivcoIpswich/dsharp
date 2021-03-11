using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

using static Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace DSharp.Compiler.Preprocessing.Lowering
{
    public class GenericArgumentRewriter : CSharpSyntaxRewriter, ILowerer
    {
        private static readonly SymbolDisplayFormat displayFormat = new SymbolDisplayFormat(
                    genericsOptions: SymbolDisplayGenericsOptions.IncludeTypeParameters,
                    typeQualificationStyle: SymbolDisplayTypeQualificationStyle.NameAndContainingTypes,
                    miscellaneousOptions: SymbolDisplayMiscellaneousOptions.ExpandNullable | SymbolDisplayMiscellaneousOptions.UseSpecialTypes,
                    extensionMethodStyle: SymbolDisplayExtensionMethodStyle.StaticMethod
                );
        private static readonly SymbolDisplayFormat namespaceUsingsFormat = SymbolDisplayFormat.FullyQualifiedFormat
            .WithGlobalNamespaceStyle(SymbolDisplayGlobalNamespaceStyle.Omitted);

        private SemanticModel semanticModel;
        private HashSet<string> requiredUsings = new HashSet<string>();

        public CompilationUnitSyntax Apply(Compilation compilation, CompilationUnitSyntax root)
        {
            semanticModel = compilation.GetSemanticModel(root.SyntaxTree);

            var newRoot = Visit(root) as CompilationUnitSyntax;
            var missingUsings = requiredUsings.Where(r => !root.Usings.Select(u => u.Name.ToString()).Contains(r));

            if (missingUsings.Any())
            {
                var missingDirectives = missingUsings.Select(s => UsingDirective(ParseName(s).WithLeadingTrivia(Whitespace(" ")))).ToArray();
                missingDirectives[missingDirectives.Length - 1] = missingDirectives.Last().WithTrailingTrivia(EndOfLine(Environment.NewLine));
                newRoot = newRoot.AddUsings(missingDirectives);
            }

            return newRoot;
        }

        public TypeSyntax UseType(ITypeSymbol type)
        {
            AddUsingForType(type);
            return IdentifierName(type.ToDisplayString());
        }

        public override SyntaxNode VisitInvocationExpression(InvocationExpressionSyntax node)
        {
            var symb = Try(() => semanticModel.GetSymbolInfo(node).Symbol as IMethodSymbol, null);
            var newNode = (InvocationExpressionSyntax)base.VisitInvocationExpression(node);

            if (symb != null
                && ShouldWrapInvocation(symb, newNode)
                && symb.IsGenericMethod
                && !symb.ReturnsVoid)
            {
                return ParenthesizedExpression(
                    CastExpression(
                        UseType(symb.ReturnType),
                        newNode.WithoutTrivia()))
                    .WithLeadingTrivia(newNode.GetLeadingTrivia())
                    .WithTrailingTrivia(newNode.GetTrailingTrivia());
            }

            return newNode;
        }

        private bool ShouldWrapInvocation(
            IMethodSymbol symb,
            InvocationExpressionSyntax syntax)
        {
            if (syntax.Parent == null)
            {
                return true;
            }

            return !syntax.Parent.IsKind(SyntaxKind.ReturnStatement)
                && !syntax.Parent.IsKind(SyntaxKind.ExpressionStatement);
        }

        public override SyntaxNode VisitIdentifierName(IdentifierNameSyntax node)
        {
            var symbol = semanticModel.GetSymbolInfo(node).Symbol;

            if (symbol is IMethodSymbol methodSymbol)
            {
                return VisitMethodSymbol(methodSymbol, node);
            }

            return base.VisitIdentifierName(node);
        }

        private SyntaxNode VisitMethodSymbol(IMethodSymbol methodSymbol, IdentifierNameSyntax node)
        {
            if (methodSymbol.Arity != node.Arity)
            {
                //Note: When parsing an aliased type as part of the methods display it will represent it as the non aliased type. As such we need to ensure we add the missing namespaces.
                var symbolName = methodSymbol.ToDisplayString(displayFormat);

                foreach(var typeArgument in methodSymbol.TypeArguments)
                {
                    AddUsingForType(typeArgument);
                }

                AddUsingForType(methodSymbol.ContainingType);
                AddUsingForType(methodSymbol.ReturnType);

                return ParseName(symbolName).WithTriviaFrom(node);
            }

            return base.VisitIdentifierName(node);
        }

        private void AddUsingForType(ITypeSymbol type)
        {
            if(type is IArrayTypeSymbol array)
            {
                AddUsingForType(array.ElementType);
            }

            if (type.ContainingNamespace is INamespaceSymbol ns)
            {
                requiredUsings.Add(ns.ToDisplayString(namespaceUsingsFormat));
            }
        }

        private static T Try<T>(Func<T> action, T defaultValue)
        {
            try { return action(); }
            catch (Exception) { }

            return defaultValue;
        }
    }
}
