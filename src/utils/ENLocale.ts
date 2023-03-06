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
  createCategorySuccessMessage = "Created category successfully";
  createCategoryFailedMessage = "Failed creating category";
  ProductCommaSeperatedText = "Add more products by comma seperating them like: Cup, Plate, Vase";

  // Subcategory
  createSubcategoryModalTitle = "Create subcategory";
  createSubcategoryCategoryTitle = "Choose subcategory";
  createSubcategoryTitle = "Title";
  createSubcategoryOrder = "Order";
  createSubcategoryImgUrl = "Image Url";
  createSubcategoryDescription = "Description";
  createSubcategorySubmit = "Create";
  createSubcategoryUpdate = "Update";
  createSubcategorySuccessMessage = "Subcategory created";
  createSubcategoryFailedMessage = "Error. Could not create subcategory";
  createSubcategorySelectCategoryTitle = "Choose category";
  createSubcategorySelectCategoryFailedMessage = "You have to choose a category to create a subcategory";
  createSubcategoryMissingFieldsMessage = "The following fields are required:";

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