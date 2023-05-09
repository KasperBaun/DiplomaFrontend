export interface ILocale {

  getQuality(qualityType: number): string;
  getCondition(conditionType: number): string;
  getMaterialType(materialType: number): string;

  create: string;
  cancel: string;
  update: string;
  delete: string;
  product: string;
  reset: string;
  search: string;
  showAll: string;
  showMore: string;
  sold: string;
  forSale: string;
  price: string;
  description: string;
  settings: string;
  notifications: string;
  noProductsAvailable: string;
  createProduct: string;
  editProduct: string;
  deleteProduct: string;
  productImages: string;
  manufacturer: string;
  selectMaterial: string;
  name: string;
  modelNumber: string;
  callUs: string;
  writeOnFacebook: string;
  clickForMapsLocation: string;
  city: string;
  instagram: string;
  facebook: string;
  sendAnEmail: string;

  // Snackbar texts
  createSuccess: string;
  createFailed: string;
  updateSuccess: string;
  updateFailed: string;
  deleteSuccess: string;
  deleteFailed: string;

  confirmDeleteText: string;

 

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
  subTotal: string;
  procesFee: string;
  totalIncMoms: string;
  checkOutText: string;
  addDiscountCode: string;
  discountCodeOptional: string;
  addButton: string;

  // AboutUS page
  company_description:string;
  opening_days:string;
  monday_text:string;
  tuesday_text:string;
  wednesday_text:string;
  thursday_text:string;
  friday_text:string;
  saturday_text:string;
  public_holiday_text:string;
  sunday_text:string;
  closed_text:string;
  per_agreement_text:string;
  contact_information:string;
  phone_text:string;
  email_text:string;
  address_text:string;
  post_code: string;
  cvr_nr_text:string;
  faq_text:string;
  q1_text:string;
  q1_answer:string;
  q2_text:string;
  q2_answer:string;
  q3_text:string;
  q3_answer:string;

  // Frontpage:
  seeProductBtn: string; 
  chosenCategories: string;

  //Pop-up : cart
  shopButton: string; 

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
  productPage_weight: string;
  productPage_productCustomText: string;
  productPage_createProduct: string;
  productPage_modelSpecifications: string;
  productPage_productInfoHeadline: string;
  selectSubcategory: string;
  filterBySubcategory: String;
  selectCategory: string;
  filterByCategory: string;


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

  ShoppingCartWidgetTotalLabel: string;
  ShoppingCartWidgetPaymentFeeLabel: string;
  ShoppingCartWidgetTotalAmountLabel: string;

  CheckoutFormTitle: string;
  CheckoutFormFirstNameLabel: string;
  CheckoutFormLastNameLabel: string;
  CheckoutFormEmailLabel: string;
  CheckoutFormAddressLabel: string;
  CheckoutFormZipCodeLabel: string;
  CheckoutFormCityLabel: string;
  CheckoutFormCountryLabel: string;
  CheckoutFormCountryCodeLabel: string;
  CheckoutFormPhoneLabel: string;
  CheckoutFormDeliveryLabel: string;
  CheckoutFormDeliveryOptionCollectLabel: string;
  CheckoutFormDeliveryOptionSendLabel: string;
  CheckoutFormSubmitButton: string;

  CheckoutPaymentWidgetPayButtonText : string;
  CheckoutPaymentWidgetPayFormMPLabel : string;
  CheckoutPaymentWidgetPayFormCardLabel : string;
  CheckoutPaymentWidgetPayFormMMYYLabel : string;
  CheckoutPaymentWidgetPayFormCardHolderLabel : string;
  CheckoutPaymentWidgetPayFormSecureLabel : string;

  // Analysis
  AnalysisTitle: string;
  AnalysisMaterial: string;
  AnalysisItems: string;
  AnalysisWeight: string;
  AnalysisPricePrKg: string;
  AnalysisSummary: string;
  AnalysisSilver: string;
  AnalysisGold: string;

  // Orders
  GoToOrders: string;
  OrderDetailsProductName: string;
  OrderDetailsManufacturer: string;
  OrderDetailsCustomerId: string;
  OrderDetailsPaymentStatus: string;
  OrderDetailsDeliveryStatus: string;
  OrderDetailsDiscountTag: string;
  OrderDetailsCompletionStatus: string;
  OrderDetailsListTitle: string;

  // Footer tabs
  BlogTabText: string;
  OldPageText: string;
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
  SniperFormMutedText: string;
  SniperFormButtonText: string;
  SniperFormLabelText: string;
  SniperFormTitleText: string;

  // Inventory
  InventoryAmountLabel: string;
  InventoryTitle: string;
  InventoryWidgetTitle: string;

  // Loginpage
  signIn: string;
  signUp: string;
  forgotPassword: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  rememberMe: string;

  // Signup page
  firstName: string;
  lastName: string;
  emailAdress: string;
  password: string;
}