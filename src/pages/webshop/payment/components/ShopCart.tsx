import Basket from "@models/Basket";
import OrderDetails from "@models/OrderDetails";
import ProductItem from "@models/ProductItem";
import { Grid } from "@mui/material";
import { LanguageStore } from "@stores/LanguageStore";
import { Col, Container, Row } from "react-bootstrap";

interface IShopCart {
    ls : LanguageStore;
    basket : ProductItem[];
    order : OrderDetails[];
}

const ShoppingCartWidget = ( props : IShopCart ) => {
    
    let totalPriceNoDiscount = props.basket.map((product) => product.currentPrice).reduce((a, b) => a + b, 0);

    let totalWithDiscount = 0;
    if ( props.order[0].discountCode ) { 
        // totalWithDiscount = totalPriceNoDiscount - (totalPriceNoDiscount * props.order.discountCode.discountPercentage);
    }

    return (
        <Container className="checkoutShoppingCart">
            <Row xs={12}>
                <Col xs={8}>{props.ls.currentLanguage.ShoppingCartWidgetTotalLabel}</Col>
                <Col xs={4} style={{ textAlign: 'right' }}>
                    {totalPriceNoDiscount !== 0 ? `${totalPriceNoDiscount} DKK` : '0 DKK'}
                </Col>
            </Row>

            <Row xs={12}>
                <Col xs={8}>{props.ls.currentLanguage.ShoppingCartWidgetPaymentFeeLabel}</Col>
                <Col xs={4} style={{ textAlign: 'right' }}>0 DKK</Col>
            </Row>
            <Row xs={12} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <hr />
            </Row>
            <Row xs={12}>
                <Col xs={8}><b>{props.ls.currentLanguage.ShoppingCartWidgetTotalAmountLabel}</b></Col>
                <Col xs={4} style={{ textAlign: 'right' }}><b>{  totalPriceNoDiscount !== 0 ? totalPriceNoDiscount.toString() + " DKK" : "0 DKK" }</b></Col>
            </Row>
        </Container>
    )
}

export default ShoppingCartWidget;