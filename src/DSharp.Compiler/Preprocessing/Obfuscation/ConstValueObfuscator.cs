using System;
using System.Linq;
using DSharp.Compiler.Obfuscation;
using DSharp.Compiler.Preprocessing.Lowering;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

using static Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace DSharp.Compiler.Preprocessing.Obfuscation
{
    public class ConstValueObfuscator : CSharpSyntaxRewriter, ILowerer
    {
        private SemanticModel sem;
        private readonly IObfuscator obfuscator;

        public ConstValueObfuscator(IObfuscator obfuscator)
        {
            this.obfuscator = obfuscator;
        }

        public CompilationUnitSyntax Apply(Compilation compilation, CompilationUnitSyntax root)
        {
            sem = compilation.GetSemanticModel(root.SyntaxTree);
            return Visit(root) as CompilationUnitSyntax;
        }

        public override SyntaxNode VisitVariableDeclarator(VariableDeclaratorSyntax node)
        {
            var symbol = sem.GetDeclaredSymbol(node) as IFieldSymbol;

            if (IsObfuscationCandidate(symbol))
            {
                var name = obfuscator.Obfuscate(symbol.ConstantValue as string);
                return node.WithInitializer(
                    node.Initializer.WithValue(
                        LiteralExpression(SyntaxKind.StringLiteralExpression, Literal(name))
                    )
                );
            }

            return base.VisitVariableDeclarator(node);
        }

        private bool IsObfuscationCandidate(IFieldSymbol symbol)
        => symbol is IFieldSymbol 
            && symbol.IsConst 
            && symbol.HasConstantValue 
            && symbol.Type.SpecialType == SpecialType.System_String
            && (symbol.GetAttributes().Any(a => a.AttributeClass.Name == "ObfuscateValuesAttribute") 
                || symbol.ContainingType.GetAttributes().Any(a => a.AttributeClass.Name == "ObfuscateValuesAttribute")
            );
    }
}
