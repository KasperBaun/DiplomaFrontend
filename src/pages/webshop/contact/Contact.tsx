import LionLogo from "@components/LionLogo";
import { CallRounded, DvrRounded, EmailRounded, HomeRounded } from "@mui/icons-material";
import { Button, Container, Grid, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { Constants } from "@utils/Constants";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export const ContactPage: React.FC = observer(() => {

    const { languageStore } = useContext(MobXContext);
    const primaryColor = Constants.primaryColor;

    return (
        <Container sx={{ minHeight: '75vh' }}>
            <Grid container
                spacing={4}
                justifyContent={'center'}
                display={'flex'}
                flexDirection={'column'}
                alignContent={'center'}
            >
                <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Typography variant="h2" color={primaryColor} align="center">{languageStore.currentLanguage.contact_information}</Typography>
                </Grid>

                <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <LionLogo color={primaryColor} />
                </Grid>
                <Grid item xs={12} md={6} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="body2"><CallRounded /> <b>{languageStore.currentLanguage.phone_text}:</b> {Constants.companyTelephoneNumber}</Typography>
                    <Typography variant="body2"><EmailRounded /> <b>{languageStore.currentLanguage.email_text}:</b> {Constants.companyEmail}</Typography>
                    <Typography variant="body2"><DvrRounded /> <b>{languageStore.currentLanguage.cvr_nr_text}:</b> 39821044</Typography>
                    <Typography variant="body2"><HomeRounded /> <b>{languageStore.currentLanguage.address_text}:</b> {Constants.companyAdress}</Typography>
                </Grid>

                <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Button variant="outlined" href="https://www.facebook.com/lyngbylions" target="_blank" rel="noopener noreferrer" />
                </Grid>

            </Grid>
        </Container>
    )
});

