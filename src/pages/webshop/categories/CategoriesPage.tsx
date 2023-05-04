import Category from "@models/Category";
import { observer } from "mobx-react-lite"
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { Grid } from "@mui/material";
import MobXContext from "../../../stores/MobXContext";
import './CategoriesPage.scss';
import CategoryCardWeb from "./CategoryCardWeb";


interface ICategoriesPageProps {
}


const CategoriesPage: React.FC<ICategoriesPageProps> = observer(function Categories(props: ICategoriesPageProps) {

    const { webshopStore } = useContext(MobXContext);
    const navigate = useNavigate();

    function handleClick(category: Category, name: String) {
        navigate('/subcategories/' + category.id, { state: { name } })
    }

    if (webshopStore.Categories) {
        return (
            <div className="container-cat">
                {webshopStore.Categories.map((category, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={2} padding={1} display='flex' key={"BackofficeCategoryCardItem" + index}>
                        <div onClick={() => handleClick(category, category.name)}>
                            <CategoryCardWeb category={category} type={"cat"} />
                        </div>
                    </Grid>
                ))}
            </div>
        )
    }
    else {
        return (
            <h1>Loading...</h1>
        )
    }

});

export default CategoriesPage;