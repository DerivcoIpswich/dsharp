using DSharp.Compiler.CodeModel.Tokens;

namespace DSharp.Compiler.CodeModel.Expressions
{
    internal class AwaitNode : ExpressionNode
    {
        public ParseNode TargetExpression { get; }

        public AwaitNode(Token token, ParseNode targetExpression)
            : base(ParseNodeType.Await, token)
        {
            TargetExpression = targetExpression;
        }
    }
}
