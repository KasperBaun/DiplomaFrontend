import { ILocale } from "./ILocale";

export default class DKLocale implements ILocale {
  id = "da_DK";
  aboutUs = "Om os";
  aboutUsText = "Vi sælger porcelæn .....";

  // Standard text
  create = "Opret";
  cancel = "Annuller";
  update = "Opdater";
  product = "Produkt";
  reset = "Nulstil";
  search = "Søg";
  showAll = "Vis alle";
  showMore = "Vis flere";
  sold = "Solgt";
  forSale = "Til salg";
  price = "Pris";
  description = "Beskrivelse";
  settings = "Indstillinger";
  notifications = "Notifikationer";

  // Button text
  buttonCancelText = "Annuller";
  buttonDeleteText = "Slet";
  confirmDeleteText = "Er du sikker på at du vil slette dette element?";
  getQuality(qualityType: number): string {
    switch (qualityType) {
      case 1: return "1. Sortering";
      case 2: return "2. Sortering";
      case 3: return "3. Sortering";
      default: return "Sortering er ikke defineret";
    }
  }

  getCondition(conditionType: number): string {
    switch (conditionType) {
      case 1: return "Ingen skår";
      case 2: return "Få skår";
      case 3: return "Mange skår";
      default: return "Stand er ikke defineret";
    }
  }

  getMaterialType(materialType: number): string {
    switch (materialType) {
      case 1: return "Porcelæn";
      case 2: return "Stål";
      case 3: return "Glas";
      case 4: return "Guld";
      case 5: return "Sølv";
      case 6: return "Keramik";
      case 7: return "Stentøj";
      case 8: return "Fajance";
      default: return "Materiale er ikke defineret";
    }
  }

  // AboutUS page
  copanyDescription = "Vores fysiske butik ligger på Gammel Kongevej 94a, 1850 Frederiksberg. Vi køber og sælger Guld & Sølv, dansk porcelæn og keramik, samt andre spændende antikviteter. "
  openingDays = "Åbninstider"
  MondayText = "Mandag"
  TuesdayText = "Tirsdag";
  WendsayText = "Onsdag";
  ThursdayText = "Torsdag"; 
  FridayText = "Fredag";
  SaturdayText = "Lørdag"; 
  publicHollidayText = "Helligdage";
  SundayText = "Søndag"; 
  ClosedText = "Lukket";
  PerAgreemtText = "Per aftale";
  contactInformation = "Kontakt information"
  phoneText =  "Telefon";
  emailText =  "Email";
  addressText = "Addresse";
  CVRNRText =  "CVR Nr";
  FAQText =  "Ofte stillede spørgsmål:";
  Q1Text = "Hvad er jeres retunerings politik?";
  Q1Awnser = "Det er ikke muligt at retunere varer efter 24 timer."; 
  Q2Text = "Er det muligt at få leveret vare til udlandet?";
  Q2Awnser =  "Per aftale kan det arrangeres at få leveret vare til udlandet, dog med forbehold for varens pris samt distancen til landet." 
  Q3Text = "Kan jeg afhente min varer i buttikken?"
  Q3Awnser = "Det er altid en mulighed selv at hente varer i buttiken  inden for åbningstiderne." 


  //Basket Page
  yourBasket = "Din indkøbskurv";
  yourTotal = "Pris"
  deliveryOptions = "Levering:"
  paymentOptions = "Vi acceptere";
  subTotal = "Subtotal:";
  procesFee = "Behandlings gebyr:";
  totalIncMoms = "Pris i alt (inklusiv moms):"
  checkOutText = "Checkout"
  addDiscountCode = "Tilføj rabatkode"
  discountCodeOptional = "Discount kode (valgfri)"
  addButton = "Tilføj"

