import { observer } from "mobx-react-lite"
import UserDetailForm from "./components/UserDetailForm";
import { Grid } from "@mui/material";
import './css/payment.scss';
import ShoppingCartWidget from "./components/ShopCart";
import { useContext, useState } from "react";
import MobXContext from "@stores/MobXContext";
import OrderDetails from "@models/OrderDetails";
import PaymentOptions from "./components/PaymentOptions";
import PaymentMobilePayForm from "./components/PaymentMobilePayForm";
import PaymentPaypalForm from "./components/PaymentPayPalForm";
import PaymentCreditCardForm from "./components/PaymentCreditCardForm";
import { MobilePayForm, CardInfo, CheckoutForm, PaymentForm } from "@models/Checkout";
import { useNavigate } from "react-router-dom";

interface IPaymentPageProps {
    orders : OrderDetails[];
}

const PaymentPage = (props: IPaymentPageProps) => {

    const { languageStore, basketStore, webshopStore } = useContext(MobXContext);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState<number>(-1);

    const [paymentForm, setPaymentForm] = useState<PaymentForm>();
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [mobilePayPhone, setMobilePayPhone] = useState<MobilePayForm>();
    const [cardInfo, setCardInfo] = useState<CardInfo>();
    const [paypalApproved, setPaypalApproved] = useState<boolean>();

    const navigate = useNavigate();

    const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>();
    const [isCheckoutReady, setIsCheckoutReady] = useState<boolean>(false);

    const handleOnPaymentClick = () => {
        if(isCheckoutReady) {
            if(mobilePayPhone) {
                setPaymentForm({
                    checkoutForm: checkoutForm,
                    paymentMethod: paymentMethod,
                    mobilePayPhone: mobilePayPhone,
                });

                // Save to Store
                webshopStore.setCheckoutPayment(paymentForm);
                // Navigate to Confirmation Page
                navigate('/confirmation/' + paymentForm.id)
            }
            else if(cardInfo) {
                setPaymentForm({
                    checkoutForm: checkoutForm,
                    paymentMethod: paymentMethod,
                    cardInfo: cardInfo
                });

                // Save to Store
                // Navigate to Confirmation Page
            }
            else if(paypalApproved) {
                setPaymentForm({
                    checkoutForm: checkoutForm,
                    paymentMethod: paymentMethod,
                    paypal: paypalApproved
                });

                // Save to Store
                // Navigate to Confirmation Page
            }
            else {
                alert("Error with payment");
            }
        }


    }

    const selectPaymentExecutor = () => { 
        if(selectedPaymentOption !== -1) {
            switch(selectedPaymentOption) {
                case 0:
                    return <PaymentMobilePayForm ls={languageStore} handleOnSubmitClick={handleOnPaymentClick} setMobilePayPhone={setMobilePayPhone} />
                case 1:
                    return <PaymentCreditCardForm ls={languageStore} handleOnSubmitClick={handleOnPaymentClick} setCardInfo={setCardInfo} />
                case 2:
                    return <PaymentPaypalForm ls={languageStore} handleOnSubmitClick={handleOnPaymentClick} setPaypalApproved={setPaypalApproved} />
                default:
                    console.log("Unknown payment option");
                    break;
            }
        }
    }

    return (
        <Grid container style={{ justifyContent: 'center', marginBottom: '2rem'}}>
            <Grid item xs={12} md={8}>
                <UserDetailForm ls={languageStore} setCheckoutForm={setCheckoutForm} setIsCheckoutReady={setIsCheckoutReady} />
            </Grid>
            <Grid item xs={12} md={4}>
                <ShoppingCartWidget ls={languageStore} basket={ basketStore.Basket } order={ props.orders } />
                <PaymentOptions setSelectedPaymentOption={setSelectedPaymentOption} />
                { selectPaymentExecutor() }
            </Grid>
        </Grid>
    )

};

export default observer(PaymentPage);