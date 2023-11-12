

namespace DataMigration.Model
{
    struct Manufacturer
    {
        public string Name;
        public string[] Keywords;
    }
    static class ManufacturerHelper
    {

        public static IEnumerable<Manufacturer> Manufacturers => new[]
        {
            new Manufacturer { Name = "Royal Copenhagen", Keywords = new string[] { "Royal", "Copenhagen" } },
                new Manufacturer { Name = "Bing og Grøndahl", Keywords = new string[] { "Bing", "Grøndahl", "Bing og Grøndahl" } },
                new Manufacturer { Name = "Axel Brüel", Keywords = new string[] { "Axel", "Brüel" } },
                new Manufacturer { Name = "Dahl Jensen", Keywords = new string[] { "Dahl Jensen" } },
                new Manufacturer { Name = "Kähler", Keywords = new string[] { "Kähler" } },
                new Manufacturer { Name = "Holmegaard", Keywords = new string[] { "Holmegaard" } },
                new Manufacturer { Name = "Georg Jensen", Keywords = new string[] { "Georg Jensen" } },
                new Manufacturer { Name = "Orrefors", Keywords = new string[] { "Orrefors" } },
                new Manufacturer { Name = "Hjorth", Keywords = new string[] { "Hjorth" } },
                new Manufacturer { Name = "Knabstrup", Keywords = new string[] { "Knabstrup" } },
                new Manufacturer { Name = "Lyngby Porcelæn", Keywords = new string[] { "Lyngby Porcelæn" } },
                new Manufacturer { Name = "Aluminia", Keywords = new string[] { "Aluminia" } },
                new Manufacturer { Name = "Nymølle Keramik", Keywords = new string[] { "Nymølle Keramik" } },
                new Manufacturer { Name = "Saxbo Keramik", Keywords = new string[] { "Saxbo Keramik" } },
                new Manufacturer { Name = "Dansk Glasværk", Keywords = new string[] { "Dansk Glasværk" } },
                new Manufacturer { Name = "Palshus Keramik", Keywords = new string[] { "Palshus Keramik" } },
                new Manufacturer { Name = "Arne Bang", Keywords = new string[] { "Arne Bang" } },
                new Manufacturer { Name = "Søholm", Keywords = new string[] { "Søholm" } },
                new Manufacturer { Name = "Ipsen & Co.", Keywords = new string[] { "Ipsen & Co" } },
                new Manufacturer { Name = "A. Michelsen", Keywords = new string[] { "A. Michelsen", "Anton Michelsen" } },
                new Manufacturer { Name = "Cohr", Keywords = new string[] { "Cohr" } },
                new Manufacturer { Name = "Evald Nielsen", Keywords = new string[] { "Evald Nielsen" } },
                new Manufacturer { Name = "Hans Hansen", Keywords = new string[] { "Hans Hansen" } },
                new Manufacturer { Name = "Kay Bojesen", Keywords = new string[] { "Kay Bojesen" } },
                new Manufacturer { Name = "Carl Hansen & Søn", Keywords = new string[] { "Carl Hansen & Søn" } },
                new Manufacturer { Name = "Lyngby Glasværk", Keywords = new string[] { "Lyngby Glasværk"}},
                new Manufacturer { Name = "Grønlund & Lefort", Keywords = new string[]  {"Grønlund", "Lefort"}},
                new Manufacturer { Name = "Gun Von Wittrock", Keywords = new string[] { "GUN VON WITTROCK" } },
                new Manufacturer { Name = "Michael Andersen", Keywords = new string[] {"Michael Andersen"} },
        };
    }
}
