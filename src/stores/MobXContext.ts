import * as React from "react";
import { RootStore } from "./RootStore";

export interface IMobXContext {
    // documentStore: DocumentStore;
    // userStore: UserStore;
    rootStore: RootStore;
}

export const MobXContext = React.createContext<IMobXContext>(undefined);
MobXContext.displayName = "MobXContext";
export default MobXContext;