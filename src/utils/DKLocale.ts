import { ILocale } from "./ILocale";

export default class DKLocale implements ILocale {
  id = "da_DK";
  aboutUs = "Om os";
  aboutUsText = "Vi sælger porcelæn .....";

  // Category Admin
  createCategoryModalTitle = "Opret ny kategori";
  createCategoryTitle = "Titel";
  createCategoryOrder = "Rækkefølge";
  createCategoryImgUrl = "Billede Url";
  createCategoryDescription = "Beskrivelse";
  createCategorySubmit = "Opret";
  createCategorySuccessMessage = "Kategory oprettet!";
  createCategoryFailedMessage = "Fejl. Kunne ikke oprette kategori!";
  ProductCommaSeperatedText = "Tilføj flere produkter ved at comma separere, såsom Tallerken, Kop, Skål";
  // Update Form
  updateCategoryFormTitle = "Titel";
  updateCategoryFormOrder = "Rækkefølge";
  updateCategoryFormDescription = "Beskrivelse";
  updateCategoryFormImgURL = "Billede URL"; 
  updateCategoryFormOrderDesc = "Indstiller visnings rækkefølgen på website";
  updateCategoryFormDescriptionDesc = "Beskriver detajler om varene i denne katagori";
  updateCategorySubmit = "Opdater";
  updateCategorySuccessMessage = "Kategory opdateret!";
  updateCategoryFailedMessage = "Fejl. Kunne ikke opdatere kategori!";

  // Subcategory
  createSubCategoryCategoryTitle = "Vælg kategori";
  createSubCategoryModalTitle = "Opret underkategori";
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

  // Admin Header 
  GeneralHeaderAdmin = "Generelt";

  // Admin Tabs 
  AnalyticsTabText = "Analyse";
  SalesTabText = "Salg";
  InventoryTabText = "Lager";
  ProductSniperTabText = "Produkt Sniper";
  ManagementTabText = "Styring";

  // Admin Dashboard
  EconomyWidgetSalesFormat = "Salg (DKK)";


  // Header tabs
  HomeTabText = "Hjem";
  ProductTabText = "Produkter";
  CategoriesTabText = "Kategorier";
  SubCategoriesTabText = "Under kategorier";
  BasketTabText = "Kurv";
  PaymentTabText = "Betaling";
  ConfirmationTabText = "Bekræftelse";
  BackOfficeTabText = "BackOffice";
  SearchBarText = "Søg";

  // Footer tabs
  BlogTabText = "Blog";
  PricingTabText = "Priser";
  AboutUsTabText = "Om os";
  FAQTabText = "Ofte stillede spørgsmål";
  ContactTabText = "Kontakt";
}