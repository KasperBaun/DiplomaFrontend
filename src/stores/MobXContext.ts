import * as React from "react";
import { RootStore } from "./RootStore";
import { ProductStore } from "./ProductStore";
import { CategoryStore } from "./CategoryStore";
import { LanguageStore } from "./LanguageStore";
import { SubCategoryStore } from "./SubCategoryStore";

export interface IMobXContext {
    productStore: ProductStore;
    rootStore: RootStore;
    categoryStore : CategoryStore;
    subCategoryStore : SubCategoryStore;
    languageStore: LanguageStore;
}

const MobXContext = React.createContext<IMobXContext>(undefined);
MobXContext.displayName = "MobXContext";
export default MobXContext;