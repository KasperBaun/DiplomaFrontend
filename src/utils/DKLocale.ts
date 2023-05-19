import { ILocale } from "./ILocale";

export default class DKLocale implements ILocale {

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

  create = "Opret";
  cancel = "Annuller";
  update = "Opdater";
  delete = "Slet";
  product = "Produkt";
  products = "Produkter";
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
  noProductsAvailable = "Der er desvære ingen varer i denne kategori på nuværende tidspunkt";
  createProduct = "Opret produkt";
  editProduct = "Rediger produkt";
  deleteProduct = "Slet produkt";
  productImages = "Produkt billeder";
  manufacturer = "Producent";
  selectMaterial = "Vælg materiale";
  name = "Navn";
  modelNumber = "Modelnummer";
  callUs = "Ring til os";
  writeOnFacebook = "Skriv til os på Facebook";
  mapsLocation = "Google Maps lokation";
  city = "By";
  instagram = "Instagram";
  facebook = "Facebook";
  sendAnEmail = "Send en email";
  language = "Sprog";
  condition = "Stand";
  quality = "Sortering";
  addToBasket = "Læg i kurv";
  design = "Design";
  material = "Materiale";
  modelSpecifications = "Model specifikationer";
  productInfoHeadline = "General information";
  selectSubcategory = "Vælg underkategori";
  filterBySubcategory = "Filtrer efter underkategori";
  selectCategory = "Vælg kategori";
  filterByCategory = "Filtrer efter kategori";
  signIn = "Log ind";
  signUp = "Opret Konto";
  forgotPassword = "Glemt password?";
  alreadyHaveAccount = "Har du allerede en konto? Log ind";
  dontHaveAccount = "Har du ikke en konto? Opret en";
  rememberMe = "Husk mig";
  firstName = "Fornavn";
  lastName = "Efternavn";
  emailAdress = "Email";
  password = "Kodeord";
  createSuccess = "Oprettelse succesfuld";
  createFailed = "Oprettelse mislykkedes";
  updateSuccess = "Opdatering succesfuld";
  updateFailed = "Opdatering mislykkedes";
  deleteSuccess = "Sletning succesfuld";
  deleteFailed = "Sletning mislykkedes";
  confirmDeleteText = "Er du sikker på at du vil slette dette element?";
  weight = "Vægt";
  dimension = "Størrelse";
  year = "År";
  select = "Vælg";
  revenue = "Omsætning";
  danishCurrency = "DKK";
  kroner = "kr.";
  more = "Mere";
  than = "End";
  less = "Mindre";
  month = "Måned";
  last = "Sidste";
  storage = "Lager";
  value = "Værdi";
  inventory = "Lagerbeholdning";
  currency = "DKK";
  expenses = "Udgifter";
  result = "Resultat";
  results = "Resultater";
  inventoryValue = "Lagerværdi";
  yearToDate = "År til dato";
  YTD = "ÅTD";
  theme = "Tema";
  light = "Lys";
  dark = "Mørk";
  and = "Og";
  kpi = "Nøgleværdier";
  aov = "Gennemsnitlig ordreværdi";
  conversionRate = "Konverteringsrate";
  inventoryTurnover = "Lageromsætningshastighed";
  days = "Dage";
  average = "Gennemsnit";
  total = "Total";
  avg = "Gns.";
  inventoryTurnoverExplanation =   "Beskriver i gennemsnit, hvor længe hvert produkt er på lager, før det bliver sendt til en kunde. Jo lavere tallet er, jo bedre.";
  conversionRateExplanation = "Beskriver hvor mange af de besøgende, der bliver til kunder. Jo højere tallet er, jo bedre.";
  aovExplanation = "Beskriver den gennemsnitlige ordreværdi. Jo højere tallet er, jo bedre.";
  bestSellingProducts = "Bedst sælgende produkter";
  worstSellingProducts = "Dårligst sælgende produkter";
  inventoryValueExplanation = "Beskriver den samlede værdi af dit lager.";

  // Months
  january = "Januar";
  february = "Februar";
  march = "Marts";
  april = "April";
  may = "Maj";
  june = "Juni";
  july = "Juli";
  august = "August";
  september = "September";
  october = "Oktober";
  november = "November";
  december = "December";
  jan = "Jan";
  feb = "Feb";
  mar = "Mar";
  apr = "Apr";
  jun = "Jun";
  jul = "Jul";
  aug = "Aug";
  sep = "Sep";
  oct = "Okt";
  nov = "Nov";
  dec = "Dec";



  // AboutUS page
  company_description1 = "Vores fysiske butik ligger på Gammel Kongevej 94a, 1850 Frederiksberg.";
  company_description2 = "Vi køber og sælger guld og sølv, dansk porcelæn og keramik, samt andre spændende antikviteter.";
  opening_days = "Åbningstider";
  monday_text = "Mandag";
  tuesday_text = "Tirsdag";
  wednesday_text = "Onsdag";
  thursday_text = "Torsdag";
  friday_text = "Fredag";
  saturday_text = "Lørdag";
  public_holiday_text = "Helligdage";
  sunday_text = "Søndag";
  closed_text = "Lukket";
  per_agreement_text = "Efter aftale";
  contact_information = "Kontaktinformation";
  phone_text = "Telefon";
  email_text = "E-mail";
  address_text = "Adresse";
  post_code = "Postnummer";
  cvr_nr_text = "CVR-nummer";
  faq_text = "Ofte stillede spørgsmål:";
  q1_text = "Hvad er jeres returpolitik?";
  q1_answer = "Det er ikke muligt at returnere varer efter 24 timer.";
  q2_text = "Er det muligt at få leveret varer til udlandet?";
  q2_answer = "Efter aftale kan vi arrangere for levering af varer til udlandet, med forbehold for varens pris og afstanden til landet.";
  q3_text = "Kan jeg afhente mine varer i butikken?";
  q3_answer = "Det er altid muligt at afhente varer i butikken i åbningstiden.";


  // Front page
  seeProductBtn = "Se produkt";
  chosenCategories = "Udvalgte kategorier";

  //Pop-up : cart
  shopButton = "Gå til kurv";

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
  goToSales = "Se flere salg";
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
  CheckoutFormDeliveryOptionCollectLabel = "Afhent i butik";
  CheckoutFormDeliveryOptionSendLabel = "Forsendelse til faktureringsadresse";
  CheckoutFormDeliveryLabel = "Levering / Afhentning";
  CheckoutFormSubmitButton = "Fortsæt til Betaling";

  CheckoutPaymentWidgetPayButtonText = "Betal";
  CheckoutPaymentWidgetPayFormMPLabel = "Mobilnummer";
  CheckoutPaymentWidgetPayFormCardLabel = "Vælg betalingskort";
  CheckoutPaymentWidgetPayFormMMYYLabel = "MM/YY";
  CheckoutPaymentWidgetPayFormCardHolderLabel = "Kortholderens navn";
  CheckoutPaymentWidgetPayFormSecureLabel = "CVC";

  // Orders
  goToOrders = "Se flere Ordre";
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


}