import { Grid, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { ExtentionMethods } from "@utils/ExtentionMethods";
import React, { useContext } from "react";

export const StorageValueInfoBox = () => {

    const { languageStore, backofficeStore } = useContext(MobXContext);

    const valueStyling: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '1rem',

    };

    const storageValue = backofficeStore.getStorageValue();
    const currentLanguagecode = languageStore.getCurrentLanguageCode() === "en_US" ? "en-US" : "da-DK";

    return (
        <Grid item xs={12} sx={valueStyling}>
            <Typography variant="h6" >
                {ExtentionMethods.formatPrice(storageValue, currentLanguagecode, languageStore.currentLanguage.currency)}
            </Typography>
        </Grid>

    )
}