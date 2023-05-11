import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import { Container, Typography, Grid, Button } from '@mui/material';
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

export const AboutUsPage: React.FC = observer(() => {
  const { languageStore } = useContext(MobXContext);

  return (
    <Container>
      <Grid container spacing={4} marginTop={'20px'} display={'flex'} justifyContent={'center'}>

        <Grid item xs={12} md={3} lg={3} xl={3} display={'flex'} justifyContent={'center'} alignContent={'center'}>
          <img
            src="https://static.wixstatic.com/media/c38ac4_26cf61b8381d4f38a1fd2838b6d564b0~mv2.jpeg/v1/fill/w_443,h_591,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IMG_6367.jpeg"
            alt="Webshop storefront"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>

        <Grid item xs={12} md={3} lg={3} xl={3}>
          <img
            src="https://static.wixstatic.com/media/c38ac4_306f939b9a0c42488278ea64778344ee~mv2.jpeg/v1/fill/w_443,h_591,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IMG_5544.jpeg"
            alt="Silverware"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={12} display={'flex'} justifyContent={'center'} alignContent={'center'}>
          <Typography variant="body1" fontSize={16}>
            {languageStore.currentLanguage.company_description1}<br />
            {languageStore.currentLanguage.company_description2}<br />
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
          <Typography variant="body1" fontSize={16}>
            <table style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ columnCount: '2', padding: '10px' }}>Mærker</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '10px' }}>Royal Copenhagen</td>
                  <td style={{ padding: '10px' }}>B&G</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px' }}>Dahl Jensen</td>
                  <td style={{ padding: '10px' }}>Arne Bang</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px' }}>Saxbo</td>
                  <td style={{ padding: '10px' }}>Michael Andersen</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px' }}>Axel Salto</td>
                  <td style={{ padding: '10px' }}>Palshus Keramik</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px' }}>Kähler keramik</td>
                  <td style={{ padding: '10px' }}>Lyngby Porcelæn</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px' }}>Lyngby Glasværk</td>
                  <td style={{ padding: '10px' }}>Søholm</td>
                </tr>
              </tbody>
            </table>
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6} display={'flex'} justifyContent={'center'} alignContent={'center'}>
          <Typography variant="body1" fontSize={16}>
            <b>Vi køber følgende og giver Danmarks bedste priser:</b><br />
            <ul>


              <li>Guld & sølv</li>
              <li>Musselmalet porcelæn</li>
              <li>Halvblonde</li>
              <li>Helblonde</li>
              <li>Mega</li>
              <li>Figur</li>
              <li>Keramik</li>
              <li>Stentøj</li>
              <li>B&G</li>
              <li>Royal Copenhagen</li>
              <li>Dahl Jensen</li>
              <li>Saxbo</li>
              <li>Arne Bang</li>
              <li>Salto</li>
            </ul>

            Vi køber ikke alt, vedhæft derfor billeder eller aftal en dag med os, så kigger vi forbi eller du kommer ned til os.
          </Typography>
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={12} display={'flex'} justifyContent={'center'} alignContent={'center'} marginBottom={'20px'}>
          <NavLink to={'/contact'}><Button variant="contained" sx={{ width: '150px' }}><Typography variant="body1">{languageStore.currentLanguage.ContactTabText}</Typography></Button> </NavLink>
        </Grid>
      </Grid>

    </Container >
  );
});

