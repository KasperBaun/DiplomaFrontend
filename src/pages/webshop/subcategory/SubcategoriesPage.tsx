import { observer } from "mobx-react-lite"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext } from "react";
import MobXContext from "../../../stores/MobXContext";
import { Container } from "react-bootstrap";
import { Grid } from "@mui/material";
import CategoryCardWeb from "../categories/CategoryCardWeb";
import SubCategory from "@models/SubCategory";
import { Translater } from "@utils/Translater";

const SubCategoriesPage: React.FC = observer(function SubCategoriesPage(this: any) {
    const { webshopStore, searchStore } = useContext(MobXContext);
    const { languageStore } = useContext(MobXContext);
    const translater = new Translater();

    let { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { name } = location.state;
    const subCategories = (webshopStore.subCategoriesByCategoryID(Number(id)))

    function handleClick(subcategory: SubCategory, name: String) {
        console.log("SUBCAT ID", subcategory.id);
        searchStore.filterBySubcategory(subcategory.id);
        navigate(`/productList`);
    }


    if (subCategories && subCategories.length > 0)
        return (
            <Container>
                <h1>{translater.getCategoryBasedOnLanguage(languageStore, name)}</h1>
                <div className="container-cat">
                    {subCategories.map((subCategory, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} xl={2} padding={1} display='flex' key={"BackofficeCategoryCardItem" + index}>
                            <div onClick={() => handleClick(subCategory, subCategory.name)}>
                                <CategoryCardWeb category={subCategory} type={"subCat"} />
                            </div>
                        </Grid>
                    ))}
                </div>
            </Container>
        )
    else
        return (
            <Container>
                <div>
                    <h1>{name}</h1>
                    <h3>{languageStore.currentLanguage.noSubCategoriesToShow}</h3>
                </div>
            </Container>
        )
})

export default SubCategoriesPage;