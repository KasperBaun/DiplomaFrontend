import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export interface IConfirmDeleteDialogProps {
    visible: boolean;
    objectName: string;
    onConfirmDeleteClicked: () => void;
    onCancelClicked: () => void;
}

const ConfirmDeleteDialog: React.FC<IConfirmDeleteDialogProps> = observer(function ConfirmDeleteDialog({visible, objectName, onConfirmDeleteClicked, onCancelClicked}: IConfirmDeleteDialogProps) {

    const { languageStore } = useContext(MobXContext);
    if (!visible) {
        return <></>;
    } else {

        return (
            <Dialog open={visible} onClose={onCancelClicked}>
                <DialogTitle>{objectName}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {languageStore.currentLanguage.confirmDeleteText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancelClicked}>
                        {languageStore.currentLanguage.cancel}
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={onConfirmDeleteClicked}>
                        {languageStore.currentLanguage.delete}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
});

export default ConfirmDeleteDialog;