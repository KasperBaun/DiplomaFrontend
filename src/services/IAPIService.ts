import Category from "@models/Category";
import Product from "@models/Product";


interface IAPIService {
    getCategories: () => Category[]
    createCategory(category:Category): Promise<void>;
    createProduct(product:Product): Promise<void>;
    getProduct(productId: number): Promise<Product>;
    getProducts(): Promise<Product[]>;
}

export default IAPIService;