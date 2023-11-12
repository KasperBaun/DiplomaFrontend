using Microsoft.EntityFrameworkCore;

namespace ClassLibrary.Models
{
    public class GroenlundDbContext : DbContext
    {
        public GroenlundDbContext() { }

        public GroenlundDbContext(DbContextOptions<GroenlundDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<DiscountCode> DiscountCodes { get; set; } = null!;
        public DbSet<Subcategory> Subcategories { get; set; } = null!;
        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<ProductItem> ProductItems { get; set; } = null!;
        public DbSet<Image> Images { get; set; } = null!;
        public DbSet<PriceHistory> PriceHistories { get; set; } = null!;
        public DbSet<Payment> Payments { get; set; } = null!;
        public DbSet<Role> Roles { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;

        public DbSet<OrderElements> OrderElements { get; set; } = null!;


        // Views
        public DbSet<OrderDetails> OrderDetails { get; set; } = null!;
        public DbSet<SalesSummary> SalesSummary { get; set; } = null!;
        public DbSet<Inventory> CategoryProductCount { get; set; } = null!;
        public DbSet<ProductItemDetails> ProductsWithWeight { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var variableName = "GroenlundDBConnection";
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
            string connectionString = Environment.GetEnvironmentVariable(variableName);
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.


            if (string.IsNullOrWhiteSpace(connectionString))
            {
                var detailedMessage = $"The environment variable '{variableName}' is not set or is empty. " +
                                      "Ensure that it is set and the application is restarted to apply the new environment variables.";

                throw new InvalidOperationException(detailedMessage);
            }

            Console.WriteLine($"The environment variable '{variableName}' is set to: \"{connectionString}\"");

            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            }

            /* Optional: Enable detailed logging for debugging purposes */
            // optionsBuilder.EnableSensitiveDataLogging();
            // optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);
        }

    }
}
