import DKLocale from "./DKLocale";
import ENLocale from "./ENLocale";

export default class Localization {

    static Handler(textItem : string, locale : string) : string {
        let retVal = ""
        if(locale === "Dansk") {
            const _dk = new DKLocale();
            retVal = this.FindElement(_dk, textItem)
        }

        if(locale === "English") {
            const _en = new ENLocale();
            retVal = this.FindElement(_en, textItem)
        }
        return retVal;
    }

    static FindElement(lang : DKLocale | ENLocale, textItem : string) : string {
        let retVal = "";
        switch (textItem) {
            case "aboutUs": retVal = lang.aboutUs; break;
            case "aboutUsText": retVal = lang.aboutUsText; break;

            // Category Admin
            case "ProductCommaSeperatedText": retVal = lang.ProductCommaSeperatedText; break;
            default: retVal = "Could not find value"; break;
        }

        return retVal;
    }
}
