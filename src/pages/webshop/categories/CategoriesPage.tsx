import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Category from "../../../models/Category";
import category from "../../../models/Category";
import { categories } from "../../../services/MockupData";
import MobXContext from "../../../stores/MobXContext";

interface ICategoriesPageProps {
}


const CategoriesPage: React.FC<ICategoriesPageProps> = observer(function Categories(props: ICategoriesPageProps) {

    const { categoryStore } = useContext(MobXContext);
    const [Categories, setCategories] = useState<Category[]>(null);

    const category: Category = {
        id: 1,
        imageUrl: "https://via.placeholder.com/150",
        name: "Test placeholder",
        order:1,
        description: "test"
    };

    function createCategory(category: Category) {
        const createCategoryAsync = async () => {
            try {
                await categoryStore.createCategory(category)
            }
            catch (err) {
                console.log(err);
            }
        }
        createCategoryAsync();
    }

    useEffect(() => {
        const getCategoryModel = async () => {
            try {
                setCategories(await categoryStore.getCategories())
            }
            catch (err) {
                console.log(err);
            }
        }
        getCategoryModel();
    }, [categoryStore])

    if (categories) {
        return (
            <div>
                {categories.map((index) => (
                    <h2> {index.name.toString()}</h2>
                ))}
                <Button onClick={() => createCategory(category)}></Button>
            </div>
        );
    }

    else {
        return (
            <h1>Loading...</h1>
        )
    }

});

export default CategoriesPage;