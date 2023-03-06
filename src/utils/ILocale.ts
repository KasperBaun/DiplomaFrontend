export interface ILocale {
  id: string;
  aboutUs: string;
  aboutUsText: string;

  ///////////////////////////////////////////////////////////////////////////////
  // BACKOFFICE

  // Category
  createCategoryModalTitle: string;
  createCategoryTitle: string;
  createCategoryOrder: string;
  createCategoryImgUrl: string;
  createCategoryDescription: string;
  createCategorySubmit: string;
  createCategorySuccessMessage: string;
  createCategoryFailedMessage: string;
  ProductCommaSeperatedText: string;

  // Subcategory
  createSubcategoryCategoryTitle: string;
  createSubcategoryModalTitle: string;
  createSubcategoryTitle: string;
  createSubcategoryOrder: string;
  createSubcategoryImgUrl: string;
  createSubcategoryDescription: string;
  createSubcategorySubmit: string;
  createSubcategoryUpdate: string;
  createSubcategorySuccessMessage: string;
  createSubcategoryFailedMessage: string;
  createSubcategoryUpdateSuccessMessage: string;
  createSubcategoryUpdateFailedMessage: string;
  createSubcategorySelectCategoryTitle: string;
  createSubcategorySelectCategoryFailedMessage: string;
  createSubcategoryMissingFieldsMessage: string;

  // Admin Header 
  GeneralHeaderAdmin: string;

  //Admin Tabs
  AnalyticsTabText: string;
  SalesTabText: string;
  InventoryTabText: string;
  ProductSniperTabText: string;
  ManagementTabText: string;

  ///////////////////////////////////////////////////////////////////////////////

  // Header tabs
  HomeTabText: string;
  ProductTabText: string;
  CategoriesTabText: string;
  SubCategoriesTabText: string;
  BasketTabText: string;
  PaymentTabText: string;
  ConfirmationTabText: string;
  BackOfficeTabText: string;
  SearchBarText: string;

  // Footer tabs
  BlogTabText: string;
  PricingTabText: string;
  AboutUsTabText: string;
  FAQTabText: string;
  ContactTabText: string;
}