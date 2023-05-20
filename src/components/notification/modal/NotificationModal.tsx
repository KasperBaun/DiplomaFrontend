import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Notifications } from "@mui/icons-material";
import { Badge, Button, IconButton, Paper, Popover, Tooltip, Typography } from "@mui/material";
import ColorConfigs from "@styles/ColorConfigs";


export const NotificationModal: React.FC = observer(() => {
    const { backofficeStore, languageStore } = useContext(MobXContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClick = (action: () => void) => {
        action();
        handleClose();
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOnClearAllClicked = () => {
        backofficeStore.clearAllNotifications();
    }

    const open = Boolean(anchorEl);
    const id = open ? 'notification-popover' : undefined;


    return (
        <div>
            <Tooltip title={languageStore.currentLanguage.notifications}>
                <IconButton onClick={handleClick}>
                    <Badge
                        sx={{
                            fontSize: '12px',
                            color: ColorConfigs.topbar.color,
                            "&:hover": {
                                background: ColorConfigs.topbar.hoverBg,
                            }
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        badgeContent={backofficeStore.Notifications.length} color="warning">
                        <Notifications />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Paper elevation={3} sx={notificationContainerStyling}>

                    {backofficeStore.Notifications.map((notification, index) => (
                        <div
                            key={index}
                            style={notificationStyling}
                            onClick={() => handleNotificationClick(notification.action)}
                        >
                            <Typography variant="body1">{notification.message}</Typography>
                            {notification.action &&
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleNotificationClick(notification.action)}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: ColorConfigs.topbar.hoverBg,
                                        }
                                    }}
                                >
                                    {notification.actionMessage}
                                </Button>
                            }
                        </div>
                    ))}
                    {backofficeStore.Notifications.length === 0 && (
                        <Typography variant="body1" align="center">
                            {languageStore.currentLanguage.noNotifications}
                        </Typography>
                    )}
                    {backofficeStore.Notifications.length > 0 &&
                        <Button variant="contained" onClick={handleOnClearAllClicked} >
                            {languageStore.currentLanguage.clearAll}
                        </Button>
                    }

                </Paper>
            </Popover>
        </div>
    );
});

const notificationContainerStyling: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem',
}

const notificationStyling: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
}