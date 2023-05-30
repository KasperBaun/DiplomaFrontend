import { Grid, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import { ProductItemWeb } from "@models/ProductItemWeb";
import { useNavigate } from "react-router-dom";
import { ExtentionMethods } from "@utils/ExtentionMethods";
import { Delete } from "@mui/icons-material";


export function CartItem({ item }: { item: ProductItemWeb }) {

    const navigate = useNavigate();
    const { basketStore, languageStore } = useContext(MobXContext);

    function removeFromCart(item: ProductItemWeb) {
        basketStore.removeFromBasket(item);
    }

    function navigateToItem() {
        navigate('/product/' + item.id);
    }

    return (
        <Grid container display='flex' flexDirection={'row'} spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5} onClick={navigateToItem}
                sx={{
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}>
                <img
                    src={item.images[0].url}
                    style={{
                        maxWidth: '100%', paddingLeft: '0.5rem',
                        paddingRight: '0.5rem', display: 'flex'
                    }}
                    alt=""
                />
            </Grid>

            <Grid item xs={10} sm={10} md={10} lg={5} xl={5}
                onClick={navigateToItem}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}>
                <Typography>
                    {item.product.name}
                </Typography>
                <Typography justifyContent={'flex-end'}>
                    <b>{ExtentionMethods.formatPrice(item.currentPrice, languageStore.getCurrentLanguageCode(), "DKK")}</b>
                </Typography>
            </Grid >

            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}
                sx={{
                    justifyContent: 'center',
                    display: 'flex',
                    height: '100%',
                }}>
                <Delete
                    sx={{
                        borderRadius: '5rem',
                        '&:hover': {
                            color: 'red',
                            cursor: 'pointer',
                            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.6)",
                            transition: "box-shadow 0.2s ease-in-out"
                        }
                    }}
                    onClick={() => removeFromCart(item)} />
            </Grid>
        </Grid >
    )
}