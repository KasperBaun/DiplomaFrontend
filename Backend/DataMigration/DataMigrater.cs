using ClassLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace DataMigration
{
    /*
     * This class is responsible for migrating the data from the current solution. The data is received in a .csv file and extracted using this class
     */
    class DataMigrater
    {
        private readonly GroenlundDbContext _context;

        public DataMigrater()
        {
            _context = new();
        }


        public void PopulateDatabase()
        {
            Console.Clear();

            /* Each populator represents a table in the database */
            var populators = new List<IEntityPopulator>
            {
                //new Entity<Role>(_context, _context.Roles, "Roles", DataRepository.Roles()),
                //new Entity<Category>(_context, _context.Categories, "Categories", DataRepository.Categories()),
                //new Entity<Subcategory>(_context, _context.Subcategories, "Subcategories", DataRepository.Subcategories()),
                //new Entity<Product>(_context, _context.Products, "Products", DataRepository.Products()),
                //new Entity<ProductItem>(_context, _context.ProductItems, "ProductItems", DataRepository.ProductItems()),
                //new Entity<Image>(_context, _context.Images, "Images", DataRepository.Images()),
                //new Entity<Customer>(_context, _context.Customers, "Customers", DataRepository.Customers()),
                //new Entity<DiscountCode>(_context, _context.DiscountCodes, "DiscountCodes", DataRepository.DiscountCodes()),
                //new Entity<User>(_context, _context.Users, "Users", DataRepository.Users()),
                //new Entity<Order>(_context, _context.Orders, "Orders", DataRepository.Orders()),
                //new Entity<Payment>(_context, _context.Payments, "Payments", DataRepository.Payments()),
                new Entity<OrderElements>(_context, _context.OrderElements, "OrderElements", DataRepository.OrderElements())
            };


            foreach (var populator in populators)
            {
                populator.ClearTableAndResetSeed();
                populator.Populate();
            }
        }

        public static bool IsSqlServer(DbContext context) => context.Database.ProviderName.EndsWith("SqlServer", StringComparison.OrdinalIgnoreCase);
    }
}
