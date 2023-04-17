import { useContext, useState } from "react";
import MobXContext from "@stores/MobXContext";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import Category from "@models/Category";

export interface IProps {
    visible: boolean
    onClose: () => void;
}

const CreateCategoryDialog = ({ onClose, visible }: IProps) => {

    const { categoryStore, languageStore } = useContext(MobXContext);
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [order, setOrder] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    async function createCategory(): Promise<void> {
        const category: Category = ({ id: 0, name: title, imageUrl: url, order, description })

        try {
            await categoryStore.createCategory(category)
            alert(languageStore.currentLanguage.createCategorySuccessMessage);
        }
        catch (err) {
            console.log(err);
            alert(languageStore.currentLanguage.createCategoryFailedMessage);
        }
    }

    if (!visible) {
        return (
            <></>
        )
    } else {

        return (
            <Dialog open={visible} onClose={onClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label={languageStore.currentLanguage.createCategoryTitle}
                                fullWidth
                                margin="normal"
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
                        onClick={createCategory}>
                        {languageStore.currentLanguage.createCategorySubmit}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default CreateCategoryDialog;