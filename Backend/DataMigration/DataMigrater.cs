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
        private readonly DataExtractor _dataExtractor;
        private bool isMSSQLDatabase = false;

        public DataMigrater()
        {
            _dataExtractor = new DataExtractor();
            _context = new();
        }


        public void PopulateDatabase(bool? msSQL)
        {
            if (msSQL != null)
            {
                isMSSQLDatabase = msSQL.Value;
            }
            Console.Clear();

            /* Roles table */
            PopulateTable(_context, _context.Roles, "Roles", DataRepository.Roles());
            /* Categories table */
            PopulateTable(_context, _context.Categories, "Categories", DataRepository.Categories());
            /* Subcategories table */
            PopulateTable(_context, _context.Subcategories, "Subcategories", DataRepository.Subcategories());
            /* Products table */
            PopulateTable(_context, _context.Products, "Products", DataRepository.Products());
            /* ProductItems table */
            PopulateTable(_context, _context.ProductItems, "ProductItems", DataRepository.ProductItems());
            /* Images table */
            PopulateTable(_context, _context.Images, "Images", DataRepository.Images());
            /* Customers table */
            PopulateTable(_context, _context.Customers, "Customers", DataRepository.Customers());
            /* DiscountCodes table */
            PopulateTable(_context, _context.DiscountCodes, "DiscountCodes", DataRepository.DiscountCodes());
            /* Users table */
            PopulateTable(_context, _context.Users, "Users", DataRepository.Users());
            /* Payments table */
            PopulateTable(_context, _context.Payments, "Payments", DataRepository.Payments());
            /* OrderElements table */
            PopulateTable(_context, _context.OrderElements, "OrderElements", DataRepository.OrderElements());
            /* Orders table */
            PopulateTable(_context, _context.Orders, "Orders", DataRepository.Orders());

        }

        private void PopulateTable<T>(GroenlundDbContext context, DbSet<T> table, string tableName, List<T> entities) where T : class
        {
            ClearTableAndResetSeed(table, tableName, context);
            InsertEntityInDatabase(table, tableName, entities);
        }

        private void InsertEntityInDatabase<T>(DbSet<T> tableEntity, string tableName, List<T> entities) where T : class
        {
            if (entities.Count == 0) return;
            Console.WriteLine($"Starting insertion of {entities.Count} entities into {tableName}.");
            int numberOfEntities = entities.Count;
            int i = 0;

            foreach (var entity in entities)
            {
                using var transaction = _context.Database.BeginTransaction();
                try
                {
                    if (isMSSQLDatabase)
                    {
                        _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT GroenlundDB.dbo." + tableName + " ON");
                    }

                    tableEntity.Add(entity);
                    _context.SaveChanges();
                    if (isMSSQLDatabase)
                    {
                        _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT GroenlundDB.dbo." + tableName + " OFF");
                    }
                    transaction.Commit();
                    i++;
                    Console.Write($"{tableName} created: {i}/{numberOfEntities}\r");
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    // Use logging instead of Console.WriteLine
                    Console.WriteLine($"Failed to insert entities into {tableName}: {ex.Message}", ex);
                }

            }

            Console.WriteLine($"Successfully inserted {entities.Count} entities into {tableName}.\n");
        }

        private void ClearTableAndResetSeed<T>(DbSet<T> dbTable, string tableName, GroenlundDbContext context) where T : class
        {
            if (!dbTable.Any()) return;


            Console.WriteLine($"Clearing table {tableName}.");

            using var transaction = context.Database.BeginTransaction();
            try
            {
                context.Database.ExecuteSqlRaw($"TRUNCATE TABLE {tableName}");
                context.SaveChanges();

                if (isMSSQLDatabase)
                {
                    context.Database.ExecuteSqlRaw($"DBCC CHECKIDENT('{tableName}', RESEED, 0)");
                    Console.WriteLine($"Reset seed for {tableName}.");
                }

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                // Use logging instead of Console.WriteLine
                Console.WriteLine($"Failed to clear table {tableName}: {ex.Message}", ex);
            }
        }

        private void InsertProductsInDatabase(string tableName, List<Product> products, bool? msSQL)
        {
            List<Subcategory> subcategories = _context.Subcategories.Include(s => s.Category).ToList();
            int numberOfProducts = products.Count;
            int i = 0;
            Console.WriteLine("Creating " + tableName);

            foreach (var product in products)
            {
                // This has to be done in order for EF-Core to ensure tracking of subcategory entities is correct
                MapSubcategoryEntityToProduct(subcategories, product);

                using var transaction = _context.Database.BeginTransaction();
                try
                {
                    if (msSQL != null && msSQL == true)
                    {
                        _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT GroenlundDB.dbo." + tableName + " ON");
                    }
                    _context.Products.Add(product);
                    _context.SaveChanges();
                    if (msSQL != null && msSQL == true)
                    {
                        _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT GroenlundDB.dbo." + tableName + " OFF");
                    }
                    transaction.Commit();
                    i++;
                    Console.Write($"{tableName} created: {i}/{numberOfProducts}\r");

                }
                catch (Exception ex)
                {
                    //transaction.Rollback();
                    Console.WriteLine("Failed creating " + tableName + ex.Message + "\n");
                    Console.WriteLine("StackTrace:" + ex.StackTrace + "\n");
                    Console.WriteLine("InnerException:" + ex.InnerException + "\n");
                }

            }

            Console.WriteLine("Successfully created " + numberOfProducts + " " + tableName + "\n");
        }

        private static void MapSubcategoryEntityToProduct(List<Subcategory> subcategoryEntities, Product product)
        {
            List<Subcategory> productSubcategories = product.Subcategories.ToList();
            List<Subcategory> newProductSubcategories = new();

            foreach (var productSubcat in productSubcategories)
            {
                newProductSubcategories.Add(subcategoryEntities.Find(s => s.Id == productSubcat.Id)!);
            }

            product.Subcategories = newProductSubcategories;
        }
    }
}