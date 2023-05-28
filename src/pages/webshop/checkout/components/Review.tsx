import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import MobXContext, { IMobXContext } from '@stores/MobXContext';
import { ExtentionMethods } from '@utils/ExtentionMethods';
import { useNavigate } from 'react-router-dom';
import { Constants } from '@utils/Constants';


export function Review() {
  const { basketStore, languageStore } = useContext<IMobXContext>(MobXContext);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Typography variant="h3" color={Constants.primaryColor} gutterBottom>
        {languageStore.currentLanguage.orderSummary}
      </Typography>
      <List disablePadding>
        {basketStore.Basket.map((productItem) => (
          <ListItem key={productItem.product.name} onClick={() => navigate("/product/" + productItem.id)} sx={{
            py: 1, px: 0,
            '&:hover': {
              cursor: 'pointer'
            }
          }}>
            <ListItemText primary={productItem.product.name} secondary={`${languageStore.currentLanguage.modelNumber} ${productItem.product.modelNumber}`} />
            <Typography variant="body2" fontWeight={'bold'}>{ExtentionMethods.formatPrice(productItem.currentPrice, languageStore.getCurrentLanguageCode(), 'DKK')}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {basketStore.getTotal()}
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={2}>

        <Grid item xs={12} sm={6}>
          <Typography variant="h5" fontWeight={'bold'} gutterBottom sx={{ mt: 2 }}>
            {languageStore.currentLanguage.shipping}
          </Typography>
          <Typography variant="body1">
            {`${basketStore.OrderDTO.customer.firstName ? basketStore.OrderDTO.customer.firstName : ""} ${basketStore.OrderDTO.customer.lastName ? basketStore.OrderDTO.customer.lastName : ""}`}
          </Typography>
          <Typography variant="body1">{`${basketStore.OrderDTO.customer.address}`}</Typography>
          <Typography variant="body1">{`${basketStore.OrderDTO.customer.zipCode} ${basketStore.OrderDTO.customer.city}`}</Typography>
          <Typography variant="body1">{`${basketStore.OrderDTO.customer.country}`}</Typography>
          <Typography variant="body1">{`${basketStore.OrderDTO.customer.countryCode ? basketStore.OrderDTO.customer.countryCode : ''} ${basketStore.OrderDTO.customer.phone}`}</Typography>
          {/* <Typography variant="body1">Delivery Method: {basketStore.OrderDTO.deliveryMethod}</Typography> */}
          {/* <Typography gutterBottom>{addresses.join(', ')}</Typography> */}
        </Grid>



        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h5" fontWeight={'bold'} gutterBottom sx={{ mt: 2 }}>
            {languageStore.currentLanguage.paymentDetails}
          </Typography>
          <Grid container>
            <Grid item xs={6} >
              <Typography gutterBottom>{languageStore.currentLanguage.method} </Typography>
            </Grid>
            <Grid item xs={6} >
              <Typography gutterBottom> {basketStore.OrderDTO.payment.method}</Typography>
            </Grid>
            {/* {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))} */}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}