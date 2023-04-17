import React, { useContext, useState } from "react";
import { Button, Grid } from "@mui/material";
import Category from "@models/Category";
import MobXContext from "@stores/MobXContext";
import Loading from "@components/loading/Loading";
import CreateCategoryDialog from "./components/CreateCategoryDialog";
import { observer } from "mobx-react-lite";
import CategoryCard from "./components/CategoryCard";
import UpdateCategoryModal from "./components/UpdateCategoryModal";
import ConfirmDeleteCategoryDialog from "./components/ConfirmDeleteCategoryDialog";

export interface ICategoriesProps {
    onCategoryClicked: (category: Category) => void;
}

const Categories: React.FC<ICategoriesProps> = observer(function Categories(props: ICategoriesProps) {

    /* Define state for categories and selected category - Dependency inject stores */
    const { categoryStore, languageStore } = useContext(MobXContext);
    //const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    /* Define state for modals */
    const [showCreateCategory, setShowCreateCategory] = useState<boolean>(false);
    const [showUpdateCategory, setShowUpdateCategory] = useState<boolean>(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

    /* Define the event handlers for the buttons */
    const handleUpdateClick = (category: Category) => {
        setSelectedCategory(category);
        setShowUpdateCategory(true);
    };

    const handleOnConfirmDeleteClick = async () => {
        // Pop Modal to confirm?
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
                <CreateCategoryDialog visible={showCreateCategory} onClose={() => setShowCreateCategory(false)} />
                <UpdateCategoryModal visible={showUpdateCategory} onClose={() => setShowUpdateCategory(false)} category={selectedCategory} />
                <ConfirmDeleteCategoryDialog visible={showConfirmDelete} category={selectedCategory} onConfirmDeleteClicked={handleOnConfirmDeleteClick} onCancelClicked={() => setShowConfirmDelete(false)} />

                <Grid item xs={12} display={'flex'} justifyContent={'space-between'} margin='10px'>
                    <Grid item xs={4} display={'flex'} justifyContent={'end'} alignContent={'center'}>
                        <Button style={{ width: "12rem" }} variant="contained" onClick={() => setShowCreateCategory(true)}>{languageStore.currentLanguage.createCategoryModalTitle}</Button>
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

