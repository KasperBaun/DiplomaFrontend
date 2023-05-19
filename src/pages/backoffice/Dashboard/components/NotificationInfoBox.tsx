import { Button, Grid, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";

export type Notification = {
    message: string;
    action: () => void;
}

export const NotificationInfoBox = observer(() => {

    const { backofficeStore, languageStore } = useContext(MobXContext);

    const valueStyling: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '1rem',

    };

    return (
        <Grid item xs={12} sx={valueStyling}>
            {
                backofficeStore.Notifications.map((notification, index) => {
                    return (
                        <Typography variant="h5" key={"notif" + index} display='flex' justifyContent={'space-between'}>
                            {notification.message}
                            <Button variant="contained" onClick={() => {
                                backofficeStore.removeNotification(notification);
                                notification.action();
                            }} key={"notif" + index} >
                                {languageStore.currentLanguage.show}
                            </Button>
                        </Typography>

                    )
                })
            }
        </Grid>
    )
});