import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import SubCategory from "@models/SubCategory";
import { Pencil, XLg } from "react-bootstrap-icons";
import Category from "@models/Category";
import LoadingLion from "@components/loading/LoadingLion";
import { SubcategoryDialog } from "./SubcategoryDialog";
import { Alert, Button, Grid, Snackbar } from "@mui/material";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

export interface ISubcategoriesProps {
    selectedCategory?: Category;
}

const Subcategories: React.FC<ISubcategoriesProps> = observer(function Subcategories(props: ISubcategoriesProps) {

    /* Define state for categories and selected category - Inject stores */
    const { backofficeStore, languageStore } = useContext(MobXContext)
    const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory>();

    /* Define state for modals */
    const [create, setCreate] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
    const onOpenCreate = () => { setSelectedSubcategory(null); setCreate(true); setShowDialog(true); };
    const onClose = () => setShowDialog(false);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"success" | "error" | "warning" | "info">("success");
    const [alertText, setAlertText] = useState<string>("");

    /* Define the event handlers for the buttons */
    const handleUpdateClick = (subCat: SubCategory) => {
        setSelectedSubcategory(subCat);
        setCreate(false);
        setShowDialog(true);
    };

    const handleOnConfirmDeleteClick = async () => {
        const subCatToBeDeleted = backofficeStore.getSubcategory(selectedSubcategory.id);
        if (subCatToBeDeleted !== null) {
            const deleted = await backofficeStore.deleteSubCategory(subCatToBeDeleted.id);
            if (deleted) {
                setAlertType("success");
                setAlertText(languageStore.currentLanguage.deleteSuccess);
            } else {
                setAlertType("error");
                setAlertText(languageStore.currentLanguage.deleteFailed + subCatToBeDeleted.name);
            }
        } else {
            setAlertType("error");
            setAlertText(languageStore.currentLanguage.deleteFailed + "Could not find subcategory with id: " + selectedSubcategory.id);
        }
        setShowSnackbar(true);
        setShowConfirmDelete(false);
    }

    const handleOnDeleteClick = async (subcategory: SubCategory) => {
        setSelectedSubcategory(subcategory);
        setShowConfirmDelete(true);
    }

    const handleCloseDialog = () => {
        setShowSnackbar(false);
        onClose();
    }


    if (backofficeStore.subCategories) {
        const subcats = props.selectedCategory ? backofficeStore.subCategoriesByCategoryID(props.selectedCategory.id) : backofficeStore.subCategories;

        return (

            <Grid container margin={'0'} >
                {/* Modals for creating/updating */}
                <SubcategoryDialog visible={showDialog} onClose={onClose} create={create} subcategory={selectedSubcategory} />
                <ConfirmDeleteDialog visible={showConfirmDelete} objectName={selectedSubcategory ? selectedSubcategory.name : ''} onConfirmDeleteClicked={handleOnConfirmDeleteClick} onCancelClicked={() => setShowConfirmDelete(false)} />

                <Grid item xs={12} display={'flex'} justifyContent={'start'} my='10px'>
                    <Button style={{ width: "12rem" }} variant="contained" onClick={onOpenCreate}>{languageStore.currentLanguage.createSubCategoryDialogTitle}</Button>
                </Grid>

                {/* Subcategorycards */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="CenterAligned_th">{languageStore.currentLanguage.createCategoryTitle}</th>
                            <th className="CenterAligned_th">{languageStore.currentLanguage.createCategoryDescription}</th>
                            <th className="CenterAligned_th">{languageStore.currentLanguage.createCategoryOrder}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {subcats.map((subCat) => (
                            <tr id={"listId_" + subCat.id} key={"item_" + subCat.id}>
                                <td style={{ width: "12rem" }}>{subCat.name}</td>
                                <td>{subCat.description ? subCat.description : null}</td>
                                <td style={{ width: "8rem" }}>{subCat.order ? subCat.order : null}</td>
                                <td style={{ width: "10rem" }}>
                                    <div>
                                        <Button variant="outlined" onClick={() => handleUpdateClick(subCat)}><Pencil /></Button>
                                        <Button variant="outlined" onClick={() => handleOnDeleteClick(subCat)}><XLg /></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={showSnackbar} autoHideDuration={2000} onClose={handleCloseDialog}>
                    <Alert severity={alertType}>{alertText}</Alert>
                </Snackbar>
            </Grid>
        )
    }
    else
        return (
            <LoadingLion />
        )
});

export default Subcategories;