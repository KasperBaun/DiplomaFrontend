import { Grid, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { Dispatch, SetStateAction, useContext, useState } from "react";

interface IPaymentOptionsProps {
  setSelectedPaymentOption: Dispatch<SetStateAction<number>>;
}

interface PaymentOption {
  name: string;
  id: number;
  imgUrl: string;
}

const paymentOptions: PaymentOption[] = [
  {
    name: 'MobilePay',
    id: 0,
    imgUrl: "https://comeanddance.dk/wp-content/uploads/2017/12/mobilepay-logo.png?w=640"
  },
  {
    name: 'Creditcard',
    id: 1,
    imgUrl: "https://cdn.fansshare.com/photo/mastercard/visa-mastercard-logo-1262061594.jpg"
  },
  {
    name: 'PayPal',
    id: 2,
    imgUrl: "https://img.freepik.com/free-icon/paypal_318-674245.jpg"
  }
]

export const PaymentOptions = (props: IPaymentOptionsProps) => {

  const [selectedPaymentId, setSelectedPaymentId] = useState(-1);
  const { languageStore } = useContext(MobXContext);

  const handlePaymentOptionClick = (paymentOption: number) => {
    setSelectedPaymentId(paymentOption);
    props.setSelectedPaymentOption(paymentOption);
  };

  return (
    <Grid container spacing={2}
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        margin: 1
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight={'bold'} gutterBottom sx={{ mt: 2 }}>{languageStore.currentLanguage.selectPaymentMethod}</Typography>
      </Grid>
      {paymentOptions.map((paymentOption, index) => (
        <Grid item
          xs={4}
          key={index}
          onClick={() => handlePaymentOptionClick(paymentOption.id)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '0!important',
            paddingLeft: '0!important',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            border: selectedPaymentId === paymentOption.id ? 'solid 1px black' : '',
            '&:hover': {
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.6)",
              cursor: "pointer"
            }
          }}
        >
          <img
            style={{
              maxHeight: '8vh', maxWidth: '10vh'
            }}
            alt={"Payment option possibility"}
            src={paymentOption.imgUrl}
            key={paymentOption.id} />
        </Grid>
      ))
      }
    </Grid >
  )
}