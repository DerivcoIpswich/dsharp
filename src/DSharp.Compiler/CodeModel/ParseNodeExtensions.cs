namespace DSharp.Compiler.CodeModel
{
    internal static class ParseNodeExtensions
    {
        public static T As<T>(this ParseNode self)
            where T : ParseNode
        {
            return (T)self;
        }

        public static T FindParent<T>(this ParseNode self)
            where T : ParseNode
        {
            var current = self.Parent;

            while (current != null)
            {
                if(current is T)
                {
                    return (T)current;
                }

                current = current.Parent;
            }

            return default;
        }
    }
}
