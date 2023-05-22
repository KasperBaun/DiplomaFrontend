import MobXContext from "../../../stores/MobXContext";
import LoadingLion from "@components/loading/LoadingLion";
import { observer } from "mobx-react-lite"
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { Grid } from "@mui/material";
import { CategoryCardWeb } from "./CategoryCardWeb";

export const CategoriesPage: React.FC = observer(function Categories() {

    const { webshopStore } = useContext(MobXContext);
    const navigate = useNavigate();
    const handleClick = (categoryId: number) => { navigate('subcategories/' + categoryId) }

    if (webshopStore.Categories) {
        return (
            <Grid container display="flex" justifyContent={'center'} alignContent={'center'} marginX={'auto'}>
                {webshopStore.Categories.map((category, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} padding={1} display='flex' justifyContent={'center'} key={"BackofficeCategoryCardItem" + index}>
                        <CategoryCardWeb category={category} onCardClicked={handleClick} />
                    </Grid>
                ))}
            </Grid>
        )
    }
    else {
        return (
            <LoadingLion />
        )
    }
});