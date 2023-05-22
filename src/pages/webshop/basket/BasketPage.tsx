import Grid from "@mui/material/Grid";
import { observer } from "mobx-react-lite"
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import Card from '@mui/material/Card';
import { BasketPageItem } from "./BasketPageItem";
import { Button, Divider, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom"

export const BasketPage: React.FC = observer(function BasketPage() {
    const { basketStore, languageStore } = useContext(MobXContext);
    const navigate = useNavigate();
    const handleClick = () => { navigate('/Payment') }

    const getTotal = (bas = basketStore.Basket) => {
        let sum = 0;
        for (let i = 0; i < bas.length; i++) {
            sum = sum + bas[i].currentPrice;
        }
        return sum;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <Card style={{ marginTop: "2rem" }}>
                    <h3 style={{ paddingTop: "1rem", paddingLeft: "1rem" }}>{languageStore.currentLanguage.yourBasket}</h3>
                    {basketStore.Basket.map((item, index) => (
                        <BasketPageItem key={item.id + index} item={item} />
                    ))}
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Card style={{ marginTop: "2rem" }}>
                    <div style={{ marginLeft: "1rem" }}>
                        <h3 style={{ paddingTop: "1rem" }}>{languageStore.currentLanguage.yourTotal}</h3>
                        <div className="b_PriceText">{languageStore.currentLanguage.subTotal} {getTotal(basketStore.Basket)} DKK</div>
                        <div className="b_PriceText">{languageStore.currentLanguage.procesFee} {0} </div>
                    </div>
                    <Divider />
                    <div className="b_PriceText" style={{ fontWeight: "700", margin: "1rem" }}>{languageStore.currentLanguage.totalIncMoms} {getTotal(basketStore.Basket)} DKK </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
                        <Button className="checkoutButton" variant="contained" onClick={() => handleClick()} style={{ width: '50%', minHeight: '2rem', margin: '1.5rem', }}>{languageStore.currentLanguage.checkOutText} </Button>
                    </div>
                </Card>

                <Card style={{ marginTop: "2rem" }}>
                    <h5 style={{ paddingTop: "1rem", marginLeft: "1rem" }}>{languageStore.currentLanguage.addDiscountCode}</h5>

                    <div style={{ display: "flex", alignItems: "end", marginLeft: "1rem", marginBottom: "1rem" }}>
                        <TextField id="standard-basic1" label={languageStore.currentLanguage.discountCodeOptional} variant="standard" />
                        <Button variant="outlined">{languageStore.currentLanguage.addButton}</Button>
                    </div>
                </Card>
            </Grid>
        </Grid>
    )
});