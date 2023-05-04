import { useContext, useState } from "react";
import MobXContext from "@stores/MobXContext";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import SubCategory from "@models/SubCategory";
import Category from "@models/Category";

export interface IProps {
    visible: boolean;
    onClose: () => void;
    create?: boolean;
    subcategory?: SubCategory;
}

const SubcategoryDialog = ({ onClose, visible, create, subcategory }: IProps) => {

    const { backofficeStore, languageStore } = useContext(MobXContext);
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [order, setOrder] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<Category>(subcategory ? subcategory : null);

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
            alert(languageStore.currentLanguage.createSubCategorySuccessMessage);
        }
        catch (err) {
            console.log(err);
            alert(languageStore.currentLanguage.createSubCategoryFailedMessage);
        }
    }

    async function updateSubcategory(): Promise<void> {
        const subCategory: SubCategory = {
            id: subcategory.id,
            name: title,
            imageUrl: url,
            order: order,
            description: description,
            categoryId: selectedCategory.id,
            category: selectedCategory
        };

        try {
            await backofficeStore.updateSubCategory(subCategory)
            // TODO: Change this notification to a toast or something that does not require the user to click a button to confirm.
            alert(languageStore.currentLanguage.createSubCategoryUpdateSuccessMessage);
        }
        catch (err) {
            console.log(err);
            alert(languageStore.currentLanguage.createSubCategoryUpdateFailedMessage);
        }
        onClose();
    }


    const handleSelectedCategoryChange = (event: SelectChangeEvent) => {
        //console.log(event.target.value);
        const categoryId: number = parseInt(event.target.value);
        const category: Category = backofficeStore.getCategory(categoryId);
        if (category) {
            setSelectedCategory(category);
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
                    {create ? languageStore.currentLanguage.createSubCategoryDialogTitle : languageStore.currentLanguage.updateCategoryDialogTitle}
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
                                    {languageStore.currentLanguage.createSubCategoryCategoryTitle}
                                </InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    value={selectedCategory ? selectedCategory.id.toString() : ''}
                                    label={languageStore.currentLanguage.createSubCategoryCategoryTitle}
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
                        {languageStore.currentLanguage.buttonCancelText}
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={create ? createSubcategory : updateSubcategory}>
                        {create ? languageStore.currentLanguage.create : languageStore.currentLanguage.update}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default SubcategoryDialog;