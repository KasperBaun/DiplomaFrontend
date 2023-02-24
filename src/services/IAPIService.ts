import Category from "@models/Category";


interface IAPIService {
    getCategories: () => Category[]
    createCategory(category:Category): Promise<void>;
}

export default IAPIService;