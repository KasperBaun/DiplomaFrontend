import { Typography } from "@mui/material"
import MobXContext from "@stores/MobXContext";
import React, { useContext } from "react"

export const Confirmation = () => {

    const { languageStore } = useContext(MobXContext);

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                {languageStore.currentLanguage.thankYouForYourOrder}
            </Typography>
            <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
            </Typography>
        </React.Fragment>
    )
}