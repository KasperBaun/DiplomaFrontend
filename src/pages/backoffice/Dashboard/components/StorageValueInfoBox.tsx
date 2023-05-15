import { Warehouse } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { Constants } from "@utils/Constants";
import { ExtentionMethods } from "@utils/ExtentionMethods";
import React, { useContext } from "react";

export const StorageValueInfoBox = () => {

    const { languageStore, backofficeStore } = useContext(MobXContext);

    const titleStyling: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        padding: '1rem',
        borderRadius: '1rem',
        alignItems: 'self-end',

    };
    const valueStyling: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        borderRadius: '1rem',

    };

    const storageValue = backofficeStore.getStorageValue();
    const currentLanguagecode = languageStore.getCurrentLanguageCode() === "en_US" ? "en-US" : "da-DK";
    const formattedValue: string = storageValue.toLocaleString(currentLanguagecode, { style: "currency", currency: languageStore.currentLanguage.currency });

    return (
        <Grid container>
            <Grid item xs={12} sx={titleStyling} >
                <Warehouse sx={{ color: Constants.primaryColor }} />
                <Typography variant="h3" sx={{ color: "primary" }} gutterBottom>
                    {languageStore.currentLanguage.inventory} {languageStore.currentLanguage.value.toLowerCase()}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={valueStyling}>
                <Typography variant="h3" sx={{ color: "primary" }} gutterBottom>
                    {ExtentionMethods.formatPrice(storageValue, currentLanguagecode, languageStore.currentLanguage.currency)}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={valueStyling}>
            </Grid>
        </Grid>
    )
}