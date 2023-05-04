import { Stack, Button } from "react-bootstrap";
import { Grid } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import { ProductItemWeb } from "@models/ProductItemWeb";
import { useNavigate } from "react-router-dom";


export function CartItem({ item }: { item: ProductItemWeb }) {

    const navigate = useNavigate();
    const { basketStore } = useContext(MobXContext);

    function removeFromCart(item: ProductItemWeb) {
        basketStore.removeFromBasket(item);
    }

    // function navigateToItem(){
    //     console.log("i navigate");
    //     navigate('/product/' + item.id);
    // }

    return (
        <div style={{ paddingTop: '0.5rem' }}>
            <Grid container>
                <Stack direction="horizontal" gap={2} className="d-flex-align-items-center">
                    <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                        <img
                            src={item.images[0].url}
                            style={{
                                maxWidth: '100%', paddingLeft: '0.5rem',
                                paddingRight: '0.5rem', display: 'flex'
                            }}
                            alt=""
                        />
                    </Grid>

                    <Grid item xs={10} sm={10} md={10} lg={5} xl={5}>
                        <Stack direction="vertical">
                            <Grid item>
                                <div style={{ fontSize: '14px' }}>
                                    {item.product.name}
                                </div>
                            </Grid>
                            <Grid item>
                                <div style={{ fontSize: '14px', marginTop: '1.5rem', fontWeight: '600' }}>
                                    {item.currentPrice} DKK
                                </div>
                            </Grid>
                        </Stack>
                    </Grid>

                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item)}> X </Button>
                    </Grid>
                </Stack>
            </Grid>
        </div>
    )
}