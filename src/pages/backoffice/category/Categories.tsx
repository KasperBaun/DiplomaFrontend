import React, { useContext, useState } from "react";
import { Alert, Button, Grid, Snackbar } from "@mui/material";
import Category from "@models/Category";
import MobXContext from "@stores/MobXContext";
import Loading from "@components/loading/LoadingLion";
import CategoryDialog from "./components/CategoryDialog";
import { observer } from "mobx-react-lite";
import CategoryCard from "./components/CategoryCard";
import ConfirmDeleteDialog from "./components/ConfirmDeleteDialog";

export interface ICategoriesProps {
    onCategoryClicked: (category: Category) => void;
}

const Categories: React.FC<ICategoriesProps> = observer(function Categories(props: ICategoriesProps) {

    /* Define state for categories and selected category - Inject stores */
    const { backofficeStore, languageStore } = useContext(MobXContext);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    /* Define state for modals */
    const [create, setCreate] = useState<boolean>(false);
    const [showCategoryDialog, setShowCategoryDialog] = useState<boolean>(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"success" | "error" | "warning" | "info">("success");

    /* Define the event handlers for the buttons */
    const handleUpdateClick = (category: Category) => {
        setCreate(false);
        setSelectedCategory(category);
        setShowCategoryDialog(true);
    };

    const handleOnConfirmDeleteClick = async () => {
        const catToBeDeleted = backofficeStore.getCategory(selectedCategory.id);
        if (catToBeDeleted !== null) {
            await backofficeStore.deleteCategory(selectedCategory.id);
            setAlertType("success");
        } else {
            setAlertType("warning");
        }
        setShowSnackbar(true);
        setShowConfirmDelete(false);
    }

    const handleOnDeleteClick = async (category: Category) => {
        setSelectedCategory(category);
        setShowConfirmDelete(true);
    }

    const handleOnCategoryClicked = (category: Category) => {
        props.onCategoryClicked(category);
    }

    if (backofficeStore.Categories && backofficeStore.Categories.length > 0) {
        return (
            <Grid container >
                {/* Modals for creating/updating and user feedback */}
                <CategoryDialog visible={showCategoryDialog} create={create} category={selectedCategory} onClose={() => setShowCategoryDialog(false)} />
                <ConfirmDeleteDialog visible={showConfirmDelete} objectName={selectedCategory ? selectedCategory.name : ''} onConfirmDeleteClicked={handleOnConfirmDeleteClick} onCancelClicked={() => setShowConfirmDelete(false)} />
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={showSnackbar} autoHideDuration={2000} onClose={() => setShowSnackbar(false)}>
                    <Alert severity={alertType}>{alertType === "success" ? languageStore.currentLanguage.deleteCategorySuccessMessage : languageStore.currentLanguage.deleteCategoryFailedMessage}</Alert>
                </Snackbar>

                <Grid item xs={12} display={'flex'} justifyContent={'start'} margin='10px'>
                    <Button style={{ width: "12rem" }} variant="contained" onClick={() => { setCreate(true); setShowCategoryDialog(true) }}>{languageStore.currentLanguage.createCategoryDialogTitle}</Button>
                </Grid>

                {/* Categorycards */}
                {backofficeStore.Categories.map((cat, index) => {
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

