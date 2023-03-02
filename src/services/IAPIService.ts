import Category from "@models/Category";


interface IAPIService {
    getCategories: () => Promise<Category[]>
    createCategory(category:Category): Promise<void>;
}

export default IAPIService;