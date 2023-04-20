import { useContext, useState } from "react";
import MobXContext from "@stores/MobXContext";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, TextField } from "@mui/material";
import Category from "@models/Category";

export interface IProps {
    visible: boolean;
    onClose: () => void;
    create?: boolean;
    category?: Category;
}

const CategoryDialog = ({ onClose, visible, create, category }: IProps) => {

    const { categoryStore, languageStore } = useContext(MobXContext);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"success" | "error" | "warning" | "info">("success");
    const [alertText, setAlertText] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [order, setOrder] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    async function createCategory(): Promise<void> {
        const category: Category = ({ id: 0, name: title, imageUrl: url, order, description: description })

        try {
            await categoryStore.createCategory(category)
            setAlertType("success");
            setAlertText(languageStore.currentLanguage.createCategorySuccessMessage);
        }
        catch (err) {
            console.log(err);
            setAlertType("warning");
            setAlertText(languageStore.currentLanguage.createCategoryFailedMessage);
        }
        setShowSnackbar(true);
    }

    const handleCloseDialog = () => {
        setShowSnackbar(false);
        onClose();
    }

    async function handleOnUpdateCategory() {
        const updateAction: Category = {
            id: category.id,
            name: title,
            imageUrl: url,
            order: order,
            description: description,
        };

        try {
            await categoryStore.updateCategory(updateAction);
            setAlertType("success");
            setAlertText(languageStore.currentLanguage.updateCategorySuccessMessage);
        } catch (err) {
            console.log(err);
            setAlertType("warning");
            setAlertText(languageStore.currentLanguage.updateCategoryFailedMessage);
        }
        setShowSnackbar(true);
    }

    if (!visible) {
        return (
            <></>
        )
    } else {

        return (
            <Dialog open={visible} onClose={onClose}>
                <DialogTitle variant="h2">
                    {create ? languageStore.currentLanguage.createCategoryDialogTitle : languageStore.currentLanguage.updateCategoryDialogTitle}
                </DialogTitle>
                <DialogContent>

                    <Grid container spacing={3}>
                        {create ? <></> :
                            <Grid item xs={12} sx={{ width: '60%' }}>
                                <img
                                    alt={"picture of " + category?.name}
                                    src={category?.imageUrl}
                                    style={{ width: 'auto', height: '300px' }}
                                />
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <TextField
                                label={languageStore.currentLanguage.createCategoryTitle}
                                fullWidth
                                margin="normal"
                                defaultValue={create ? '' : category?.name}
                                onChange={(event) => {
                                    let temp = event.target.value;
                                    setTitle(temp);
                                }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={languageStore.currentLanguage.createCategoryOrder}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                defaultValue={create ? '' : category?.order}
                                onChange={(event) => {
                                    let temp = event.target.value;
                                    setOrder(parseInt(temp));
                                }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={languageStore.currentLanguage.createCategoryImgUrl}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                defaultValue={create ? '' : category?.imageUrl}
                                onChange={(event) => {
                                    let temp = event.target.value;
                                    setUrl(temp);
                                }} />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField
                                label={languageStore.currentLanguage.createCategoryDescription}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                defaultValue={create ? '' : category?.description}
                                multiline
                                onChange={(event) => {
                                    let temp = event.target.value;
                                    setDescription(temp);
                                }} />
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
                        onClick={create ? createCategory : handleOnUpdateCategory}>
                        {create ? languageStore.currentLanguage.createCategorySubmit : languageStore.currentLanguage.updateCategorySubmit}
                    </Button>
                </DialogActions>


                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={showSnackbar} autoHideDuration={5000} onClose={handleCloseDialog}>
                    <Alert severity={alertType}>{alertText}</Alert>
                </Snackbar>
            </Dialog>
        )
    }
}

export default CategoryDialog;