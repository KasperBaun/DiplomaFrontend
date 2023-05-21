import { Product } from "./Product";
import SniperModel from "./SniperModel";

export type SniperResult = {
    product: Product;
    sniperResult: SniperModel[];
    new: boolean;
    open: boolean;
}