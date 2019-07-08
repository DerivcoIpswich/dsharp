using System.ComponentModel;
using System.Globalization;
using System.Runtime.CompilerServices;

namespace System
{
    /// <summary>
    /// Equivalent to the String type in Javascript.
    /// </summary>
    // CLR reference https://source.dot.net/#System.Private.CoreLib/shared/System/String.cs,8281103e6f23cb5c
    [ScriptIgnoreNamespace]
    [ScriptImport]
    // CLR reference: https://source.dot.net/#q=String
    public sealed class String 
        /* String implements these interfaces: IComparable, IEnumerable, IConvertible, IEnumerable<char>, IComparable<string?>
#nullable disable
        IEquatable<string>,
#nullable restore
        ICloneable */
    {
        /// <summary>
        /// An empty zero-length string.
        /// </summary>
        public static readonly string Empty = "";

        /// <summary>
        /// The number of characters in the string.
        /// </summary>
        [ScriptField]
        public extern int Length { get; }

        /// <summary>
        /// Retrieves the character at the specified position.
        /// </summary>
        /// <param name="index">The specified 0-based position.</param>
        /// <returns>The character within the string.</returns>
        [ScriptField]
        public extern char this[int index] { get; }

        /// <summary>
        /// Retrieves the character at the specified position.
        /// </summary>
        /// <param name="index">The specified 0-based position.</param>
        /// <returns>The character within the string.</returns>
        public extern char CharAt(int index);  //This is not part of the CLR

        /// <summary>
        /// Retrieves the character code of the character at the specified position.
        /// </summary>
        /// <param name="index">The specified 0-based position.</param>
        /// <returns>The character code of the character within the string.</returns>
        public extern int CharCodeAt(int index);  //This is not part of the CLR

        [DSharpScriptMemberName("compareStrings")]
        public extern static int Compare(string s1, string s2);

        [DSharpScriptMemberName("compareStrings")]
        public extern static int Compare(string s1, string s2, bool ignoreCase);

        [DSharpScriptMemberName("string")]
        public extern static string Concat(string s1, string s2);

        [DSharpScriptMemberName("string")]
        public extern static string Concat(string s1, string s2, string s3);

        [DSharpScriptMemberName("string")]
        public extern static string Concat(string s1, string s2, string s3, string s4);

        /// <summary>
        /// Concatenates a set of individual strings into a single string.
        /// </summary>
        /// <param name="strings">The sequence of strings</param>
        /// <returns>The concatenated string.</returns>
        [DSharpScriptMemberName("string")]
        public extern static string Concat(params string[] strings);

        [EditorBrowsable(EditorBrowsableState.Never)]
        [DSharpScriptMemberName("string")]
        public extern static string Concat(object o1, object o2);

        [EditorBrowsable(EditorBrowsableState.Never)]
        [DSharpScriptMemberName("string")]
        public extern static string Concat(object o1, object o2, object o3);

        [EditorBrowsable(EditorBrowsableState.Never)]
        [DSharpScriptMemberName("string")]
        public extern static string Concat(object o1, object o2, object o3, object o4);

        [EditorBrowsable(EditorBrowsableState.Never)]
        [DSharpScriptMemberName("string")]
        public extern static string Concat(params object[] o);

        /// <summary>
        /// Returns the unencoded version of a complete encoded URI.
        /// </summary>
        /// <returns>The unencoded string.</returns>
        [ScriptAlias("decodeURI")]
        // this is not part of CLR. Should this go into an abstraction?
        public extern string DecodeUri();

        /// <summary>
        /// Returns the unencoded version of a single part or component of an encoded URI.
        /// </summary>
        /// <returns>The unencoded string.</returns>
        [ScriptAlias("decodeURIComponent")]
        // this is not part of CLR. Should this go into an abstraction?
        public extern string DecodeUriComponent();

        /// <summary>
        /// Encodes the complete URI.
        /// </summary>
        /// <returns>The encoded string.</returns>
        [ScriptAlias("encodeURI")]
        // this is not part of CLR. Should this go into an abstraction?
        public extern string EncodeUri();

        /// <summary>
        /// Encodes a single part or component of a URI.
        /// </summary>
        /// <returns>The encoded string.</returns>
        [ScriptAlias("encodeURIComponent")]
        // this is not part of CLR. Should this go into an abstraction?
        public extern string EncodeUriComponent();

        /// <summary>
        /// Determines if the string ends with the specified character.
        /// </summary>
        /// <param name="ch">The character to test for.</param>
        /// <returns>true if the string ends with the character; false otherwise.</returns>
        [DSharpScriptMemberName("endsWith")]
        public extern bool EndsWith(char ch);

        /// <summary>
        /// Determines if the string ends with the specified substring or suffix.
        /// </summary>
        /// <param name="suffix">The string to test for.</param>
        /// <returns>true if the string ends with the suffix; false otherwise.</returns>
        [DSharpScriptMemberName("endsWith")]
        public extern bool EndsWith(string suffix);

        /// <summary>
        /// Encodes a string by replacing punctuation, spaces etc. with their escaped equivalents.
        /// </summary>
        /// <returns>The escaped string.</returns>
        [ScriptAlias("escape")]
        // this is not part of CLR. Should this go into an abstraction?
        public extern string Escape();

        [DSharpScriptMemberName("format")]
        public extern static string Format(string format, params object[] values);

        [DSharpScriptMemberName("format")]
        // The CLR signature most similar to this is:  Format(IFormatProvider? provider, string format, params object?[] args)
        public extern static string Format(CultureInfo culture, string format, params object[] values);

        [DSharpScriptMemberName("string")]
        // this is not part of CLR. Should this go into an abstraction?
        public extern static string FromChar(char ch, int count);

        // this is not part of CLR. Should this go into an abstraction?
        public extern static string FromCharCode(int charCode);

        // this is not part of CLR. Should this go into an abstraction?
        public extern static string FromCharCode(params int[] charCodes);

        // This doesn't exist in CLR
        public extern int IndexOf(char ch);

        public extern int IndexOf(string subString);

        // This doesn't exist in CLR
        public extern int IndexOf(char ch, int startIndex);

        public extern int IndexOf(string subString, int startIndex);

        [DSharpScriptMemberName("insertString")]
        public extern string Insert(int index, string value);

        // this is not part of CLR. Should this go into an abstraction?
        [DSharpScriptMemberName("emptyString")]
        public extern static bool IsNullOrEmpty(string s);

        [DSharpScriptMemberName("whitespace")]
        // this is not part of CLR. Should this go into an abstraction?
        public extern static bool IsNullOrWhiteSpace(string s);

        public extern int LastIndexOf(Char ch);
        
        // This doesn't exist in CLR
        public extern int LastIndexOf(string subString);

        public extern int LastIndexOf(char ch, int startIndex);
        
        // This doesn't exist in CLR
        public extern int LastIndexOf(string subString, int startIndex);

        // this is not part of CLR. Should this go into an abstraction?
        public extern string[] Match(RegExp regex);

        [DSharpScriptMemberName("padLeft")]
        public extern string PadLeft(int totalWidth);

        [DSharpScriptMemberName("padLeft")]
        public extern string PadLeft(int totalWidth, char ch);

        [DSharpScriptMemberName("padRight")]
        public extern string PadRight(int totalWidth);

        [DSharpScriptMemberName("padRight")]
        public extern string PadRight(int totalWidth, char ch);

        [DSharpScriptMemberName("removeString")]
        public extern string Remove(int index);

        [DSharpScriptMemberName("removeString")]
        public extern string Remove(int index, int count);

        [DSharpScriptMemberName("replaceString")]
        public extern string Replace(string oldText, string replaceText);

        [ScriptName("replace")]
        // This doesn't exist in CLR
        public extern string ReplaceFirst(string oldText, string replaceText);

        [ScriptName("replace")]
        // this is not part of CLR. Should this go into an abstraction?
        public extern string ReplaceRegex(RegExp regex, string replaceText);

        [ScriptName("replace")]
        // this is not part of CLR. Should this go into an abstraction?
        public extern string ReplaceRegex(RegExp regex, StringReplaceCallback callback);
        
        // this is not part of CLR. Should this go into an abstraction?
        public extern int Search(RegExp regex);

        // I guess this methoud is totally equivalent to this one on the CLR: string[] Split(char separator, StringSplitOptions options = StringSplitOptions.None)
        public extern string[] Split(char ch);

        // I guess this methoud is totally equivalent to this one on the CLR: string[] Split(string? separator, StringSplitOptions options = StringSplitOptions.None)
        public extern string[] Split(string separator);

        // I guess this methoud is totally equivalent to this one on the CLR: string[] Split(char separator, int count, StringSplitOptions options = StringSplitOptions.None)
        public extern string[] Split(char ch, int limit);

        // I guess this methoud is totally equivalent to this one on the CLR: string[] Split(string? separator, int count, StringSplitOptions options = StringSplitOptions.None)
        public extern string[] Split(string separator, int limit);

        // this is not part of CLR. Should this go into an abstraction?
        public extern string[] Split(RegExp regex);

        // this is not part of CLR. Should this go into an abstraction?
        public extern string[] Split(RegExp regex, int limit);

        [DSharpScriptMemberName("startsWith")]
        public extern bool StartsWith(char ch);

        [DSharpScriptMemberName("startsWith")]
        public extern bool StartsWith(string prefix);

        // this is not part of CLR. Should this go into an abstraction?
        public extern string Substr(int startIndex);

        // this is not part of CLR. Should this go into an abstraction?
        public extern string Substr(int startIndex, int length);

        public extern string Substring(int startIndex);

        public extern string Substring(int startIndex, int endIndex);

        // This method is called ToLowerInvariant() on CLR
        public extern string ToLocaleLowerCase();

        // This method is called ToUpperInvariant() on CLR
        public extern string ToLocaleUpperCase();

        // The remaining ToLower/ToUpper methods are not in CLR. Should these go into an abstraction?
        [Obsolete("ToLowerCase() should not be used, switch to ToLower()")]
        public extern string ToLowerCase();

        [ScriptName("toLowerCase")]
        public extern string ToLower();

        [Obsolete("ToUpperCase() should not be used, switch to ToUpper()")]
        public extern string ToUpperCase();

        [ScriptName("toUpperCase")]
        public extern string ToUpper();

        [DSharpScriptMemberName("trim")]
        public extern string Trim();

        [DSharpScriptMemberName("trim")]
        // the signature for this is Trim(params char[]? trimChars) in CLR
        public extern string Trim(char[] trimCharacters);

        [DSharpScriptMemberName("trimEnd")]
        public extern string TrimEnd();
        
        // the signature for this is TrimEnd(params char[]? trimChars) in CLR
        [DSharpScriptMemberName("trimEnd")]
        public extern string TrimEnd(char[] trimCharacters);

        [DSharpScriptMemberName("trimStart")]
        public extern string TrimStart();

        // the signature for this is TrimStart(params char[]? trimChars) in CLR
        [DSharpScriptMemberName("trimStart")]
        public extern string TrimStart(char[] trimCharacters);

        /// <summary>
        /// Decodes a string by replacing escaped parts with their equivalent textual representation.
        /// </summary>
        /// <returns>The unescaped string.</returns>
        // This is not in CLR
        [ScriptAlias("unescape")]
        public extern string Unescape();

        /// <internalonly />
        // This is not in CLR
        public extern static bool operator ==(string s1, string s2);

        /// <internalonly />
        // This is not in CLR
        public extern static bool operator !=(string s1, string s2);
    }
}
