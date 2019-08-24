﻿// NameNode.cs
// Script#/Core/Compiler
// This source code is subject to terms and conditions of the Apache License, Version 2.0.
//

using System.Text;
using DSharp.Compiler.CodeModel.Tokens;

namespace DSharp.Compiler.CodeModel.Names
{
    internal abstract class NameNode : ParseNode
    {
        private string name;

        protected NameNode(ParseNodeType nodeType, Token token)
            : base(nodeType, token)
        {
        }

        protected abstract ParseNodeList List { get; }

        public string Name
        {
            get
            {
                if (name != null)
                {
                    return name;
                }

                if(this is UnresolvedVarNameNode)
                {
                    return null;
                }

                StringBuilder sb = new StringBuilder();

                foreach (ParseNode parseNode in List)
                {
                    AtomicNameNode symbolNode = (AtomicNameNode) parseNode;

                    if (sb.Length != 0)
                    {
                        sb.Append('.');
                    }

                    sb.Append(symbolNode.Identifier);
                }

                name = sb.ToString();

                return name;
            }
        }
    }
}
