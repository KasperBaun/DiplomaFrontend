export interface ILocale {
  id: string;
  aboutUs: string;
  aboutUsText: string;

  // Category Admin
  createCategoryModalTitle: string;
  createCategoryTitle: string;
  createCategoryOrder: string;
  createCategoryImgUrl: string;
  createCategoryDescription: string;
  createCategorySubmit: string;
  createCategorySuccessMessage: string;
  createCategoryFailedMessage: string;
  ProductCommaSeperatedText: string;
  updateCategoryFormTitle: string;
  updateCategoryFormOrder: string;
  updateCategoryFormDescription: string;
  updateCategoryFormImgURL: string;
  updateCategoryFormOrderDesc: string;
  updateCategoryFormDescriptionDesc: string;
  updateCategorySubmit: string;
  ///////////////////////////////////////////////////////////////////////////////
  // BACKOFFICE

  // Subcategory
  createSubCategoryCategoryTitle: string;
  createSubCategoryModalTitle: string;
  createSubCategoryTitle: string;
  createSubCategoryOrder: string;
  createSubCategoryImgUrl: string;
  createSubCategoryDescription: string;
  createSubCategorySubmit: string;
  createSubCategoryUpdate: string;
  createSubCategorySuccessMessage: string;
  createSubCategoryFailedMessage: string;
  createSubCategorySelectCategoryTitle: string;
  createSubCategorySelectCategoryFailedMessage: string;
  createSubCategoryMissingFieldsMessage: string;
  noSubCategoriesToShow: string;
  createSubCategoryUpdateSuccessMessage: string;
  createSubCategoryUpdateFailedMessage: string;

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

  // ProductPage
  productPage_productName: string;
  productPage_productModelNumber: string;
  productPage_productMaterial: string;
  productPage_productDesign: string;
  productPage_productCondition: string;
  productPage_productQuality: string;
  productPage_productDimension: string;
  productPage_productCustomText: string;

}

