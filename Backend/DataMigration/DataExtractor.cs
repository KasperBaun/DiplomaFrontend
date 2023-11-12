using ClassLibrary.Models;
using DataMigration.Helpers;
using DataMigration.Model;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace DataMigration
{
    public class DataExtractor
    {
        public RegexHelper RegexHelper;
        private int productIdCounter = 1;
        private int productItemIdCounter = 1;
        private int imageIdCounter = 1;
        private readonly Random random = new();
        private readonly List<string[]> failedMatches = new();
        private readonly List<Category> categories = DataRepository.Categories();
        private readonly List<Subcategory> subcategories = DataRepository.Subcategories();

        public DataExtractor()
        {
            RegexHelper = new();
        }

        public void CreateDataFiles()
        {
            var (products, productItems, images) = ExtractData();
            var (orders, payments, orderelements) = GenerateOrders(productItems);
            SaveToJsonFile(products, "products.json");
            SaveToJsonFile(productItems, "productitems.json");
            SaveToJsonFile(images, "images.json");
            SaveToJsonFile(orders, "orders.json");
            SaveToJsonFile(payments, "payments.json");
            SaveToJsonFile(orderelements, "orderelements.json");
        }

        private static void SaveToJsonFile<T>(List<T> data, string fileName)
        {
            var jsonString = JsonConvert.SerializeObject(data, Formatting.Indented);
            File.WriteAllText(fileName, jsonString);
            Console.WriteLine($"JSON file saved to {fileName}");
        }

        public (List<Product> Products, List<ProductItem> ProductItems, List<Image> Images) ExtractData()
        {
            List<string[]> data = GetCsvEntries();
            List<Product> Products = new();
            List<ProductItem> ProductItems = new();
            List<Image> Images = new();

            for (int i = 1; i < data.Count; i++)
            {
                var dataItem = data[i];
                var (name, modelNumber) = RegexHelper.RecognizeModelnumberPattern(dataItem[2]);
                string categoryStringInput = dataItem[2] + dataItem[3] + dataItem[5];
                var productCategory = CategoryHelper.InferCategory(categories, categoryStringInput);
                if (productCategory == null)
                {
                    failedMatches.Add(dataItem);
                    continue;
                }

                var productSubcategories = CategoryHelper.ExtractSubcategories(productCategory, subcategories, categoryStringInput);
                var imageUrls = ExtractImages(dataItem[4]);

                if (string.IsNullOrEmpty(name) || productSubcategories.Count == 0 || imageUrls.Count == 0)
                {
                    // No point in having this data in the project, but saving it for future reference to PO.
                    failedMatches.Add(dataItem);
                    continue;
                }

                Product product = new()
                {
                    Id = productIdCounter,
                    Name = name,
                    ModelNumber = modelNumber,
                    Material = ExtractMaterialType(dataItem[3]),
                    Manufacturer = ExtractManufacturer(dataItem[3]),
                    Design = ExtractDesign(dataItem[3]),
                    Subcategories = productSubcategories,
                    Dimension = ExtractDimension(dataItem[3]),
                };

                // How many productItems for this product
                var productItemCount = ExtractProductItemCount(dataItem[13]);

                for (int x = 0; x < productItemCount; x++)
                {

                    // Create productItem for the product
                    decimal currentPrice = ExtractPrice(dataItem[8]) / 10;
                    decimal purchasePrice = currentPrice * (decimal)0.3;
                    decimal? weight = ExtractWeight(dataItem[14]);
                    weight ??= (decimal)random.NextDouble() * 15;

                    ProductItem productItem = new()
                    {
                        Id = productItemIdCounter,
                        Product = product,
                        ProductId = product.Id,
                        Condition = ExtractCondition(dataItem[3]),
                        Quality = ExtractQuality(dataItem[3]),
                        Sold = 0,
                        Weight = weight,
                        CurrentPrice = currentPrice,
                        PurchasePrice = purchasePrice,
                        CreatedDate = RandomDay(),
                        CustomText = "",
                        Images = new List<Image>()
                    };

                    bool? sold = ExtractSold(dataItem[10]);
                    if (sold != null && sold == true)
                    {
                        productItem.Sold = 1;
                        int randomDaysOnSale = random.Next(1, 150);
                        productItem.SoldDate = productItem.CreatedDate + TimeSpan.FromDays(randomDaysOnSale);
                    }

                    List<Image> productItemImages = new();
                    foreach (var img in imageUrls)
                    {
                        if (!string.IsNullOrEmpty(img))
                        {
                            var imgId = img.Split('.')[0];
                            string imgReducedSize = "https://static.wixstatic.com/media/" + img + "/v1/fill/w_630,h_840,al_c,q_85,usm_0.66_1.00_0.01/" + imgId + ".webp";
                            //Console.WriteLine(imgId);
                            //Console.WriteLine(imgReducedSize);

                            Image image = new()
                            {
                                ProductItemId = productItem.Id,
                                Id = imageIdCounter,
                                Url = imgReducedSize,
                            };
                            productItemImages.Add(image);
                            imageIdCounter++;
                        }
                    }


                    ProductItems.Add(productItem);
                    Images.AddRange(productItemImages);
                    productItemIdCounter++;
                }
                Products.Add(product);
                productIdCounter++;
            }

            Console.WriteLine("Added data to {0} products generated from {1} dataItems", Products.Count, data.Count);
            return (Products, ProductItems, Images);
        }
        public static void TestRegExFilter()
        {
            List<string[]> data = ReadCsv("./Data/products.csv");
            List<string> names = new();

            for (int i = 1; i < 5; i++)
            {
                var dataItem = data[i];
                names.Add(dataItem[2]);
            }

            RegexHelper.TestRegexFilter(names.ToArray(), RegexHelper.RegexMap());
        }
        public static decimal? ExtractWeight(string input)
        {
            bool success = double.TryParse(input, out double sum);
            if (success)
            {
                return (decimal)sum;
            }
            return null;
        }
        public static int ExtractProductItemCount(string input)
        {
            var parseSuccessful = int.TryParse(input, out int parseResult);
            if (parseSuccessful)
            {
                if (parseResult != 0)
                {
                    return parseResult;
                }
            }
            return 1;
        }
        public static DateTime RandomDay()
        {
            DateTime start = new(2019, 1, 1);
            int range = (DateTime.Today - start).Days;
            return start.AddDays(new Random().Next(range));
        }
        // TODO - This should be finished if time allows for it.
        public static string ExtractDimension(string input)
        {
            string result = "";
            //int startIndex = 0;
            //// Dimension can be Height / Højde - 
            //if (input.ToLowerInvariant().Contains("height"))
            //{
            //    startIndex = input.ToLowerInvariant().IndexOf("height") + "height".Length;

            //}
            //else if (input.ToLowerInvariant().Contains("højde"))
            //{
            //    startIndex = input.ToLowerInvariant().IndexOf("height") + "height".Length;
            //}
            //if (startIndex != 0)
            //{
            //    string substring = input.ToLowerInvariant().Substring(startIndex);
            //    result = substring;
            //}

            return result;
        }
        public static List<string> ExtractImages(string input)
        {
            var images = new List<string>();

            if (input.Contains("jpg", StringComparison.OrdinalIgnoreCase) || input.Contains("webp", StringComparison.OrdinalIgnoreCase))
            {
                images = input.Split(';')
                              .Select(s => s.Trim('\"'))
                              .Where(s => !string.IsNullOrWhiteSpace(s))
                              .ToList();
            }

            return images;
        }
        public static string ExtractManufacturer(string input)
        {
            var manufacturers = ManufacturerHelper.Manufacturers;

            input = input.ToLowerInvariant();

            foreach (var manufacturer in manufacturers)
            {
                foreach (var keyword in manufacturer.Keywords)
                {
                    // Compare against the lowercased input.
                    if (input.Contains(keyword.ToLowerInvariant()))
                    {
                        return manufacturer.Name;
                    }
                }
            }

            return string.Empty;
        }
        public static string ExtractDesign(string input)
        {
            string result = "";
            int startIndex = input.IndexOf("Design");

            if (startIndex != -1)
            {
                startIndex += "Design".Length;
                string subString = input.Substring(startIndex, 40)
                    .Trim('&', ' ', ';', ':', '"')
                    .Split('<')[0]
                    .Trim()
                    .Replace("&nbsp", "")
                    .Replace("&#160;", "")
                    .Replace("&amp;nbsp;", "");

                result = subString;
            }

            return result;
        }
        public static bool? ExtractSold(string input)
        {
            input = input.ToLowerInvariant();
            if (input.Contains("true"))
            {
                return false;
            }
            if (input.Contains("false"))
            {
                return true;
            }
            return null;
        }
        public static QualityType ExtractQuality(string input)
        {
            string pattern = @"(1|2|3)\.\s*(?i)(quality|sortering)";

            Match match = Regex.Match(input, pattern);
            return match.Success switch
            {
                true when match.Groups[1].Value == "1" => QualityType.FirstQuality,
                true when match.Groups[1].Value == "2" => QualityType.SecondQuality,
                true when match.Groups[1].Value == "3" => QualityType.ThirdQuality,
                _ => QualityType.Undefined
            };
        }
        public static ConditionType ExtractCondition(string input)
        {
            input = input.ToLowerInvariant();

            bool containsShards = input.Contains("skår") || input.Contains("shards");
            if (!containsShards)
            {
                return ConditionType.Undefined;
            }

            if (input.Contains("mange") || input.Contains("many"))
            {
                return ConditionType.ManyShards;
            }

            if (input.Contains("få") || input.Contains("few"))
            {
                return ConditionType.FewShards;
            }

            if (input.Contains("ingen") || input.Contains("no"))
            {
                return ConditionType.NoShards;
            }

            return ConditionType.Undefined;
        }
        public static decimal ExtractPrice(string input)
        {
            double.TryParse(input, out double result);
            if (double.IsNaN(result) || double.IsInfinity(result) || result < 0)
            {
                result = 149.1;
            }
            return (decimal)result;
        }
        public static MaterialType ExtractMaterialType(string input)
        {
            string substring = "";

            Regex regexPattern = new(@"(?:Material|Materiale):\s*(.*)");
            var match = regexPattern.Match(input);
            if (match.Success)
            {
                substring = match.Groups[1].Value;
                int endIndex = substring.IndexOf("<");
                substring = substring[..endIndex];
            }

            string lowercaseSubstring = substring.ToLowerInvariant();
            if (lowercaseSubstring.Contains("porcelæn") || lowercaseSubstring.Contains("porcelain")) { return MaterialType.porcelain; }
            if (lowercaseSubstring.Contains("stål") || lowercaseSubstring.Contains("steel")) { return MaterialType.steel; }
            if (lowercaseSubstring.Contains("glas") || lowercaseSubstring.Contains("glass")) { return MaterialType.glass; }
            if (lowercaseSubstring.Contains("guld") || lowercaseSubstring.Contains("gold")) { return MaterialType.gold; }
            if (lowercaseSubstring.Contains("sølv") || lowercaseSubstring.Contains("silver")) { return MaterialType.silver; }
            if (lowercaseSubstring.Contains("keramik") || lowercaseSubstring.Contains("ceramics")) { return MaterialType.ceramics; }
            if (lowercaseSubstring.Contains("stentøj") || lowercaseSubstring.Contains("stoneware")) { return MaterialType.stoneware; }
            if (lowercaseSubstring.Contains("fajance")) { return MaterialType.fajance; }

            return MaterialType.undefined;
        }
        public static (List<Order> Orders, List<Payment> Payments, List<OrderElements>) GenerateOrders(List<ProductItem> pItems)
        {
            var orders = new List<Order>();
            var payments = new List<Payment>();
            var orderElements = new List<OrderElements>();
            var customers = DataRepository.Customers();
            var discountCodes = DataRepository.DiscountCodes();
            var productItems = pItems.Where(p => p.Sold == 1).ToList();
            List<int> usedProductItemIds = new();
            List<string> deliveryStatuses = new() { "Delivered", "Pending", "Shipped" };
            List<string> paymentMethods = new() { "Credit Card", "PayPal", "Bank Transfer", "MobilePay", "Stripe" };
            int orderIdCounter = 1;
            int orderElementsCounter = 1;
            int customerProductItems = productItems.Count / customers.Count;
            int remainingProductItems = productItems.Count;

            foreach (var customer in customers)
            {
                int customerRemainingProductItems = customerProductItems;
                while (customerRemainingProductItems > 0)
                {
                    int randomNumberOfProductItems = new Random().Next(1, 5);
                    if (randomNumberOfProductItems > remainingProductItems)
                    {
                        randomNumberOfProductItems = remainingProductItems;
                    }
                    List<ProductItem> productItems1 = new();
                    for (int x = 0; x <= randomNumberOfProductItems; x++)
                    {
                        int randomProductItemId = new Random().Next(1, productItems.Count);

                        while (usedProductItemIds.Contains(randomProductItemId))
                        {
                            randomProductItemId = new Random().Next(1, productItems.Count);
                        }
                        productItems1.Add(productItems[randomProductItemId]);
                    }

                    var createdDate = RandomDay();

                    var order = new Order
                    {
                        Id = orderIdCounter,
                        CustomerId = customer.Id,
                        Active = false,
                        DeliveryStatus = deliveryStatuses[new Random().Next(1, 3)],
                        DiscountCode = discountCodes[new Random().Next(1, discountCodes.Count)].Code,
                        CreatedDate = createdDate,
                    };

                    List<OrderElements> specificOrderOrderElements = new();
                    foreach (var po in productItems1)
                    {
                        var oe = new OrderElements()
                        {
                            Id = orderElementsCounter,
                            OrderId = order.Id,
                            ProductItem = po,
                            ProductItemId = po.Id,
                        };
                        specificOrderOrderElements.Add(oe);
                        orderElements.Add(oe);
                        orderElementsCounter++;
                    }

                    //order.OrderElements = specificOrderOrderElements;

                    decimal paymentAmount = 0;
                    foreach (var orderElement in specificOrderOrderElements)
                    {
                        var additionPrice = 0.0m;
                        if(orderElement.ProductItem != null)
                        {
                            additionPrice = orderElement.ProductItem.CurrentPrice;
                        }
                        paymentAmount += additionPrice;
                    }

                    var discountCode = discountCodes.Find(d => d.Code == order.DiscountCode)!;
                    paymentAmount *= (100 - discountCode.DiscountPercentage);

                    var payment = new Payment
                    {
                        Id = orderIdCounter,
                        Amount = (double)paymentAmount,
                        DatePaid = createdDate,
                        Method = paymentMethods[new Random().Next(1, paymentMethods.Count)],
                        Approved = 1/*Convert.ToSByte(orderIdCounter % 2)*/
                    };

                    order.PaymentId = payment.Id;
                    order.PaymentStatus = payment.Approved == 1 ? "Approved" : "Pending";

                    orders.Add(order);
                    payments.Add(payment);

                    orderIdCounter++;
                    customerRemainingProductItems -= randomNumberOfProductItems;

                }
            }

            return (orders, payments, orderElements);
        }
        public static List<string[]> GetCsvEntries()
        {
            return ReadCsv("./Data/products.csv");
        }
        private static List<string[]> ReadCsv(string filename)
        {
            List<string[]> data = new();
            using (var reader = new StreamReader(filename))
            {
                string? line = reader.ReadLine();
                while (line != null)
                {
                    var values = new List<string>();
                    var currentField = "";

                    foreach (var c in line)
                    {
                        if (c == ',' && currentField.StartsWith("\"\"") && !currentField.EndsWith("\"\""))
                        {
                            // This comma is inside a field, so ignore it
                            currentField += c;
                        }
                        else if (c == ',' && currentField.EndsWith("\"\""))
                        {
                            // This comma is at the end of a quoted field, so add the field to the list and start a new field
                            values.Add(currentField);
                            currentField = "";
                        }
                        else if (c == ',' && !currentField.EndsWith("\"\""))
                        {
                            // This comma is at the end of a non-quoted field, so add the field to the list and start a new field
                            values.Add(currentField);
                            currentField = "";
                        }
                        else
                        {
                            // Add the character to the current field
                            currentField += c;
                        }
                    }

                    // Add the last field to the list
                    values.Add(currentField);

                    data.Add(values.ToArray());
                    line = reader.ReadLine();
                }
            }
            return data;
        }
    }

}

