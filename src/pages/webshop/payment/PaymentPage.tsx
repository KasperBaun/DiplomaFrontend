import { observer } from "mobx-react-lite"
import UserDetailForm from "./components/UserDetailForm";
import { Grid } from "@mui/material";
import './css/payment.scss';
import ShoppingCartWidget from "./components/ShopCart";
import { useContext, useState } from "react";
import MobXContext from "@stores/MobXContext";
import OrderDetails from "@models/OrderDetails";
import PaymentButton from "./components/PaymentButton";
import PaymentOptions from "./components/PaymentOptions";
import PaymentMobilePayForm from "./components/PaymentMobilePayForm";
import { useNavigate } from "react-router-dom";
import PaymentPaypalForm from "./components/PaymentPayPalForm";
import PaymentCreditCardForm from "./components/PaymentCreditCardForm";

interface IPaymentPageProps {
    orders : OrderDetails[];
}

const PaymentPage = (props: IPaymentPageProps) => {

    const { languageStore, basketStore } = useContext(MobXContext);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState<number>(-1);

    const selectPaymentExecutor = () => { 
        if(selectedPaymentOption !== -1) {
            switch(selectedPaymentOption) {
                case 0:
                    return <PaymentMobilePayForm ls={languageStore} />
                case 1:
                    return <PaymentCreditCardForm ls={languageStore} />
                case 2:
                    return <PaymentPaypalForm />
                default:
                    console.log("Unknown payment option");
                    break;
            }
        }
    }

    return (
        <Grid container style={{ justifyContent: 'center', marginBottom: '2rem'}}>
            <Grid item xs={12} md={8}>
                <UserDetailForm ls={languageStore} />
            </Grid>
            <Grid item xs={12} md={4}>
                <ShoppingCartWidget ls={languageStore} basket={ basketStore.Basket } order={ props.orders } />
                <PaymentOptions setSelectedPaymentOption={setSelectedPaymentOption} />
                {/* <PaymentButton ls={languageStore} /> */}
                { selectPaymentExecutor() }
            </Grid>
        </Grid>
    )

};

export default observer(PaymentPage);