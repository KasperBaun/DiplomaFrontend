import { ILocale } from "./ILocale";

export default class ENLocale implements ILocale {
    id = "en_US";
    aboutUs = "About Us";
    aboutUsText = "We sell porcelain";

    // Category Admin
    ProductCommaSeperatedText = "Add more products by comma seperating them like: Cup, Plate, Vase";

      // Header tabs
      HomeTabText = "Home"
      ProductTabText = "Products"
      CategoriesTabText = "Categories"
      SubCategoriesTabText = "Sub categories"
      BasketTabText = "Basket"
      PaymentTabText = "Payment"
      ConfirmationTabText = "Confirmation"
      BackOfficeTabText = "BackOffice"
      SearchBarText = "Search"

  
      // Footer tabs
      BlogTabText = "Blog"
      PricingTabText = "Prices"
      AboutUsTabText = "About us"
      FAQTabText = "FAQ"
      ContactTabText = "Contact"
}