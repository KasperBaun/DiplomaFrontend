using ClassLibrary.Models;
using DataMigration.Model;

namespace DataMigration.Helpers
{
    public static class CategoryHelper
    {
        public static List<Subcategory> ExtractSubcategories(Category category, List<Subcategory> subcategories, string input)
        {
            var inputLower = input.ToLowerInvariant();
            return SubcategoryStrings.GetSubcategoryStrings(subcategories)
                .Where(s => s.Subcategory.CategoryId == category.Id)
                .SelectMany(s => s.Keywords, (s, keyword) => new { s.Subcategory, Keyword = keyword.ToLowerInvariant() })
                .Where(s => inputLower.Contains(s.Keyword))
                .Select(s => s.Subcategory)
                .Distinct()
                .ToList();
        }

        public static Category? InferCategory(List<Category> categories, string input)
        {
            input = input.ToLowerInvariant();
            List<CategoryStrings> categoryStrings = CategoryStrings.GetCategoryStrings(categories);

            foreach (var catStrings in categoryStrings)
            {
                foreach (string catString in catStrings.Keywords)
                {
                    if (input.ToLowerInvariant().Contains(catString.ToLowerInvariant()))
                    {
                        return catStrings.Category;
                    }
                }
            }
            return null;
        }
    }
}
