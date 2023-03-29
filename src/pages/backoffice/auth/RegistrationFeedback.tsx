import * as React from 'react';
import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';

export interface ISnackbarProps {
    variant?: 'success' | 'warning' | 'error';
    verticalPosition?: 'top' | 'bottom';
    horizontalPosition?: 'left' | 'center' | 'right';
    slideDirection?: 'right' | 'left' | 'up' | 'down';
    message: string;
    open: boolean;
    onClose: () => void;
}

const RegistrationFeedback: React.FC<ISnackbarProps> = function RegistrationFeedback(props: ISnackbarProps) {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        props.onClose();
    }

    const snackbarOrigin: SnackbarOrigin = {
        vertical: props.verticalPosition ? props.verticalPosition : 'top',
        horizontal: props.horizontalPosition ? props.horizontalPosition : 'right',
    }
    const variantProps = props.variant ? props.variant : 'success';

    return (
        <Snackbar
            open={props.open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={snackbarOrigin}
        >
            <Alert
                onClose={handleClose}
                severity={variantProps}
            >
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default RegistrationFeedback;