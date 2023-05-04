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

interface IPaymentPageProps {
    orders : OrderDetails[];
}

interface ICheckoutForm {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    countryCode: string;
    phone: string;
    deliveryMethod: string;
  }

const PaymentPage = (props: IPaymentPageProps) => {

    const { languageStore, basketStore } = useContext(MobXContext);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState<number>(-1);

    const [billingInfo, setBillingInfo] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [mobilePayPhone, setMobilePayPhone] = useState<string>("");
    const [cardInfo, setCardInfo] = useState<string>("");

    const [checkoutForm, setCheckoutForm] = useState<ICheckoutForm>();
    const [isCheckoutReady, setIsCheckoutReady] = useState<boolean>(false);

    const handleOnPaymentClick = () => {

    }

    const selectPaymentExecutor = () => { 
        if(selectedPaymentOption !== -1) {
            switch(selectedPaymentOption) {
                case 0:
                    return <PaymentMobilePayForm ls={languageStore} handleOnSubmitClick={handleOnPaymentClick} />
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