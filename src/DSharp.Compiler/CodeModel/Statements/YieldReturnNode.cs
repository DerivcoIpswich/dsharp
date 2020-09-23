﻿// YieldReturnNode.cs
// Script#/Core/Compiler
// This source code is subject to terms and conditions of the Apache License, Version 2.0.
//

using DSharp.Compiler.CodeModel.Tokens;

namespace DSharp.Compiler.CodeModel.Statements
{
    internal sealed class YieldReturnNode : StatementNode
    {
        public ParseNode Value { get; }

        public YieldReturnNode(Token token, ParseNode value)
            : base(ParseNodeType.YieldReturn, token)
        {
            this.Value = GetParentedNode(value);
        }
    }
}
