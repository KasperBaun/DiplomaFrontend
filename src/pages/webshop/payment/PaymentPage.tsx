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
    const [mobilePayPhone, setMobilePayPhone] = useState<MobilePayForm>({phoneNumber: ""});
    const [cardInfo, setCardInfo] = useState<CardInfo>({cardNumber: "", cardCVC: "", cardExpirationDate: "", cardHolderName: ""});
    const [paypalApproved, setPaypalApproved] = useState<boolean>(false);

    const navigate = useNavigate();

    const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>();
    const [isCheckoutReady, setIsCheckoutReady] = useState<boolean>(false);

    const handleOnPaymentClick = () => {
        console.log(isCheckoutReady);
        if(isCheckoutReady) {
            let paymentMethod = "";
            switch(selectedPaymentOption) {
                case 0: paymentMethod = "MobilePay"; break;
                case 1: paymentMethod = "CreditCard"; break;
                case 2: paymentMethod = "PayPal"; break;
                default: paymentMethod = "Unknown"; break;
            }
            console.log(paymentMethod);

            if(mobilePayPhone.phoneNumber !== "") {
                console.log(webshopStore.MobilePayForm)
                if(webshopStore.Customer) {
                    // Save to Store
                    webshopStore.PaymentForm = {
                        id: webshopStore.Customer.email,
                        deliveryMethod: "",
                        paymentMethod: paymentMethod,
                    };
                    // webshopStore.setCheckoutPayment(paymentForm);
                    console.log(paymentForm);
                    // Navigate to Confirmation Page
                    if(webshopStore.PaymentForm)
                        navigate('/confirmation/' + webshopStore.Customer.email)
                }
            }
            else if(webshopStore.CardInfo) {
                console.log(JSON.stringify(webshopStore.CardInfo))
                console.log(JSON.stringify(webshopStore.Customer))
                if(webshopStore.Customer) {
                    // Save to Store
                    webshopStore.PaymentForm = {
                        id: webshopStore.Customer.email,
                        deliveryMethod: "",
                        paymentMethod: paymentMethod,
                    };
                    // webshopStore.setCheckoutPayment(paymentForm);
                    console.log(JSON.stringify(webshopStore.PaymentForm));
                    // Navigate to Confirmation Page
                    if(webshopStore.PaymentForm)
                        navigate('/confirmation/' + webshopStore.Customer.email)
                }
            }
            else if(paypalApproved) {
                console.log(webshopStore.PayPalForm)
                if(webshopStore.Customer) {
                    // Save to Store
                    webshopStore.PaymentForm = {
                        id: webshopStore.Customer.email,
                        deliveryMethod: "",
                        paymentMethod: paymentMethod,
                    };
                    // webshopStore.setCheckoutPayment(paymentForm);
                    console.log(paymentForm);
                    // Navigate to Confirmation Page
                    if(webshopStore.PaymentForm)
                        navigate('/confirmation/' + webshopStore.Customer.email)
                }
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
                    return <PaymentMobilePayForm ls={languageStore} handleOnSubmitClick={handleOnPaymentClick}/>
                case 1:
                    return <PaymentCreditCardForm ls={languageStore} handleOnSubmitClick={handleOnPaymentClick}/>
                case 2:
                    return <PaymentPaypalForm ls={languageStore} handleOnSubmitClick={handleOnPaymentClick} />
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