  // Category Admin
  createCategoryDialogTitle = "Opret ny kategori";
  createCategoryTitle = "Titel";
  createCategoryOrder = "Rækkefølge";
  createCategoryImgUrl = "Billede Url";
  createCategoryDescription = "Beskrivelse";
  createCategorySubmit = "Opret";
  createCategorySuccessMessage = "Kategory oprettet!";
  createCategoryFailedMessage = "Fejl. Kunne ikke oprette kategori!";
  ProductCommaSeperatedText = "Tilføj flere produkter ved at comma separere, såsom Tallerken, Kop, Skål";
  // Update Form
  updateCategoryDialogTitle = "Opdater kategori";
  updateCategoryFormTitle = "Titel";
  updateCategoryFormOrder = "Rækkefølge";
  updateCategoryFormDescription = "Beskrivelse";
  updateCategoryFormImgURL = "Billede URL";
  updateCategoryFormOrderDesc = "Indstiller visnings rækkefølgen på website";
  updateCategoryFormDescriptionDesc = "Beskriver detajler om varene i denne katagori";
  updateCategorySubmit = "Opdater";
  updateCategorySuccessMessage = "Kategory opdateret!";
  updateCategoryFailedMessage = "Fejl. Kunne ikke opdatere kategori!";

  deleteCategorySuccessMessage = "Kategory slettet!";
  deleteCategoryFailedMessage = "Fejl. Kunne ikke slette kategori!";

  // Subcategory
  createSubCategoryCategoryTitle = "Vælg kategori";
  createSubCategoryDialogTitle = "Opret underkategori";
  createSubCategoryTitle = "Titel";
  createSubCategoryOrder = "Rækkefølge";
  createSubCategoryImgUrl = "Billede Url";
  createSubCategoryDescription = "Beskrivelse";
  createSubCategorySubmit = "Opret";
  createSubCategoryUpdate = "Opdater";
  createSubCategorySuccessMessage = "Underkategory oprettet";
  createSubCategoryFailedMessage = "Fejl. Kunne ikke oprette underkategori";
  createSubCategorySelectCategoryTitle = "Vælg kategori";
  createSubCategorySelectCategoryFailedMessage = "Du skal vælge en kategori for at oprette en underkategori";
  createSubCategoryMissingFieldsMessage = "Følgende felter er påkrævede:";
  noSubCategoriesToShow = "Der er ikke endnu nogen subkategorier på denne side";
  createSubCategoryUpdateSuccessMessage = "Opdatering gennemført";
  createSubCategoryUpdateFailedMessage = "Kunne ikke gennemføre opdatering";

  // Product
  productPage_productName = "Titel";
  productPage_productModelNumber = "Model nummer";
  productPage_productMaterial = "Materiale";
  productPage_productDesign = "Design";
  productPage_productCondition = "Stand";
  productPage_productQuality = "Sortering";
  productPage_productDimension = "Størrelse";
  productPage_productCustomText = "Ekstra information";
  productPage_createProduct = "Opret produkt";
  productPage_weight = "Vægt";

  productPage_modelSpecifications = "Model specifikationer";
  productPage_productInfoHeadline = "General information";
  selectSubcategory = "Vælg underkategori";
  filterBySubcategory = "Filtrer efter underkategori";
  selectCategory = "Vælg kategori";
  filterByCategory = "Filtrer efter kategori";

  // Analysis
  AnalysisTitle = "Guld & Sølv";
  AnalysisMaterial = "Materiale";
  AnalysisItems = "Enheder på lager";
  AnalysisWeight = "Samlet vægt";
  AnalysisPricePrKg = "Kilopris";
  AnalysisSummary = "Nuværende værdi";
  AnalysisSilver = "Sølv";
  AnalysisGold = "Guld";

  // Admin Header 
  GeneralHeaderAdmin = "Generelt";

  // Admin Tabs 
  AnalyticsTabText = "Analyse";
  SalesTabText = "Salg";
  InventoryTabText = "Lager";
  ProductSniperTabText = "Produktsniper";
  ManagementTabText = "Styring";
  OrdersTabText = "Ordre";
  LogoutTabText = "Log ud";

  // Admin Dashboard
  EconomyWidgetSalesFormat = "Salg (DKK)";
  EconomyWidgetTitle = "Indtægter / Udgifter";
  RecentSalesDatePaid = "Salgsdato";
  RecentSalesApproved = "Betaling Godkendt";
  RecentSalesMethod = "Betalingsmetode";
  RecentSalesAmount = "Salgspris";
  RecentSalesNavButton = "Se flere salg";
  RecentSalesWidgetTitle = "Seneste Salg";
  RecentSalesCurrencyId = "DKK";


