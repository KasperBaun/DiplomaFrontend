import { observer } from "mobx-react-lite"
import { Grid } from "@mui/material";
import { useState } from "react";
import { PaymentOptions } from "./PaymentOptions";
import { PaymentMobilePayForm } from "./PaymentMobilePayForm";
import { PaymentPaypalForm } from "./PaymentPayPalForm";
import { PaymentCreditCardForm } from "./PaymentCreditCardForm";


export const PaymentForm = observer(() => {

  const [selectedPaymentOption, setSelectedPaymentOption] = useState<number>(-1);

  const selectPaymentExecutor = () => {
    if (selectedPaymentOption !== -1) {
      switch (selectedPaymentOption) {
        case 0:
          return <PaymentMobilePayForm />
        case 1:
          return <PaymentCreditCardForm />
        case 2:
          return <PaymentPaypalForm />
        default:
          console.log("Unknown payment option");
          break;
      }
    }
  }

  return (
    <Grid container sx={{
      display: 'flex',
      flexDirection: 'column'
    }}
    >
      <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
        <PaymentOptions setSelectedPaymentOption={setSelectedPaymentOption} />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex' }}>
        {selectPaymentExecutor()}
      </Grid>
    </Grid>
  )
});