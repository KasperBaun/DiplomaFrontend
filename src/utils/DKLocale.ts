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



  //Basket Page
  yourBasket = "Din indkøbskurv";
  yourTotal = "Pris i alt" 
  deliveryOptions = "Levering:"
  paymentOptions = "Vi acceptere";

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
  PricingTabText = "Priser";
  AboutUsTabText = "Om os";
  FAQTabText = "Ofte stillede spørgsmål";
  ContactTabText = "Kontakt";

  // Payments
  GoToSales = "Se flere salg";
  SalesSummaryTitle = "Salgs oversigt";
  SalesSummaryTotalSales = "Salg (total)";
  SalesSummaryTotalAmount = "Sum (total)";

  // Orders
  GoToOrders = "Se flere Ordre";
  OrderDetailsProductName = "Produkt";
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