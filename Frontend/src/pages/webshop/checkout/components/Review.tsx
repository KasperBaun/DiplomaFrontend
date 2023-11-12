import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import MobXContext, { IMobXContext } from '@stores/MobXContext';
import { ExtentionMethods } from '@utils/ExtentionMethods';
import { useNavigate } from 'react-router-dom';
import { Constants } from '@utils/Constants';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';


export function Review() {
  const { basketStore, languageStore } = useContext<IMobXContext>(MobXContext);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Typography variant="h3" color={Constants.primaryColor} gutterBottom>
        {languageStore.currentLanguage.orderSummary}
      </Typography>
      <Table >
        <TableBody>
          {basketStore.Basket.map((productItem) => (
            <TableRow
              key={productItem.product.name}
              onClick={() => navigate("/product/" + productItem.id)}
              sx={{
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
            >
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {productItem.product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`${languageStore.currentLanguage.modelNumber} ${productItem.product.modelNumber}`}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {ExtentionMethods.formatPrice(productItem.currentPrice, languageStore.getCurrentLanguageCode(), 'DKK')}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Total
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {ExtentionMethods.formatPrice(
                  basketStore.Basket.reduce((acc, item) => acc + item.currentPrice, 0),
                  languageStore.getCurrentLanguageCode(),
                  'DKK'
                )}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" fontWeight={'bold'} gutterBottom sx={{ mt: 2 }}>
            {languageStore.currentLanguage.shipping}
          </Typography>
          <Typography variant="body1" fontWeight={'bold'}>{basketStore.OrderDTO.deliveryMethod}</Typography>
          <Typography variant="body1">
            {`${basketStore.OrderDTO.customer.firstName ? basketStore.OrderDTO.customer.firstName : ""} ${basketStore.OrderDTO.customer.lastName ? basketStore.OrderDTO.customer.lastName : ""}`}
          </Typography>
          <Typography variant="body1">{`${basketStore.OrderDTO.customer.address}`}</Typography>
          <Typography variant="body1">{`${basketStore.OrderDTO.customer.zipCode} ${basketStore.OrderDTO.customer.city}`}</Typography>
          <Typography variant="body1">{`${basketStore.OrderDTO.customer.country}`}</Typography>
          <Typography variant="body1">{`${basketStore.OrderDTO.customer.countryCode ? basketStore.OrderDTO.customer.countryCode : ''} ${basketStore.OrderDTO.customer.phone}`}</Typography>
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
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}