import Category from "@models/Category";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export interface IConfirmDeleteCategoryDialogProps {
    visible: boolean;
    category: Category;
    onConfirmDeleteClicked: () => void;
    onCancelClicked: () => void;
}

const ConfirmDeleteCategoryDialog: React.FC<IConfirmDeleteCategoryDialogProps> = observer(function ConfirmDeleteCategoryDialog(props: IConfirmDeleteCategoryDialogProps) {

    const { categoryStore, languageStore } = useContext(MobXContext);
    if (!props.visible) {
        return <></>;
    } else {

        return (
            <Dialog open={props.visible} onClose={props.onCancelClicked}>
                <DialogTitle>{props.category.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {languageStore.currentLanguage.deleteCategoryConfirmMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onCancelClicked}>
                        {languageStore.currentLanguage.buttonCancelText}
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={props.onConfirmDeleteClicked}>
                        {languageStore.currentLanguage.buttonDeleteText}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
});

export default ConfirmDeleteCategoryDialog;