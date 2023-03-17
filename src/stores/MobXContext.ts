import * as React from "react";
import { RootStore } from "./RootStore";
import { ProductStore } from "./ProductStore";
import { CategoryStore } from "./CategoryStore";
import { LanguageStore } from "./LanguageStore";
import { SubCategoryStore } from "./SubCategoryStore";
import { PaymentStore } from "./PaymentStore";
import { BackofficeStore } from "./BackofficeStore";

export interface IMobXContext {
    productStore: ProductStore;
    rootStore: RootStore;
    categoryStore : CategoryStore;
    subCategoryStore : SubCategoryStore;
    languageStore: LanguageStore;
    paymentStore : PaymentStore;
    backofficeStore: BackofficeStore;
}

const MobXContext = React.createContext<IMobXContext>(undefined);
MobXContext.displayName = "MobXContext";
export default MobXContext;