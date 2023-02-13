import * as React from "react";
import { RootStore } from "./RootStore";
import { ProductStore } from "./ProductStore";
import { CategoryStore } from "./CategoryStore";

export interface IMobXContext {
    productStore: ProductStore;
    rootStore: RootStore;
    categoryStore : CategoryStore;
}

const MobXContext = React.createContext<IMobXContext>(undefined);
MobXContext.displayName = "MobXContext";
export default MobXContext;