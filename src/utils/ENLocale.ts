import { ILocale } from "./ILocale";

export default class ENLocale implements ILocale {

  getQuality(qualityType: number): string {
    switch (qualityType) {
      case 1: return "1. Quality";
      case 2: return "2. Quality";
      case 3: return "3. Quality";
      default: return "Sorting not defined";
    }
  }

  getCondition(conditionType: number): string {
    switch (conditionType) {
      case 1: return "No shards";
      case 2: return "Few shards";
      case 3: return "Many shards";
      default: return "Condition not defined";
    }
  }

  getMaterialType(materialType: number): string {
    switch (materialType) {
      case 1: return "Porcelain";
      case 2: return "Steel";
      case 3: return "Glass";
      case 4: return "Gold";
      case 5: return "Silver";
      case 6: return "Ceramics";
      case 7: return "Stoneware";
      case 8: return "Fajance";
      default: return "Material not defined";
    }
  }

  create = "Create";
  cancel = "Cancel";
  update = "Update";
  delete = "Delete";
  product = "Product";
  reset = "Reset";
  search = "Search";
  showAll = "Show All";
  showMore = "Show more";
  sold = "Sold";
  forSale = "For sale";
  price = "Price";
  description = "Description";
  settings = "Settings";
  notifications = "Notifications";
  noProductsAvailable = "There is currrently no products available in this category";
  createProduct = "Create Product";
  editProduct = "Edit Product";
  deleteProduct = "Delete Product";
  productImages = "Product Images";
  manufacturer = "Manufacturer";
  selectMaterial = "Select Material";
  name = "Name";
  modelNumber = "Model Number";
  callUs = "Call us";
  writeOnFacebook = "Write on Facebook";
  clickForMapsLocation = "Click for maps location";
  city = "City";
  instagram = "Instagram";
  facebook = "Facebook";
  sendAnEmail = "Send an email";

  // Snackbar texts
  createSuccess = "Create Success";
  createFailed = "Create Failed";
  updateSuccess = "Update Success";
  updateFailed = "Update Failed";
  deleteSuccess = "Delete Success";
  deleteFailed = "Delete Failed";
  confirmDeleteText = "Are you sure you want to delete this item?";

 

  //Basket Page
  yourBasket = "Your basket";
  yourTotal = "Price"
  deliveryOptions = "Delivery Options:"
  paymentOptions = "Payment Options";
  subTotal = "Subtotal:";
  procesFee = "Handling fees:";
  totalIncMoms = "Price in total (including taxs):"
  checkOutText = "Checkout"
  addDiscountCode = "Add dicsount code"
  discountCodeOptional = "Discount code (optional)"
  addButton = "Add"

  // AboutUS page
  company_description = "Our physical store is located at Gammel Kongevej 94a, 1850 Frederiksberg. We buy and sell gold & silver, Danish porcelain and ceramics, as well as other exciting antiques."
  opening_days = "Opening Hours"
  monday_text = "Monday"
  tuesday_text = "Tuesday"
  wednesday_text = "Wednesday"
  thursday_text = "Thursday"
  friday_text = "Friday"
  saturday_text = "Saturday"
  public_holiday_text = "Public Holidays"
  sunday_text = "Sunday"
  closed_text = "Closed"
  per_agreement_text = "By appointment only"
  contact_information = "Contact Information"
  phone_text = "Phone"
  email_text = "Email"
  address_text = "Address"
  post_code = "Post Code"
  cvr_nr_text = "CVR Number"
  faq_text = "Frequently Asked Questions:"
  q1_text = "What is your return policy?"
  q1_answer = "It is not possible to return goods after 24 hours."
  q2_text = "Is it possible to have items delivered internationally?"
  q2_answer = "By appointment, we can arrange for goods to be delivered internationally, subject to the price of the item and the distance to the destination."
  q3_text = "Can I collect my items from the store?"
  q3_answer = "It is always possible to collect items from the store during opening hours."

  // Front page
  seeProductBtn = "See product";
  chosenCategories = "Chosen Categories"

  //Pop-up : cart
  shopButton = "Go to cart";

  // Category Admin
  createCategoryDialogTitle = "Create Category";
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
  updateCategoryDialogTitle = "Update Category";
  updateCategoryFormTitle = "Title";
  updateCategoryFormOrder = "Order";
  updateCategoryFormDescription = "Description";
  updateCategoryFormImgURL = "Image URL";
  updateCategoryFormOrderDesc = "Sets the order in which categories will be displayed on the website";
  updateCategoryFormDescriptionDesc = "Describes details about the products in this category";
  updateCategorySubmit = "Update";
  deleteCategorySuccessMessage = "Category deleted successfully!";
  deleteCategoryFailedMessage = "Failed to delete category!";

  // SubCategory
  createSubCategoryCategoryTitle = "Select Category";
  createSubCategoryDialogTitle = "Create Subcategory";
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

  // Product
  productPage_productName = "Title";
  productPage_productModelNumber = "Model number";
  productPage_productMaterial = "Material";
  productPage_productDesign = "Design";
  productPage_productCondition = "Condition";
  productPage_productQuality = "Quality";
  productPage_productDimension = "Dimension";
  productPage_productCustomText = "Extra information";
  productPage_weight = "Weight";
  productPage_createProduct = "Create product";
  productPage_modelSpecifications = "Model specifictations";
  productPage_productInfoHeadline = "General info";
  selectSubcategory = "Select subcategory";
  filterBySubcategory = "Filter by subcategory";
  selectCategory = "Select category";
  filterByCategory = "Filter by category";

