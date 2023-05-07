import * as React from "react";
import { RootStore } from "./RootStore";
import { LanguageStore } from "./LanguageStore";
import { BackofficeStore } from "./BackofficeStore";
import { SniperStore } from "./SniperStore";
import { AuthStore } from "./AuthStore";
import { BasketStore } from "./BasketStore";
import { WebshopStore } from "./WebshopStore";

export interface IMobXContext {
    rootStore: RootStore;
    /* Webshop stores */
    languageStore: LanguageStore;
    webshopStore : WebshopStore;
    basketStore : BasketStore;
    
    /* Backoffice stores */
    authStore: AuthStore;
    backofficeStore: BackofficeStore;
    sniperStore : SniperStore;
}

const MobXContext = React.createContext<IMobXContext>(undefined);
MobXContext.displayName = "MobXContext";
export default MobXContext;