import { ILocale } from "./ILocale";

export default class ENLocale implements ILocale {
  id = "en_US";
  aboutUs = "About Us";
  aboutUsText = "We sell porcelain";

  // Category Admin
  createCategoryModalTitle = "Create Category";
  createCategoryTitle = "Title";
  createCategoryOrder = "Order";
  createCategoryImgUrl = "Image Url";
  createCategoryDescription = "Description";
  createCategorySubmit = "Submit";
  createCategorySuccessMessage = "Created category successfully!";
  createCategoryFailedMessage = "Failed creating category!";
  updateCategorySuccessMessage = "Category updated!";
  updateCategoryFailedMessage = "Failed to edit category!";
  ProductCommaSeperatedText = "Add more products by comma seperating them like: Cup, Plate, Vase";
      // Update Form
  updateCategoryFormTitle = "Title";
  updateCategoryFormOrder = "Order";
  updateCategoryFormDescription = "Description";
  updateCategoryFormImgURL = "Image URL";    
  updateCategoryFormOrderDesc = "Sets the order in which categories will be displayed on the website";
  updateCategoryFormDescriptionDesc = "Describes details about the products in this category";
  updateCategorySubmit = "Update";

  // SubCategory
  createSubCategoryCategoryTitle = "Select Category";
  createSubCategoryModalTitle = "Create Subcategory";
  createSubcategoryCategoryTitle = "Choose subcategory";
  createSubCategoryTitle = "Title";
  createSubCategoryOrder = "Order";
  createSubCategoryImgUrl = "Image Url";
  createSubCategoryDescription = "Description";
  createSubCategorySubmit = "Create";
  createSubCategoryUpdate = "Update";
  createSubCategorySuccessMessage = "SubCategory created";
  createSubCategoryFailedMessage = "Error. Could not create SubCategory";
  createSubCategorySelectCategoryTitle = "Choose category";
  createSubCategorySelectCategoryFailedMessage = "You have to choose a category to create a SubCategory";
  createSubCategoryMissingFieldsMessage = "The following fields are required:";
  noSubCategoriesToShow = "There are currently no subcategories on this page";
  createSubCategoryUpdateSuccessMessage = "Successfully updated subcategory";
  createSubCategoryUpdateFailedMessage = "Error. Could not update subcategory";

  // Admin Header 
  GeneralHeaderAdmin = "General";


  // Admin Tabs 
  AnalyticsTabText = "Analytics";
  SalesTabText = "Sales";
  InventoryTabText = "Inventory";
  ProductSniperTabText = "Product Sniper";
  ManagementTabText = "Management";

  // Header tabs
  HomeTabText = "Home";
  ProductTabText = "Products";
  CategoriesTabText = "Categories";
  SubCategoriesTabText = "Sub categories";
  BasketTabText = "Basket";
  PaymentTabText = "Payment";
  ConfirmationTabText = "Confirmation";
  BackOfficeTabText = "BackOffice";
  SearchBarText = "Search";



  // Footer tabs
  BlogTabText = "Blog";
  PricingTabText = "Prices";
  AboutUsTabText = "About us";
  FAQTabText = "FAQ";
  ContactTabText = "Contact";
}