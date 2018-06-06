﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace DSharp.Compiler.TestFramework
{
    public static class CompilationUnitResultExtensions
    {
        public static string WriteErrors(this ICompilationUnitResult compilationUnitResult)
        {
            IEnumerable<string> messages = compilationUnitResult.Errors?
                .Select(err => err.Message)
                .Where(message => !string.IsNullOrWhiteSpace(message)) ?? Array.Empty<string>();
            string errorList = string.Join(", ", messages);
            return $"Compilation Errors: {errorList}";
        }
    }
}
