using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

using static Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace DSharp.Compiler.Preprocessing.Lowering
{
    public class NamedArgumentsRewriter : CSharpSyntaxRewriter, ILowerer
    {
        private SemanticModel sem;

        public CompilationUnitSyntax Apply(Compilation compilation, CompilationUnitSyntax root)
        {
            sem = compilation.GetSemanticModel(root.SyntaxTree);

            var newRoot = Visit(root) as CompilationUnitSyntax;

            return newRoot;
        }

        public override SyntaxNode VisitArgumentList(ArgumentListSyntax node)
        {
            if (sem.GetSymbolInfo(node.Parent).Symbol is IMethodSymbol methodSymbol)
            {
                if (node.Arguments.Any(a => a.NameColon is NameColonSyntax))
                {
                    var x = methodSymbol.Parameters.Join(node.Arguments, p => p.Name, a => a.NameColon.Name.Identifier.ValueText, (p, a) => a.WithNameColon(null));
                    return node.WithArguments(SeparatedList(x));
                }
            }

            return base.VisitArgumentList(node);
        }
    }
}
