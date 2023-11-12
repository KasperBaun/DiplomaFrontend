using ClassLibrary.Models;
using Newtonsoft.Json;

namespace DataMigration
{
    public static class DataRepository
    {
        public static List<Category> Categories() { return JsonConvert.DeserializeObject<List<Category>>(File.ReadAllText("Data/categories.json"))!; }
        public static List<Subcategory> Subcategories() { return JsonConvert.DeserializeObject<List<Subcategory>>(File.ReadAllText("Data/subcategories.json"))!; }
        public static List<Product> Products() { return JsonConvert.DeserializeObject<List<Product>>(File.ReadAllText("Data/products.json"))!; }
        public static List<ProductItem> ProductItems() { return JsonConvert.DeserializeObject<List<ProductItem>>(File.ReadAllText("Data/productitems.json"))!; }
        public static List<Image> Images() { return JsonConvert.DeserializeObject<List<Image>>(File.ReadAllText("Data/images.json"))!; }
        public static List<Role> Roles() { return JsonConvert.DeserializeObject<List<Role>>(File.ReadAllText("Data/roles.json"))!; }
        public static List<OrderElements> OrderElements() { return JsonConvert.DeserializeObject<List<OrderElements>>(File.ReadAllText("Data/orderelements.json"))!; }
        public static List<Order> Orders() { return JsonConvert.DeserializeObject<List<Order>>(File.ReadAllText("Data/orders.json"))!; }
        public static List<User> Users() { return JsonConvert.DeserializeObject<List<User>>(File.ReadAllText("Data/users.json"))!; }
        public static List<Payment> Payments() { return JsonConvert.DeserializeObject<List<Payment>>(File.ReadAllText("Data/payments.json"))!; }
        public static List<Customer> Customers() { return JsonConvert.DeserializeObject<List<Customer>>(File.ReadAllText("Data/customers.json"))!; }
        public static List<DiscountCode> DiscountCodes() { return JsonConvert.DeserializeObject<List<DiscountCode>>(File.ReadAllText("Data/discountcodes.json"))!; }
    }
}
