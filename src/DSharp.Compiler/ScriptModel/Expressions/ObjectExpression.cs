using System.Collections.Generic;
using DSharp.Compiler.ScriptModel.Symbols;

namespace DSharp.Compiler.ScriptModel.Expressions
{
    internal class ObjectExpression : Expression
    {
        private readonly Dictionary<string, Expression> properties;

        public IReadOnlyDictionary<string, Expression> Properties => properties;

        public ObjectExpression(TypeSymbol evaluatedType, IDictionary<string, Expression> properties)
            : base(ExpressionType.Object, evaluatedType, SymbolFilter.AllTypes)
        {
            this.properties = new Dictionary<string, Expression>(properties);
        }
    }
}
