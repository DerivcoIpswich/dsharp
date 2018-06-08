// MethodSymbol.cs
// Script#/Core/Compiler
// This source code is subject to terms and conditions of the Apache License, Version 2.0.
//

using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace DSharp.Compiler.ScriptModel.Symbols
{
    internal class MethodSymbol : CodeMemberSymbol
    {
        private SymbolImplementation implementation;
        private string selector;

        public MethodSymbol(string name, TypeSymbol parent, TypeSymbol returnType)
            : this(SymbolType.Method, name, parent, returnType)
        {
        }

        public MethodSymbol(string name, TypeSymbol parent, TypeSymbol returnType, MemberVisibility visibility)
            : this(SymbolType.Method, name, parent, returnType)
        {
            SetVisibility(visibility);
        }

        protected MethodSymbol(SymbolType type, string name, TypeSymbol parent, TypeSymbol returnType)
            : base(type, name, parent, returnType)
        {
        }

        public string Alias { get; private set; }

        public ICollection<string> Conditions { get; private set; }

        public override string DocumentationId
        {
            get
            {
                TypeSymbol parent = (TypeSymbol) Parent;

                StringBuilder sb = new StringBuilder();
                sb.Append("M:");
                sb.Append(parent.Namespace);
                sb.Append(".");
                sb.Append(parent.Name);
                sb.Append(".");
                sb.Append(Name);

                if (Parameters != null)
                {
                    sb.Append("(");

                    for (int i = 0; i < Parameters.Count; i++)
                    {
                        if (i > 0)
                        {
                            sb.Append(",");
                        }

                        sb.Append(Parameters[i].DocumentationId);
                    }

                    sb.Append(")");
                }

                return sb.ToString();
            }
        }

        public ICollection<GenericParameterSymbol> GenericArguments { get; private set; }

        public bool HasSelector => selector != null;

        public SymbolImplementation Implementation
        {
            get
            {
                Debug.Assert(implementation != null);

                return implementation;
            }
        }

        public bool IsAliased => string.IsNullOrEmpty(Alias) == false;

        public bool IsExtension
        {
            get
            {
                if (Parent.Type == SymbolType.Class)
                {
                    return ((ClassSymbol) Parent).IsExtenderClass;
                }

                return false;
            }
        }

        public bool IsGeneric => GenericArguments != null &&
                                 GenericArguments.Count != 0;

        public string Selector
        {
            get
            {
                Debug.Assert(selector != null);

                return selector;
            }
        }

        public bool SkipGeneration { get; private set; }

        public void AddGenericArguments(ICollection<GenericParameterSymbol> genericArguments)
        {
            Debug.Assert(GenericArguments == null);
            Debug.Assert(genericArguments != null);
            Debug.Assert(genericArguments.Count != 0);

            GenericArguments = genericArguments;
        }

        public void AddImplementation(SymbolImplementation implementation)
        {
            Debug.Assert(this.implementation == null);
            Debug.Assert(implementation != null);

            this.implementation = implementation;
        }

        public bool MatchesConditions(ICollection<string> defines)
        {
            if (Conditions == null)
            {
                return true;
            }

            foreach (string condition in Conditions)
                if (defines.Contains(condition))
                {
                    return true;
                }

            return false;
        }

        public void SetAlias(string alias)
        {
            Debug.Assert(Alias == null);
            Debug.Assert(string.IsNullOrEmpty(alias) == false);

            Alias = alias;
            SetTransformedName(alias);
        }

        public void SetConditions(ICollection<string> conditions)
        {
            Debug.Assert(Conditions == null);
            Debug.Assert(conditions != null);

            Conditions = conditions;
        }

        public void SetSelector(string selector)
        {
            Debug.Assert(this.selector == null);
            Debug.Assert(string.IsNullOrEmpty(selector) == false);

            this.selector = selector;
        }

        public void SetSkipGeneration()
        {
            Debug.Assert(SkipGeneration == false);
            SkipGeneration = true;
        }
    }
}