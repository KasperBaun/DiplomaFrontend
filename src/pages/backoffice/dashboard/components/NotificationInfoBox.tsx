import React, { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import { Button, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

export const NotificationInfoBox = observer(() => {

    const { backofficeStore, languageStore } = useContext(MobXContext);

    return (
        <Grid item xs={12} sx={valueStyling} overflow='auto'>
            {
                backofficeStore.Notifications.map((notification, index) => {
                    return (
                        <Typography variant="h5" key={"notif" + index} display='flex' justifyContent={'space-between'} sx={{ margin: 1 }}>
                            {notification.message}{
                                notification.action &&
                                <Button variant="contained" onClick={() => {
                                    backofficeStore.removeNotification(notification);
                                    notification.action();
                                }} key={"notif" + index} >
                                    {languageStore.currentLanguage.show}
                                </Button>
                            }

                        </Typography>

                    )
                })
            }
        </Grid>
    )
});

const valueStyling: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '1rem',

};