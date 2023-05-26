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
import { observer } from 'mobx-react-lite';
import { Confirmation } from './components/Confirmation';

export const CheckoutPage = observer(() => {

    const { basketStore, languageStore } = useContext<IMobXContext>(MobXContext);
    const steps = [
        languageStore.currentLanguage.shippingAddress,
        languageStore.currentLanguage.paymentDetails,
        languageStore.currentLanguage.reviewOrder
    ];
    const [activeStep, setActiveStep] = React.useState(0);

    const StepContent: React.FC<{ step: number }> = ({ step }: { step: number }) => {
        switch (step) {
            case 0:
                return <AddressForm />;
            case 1:
                return <PaymentForm />;
            case 2:
                return <Review />;
            case 3:
                return <Confirmation />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = () => {
        if (activeStep === 0) {
            if (!basketStore.CustomerInputValidated && basketStore.customerPropertiesEmpty() !== false) {
                alert("Missing some fields - please check that all fields are correctly filled out");
                return;
            }
            basketStore.updateOrder();
        }
        if (activeStep === 1) {
            if (basketStore.OrderDTO.payment !== null || basketStore.OrderDTO.payment !== undefined) {
                basketStore.updateOrder();
            }
        }
        if (activeStep === 2) {
            const createOrder = async () => {
                await basketStore.createOrder();
            }
            createOrder();
        }
        setActiveStep(activeStep + 1);
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
                <React.Fragment>
                    <StepContent step={activeStep} />
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
            </Paper>
        </Container>
    );
});
