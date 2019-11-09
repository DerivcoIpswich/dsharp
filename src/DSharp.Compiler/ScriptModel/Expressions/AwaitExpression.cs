namespace DSharp.Compiler.ScriptModel.Expressions
{
    internal class AwaitExpression : Expression
    {
        public Expression TargetExpression { get; }

        public AwaitExpression(Expression targetExpression)
            : base(ExpressionType.Await, targetExpression.EvaluatedType, targetExpression.MemberMask)
        {
            TargetExpression = targetExpression;
        }
    }
}
