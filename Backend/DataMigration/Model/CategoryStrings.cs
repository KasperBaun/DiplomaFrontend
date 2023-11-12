using ClassLibrary.Models;

namespace DataMigration.Model
{
    public class CategoryStrings
    {
        public string Name { get; set; }
        public Category Category { get; set; }
        public List<string> Keywords { get; set; }

        public CategoryStrings(string name, Category category, List<string> keywords)
        {
            Name = name;
            Category = category;
            Keywords = keywords;
        }

        public static List<CategoryStrings> GetCategoryStrings(List<Category> categories)
        {
            var categoryKeywords = new Dictionary<int, (string, List<string>)>
            {
                { 1, ("Stel", new List<string> { "mega", "musselmalet", "halvblonde", "helblonde", "riflet", "flora", "konkylie", "purpur" }) },
                { 2, ("Steldele", new List<string> { "tallerken", "kop", "krus", "skål", "kande", "fad", "kage", "krukker", "frokost", "middag", "dyb" }) },
                { 3, ("Figurer", new List<string> { "bjørn", "fugl", "hund", "kat", "hest", "menneske", "ørn", "ugle", "mand", "kvinde", "pige", "dreng", "dahl jensen", "elefant", "figur", "menneskelig figur", "figur B&G", "figur royal copenhagen", "isbjørne / bjørne", "andre figur", "fugle", "musselmalet figur", "katte", "løver / tiger", "hunde" }) },
                { 4, ("Keramik", new List<string> { "aluminia", "saxbo", "arne bang", "palshus", "kähler", "keramik", "stentøj" }) },
                { 5, ("Guld & Sølv", new List<string> { "broche", "halskæde", "smykke", "saltkar", "guld", "sølv" }) },
                { 6, ("Bestik", new List<string> { "gaffel", "gafler", "kniv", "ske", "bestik", "kage" }) },
                { 7, ("Platter", new List<string> { "platte" }) },
                { 8, ("Glas", new List<string> { "vinglas", "ølglas", "dessertglas", "vase" }) },
            };

            return categories
                .Where(c => categoryKeywords.ContainsKey(c.Id))
                .Select(c => new CategoryStrings(categoryKeywords[c.Id].Item1, c, categoryKeywords[c.Id].Item2))
                .ToList();
        }
    }
}
