import { Customer } from "@models/Customer";
import { Payment } from "@models/Payment";
import { CreditCard, LocalShipping, LocationOn } from "@mui/icons-material";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { Constants } from "@utils/Constants";
import { useContext } from "react";
import { Link } from "react-router-dom";

type ShippingProgressProps = {
    customer: Customer;
    payment: Payment;
    deliveryMethod: string;
    deliveryStatus: string;
}

export const ShippingProgress = ({ customer, payment, deliveryMethod, deliveryStatus }: ShippingProgressProps) => {

    const { languageStore } = useContext(MobXContext);
    const headlineColor = Constants.primaryColor;

    return (
        <Container>
            <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item md={4}>
                    {/* Shipping Info*/}
                    <Grid container spacing={1}>
                        <Grid item md={12}>
                            <LocationOn />
                        </Grid>
                        <Grid item md={12}>
                            <Typography variant="h4" color={headlineColor} fontWeight={'bold'}>{languageStore.currentLanguage.address_text}</Typography>
                            <Grid item>{`${customer.firstName} ${customer.lastName}`}</Grid>
                            <Grid item>{`${customer.address}`}</Grid>
                            <Grid item>{`${customer.zipCode} ${customer.city}`}</Grid>
                            <Grid item>{`${customer.country}`}</Grid>
                            <Grid item>{`${customer.countryCode} ${customer.phone}`}</Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item md={4}>
                    {/* Shipping Method */}
                    <Grid container spacing={1}>
                        <Grid item md={12}>
                            <LocalShipping />
                        </Grid>
                        <Grid item md={12}>
                            <Typography variant="h4" color={headlineColor} fontWeight={'bold'}>{languageStore.currentLanguage.shipping}</Typography>
                            <Grid item md={12} >
                                <Typography gutterBottom>{languageStore.currentLanguage.method}: {deliveryMethod} </Typography>
                            </Grid>
                            <Grid item md={12} >
                                <Typography gutterBottom>{languageStore.currentLanguage.status}: {deliveryStatus} </Typography>
                            </Grid>
                            {
                                deliveryMethod === "Afhentning" &&
                                <Grid item><Link to="/contact">{languageStore.currentLanguage.opening_days}</Link></Grid>
                            }
                            {
                                deliveryMethod === "Levering" &&
                                <Grid item>({languageStore.currentLanguage.estimatedDeliveryTime})</Grid>
                            }
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item md={4}>
                    {/* Payment information */}
                    <Grid container spacing={1}>
                        <Grid item md={12}>
                            <CreditCard />
                        </Grid>
                        <Grid item md={12}>
                            <Typography variant="h4" color={headlineColor} fontWeight={'bold'}>{languageStore.currentLanguage.billingDetails}</Typography>
                            <Grid item md={12} >
                                <Typography gutterBottom>{languageStore.currentLanguage.method}: {payment.method} </Typography>
                            </Grid>
                            {/* <Grid item>{`${customer.firstName} ${customer.lastName}`}</Grid>
                            <Grid item>{`${customer.address}`}</Grid>
                            <Grid item>{`${customer.zipCode} ${customer.city}`}</Grid>
                            <Grid item>{`${customer.country}`}</Grid>
                            <Grid item>{`${customer.countryCode} ${customer.phone}`}</Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container >
                <Grid item xs={12}>
                    <LinearProgress variant="determinate" value={33} />
                </Grid>
            </Grid>
        </Container>
    );
}