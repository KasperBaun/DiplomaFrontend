import React, { useContext, useState } from "react";
import { Button, Grid } from "@mui/material";
import Category from "@models/Category";
import MobXContext from "@stores/MobXContext";
import Loading from "@components/loading/Loading";
import CategoryDialog from "./components/CategoryDialog";
import { observer } from "mobx-react-lite";
import CategoryCard from "./components/CategoryCard";
import ConfirmDeleteDialog from "./components/ConfirmDeleteDialog";

export interface ICategoriesProps {
    onCategoryClicked: (category: Category) => void;
}

const Categories: React.FC<ICategoriesProps> = observer(function Categories(props: ICategoriesProps) {

    /* Define state for categories and selected category - Inject stores */
    const { categoryStore, languageStore } = useContext(MobXContext);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    /* Define state for modals */
    const [create, setCreate] = useState<boolean>(false);
    const [showCategoryDialog, setShowCategoryDialog] = useState<boolean>(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

    /* Define the event handlers for the buttons */
    const handleUpdateClick = (category: Category) => {
        setCreate(false);
        setSelectedCategory(category);
        setShowCategoryDialog(true);
    };

    const handleOnConfirmDeleteClick = async () => {
        const catToBeDeleted = categoryStore.getCategory(selectedCategory.id);
        if (catToBeDeleted !== null) {
            await categoryStore.deleteCategory(selectedCategory.id);
            // Alt er godt
            alert("Successfully deleted category: " + catToBeDeleted.name)
            // Reload items
        } else {
            alert("Could not find category with id: " + selectedCategory.id);
        }
        setShowConfirmDelete(false);
    }
    const handleOnDeleteClick = async (category: Category) => {
        setSelectedCategory(category);
        setShowConfirmDelete(true);
    }

    const handleOnCategoryClicked = (category: Category) => {
        props.onCategoryClicked(category);
    }

    if (categoryStore.Categories && categoryStore.Categories.length > 0) {
        return (
            <Grid container >
                {/* Modals for creating/updating */}
                <CategoryDialog visible={showCategoryDialog} create={create} category={selectedCategory} onClose={() => setShowCategoryDialog(false)} />
                <ConfirmDeleteDialog visible={showConfirmDelete} objectName={selectedCategory ? selectedCategory.name : ''} onConfirmDeleteClicked={handleOnConfirmDeleteClick} onCancelClicked={() => setShowConfirmDelete(false)} />

                <Grid item xs={12} display={'flex'} justifyContent={'end'} margin='10px'>
                    <Grid item xs={4} display={'flex'} justifyContent={'end'} alignContent={'end'}>
                        <Button style={{ width: "12rem" }} variant="contained" onClick={() => { setCreate(true); setShowCategoryDialog(true) }}>{languageStore.currentLanguage.createCategoryDialogTitle}</Button>
                    </Grid>
                </Grid>

                {/* Categorycards */}
                {categoryStore.Categories.map((cat, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={2} xl={2} padding={1} display='flex' key={"BackofficeCategoryCardItem" + index}>
                            <CategoryCard category={cat} updateCategory={handleUpdateClick} deleteCategory={handleOnDeleteClick} goToSubcategories={handleOnCategoryClicked} />
                        </Grid>
                    )
                })}
            </Grid>
        )
    }
    else return <Loading />
});

export default Categories;

