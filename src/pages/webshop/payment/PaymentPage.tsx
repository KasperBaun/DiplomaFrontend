import { observer } from "mobx-react-lite"
import UserDetailForm from "./components/UserDetailForm";
import { Grid } from "@mui/material";
import './css/payment.scss';
import ShoppingCartWidget from "./components/ShopCart";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import OrderDetails from "@models/OrderDetails";

interface IPaymentPageProps {
    orders : OrderDetails[];
}

const PaymentPage = (props: IPaymentPageProps) => {

    const { languageStore, basketStore } = useContext(MobXContext);

    // Process: Select Product -> Add to basket -> Go to Basket onCLick => Create Order -> Payment


    // TODO: 
    /*
        1. Payment Form
        2. Payment Options
    */
    return (
        <Grid container style={{ justifyContent: 'center', marginBottom: '2rem'}}>
            <Grid item xs={12} sm={8}>
                <UserDetailForm ls={languageStore} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <ShoppingCartWidget ls={languageStore} basket={ basketStore.Basket } order={ props.orders } />
            </Grid>
        </Grid>
    )

};

export default observer(PaymentPage);