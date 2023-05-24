import { observer } from "mobx-react-lite"
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from "react";
import MobXContext from "../../../stores/MobXContext";
import { Container, Grid, Typography } from "@mui/material";
import { Translater } from "@utils/Translater";
import { SubcategoryCard } from "./SubcategoryCard";

export const SubcategoriesPage: React.FC = observer(function SubCategoriesPage(this: any) {
    const { webshopStore, searchStore } = useContext(MobXContext);
    const { languageStore } = useContext(MobXContext);
    const translater = new Translater();

    let { id } = useParams();
    const navigate = useNavigate();
    const subcategory = webshopStore.getCategory(parseInt(id));
    const subCategories = (webshopStore.subCategoriesByCategoryID(Number(id)))

    function handleClick(subcategoryId: number) {
        searchStore.filterBySubcategory(subcategoryId);
        navigate(`/products`);
    }

    if (subCategories && subCategories.length > 0)
        return (
            <Grid container display={'flex'} justifyContent={'center'}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} padding={1} display='flex' justifyContent={'center'}>
                    <Typography variant="h2">{translater.getCategoryBasedOnLanguage(languageStore, subcategory.name)}</Typography>
                </Grid>
                {subCategories.map((subCategory, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} padding={1} display='flex' justifyContent={'center'} key={"BackofficeCategoryCardItem" + index}>
                        <SubcategoryCard subcategory={subCategory} onCardClicked={handleClick} />
                    </Grid>
                ))}
            </Grid>
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