import { observer } from "mobx-react-lite"
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { Container, Grid } from "@mui/material";
import MobXContext from "../../../stores/MobXContext";
import './CategoriesPage.scss';
import CategoryCardWeb from "./CategoryCardWeb";
import Loading from "@components/loading/Loading";

const CategoriesPage: React.FC = observer(function Categories() {

    const { webshopStore } = useContext(MobXContext);
    const navigate = useNavigate();

    function handleClick(categoryId: number) {
        navigate('/subcategories/' + categoryId)
    }

    if (webshopStore.Categories) {
        return (
            <Grid container display={'flex'} flexWrap={'wrap'} alignItems={'flex-start'}>

                {webshopStore.Categories.map((category, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} padding={1} display='flex' key={"BackofficeCategoryCardItem" + index}>
                        <CategoryCardWeb category={category} onCardClicked={handleClick} />
                    </Grid>
                ))}
            </Grid>
        )
    }
    else {
        return (
            <Loading />
        )
    }

});

export default CategoriesPage;