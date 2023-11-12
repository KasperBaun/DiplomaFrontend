using ClassLibrary.Models;

namespace DataMigration.Model
{
    public class SubcategoryStrings
    {
        public string Name { get; set; }
        public Subcategory Subcategory { get; set; }
        public List<string> Keywords { get; set; }

        public SubcategoryStrings(string name, Subcategory subcategory, List<string> keywords)
        {
            Name = name;
            Subcategory = subcategory;
            Keywords = keywords;
        }

        public static List<SubcategoryStrings> GetSubcategoryStrings(List<Subcategory> subcategories)
        {
            var subcategoryData = new Dictionary<int, (string, List<string>)>
            {
                { 1, ("Mega", new List<string> { "mega" }) },
                { 2, ("Musselmalet", new List<string> { "musselmalet" }) },
                { 3, ("Halvblonde", new List<string> { "halvblonde" }) },
                { 4, ("Helblonde", new List<string> { "helblonde" }) },
                { 5, ("Riflet", new List<string> { "riflet" }) },
                { 6, ("Flora", new List<string> { "flora" }) },
                { 7, ("Konkylie", new List<string> { "konkylie" }) },
                { 8, ("Purpur", new List<string> { "purpur" }) },
                { 9, ("Tallerkener", new List<string> { "tallerken" }) },
                { 10, ("Kopper og Krus", new List<string> { "kop", "krus" }) },
                { 11, ("Skåle", new List<string> { "skål" }) },
                { 12, ("Kander", new List<string> { "kande" }) },
                { 13, ("Serveringsdele", new List<string> { "fad", "opsats", "bægre", "bræd", "servering", "terrin", "asiet" }) },
                { 14, ("Andet i Porcelæn", new List<string> { "ske", "krukke" }) },
                { 15, ("Bjørne", new List<string> { "bjørn", "isbjørne / bjørne", "isbjørn" }) },
                { 16, ("Fugle", new List<string> { "fugl", "fugle", "ørn", "ugle" }) },
                { 17, ("Hunde", new List<string> { "hund" }) },
                { 18, ("Katte", new List<string> { "kat" }) },
                { 19, ("Andre Dyr", new List<string> { "elefant" }) },
                { 20, ("Mennesker", new List<string> { "menneske" }) },
                { 21, ("Royal Copenhagen", new List<string> { "royal copenhagen" }) },
                { 22, ("Bing & Grøndahl", new List<string> { "bing", "grøndahl" }) },
                { 23, ("Aluminia", new List<string> { "aluminia" }) },
                { 24, ("Saxbo", new List<string> { "saxbo" }) },
                { 25, ("Arne Bang", new List<string> { "arne bang" }) },
                { 26, ("Palshus", new List<string> { "palshus" }) },
                { 27, ("Øvrig Keramik", new List<string> { "keramik" }) },
                { 28, ("Brocher", new List<string> { "broche" }) },
                { 29, ("Halskæder", new List<string> { "halskæde" }) },
                { 30, ("Smykker", new List<string> { "smykke" }) },
                { 31, ("Øvrige Guld & Sølv", new List<string> { "guld", "sølv", "saltkar" }) },
                { 32, ("Kagebestik", new List<string> { "kagegaffel", "kage" }) },
                { 33, ("Knive", new List<string> { "kniv" }) },
                { 34, ("Gafler", new List<string> { "gaffel", "gafler" }) },
                { 35, ("Skeer", new List<string> { "ske" }) },
                { 36, ("Fiskebestik", new List<string> { "fiskegaffel", "fiskeske" }) },
                { 37, ("Aluminia Platter", new List<string> { "aluminia" }) },
                { 38, ("Bjørn Wiinblad Platter", new List<string> { "bjørn wiinblad" }) },
                { 39, ("Bing & Grøndahl Platter", new List<string> { "bing grøndahl" }) },
                { 40, ("Royal Copenhagen Platter", new List<string> { "royal copenhagen" }) },
                { 41, ("Vinglas", new List<string> { "vinglas" }) },
                { 42, ("Dessertglas", new List<string> { "dessertglas" }) },
                { 43, ("Ølglas", new List<string> { "ølglas" }) },
                { 44, ("Vaser", new List<string> { "vase" }) },
            };

            return subcategories
                .Where(sc => subcategoryData.ContainsKey(sc.Id))
                .Select(sc => new SubcategoryStrings(subcategoryData[sc.Id].Item1, sc, subcategoryData[sc.Id].Item2))
                .ToList();
        }
    }
}
