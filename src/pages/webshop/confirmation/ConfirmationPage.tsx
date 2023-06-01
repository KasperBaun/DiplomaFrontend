import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { ShippingProgress } from "./components/ShippingProgress";
import { Box, Container, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List } from '@mui/material';
import { ExtentionMethods } from "@utils/ExtentionMethods";

export const ConfirmationPage = observer(() => {

    const { basketStore, languageStore } = useContext(MobXContext);
    const [oldBasket] = useState(basketStore.Basket); // Set the initial value of oldBasket
    
    useEffect(() => {
        // Cleanup function to reset basketStore when component unmounts
        return () => {
            basketStore.resetBasket();
        };
    },);

    if (basketStore.OrderCreated) {
        return (
            <Container>
                <Grid container style={{ textAlign: "center", margin: "1rem", padding: "1rem" }}>
                    <Grid item xs={12}><Typography variant="h1">{languageStore.currentLanguage.thankYou}!</Typography></Grid>
                    <Grid item xs={12}><Typography variant="h3">{languageStore.currentLanguage.yourOrder} {"# " + basketStore.Order.id} {languageStore.currentLanguage.hasBeenPlaced}</Typography></Grid>
                    <Grid item xs={12}><Typography variant="h5">{languageStore.currentLanguage.confirmationEmailHasBeenSentTo} {basketStore.Order.customer.email}</Typography></Grid>
                </Grid>

                <Box display="flex" justifyContent="center" m={1} p={1}>
                    <ShippingProgress
                        customer={basketStore.Order.customer}
                        payment={basketStore.Order.payment}
                        deliveryMethod={basketStore.Order.deliveryMethod ? basketStore.Order.deliveryMethod : "Afhent"}
                        deliveryStatus={basketStore.Order.deliveryStatus ? basketStore.Order.deliveryStatus : "Afventer"}
                    />
                </Box>

                <Grid container justifyContent="center" sx={{ marginTop: '1rem' }} spacing={2}>
                    <Grid item xs={8}>
                        <Paper sx={{ padding: '1rem' }}>
                            <Typography variant="h3">{languageStore.currentLanguage.orderList}</Typography>
                            <TableContainer >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{languageStore.currentLanguage.product}</TableCell>
                                            <TableCell>{languageStore.currentLanguage.modelNumber}</TableCell>
                                            <TableCell>{languageStore.currentLanguage.price}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {oldBasket.map((item) => {
                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.product.name}</TableCell>
                                                    <TableCell>{item.product.modelNumber}</TableCell>
                                                    <TableCell>{item.currentPrice}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>

                    <Grid item xs={4}>
                        <Paper sx={{ padding: '1rem' }}>
                            <Typography variant="h3">{languageStore.currentLanguage.orderSummary}</Typography>
                            <hr />
                            <Grid container sx={{ paddingRight: '1rem' }}>
                                <Grid item xs={10}><Typography>{languageStore.currentLanguage.subTotal}</Typography></Grid>
                                <Grid item xs={2}>{basketStore.getTotal(basketStore.Order.productItems)}</Grid>
                            </Grid>
                            <Grid container sx={{ paddingRight: '1rem' }}>
                                <Grid item xs={10}><Typography>{languageStore.currentLanguage.shippingAndHandling}</Typography></Grid>
                                <Grid item xs={2}>{ExtentionMethods.formatPrice(50, languageStore.getCurrentLanguageCode(), 'DKK')} </Grid>
                            </Grid>
                            <Grid container sx={{ paddingRight: '1rem' }}>
                                <Grid item xs={10}><Typography>{languageStore.currentLanguage.vat25}</Typography></Grid>
                                <Grid item xs={2}>{basketStore.getVAT(basketStore.Order.productItems)}</Grid>
                            </Grid>
                            <Grid container sx={{ paddingRight: '1rem' }}>
                                <Grid item xs={10}><Typography fontWeight={'bold'}>{languageStore.currentLanguage.total}</Typography></Grid>
                                <Grid item xs={2}><Typography fontWeight={'bold'}>{basketStore.getTotal(basketStore.Order.productItems, 50)}</Typography></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
    else {
        return (
            <Container >
                <Grid container display='flex' justifyContent='center'>
                    <Typography variant="h4">
                        No order is being processed at the moment
                    </Typography>
                </Grid>
            </Container>
        )
    }
});