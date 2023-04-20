export interface ILocale {
  id: string;
  aboutUs: string;
  aboutUsText: string;

  // Standard text
  create: string;
  cancel: string;
  update: string;

  // Button text
  buttonCancelText: string;
  buttonDeleteText: string;
  confirmDeleteText: string;

  getQuality(qualityType: number): string;
  getCondition (conditionType: number): string; 

  getMaterialType(materialType : number): string; 

  // Category Admin
  createCategoryDialogTitle: string;
  createCategoryTitle: string;
  createCategoryOrder: string;
  createCategoryImgUrl: string;
  createCategoryDescription: string;
  createCategorySubmit: string;
  createCategorySuccessMessage: string;
  createCategoryFailedMessage: string;

  updateCategoryDialogTitle: string;
  updateCategoryFormTitle: string;
  updateCategoryFormOrder: string;
  updateCategoryFormDescription: string;
  updateCategoryFormImgURL: string;
  updateCategoryFormOrderDesc: string;
  updateCategoryFormDescriptionDesc: string;
  updateCategorySubmit: string;
  updateCategorySuccessMessage: string;
  updateCategoryFailedMessage: string;

  deleteCategorySuccessMessage: string;
  deleteCategoryFailedMessage: string;
  
  ProductCommaSeperatedText: string;
  // BasketPage: 
  yourBasket: string;
  yourTotal: string; 
  deliveryOptions: string;
  paymentOptions: string;

  // BACKOFFICE

  // Subcategory
  createSubCategoryCategoryTitle: string;
  createSubCategoryDialogTitle: string;
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

  // Product
  productPage_productName: string;
  productPage_productModelNumber: string;
  productPage_productMaterial: string;
  productPage_productDesign: string;
  productPage_productCondition: string;
  productPage_productQuality: string;
  productPage_productDimension: string;
  productPage_weight : string; 
  productPage_productCustomText: string;
  productPage_createProduct: string;

  productPage_modelSpecifications: string; 
  productPage_productInfoHeadline: string; 


  // Admin Header 
  GeneralHeaderAdmin: string;

  //Admin Tabs
  AnalyticsTabText: string;
  SalesTabText: string;
  InventoryTabText: string;
  ProductSniperTabText: string;
  ManagementTabText: string;
  OrdersTabText: string;
  LogoutTabText: string;

  // Admin Dashboard
  EconomyWidgetSalesFormat: string;
  EconomyWidgetTitle: string;
  RecentSalesWidgetTitle: string;
  RecentSalesDatePaid: string;
  RecentSalesAmount: string;
  RecentSalesApproved: string;
  RecentSalesMethod: string;
  RecentSalesNavButton: string;
  RecentSalesCurrencyId: string;

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
  CatalogTabText: string;

  // Payments
  GoToSales: string;
  SalesSummaryTitle: string;
  SalesSummaryTotalSales: string;
  SalesSummaryTotalAmount: string;

  // Analysis
  AnalysisTitle : string;
  AnalysisMaterial : string;
  AnalysisItems : string;
  AnalysisWeight : string;
  AnalysisPricePrKg : string;
  AnalysisSummary : string;
  AnalysisSilver : string;
  AnalysisGold : string;

  // Orders
  GoToOrders: string;
  OrderDetailsProductName : string;
  OrderDetailsManufacturer : string;
  OrderDetailsCustomerId : string;
  OrderDetailsPaymentStatus : string;
  OrderDetailsDeliveryStatus : string;
  OrderDetailsDiscountTag : string;
  OrderDetailsCompletionStatus : string;
  OrderDetailsListTitle : string;

  // <TableCell align="left">Product Name</TableCell>
  // <TableCell align="left">Manufacturer</TableCell>
  // <TableCell align="left">Customer (Id)</TableCell>
  // <TableCell align="left">Payment Status</TableCell>
  // <TableCell align="left">Delivery Status</TableCell>
  // <TableCell align="left">Discount used</TableCell>
  // <TableCell align="left">Completed</TableCell>

  // Footer tabs
  BlogTabText: string;
  PricingTabText: string;
  AboutUsTabText: string;
  FAQTabText: string;
  ContactTabText: string;

  // Sniper
  TableEntrySniperVN: string;
  TableEntrySniperSource: string;
  TableEntrySniperTitle: string;
  TableEntrySniperBuyNowPrice: string;
  TableEntrySniperNextBid: string;
  TableEntrySniperPriceEst: string;
  TableEntrySniperDescription: string;
  TableEntrySniperImages: string;
  TableEntrySniperItemUrl: string;
  SniperFormMutedText : string;
  SniperFormButtonText : string;
  SniperFormLabelText : string;
  SniperFormTitleText : string;

  // Inventory
  InventoryAmountLabel : string;
  InventoryTitle : string;
  InventoryWidgetTitle : string;

  // Loginpage
  signInText: string;
  signUpText: string;
  forgotPasswordText: string;
  alreadyHaveAccountText: string;
  dontHaveAccountText: string;
  rememberMeText: string;

  // Signup page
  firstName: string;
  lastName: string;
  emailAdress: string;
  password: string;
}