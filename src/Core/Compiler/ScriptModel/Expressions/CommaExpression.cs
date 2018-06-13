// CommaExpression.cs
// Script#/Core/Compiler
// This source code is subject to terms and conditions of the Apache License, Version 2.0.
//

using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace ScriptSharp.ScriptModel {

    internal sealed class CommaExpression : Expression {

        private List<Expression> _expressions;        
      
        public CommaExpression(TypeSymbol typeSymbol)
            : base(ExpressionType.Comma, typeSymbol, SymbolFilter.Locals | SymbolFilter.InstanceMembers) {
            _expressions = new List<Expression>();
        }

        protected override bool IsParenthesisRedundant {
            get {
                return false;
            }
        }

        public List<Expression> Expressions {
            get {
                return _expressions;
            }
        }

        public void AddExpression(Expression expression)
        {
            _expressions.Add(expression);
        }

        public override bool RequiresThisContext {
            get {
                return false;
            }
        }
    }
}
