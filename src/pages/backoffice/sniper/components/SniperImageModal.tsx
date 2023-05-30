import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'

type Props = {
    imageUrl: string
    handleClose: () => void;
    show: boolean;
}

export const SniperImageModal = ({ imageUrl, handleClose, show }: Props) => {


    return (
        <Dialog open={show} onClose={handleClose} fullWidth maxWidth="md">
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
            </IconButton>
            <DialogContent>
                {/* <Carousel>
                    <img
                        style={{ objectFit: "fill", height: '100%', width: '100%' }}
                        src={imageUrl}
                        alt="First slide"
                    />
                </Carousel> */}
            </DialogContent>
        </Dialog>
    )
}