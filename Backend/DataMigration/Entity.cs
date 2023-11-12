using ClassLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace DataMigration
{
    public interface IEntityPopulator
    {
        void Populate();
        void ClearTableAndResetSeed();
    }

    public class Entity<T> : IEntityPopulator where T : class
    {
        public GroenlundDbContext Context { get; set; }
        public DbSet<T> Table { get; set; }
        public string Name { get; set; }
        public List<T> Entities { get; set; }

        public Entity(GroenlundDbContext context, DbSet<T> table, string name, List<T> entities)
        {
            Context = context;
            Table = table;
            Name = name;
            Entities = entities;
        }

        public void Populate()
        {
            Entity<T>.PopulateTable(Context, Table, Name, Entities);
        }

        public void ClearTableAndResetSeed()
        {
            Entity<T>.ClearTableAndResetSeed(Table, Name, Context);
        }

        private static void PopulateTable(GroenlundDbContext context, DbSet<T> table, string tableName, List<T> entities)
        {
            if (entities.Count == 0) return;
            Console.WriteLine($"Starting insertion of {entities.Count} entities into {tableName}.");
            int numberOfEntities = entities.Count;
            int i = 0;
            bool isMSSQLDatabase = DataMigrater.IsSqlServer(context);

            foreach (var entity in entities)
            {
                using var transaction = context.Database.BeginTransaction();
                try
                {
                    HandleComplexEntity(context, entity);

                    if (isMSSQLDatabase)
                        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT GroenlundDB.dbo." + tableName + " ON");


                    table.Add(entity);
                    context.SaveChanges();

                    if (isMSSQLDatabase)
                        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT GroenlundDB.dbo." + tableName + " OFF");

                    transaction.Commit();
                    i++;
                    Console.Write($"{tableName} created: {i}/{numberOfEntities}\r");
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    Console.WriteLine($"Failed to insert entities into {tableName}: {ex.Message}", ex);
                }
            }
            Console.WriteLine($"Successfully inserted {entities.Count} entities into {tableName}.\n");
        }

        private static void ClearTableAndResetSeed<T>(DbSet<T> dbTable, string tableName, DbContext context) where T : class
        {
            if (dbTable.Any())
            {
                dbTable.ExecuteDelete();
                context.SaveChanges();
                Console.WriteLine("Database contains " + tableName);
                Console.WriteLine("Deleting all " + tableName);

                // Detach deleted entities from the context
                foreach (var entity in context.ChangeTracker.Entries())
                {
                    if (entity.State == EntityState.Deleted)
                    {
                        entity.State = EntityState.Detached;
                    }
                }
            }

            // Reset the seed
            if (DataMigrater.IsSqlServer(context))
            {
                context.Database.ExecuteSqlRaw("DBCC CHECKIDENT('" + tableName + "', RESEED, 0)");
                Console.WriteLine("Resetted seed for " + tableName);
            }
        }

        private static void HandleComplexEntity(GroenlundDbContext context, object entity)
        {
            switch (entity)
            {
                case Product product:
                    AttachSubcategories(context, product);
                    break;
                case ProductItem productItem:
                    AttachProduct(context, productItem);
                    break;
                case OrderElements orderElement when orderElement.ProductItem != null:
                    orderElement.ProductItem = null;
                    break;
            }
        }

        private static void AttachSubcategories(GroenlundDbContext context, Product product)
        {
            var subcategoryIds = product.Subcategories.Select(sc => sc.Id).ToList();

            var existingSubcategories = context.Subcategories
                                                .Where(sc => subcategoryIds.Contains(sc.Id))
                                                .ToList();
            product.Subcategories.Clear();

            foreach (var existingSubcategory in existingSubcategories)
            {
                product.Subcategories.Add(existingSubcategory);
            }
        }


        private static void AttachProduct(GroenlundDbContext context, ProductItem productItem)
        {
            // Logic to attach the product to productItem
            if (productItem.ProductId != 0)
            {
                var existingProduct = context.Products.Find(productItem.ProductId);
                if (existingProduct != null)
                {
                    context.Entry(existingProduct).State = EntityState.Unchanged;
                    productItem.Product = existingProduct;
                }
            }
        }
    }
}
