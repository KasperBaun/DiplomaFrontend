import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AddressForm } from './components/AdressForm';
import { PaymentForm } from './components/PaymentForm';
import { Review } from './components/Review';
import MobXContext, { IMobXContext } from '@stores/MobXContext';
import { useContext } from 'react';


function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export const PaymentPage = () => {

    const { basketStore, languageStore } = useContext<IMobXContext>(MobXContext);
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = [languageStore.currentLanguage.shippingAddress, languageStore.currentLanguage.paymentDetails, languageStore.currentLanguage.reviewOrder];

    const handleNext = () => {
        console.log("active step:", activeStep + 1);
        setActiveStep(activeStep + 1);
        console.log(activeStep);
        if (activeStep === 0) {
            console.log("Yea baby");
            const asyncFunc = async () => {
                await basketStore.createCustomer();
                console.log('Customer created', basketStore.Customer);
            }
            asyncFunc();
        }
    };

    const handleBack = () => { setActiveStep(activeStep - 1); };

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    {languageStore.currentLanguage.checkOutText}
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? (
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
                ) : (
                    <React.Fragment>
                        {getStepContent(activeStep)}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    {languageStore.currentLanguage.back}
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Paper>
        </Container>

    );
}
// import MobXContext from "@stores/MobXContext";
// import { observer } from "mobx-react-lite"
// import { UserDetailForm } from "./components/UserDetailForm";
// import { Grid } from "@mui/material";
// import { ShoppingCartWidget } from "./components/ShopCart";
// import { useContext, useState } from "react";
// import { PaymentOptions } from "./components/PaymentOptions";
// import { PaymentMobilePayForm } from "./components/PaymentMobilePayForm";
// import { PaymentPaypalForm } from "./components/PaymentPayPalForm";
// import { PaymentCreditCardForm } from "./components/PaymentCreditCardForm";
// import { MobilePayForm, CardInfo, CheckoutForm, PaymentForm } from "@models/Checkout";
// import { useNavigate } from "react-router-dom";


// export const PaymentPage = observer(() => {

//     const { languageStore, basketStore, webshopStore } = useContext(MobXContext);
//     const [selectedPaymentOption, setSelectedPaymentOption] = useState<number>(-1);

//     const [paymentForm, setPaymentForm] = useState<PaymentForm>();
//     const [paymentMethod, setPaymentMethod] = useState<string>("");
//     const [mobilePayPhone, setMobilePayPhone] = useState<MobilePayForm>({ phoneNumber: "" });
//     const [cardInfo, setCardInfo] = useState<CardInfo>({ cardNumber: "", cardCVC: "", cardExpirationDate: "", cardHolderName: "" });
//     const [paypalApproved, setPaypalApproved] = useState<boolean>(false);

//     const navigate = useNavigate();

//     const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>();
//     const [isCheckoutReady, setIsCheckoutReady] = useState<boolean>(false);

//     const handleOnPaymentClick = () => {
//         console.log(isCheckoutReady);
//         if (isCheckoutReady) {
//             let paymentMethod = "";
//             switch (selectedPaymentOption) {
//                 case 0: paymentMethod = "MobilePay"; break;
//                 case 1: paymentMethod = "CreditCard"; break;
//                 case 2: paymentMethod = "PayPal"; break;
//                 default: paymentMethod = "Unknown"; break;
//             }
//             console.log(paymentMethod);

//             if (mobilePayPhone.phoneNumber !== "") {
//                 console.log(webshopStore.MobilePayForm)
//                 if (webshopStore.Customer) {
//                     // Save to Store
//                     webshopStore.PaymentForm = {
//                         id: webshopStore.Customer.email,
//                         deliveryMethod: "",
//                         paymentMethod: paymentMethod,
//                     };
//                     // webshopStore.setCheckoutPayment(paymentForm);
//                     console.log(paymentForm);
//                     // Navigate to Confirmation Page
//                     if (webshopStore.PaymentForm)
//                         navigate('/confirmation/' + webshopStore.Customer.email)
//                 }
//             }
//             else if (webshopStore.CardInfo) {
//                 console.log(JSON.stringify(webshopStore.CardInfo))
//                 console.log(JSON.stringify(webshopStore.Customer))
//                 if (webshopStore.Customer) {
//                     // Save to Store
//                     webshopStore.PaymentForm = {
//                         id: webshopStore.Customer.email,
//                         deliveryMethod: "",
//                         paymentMethod: paymentMethod,
//                     };
//                     // webshopStore.setCheckoutPayment(paymentForm);
//                     console.log(JSON.stringify(webshopStore.PaymentForm));
//                     // Navigate to Confirmation Page
//                     if (webshopStore.PaymentForm)
//                         navigate('/confirmation/' + webshopStore.Customer.email)
//                 }
//             }
//             else if (paypalApproved) {
//                 console.log(webshopStore.PayPalForm)
//                 if (webshopStore.Customer) {
//                     // Save to Store
//                     webshopStore.PaymentForm = {
//                         id: webshopStore.Customer.email,
//                         deliveryMethod: "",
//                         paymentMethod: paymentMethod,
//                     };
//                     // webshopStore.setCheckoutPayment(paymentForm);
//                     console.log(paymentForm);
//                     // Navigate to Confirmation Page
//                     if (webshopStore.PaymentForm)
//                         navigate('/confirmation/' + webshopStore.Customer.email)
//                 }
//             }
//             else {
//                 alert("Error with payment");
//             }
//         }
//     }

//     const selectPaymentExecutor = () => {
//         if (selectedPaymentOption !== -1) {
//             switch (selectedPaymentOption) {
//                 case 0:
//                     return <PaymentMobilePayForm ls={languageStore} handleOnSubmitClick={handleOnPaymentClick} />
//                 case 1:
//                     return <PaymentCreditCardForm ls={languageStore} handleOnSubmitClick={handleOnPaymentClick} />
//                 case 2:
//                     return <PaymentPaypalForm ls={languageStore} handleOnSubmitClick={handleOnPaymentClick} />
//                 default:
//                     console.log("Unknown payment option");
//                     break;
//             }
//         }
//     }

//     return (
//         <Grid container style={{ justifyContent: 'center', marginBottom: '2rem' }}>
//             <Grid item xs={12} md={8}>
//                 <UserDetailForm ls={languageStore} setCheckoutForm={setCheckoutForm} setIsCheckoutReady={setIsCheckoutReady} />
//             </Grid>
//             <Grid item xs={12} md={4}>
//                 <ShoppingCartWidget ls={languageStore} basket={basketStore.Basket} />
//                 <PaymentOptions setSelectedPaymentOption={setSelectedPaymentOption} />
//                 {selectPaymentExecutor()}
//             </Grid>
//         </Grid>
//     )

// });