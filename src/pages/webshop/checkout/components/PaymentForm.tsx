import * as React from 'react';
import { Dispatch, SetStateAction, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

// export function PaymentForm() {
//   return (
//     <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//         Payment method
//       </Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <TextField
//             required
//             id="cardName"
//             label="Name on card"
//             fullWidth
//             autoComplete="cc-name"
//             variant="standard"
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             required
//             id="cardNumber"
//             label="Card number"
//             fullWidth
//             autoComplete="cc-number"
//             variant="standard"
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             required
//             id="expDate"
//             label="Expiry date"
//             fullWidth
//             autoComplete="cc-exp"
//             variant="standard"
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             required
//             id="cvv"
//             label="CVV"
//             helperText="Last three digits on signature strip"
//             fullWidth
//             autoComplete="cc-csc"
//             variant="standard"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <FormControlLabel
//             control={<Checkbox color="secondary" name="saveCard" value="yes" />}
//             label="Remember credit card details for next time"
//           />
//         </Grid>
//       </Grid>
//     </React.Fragment>
//   );
// }

export const PaymentForm = () => {

  const [selectedPaymentOption, setSelectedPaymentOption] = useState<number>(null);

  const handlePaymentOptionClick = (paymentOption: number) => {
    setSelectedPaymentOption(paymentOption);
  };

  return (
    <Grid container sx={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    }} spacing={2} >
      {paymentOptions.map((paymentOption, index) => (
        <Grid item

          key={index}
          onClick={() => handlePaymentOptionClick(paymentOption.id)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '8vh',
            width: '10vh',
            paddingTop: 0,
            paddingLeft: 0,
            '&:hover': {
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.6)",
              cursor: "pointer"
            }
          }}
        >
          {paymentOption.component}
        </Grid>
      ))}
    </Grid>
  )
}

interface PaymentOption {
  name: string;
  id: number;
  component: React.ReactNode;
}

const paymentOptions: PaymentOption[] = [
  {
    name: 'MobilePay',
    id: 0,
    component: (

      <img
        src="https://comeanddance.dk/wp-content/uploads/2017/12/mobilepay-logo.png?w=640"
        alt="Centered Image"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />
    ),
  },
  {
    name: 'Credit Card',
    id: 1,
    component: (
      <Card key={1}>
        <CardMedia>
          <img height={'100%'} width={'100%'}
            src="https://e7.pngegg.com/pngimages/363/177/png-clipart-visa-mastercard-logo-visa-mastercard-computer-icons-visa-text-payment.png" alt="Card image" />
        </CardMedia>
        <CardContent style={{ textAlign: "center", fontSize: "small" }}>
          <Typography>Credit Card</Typography>
        </CardContent>
      </Card>
    ),
  },
  {
    name: 'Paypal',
    id: 2,
    component: (
      <Card key={2}>
        <CardMedia>
          <img height={'100%'} width={'100%'}
            src="https://img.freepik.com/free-icon/paypal_318-674245.jpg" alt="Card image" />
        </CardMedia>
        <CardContent style={{ textAlign: "center", fontSize: "small" }}>
          <Typography>Paypal</Typography>
        </CardContent>
      </Card>
    ),
  },
];