  // Analysis
  AnalysisTitle = "Gold and Silver";
  AnalysisMaterial = "Material";
  AnalysisItems = "Items in Stock";
  AnalysisWeight = "Weight";
  AnalysisPricePrKg = "Price pr. Kg";
  AnalysisSummary = "Price summary";
  AnalysisSilver = "Silver";
  AnalysisGold = "Gold";



  // Admin Header 
  GeneralHeaderAdmin = "General";


  // Admin Tabs 
  AnalyticsTabText = "Analytics";
  SalesTabText = "Sales";
  InventoryTabText = "Inventory";
  ProductSniperTabText = "Productsniper";
  ManagementTabText = "Management";
  OrdersTabText = "Orders";
  LogoutTabText = "Log out";

  // Admin Dashboard
  EconomyWidgetSalesFormat = "Sales ($)";
  EconomyWidgetTitle = "Revenue / Expenses";
  RecentSalesDatePaid = "Date";
  RecentSalesApproved = "Payment Approved";
  RecentSalesMethod = "Payment Method";
  RecentSalesAmount = "Sale Amount";
  RecentSalesNavButton = "See more orders";
  RecentSalesWidgetTitle = "Recent Sales";
  RecentSalesCurrencyId = "$";

  // Header tabs
  HomeTabText = "Home";
  ProductTabText = "Products";
  CategoriesTabText = "Categories";
  SubCategoriesTabText = "Subcategories";
  BasketTabText = "Basket";
  PaymentTabText = "Payment";
  ConfirmationTabText = "Confirmation";
  BackOfficeTabText = "Dashboard";
  SearchBarText = "Search";
  CatalogTabText = "Catalog";

  // Payments
  GoToSales = "See more sales";
  SalesSummaryTitle = "Sales Summary";
  SalesSummaryTotalSales = "Sales (total)";
  SalesSummaryTotalAmount = "Amount (total)";

  ShoppingCartWidgetPaymentFeeLabel = "Payment fee(s)";
  ShoppingCartWidgetTotalLabel = "Total w/o discount";
  ShoppingCartWidgetTotalAmountLabel = "Total incl. tax";

  CheckoutFormTitle = "Checkout";
  CheckoutFormFirstNameLabel = "Firstname";
  CheckoutFormLastNameLabel = "Lastname";
  CheckoutFormEmailLabel = "Email";
  CheckoutFormAddressLabel = "Address";
  CheckoutFormZipCodeLabel = "Zipcode";
  CheckoutFormCityLabel = "City";
  CheckoutFormCountryLabel = "Country";
  CheckoutFormCountryCodeLabel = "Countrycode";
  CheckoutFormPhoneLabel = "Phonenumber";
  CheckoutFormDeliveryLabel = "Delivery method";
  CheckoutFormDeliveryOptionCollectLabel = "Collect at store";
  CheckoutFormDeliveryOptionSendLabel = "Ship to Billing Address";
  CheckoutFormSubmitButton = "Continue to payment";

  CheckoutPaymentWidgetPayButtonText = "Pay";
  CheckoutPaymentWidgetPayFormMPLabel = "Phone number";
  CheckoutPaymentWidgetPayFormCardLabel = "Choose card type";
  CheckoutPaymentWidgetPayFormMMYYLabel = "MM/YY";
  CheckoutPaymentWidgetPayFormCardHolderLabel = "Cardholders name";
  CheckoutPaymentWidgetPayFormSecureLabel = "CVC";

  // Orders
  GoToOrders = "See more Orders";
  OrderDetailsProductName = "Product(s)";
  OrderDetailsManufacturer = "Fabricator";
  OrderDetailsCustomerId = "Customer (Id)";
  OrderDetailsPaymentStatus = "Payment Status";
  OrderDetailsDeliveryStatus = "Delivery Status";
  OrderDetailsDiscountTag = "Discount used";
  OrderDetailsCompletionStatus = "Completed?";
  OrderDetailsListTitle = "Order Summary";

  // Footer tabs
  BlogTabText = "Blog";
  OldPageText = "Old webpage";
  AboutUsTabText = "About us";
  FAQTabText = "FAQ";
  ContactTabText = "Contact";



  // Sniper
  TableEntrySniperSource = "Source";
  TableEntrySniperVN = "Lot Id";
  TableEntrySniperTitle = "Title";
  TableEntrySniperBuyNowPrice = "Price";
  TableEntrySniperNextBid = "Next Bid";
  TableEntrySniperPriceEst = "Estimation";
  TableEntrySniperDescription = "Description";
  TableEntrySniperImages = "Image(s)";
  TableEntrySniperItemUrl = "URL";
  SniperFormMutedText = "Currently we will look for data on Lauritz.com and dba.dk";
  SniperFormButtonText = "Search";
  SniperFormLabelText = "Enter Search Value";
  SniperFormTitleText = "Price Sniper";

  // Inventory
  InventoryAmountLabel = "Total Products: ";
  InventoryWidgetTitle = "Inventory";
  InventoryTitle = "Title";

  // Loginpage
  signIn = "SIGN IN";
  signUp = "Sign Up";
  forgotPassword = "Forgot Password?";
  alreadyHaveAccount = "Already have an account? Sign in";
  dontHaveAccount = "Don't have an account? Sign Up";
  rememberMe = "Remember me";

  // Signup page
  firstName = "First Name";
  lastName = "Last Name";
  emailAdress = "Email Address";
  password = "Password";
}