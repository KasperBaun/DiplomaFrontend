import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import { Container, Typography, Grid, Box, Card, CardContent, CardHeader } from '@mui/material';

export const AboutUsPage: React.FC = () => {
  const { languageStore } = useContext(MobXContext);

  return (
    <Container sx={{ minHeight: '76.2vh' }}>
      <Typography variant="h1" color="primary" align="center">About Us</Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <img
            src="https://static.wixstatic.com/media/c38ac4_26cf61b8381d4f38a1fd2838b6d564b0~mv2.jpeg/v1/fill/w_443,h_591,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IMG_6367.jpeg"
            alt="Webshop storefront"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {languageStore.currentLanguage.company_description}
          </Typography>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title={languageStore.currentLanguage.opening_days} />
              <CardContent>
                <Typography variant="body2">{languageStore.currentLanguage.monday_text} : {languageStore.currentLanguage.closed_text}</Typography>
                <Typography variant="body2">{languageStore.currentLanguage.tuesday_text} : 12.00-17.00</Typography>
                <Typography variant="body2">{languageStore.currentLanguage.wednesday_text} : 13.00-18.00</Typography>
                <Typography variant="body2">{languageStore.currentLanguage.thursday_text} : 12.00-17.00</Typography>
                <Typography variant="body2">{languageStore.currentLanguage.friday_text} : 12.00-17.00</Typography>
                <Typography variant="body2">{languageStore.currentLanguage.saturday_text} : {languageStore.currentLanguage.per_agreement_text}</Typography>
                <Typography variant="body2">{languageStore.currentLanguage.sunday_text} : {languageStore.currentLanguage.closed_text}</Typography>
                <Typography variant="body2">{languageStore.currentLanguage.public_holiday_text} : {languageStore.currentLanguage.closed_text}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title={languageStore.currentLanguage.contact_information} />
              <CardContent>
                <Typography variant="body2">{languageStore.currentLanguage.phone_text}: 42433454</Typography>
                <Typography variant="body2">{languageStore.currentLanguage.email_text}: gl-antik@mail.com</Typography>
                <Typography variant="body2">{languageStore.currentLanguage.cvr_nr_text}: 39821044</Typography>
                <Typography variant="body2">{languageStore.currentLanguage.address_text}: Gl. Kongevej 94a</Typography>
                <Typography variant="body2">1850 Frederiksberg</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

