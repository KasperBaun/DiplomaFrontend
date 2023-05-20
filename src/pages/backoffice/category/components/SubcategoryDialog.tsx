import { useContext, useState } from "react";
import MobXContext from "@stores/MobXContext";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from "@mui/material";
import SubCategory from "@models/SubCategory";
import Category from "@models/Category";
import { observer } from "mobx-react-lite";

export interface SubcategoryDialogProps {
    visible: boolean;
    onClose: () => void;
    create?: boolean;
    subcategory?: SubCategory;
}

export const SubcategoryDialog = observer(({ onClose, visible, create, subcategory }: SubcategoryDialogProps) => {

    const { backofficeStore, languageStore } = useContext(MobXContext);
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [order, setOrder] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<Category>(subcategory ? subcategory.category : null);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"success" | "error" | "warning" | "info">("success");
    const [alertText, setAlertText] = useState<string>("");

    async function createSubcategory() {
        const subCategory: SubCategory = {
            id: 0,
            name: title,
            order: order,
            imageUrl: url,
            description: description,
            categoryId: selectedCategory.id,
            category: selectedCategory
        };

        try {
            await backofficeStore.createSubCategory(subCategory)
            setAlertType("success");
            setAlertText(languageStore.currentLanguage.createSuccess);
        }
        catch (err) {
            console.log(err);
            setAlertType("warning");
            setAlertText(languageStore.currentLanguage.createFailed);
        }
        setShowSnackbar(true);
        
    }

    async function updateSubcategory(): Promise<void> {
        subcategory.name = title === "" ? subcategory.name : title;
        subcategory.imageUrl = url === "" ? subcategory.imageUrl : url;
        subcategory.order = order === 0 ? subcategory.order : order;
        subcategory.description = description === "" ? subcategory.description : description;

        try {
            await backofficeStore.updateSubCategory(subcategory)
            setAlertType("success");
            setAlertText(languageStore.currentLanguage.updateSuccess);
        }
        catch (err) {
            console.log(err);
            setAlertType("warning");
            setAlertText(languageStore.currentLanguage.createFailed);
        }
        onClose();
    }

    const handleCloseDialog = () => {
        setShowSnackbar(false);
        onClose();
    }


    const handleSelectedCategoryChange = (event: SelectChangeEvent) => {
        const categoryId: number = parseInt(event.target.value);
        const category: Category = backofficeStore.getCategory(categoryId);
        if (category) {
            if (subcategory) {
                subcategory.category = category;
                subcategory.categoryId = categoryId;
            } else {
                setSelectedCategory(category);
            }
        }
    };

    if (!visible) {
        return (
            <></>
        )
    } else {

        return (
            <Dialog open={visible} onClose={onClose}>
                <DialogTitle variant="h2">
                    {create ? languageStore.currentLanguage.createSubCategoryDialogTitle : languageStore.currentLanguage.updateSubcategory}
                </DialogTitle>
                <DialogContent>

                    <Grid container spacing={2}>
                        {create ? <></> :
                            <Grid item xs={12} sx={{ width: '60%' }}>
                                <img
                                    alt={"picture of " + subcategory?.name}
                                    src={subcategory?.imageUrl}
                                    style={{ width: 'auto', height: '300px' }}
                                />
                            </Grid>
                        }
                        <Grid item xs={12} marginTop={'20px'}>
                            <FormControl fullWidth>
                                <InputLabel id="category-select-label">
                                    {languageStore.currentLanguage.chooseCategory}
                                </InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    value={subcategory ? subcategory.categoryId.toString() : selectedCategory ? selectedCategory.id.toString() : ''}
                                    defaultValue={''}
                                    label={languageStore.currentLanguage.chooseCategory}
                                    onChange={handleSelectedCategoryChange}
                                >
                                    {backofficeStore.Categories.map((category, index) => (
                                        <MenuItem
                                            key={"option" + category.name + index}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={languageStore.currentLanguage.createSubCategoryTitle}
                                defaultValue={create ? '' : subcategory?.name}
                                onChange={(event) => {
                                    let temp = event.target.value;
                                    setTitle(temp);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={languageStore.currentLanguage.createSubCategoryOrder}
                                defaultValue={create ? '' : subcategory?.order}
                                onChange={(event) => {
                                    let temp = event.target.value;
                                    setOrder(parseInt(temp));
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={languageStore.currentLanguage.createSubCategoryImgUrl}
                                defaultValue={create ? '' : subcategory?.imageUrl}
                                onChange={(event) => {
                                    let temp = event.target.value;
                                    setUrl(temp);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={languageStore.currentLanguage.createSubCategoryDescription}
                                defaultValue={create ? '' : subcategory?.description}
                                onChange={(event) => {
                                    let temp = event.target.value;
                                    setDescription(temp);
                                }}
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        {languageStore.currentLanguage.cancel}
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={create ? createSubcategory : updateSubcategory}>
                        {create ? languageStore.currentLanguage.create : languageStore.currentLanguage.update}
                    </Button>
                </DialogActions>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={showSnackbar} autoHideDuration={2000} onClose={handleCloseDialog}>
                    <Alert severity={alertType}>{alertText}</Alert>
                </Snackbar>
            </Dialog>
        )
    }
});
