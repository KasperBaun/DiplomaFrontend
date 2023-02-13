import * as React from "react";
import { RootStore } from "./RootStore";
import { ProductStore } from "./ProductStore";

export interface IMobXContext {
    productStore: ProductStore;
    rootStore: RootStore;
}

const MobXContext = React.createContext<IMobXContext>(undefined);
MobXContext.displayName = "MobXContext";
export default MobXContext;