import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import Categories from "./Categories";
import Category from "@models/Category";
import Subcategories from "./components/Subcategories";

export interface ICategoryManagerProps {

}

const CategoryManager: React.FC<ICategoryManagerProps> = observer(function CategoryManager(props: ICategoryManagerProps) {

    const { languageStore } = useContext(MobXContext);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [activeKey, setActiveKey] = useState<number>(0);

    const navSwitch = (activeKey: number) => {
        switch (activeKey) {
            case 0: return <Categories onCategoryClicked={handleOnCategoryClicked} />;
            case 1: return <Subcategories selectedCategory={selectedCategory} />;
        }
    }

    const handleOnCategoryClicked = (category: Category) => {
        setSelectedCategory(category);
        setActiveKey(1);
    }

    const handleOnSubcategoryClicked = () => {
        setSelectedCategory(null);
        setActiveKey(1);
    }


    return (
        <Grid container>
            {/* Navigation */}
            <Grid item xs={12} margin='10px'>
                <Breadcrumbs separator={<NavigateNext fontSize="large" />} aria-label="breadcrumb">
                    <Link onClick={() => setActiveKey(0)} underline={activeKey === 0 ? "always" : "hover"}>
                        <Typography variant="h3">
                            {languageStore.currentLanguage.CategoriesTabText}
                        </Typography>
                    </Link>
                    <Link onClick={handleOnSubcategoryClicked} underline={activeKey === 1 ? "always" : "hover"}>
                        <Typography variant="h3">
                            {languageStore.currentLanguage.SubCategoriesTabText}
                        </Typography>
                    </Link>
                </Breadcrumbs>
            </Grid>

            {/* Display Categories or Subcategories */}
            <Grid item xs={12} display={'flex'} justifyContent={'space-between'} margin='10px'>
                {navSwitch(activeKey)}
            </Grid>
        </Grid>
    );
});

export default CategoryManager;