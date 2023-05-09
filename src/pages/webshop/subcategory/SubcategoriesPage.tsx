import { observer } from "mobx-react-lite"
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from "react";
import MobXContext from "../../../stores/MobXContext";
import { Container } from "react-bootstrap";
import { Grid } from "@mui/material";
import { Translater } from "@utils/Translater";
import { SubcategoryCard } from "./SubcategoryCard";

const SubCategoriesPage: React.FC = observer(function SubCategoriesPage(this: any) {
    const { webshopStore, searchStore } = useContext(MobXContext);
    const { languageStore } = useContext(MobXContext);
    const translater = new Translater();

    let { id } = useParams();
    const navigate = useNavigate();
    const subcategory = webshopStore.getCategory(parseInt(id));
    const subCategories = (webshopStore.subCategoriesByCategoryID(Number(id)))

    function handleClick(subcategoryId: number) {
        searchStore.filterBySubcategory(subcategoryId);
        navigate(`/productList`);
    }


    if (subCategories && subCategories.length > 0)
        return (
            <Container>
                <h1>{translater.getCategoryBasedOnLanguage(languageStore, subcategory.name)}</h1>
                <div className="container-cat">
                    {subCategories.map((subCategory, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} xl={2} padding={1} display='flex' key={"BackofficeCategoryCardItem" + index}>
                            <SubcategoryCard subcategory={subCategory} onCardClicked={handleClick} />
                        </Grid>
                    ))}
                </div>
            </Container>
        )
    else
        return (
            <Container>
                <div>
                    <h1>{subcategory.name}</h1>
                    <h3>{languageStore.currentLanguage.noSubCategoriesToShow}</h3>
                </div>
            </Container>
        )
})

export default SubCategoriesPage;