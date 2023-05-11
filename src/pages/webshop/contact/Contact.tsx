import GroendlundLogo from "@components/GroenlundLogo";
import { CallRounded, DvrRounded, EmailRounded, Facebook, HomeRounded, Instagram, LocationCityRounded, Mail } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, Container, Grid, Tooltip, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { Constants } from "@utils/Constants";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export const ContactPage: React.FC = observer(() => {

    const { languageStore } = useContext(MobXContext);
    const primaryColor = Constants.primaryColor;

    return (
        <Container>
            <Grid container
                spacing={4}
                justifyContent={'center'}
                display={'flex'}
                flexDirection={'column'}
                alignContent={'center'}
            >
                <Grid item xs={12} md={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <GroendlundLogo color={primaryColor} />
                </Grid>
            </Grid>
            <Grid container
                spacing={2}
                display={'flex'}
            >


                <Grid item xs={12} md={6} lg={6} xl={6} display={'flex'} justifyContent={'center'} alignItems={'end'}  >
                    <Card sx={{ minHeight: '30vh', minWidth: '80%', boxShadow: 'none' }}>
                        <CardHeader title={<Typography variant="h4" color={primaryColor} align="center">{languageStore.currentLanguage.opening_days}</Typography>} />
                        <CardContent>
                            <Typography variant="body1"><b>{languageStore.currentLanguage.monday_text} :</b> {languageStore.currentLanguage.closed_text}</Typography>
                            <Typography variant="body1"><b>{languageStore.currentLanguage.tuesday_text} :</b> 12.00-17.00</Typography>
                            <Typography variant="body1"><b>{languageStore.currentLanguage.wednesday_text} :</b> 13.00-18.00</Typography>
                            <Typography variant="body1"><b>{languageStore.currentLanguage.thursday_text} :</b> 12.00-17.00</Typography>
                            <Typography variant="body1"><b>{languageStore.currentLanguage.friday_text} :</b> 12.00-17.00</Typography>
                            <Typography variant="body1"><b>{languageStore.currentLanguage.saturday_text} :</b> {languageStore.currentLanguage.per_agreement_text}</Typography>
                            <Typography variant="body1"><b>{languageStore.currentLanguage.sunday_text} :</b> {languageStore.currentLanguage.closed_text}</Typography>
                            <Typography variant="body1"><b>{languageStore.currentLanguage.public_holiday_text} :</b> {languageStore.currentLanguage.closed_text}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={6} xl={6} display={'flex'} justifyContent={'center'} alignItems={'end'}  >
                    <Card sx={{ minHeight: '30vh', minWidth: '80%', boxShadow: 'none' }}>
                        <CardHeader title={<Typography variant="h4" color={primaryColor} align="center">{languageStore.currentLanguage.contact_information}</Typography>} />
                        <CardContent>
                            <Typography variant="body1"><CallRounded /> <b>{languageStore.currentLanguage.phone_text}:</b> {Constants.companyTelephoneNumber}</Typography>
                            <Typography variant="body1"><EmailRounded /> <b>{languageStore.currentLanguage.email_text}:</b> {Constants.companyEmail}</Typography>
                            <Typography variant="body1"><DvrRounded /> <b>{languageStore.currentLanguage.cvr_nr_text}:</b> 39821044</Typography>

                            <Tooltip title={languageStore.currentLanguage.clickForMapsLocation} >
                                <Typography variant="body1">


                                    <HomeRounded /> <b>{languageStore.currentLanguage.address_text}: </b>
                                    <a href={Constants.mapsLink} target="_blank" rel="noreferrer">
                                        {Constants.companyStreet} {Constants.companyZipcode} {Constants.companyCity}
                                    </a>
                                </Typography>
                            </Tooltip>

                            <Typography variant="body1"><Instagram /> <b>{languageStore.currentLanguage.instagram}:</b> <a href={Constants.instagramUrl} target="_blank" rel="noreferrer">{Constants.instagramUrl}</a></Typography>
                            <Typography variant="body1"><Facebook /> <b>{languageStore.currentLanguage.facebook}:</b> <a href={Constants.facebookUrl} target="_blank" rel="noreferrer">{Constants.facebookUrl}</a></Typography>


                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12} display={'flex'} justifyContent={'space-around'}>
                    <CustomButton url={Constants.mapsLink} text={languageStore.currentLanguage.clickForMapsLocation} icon={<LocationCityRounded />} />
                    <CustomButton url={Constants.facebookUrl} text={languageStore.currentLanguage.writeOnFacebook} icon={<Facebook />} />
                    <CustomButton url={"mailto:" + Constants.companyEmail} text={languageStore.currentLanguage.email_text} icon={<Mail />} />

                    {/* <Button variant="contained" href={"tel:" + Constants.companyTelephoneNumber} target="_blank" rel="noopener noreferrer"><Call /> {languageStore.currentLanguage.callUs}</Button>
                    <Button variant="contained" href={Constants.facebookUrl} target="_blank" rel="noopener noreferrer"><Facebook />{languageStore.currentLanguage.writeOnFacebook}</Button>
                    <Button variant="contained" href={"mailto:" + Constants.companyEmail} target="_blank" rel="noopener noreferrer"><Mail />{languageStore.currentLanguage.email_text} </Button> */}
                </Grid>



                {/* <Grid item xs={12} md={12} display={'flex'} justifyContent={'center'} sx={{
                    paddingBottom: '20px',
                    '& img:hover': {
                        cursor: 'pointer'
                    }
                }} >
                    <Tooltip title={languageStore.currentLanguage.clickForMapsLocation} >
                        <img src={process.env.PUBLIC_URL + '/maps.png'} width="70%" alt="" onClick={() => window.open(Constants.mapsLink, "_blank")} />
                    </Tooltip>
                </Grid> */}

            </Grid>
        </Container>
    )
});

type CustomButtonProps = {
    url: string,
    text: string,
    icon: JSX.Element
}

const CustomButton: React.FC<CustomButtonProps> = ({ url, text, icon }: CustomButtonProps) => {
    return (
        <Button variant="contained" href={url} target="_blank" rel="noopener noreferrer" sx={{ minWidth: '12vw' }}>
            <div style={{ padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ marginRight: '5px' }}>
                    {icon}
                </span>
                <span>
                    {text}
                </span>
            </div>
        </Button>
    )
};
