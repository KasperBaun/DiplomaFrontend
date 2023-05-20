import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import SubCategory from "@models/SubCategory";
import { Pencil, XLg } from "react-bootstrap-icons";
import Category from "@models/Category";
import LoadingLion from "@components/loading/LoadingLion";
import SubcategoryDialog from "./SubcategoryDialog";
import { Button, Grid } from "@mui/material";
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
                alert("Successfully deleted category: " + subCatToBeDeleted.name)
            } else {
                alert("Failed to delete category: " + subCatToBeDeleted.name)
            }
        } else {
            alert("Could not find subcategory with id: " + selectedSubcategory.id);
        }
        setShowConfirmDelete(false);
    }

    const handleOnDeleteClick = async (subcategory: SubCategory) => {
        setSelectedSubcategory(subcategory);
        setShowConfirmDelete(true);
    }


    if (backofficeStore.subCategories) {
        const subcats = props.selectedCategory ? backofficeStore.subCategoriesByCategoryID(props.selectedCategory.id) : backofficeStore.subCategories;

        return (

            <Grid container >
                {/* Modals for creating/updating */}
                <SubcategoryDialog visible={showDialog} onClose={onClose} create={create} subcategory={selectedSubcategory} />
                <ConfirmDeleteDialog visible={showConfirmDelete} objectName={selectedSubcategory ? selectedSubcategory.name : ''} onConfirmDeleteClicked={handleOnConfirmDeleteClick} onCancelClicked={() => setShowConfirmDelete(false)} />

                <Grid item xs={12} display={'flex'} justifyContent={'end'} margin='10px'>
                    <Grid item xs={4} display={'flex'} justifyContent={'end'} alignContent={'end'}>
                        <Button style={{ width: "12rem" }} variant="contained" onClick={onOpenCreate}>{languageStore.currentLanguage.createSubCategoryDialogTitle}</Button>
                    </Grid>
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
            </Grid>
        )
    }
    else
        return (
            <LoadingLion />
        )
});

export default Subcategories;