  // Header tabs
  HomeTabText = "Hjem";
  ProductTabText = "Produkter";
  CategoriesTabText = "Kategorier";
  SubCategoriesTabText = "Underkategorier";
  BasketTabText = "Kurv";
  PaymentTabText = "Betaling";
  ConfirmationTabText = "Bekræftelse";
  BackOfficeTabText = "Dashboard";
  SearchBarText = "Søg";
  CatalogTabText = "Katalog";

  // Footer tabs
  BlogTabText = "Blog";
  OldPageText = "Gamle hjemmeside";
  AboutUsTabText = "Om os";
  FAQTabText = "FAQ";
  ContactTabText = "Kontakt";

  // Payments
  GoToSales = "Se flere salg";
  SalesSummaryTitle = "Salgs oversigt";
  SalesSummaryTotalSales = "Salg (total)";
  SalesSummaryTotalAmount = "Sum (total)";

  ShoppingCartWidgetPaymentFeeLabel = "Betalingsgebyr";
  ShoppingCartWidgetTotalLabel = "Total før rabat";
  ShoppingCartWidgetTotalAmountLabel = "Samlet pris (Inkl. moms)";

  CheckoutFormTitle = "Faktureringsoplysninger";
  CheckoutFormFirstNameLabel = "Fornavn";
  CheckoutFormLastNameLabel = "Efternavn";
  CheckoutFormEmailLabel = "Email";
  CheckoutFormAddressLabel = "Vej/Gade & Husnummer";
  CheckoutFormZipCodeLabel = "Postnummer";
  CheckoutFormCityLabel = "By";
  CheckoutFormCountryLabel = "Land";
  CheckoutFormCountryCodeLabel = "Landekode";
  CheckoutFormPhoneLabel = "Telefonnummer";
  CheckoutFormSubmitButton = "Fortsæt til Betaling";

  CheckoutPaymentWidgetPayButtonText = "Betal";
  CheckoutPaymentWidgetPayFormMPLabel = "Mobilnummer";
  CheckoutPaymentWidgetPayFormCardLabel = "Vælg betalingskort";
  CheckoutPaymentWidgetPayFormMMYYLabel = "MM/YY";
  CheckoutPaymentWidgetPayFormCardHolderLabel = "Kortholderens navn";
  CheckoutPaymentWidgetPayFormSecureLabel = "CVC";

  // Orders
  GoToOrders = "Se flere Ordre";
  OrderDetailsProductName = "Produkt(er)";
  OrderDetailsManufacturer = "Mærke";
  OrderDetailsCustomerId = "Kunde (Id)";
  OrderDetailsPaymentStatus = "Betalingsstatus";
  OrderDetailsDeliveryStatus = "Afsendelsesstatus";
  OrderDetailsDiscountTag = "Discount brugt";
  OrderDetailsCompletionStatus = "Status";
  OrderDetailsListTitle = "Seneste Ordre";

  // Sniper
  TableEntrySniperSource = "Kilde";
  TableEntrySniperVN = "Varenummer";
  TableEntrySniperTitle = "Titel";
  TableEntrySniperBuyNowPrice = "Pris";
  TableEntrySniperNextBid = "Næste Bud";
  TableEntrySniperPriceEst = "Estimat";
  TableEntrySniperDescription = "Beskrivelse";
  TableEntrySniperImages = "Billede(r)";
  TableEntrySniperItemUrl = "URL";
  SniperFormMutedText = "Søgeresultater kommer fra lauritz.com og dba.dk";
  SniperFormButtonText = "Søg";
  SniperFormLabelText = "Indtast produkt du vil søge efter";
  SniperFormTitleText = "Pris Sniper";

  // Inventory
  InventoryAmountLabel = "Produkter: ";
  InventoryWidgetTitle = "Lagerbeholdning";
  InventoryTitle = "Titel";

  // Loginpage
  signInText = "Log ind";
  signUpText = "Opret Konto";
  forgotPasswordText = "Glemt password?";
  alreadyHaveAccountText = "Har du allerede en konto? Log ind";
  dontHaveAccountText = "Har du ikke en konto? Opret en";
  rememberMeText = "Husk mig";

  // Signup page
  firstName = "Fornavn";
  lastName = "Efternavn";
  emailAdress = "Email";
  password = "Kodeord";
}