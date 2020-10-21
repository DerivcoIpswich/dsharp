using System.Collections.Generic;
using System.Linq;

namespace DSharp.Compiler.Obfuscation
{
    public class CartesianObfuscator : IObfuscator
    {
        private readonly Dictionary<string, string> nameMap;

        private readonly IEnumerator<string> enumerator;
        private readonly IEnumerable<char> alphabet;

        public int CharacterLimit { get; set; } = 4;

        public CartesianObfuscator(IEnumerable<char> alphabet)
            :this(alphabet, new Dictionary<string, string>())
        {

        }

        public CartesianObfuscator(IEnumerable<char> alphabet, Dictionary<string, string> nameMap)
        {
            this.alphabet = alphabet;
            this.nameMap = nameMap ?? new Dictionary<string, string>();
            this.enumerator = GetEnumerator();
        }

        public string Obfuscate(string originalName)
        {
            if (nameMap.TryGetValue(originalName, out var name))
            {
                return name;
            }

            enumerator.MoveNext();
            nameMap.Add(originalName, enumerator.Current);
            return enumerator.Current;
        }

        private IEnumerator<string> GetEnumerator()
        {
            for (int count = 1; count < CharacterLimit; ++count)
            {
                var sequences = Enumerable.Repeat(alphabet, count);

                foreach (var name in CartesianProduct(sequences).Select(n => new string(n.ToArray())))
                {
                    yield return name;
                }
            }
        }

        static IEnumerable<IEnumerable<char>> CartesianProduct(IEnumerable<IEnumerable<char>> sequences)
        {
            IEnumerable<IEnumerable<char>> emptyProduct = new[] { Enumerable.Empty<char>() };
            return sequences.Aggregate(
                emptyProduct,
                (accumulator, sequence) => 
                    from accseq in accumulator
                    from item in sequence
                    select accseq.Concat(new[] { item })
                );
        }
    }
}
