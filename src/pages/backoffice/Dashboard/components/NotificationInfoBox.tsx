import { Grid, Typography } from "@mui/material";
import React from "react";

export const NotificationInfoBox = () => {

    // const { languageStore, backofficeStore } = useContext(MobXContext);

    const valueStyling: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '1rem',

    };


    return (
        <Grid item xs={12} sx={valueStyling}>
            <Typography variant="h6" >
                Room for notifications...
            </Typography>
        </Grid>

    )
}