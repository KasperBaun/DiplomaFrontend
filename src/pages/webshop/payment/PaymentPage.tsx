import { observer } from "mobx-react-lite"
import UserDetailForm from "./components/UserDetailForm";
import { Grid } from "@mui/material";
import './css/payment.scss';
import { Row } from "react-bootstrap";
import ShoppingCartWidget from "./components/ShopCart";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import Basket from "@models/Basket";

interface IPaymentPageProps {
}

const PaymentPage = (props: IPaymentPageProps) => {

    const { languageStore, basketStore, orderStore } = useContext(MobXContext);

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
                <ShoppingCartWidget ls={languageStore} basket={ basketStore.Basket } order={orderStore.OrderDetails} />
            </Grid>
        </Grid>
    )

};

export default observer(PaymentPage);