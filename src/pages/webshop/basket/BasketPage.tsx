import Grid from "@mui/material/Grid";
import { observer } from "mobx-react-lite"
import { useContext} from "react";
import MobXContext from "@stores/MobXContext";
import BasketPageItem from "./BasketPageItem";
import Card from '@mui/material/Card';
import { Margin } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";


interface IBasketPageProps {

}



const BasketPage: React.FC<IBasketPageProps> = observer(function BasketPage(props: IBasketPageProps) {
    const {basketStore, languageStore } = useContext(MobXContext);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Card style={{marginTop:"2rem"}}>    
                        <h3 style={{paddingTop:"1rem", paddingLeft:"1rem"}}>{languageStore.currentLanguage.yourBasket}</h3>
                        {basketStore.Basket.map((item, index) => (
                        <BasketPageItem key={item.id + index} item={item} />
                    ))}
                    </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Card style={{marginTop:"2rem"}}>
                    <h3 style={{paddingTop:"1rem"}}>{languageStore.currentLanguage.yourTotal}</h3>
                    <div className="b_PriceText">Subtoal: </div>
                    <div className="b_PriceText">Levering:  </div>
                    <Divider/>
                    <div className="b_PriceText" style={{fontWeight:"700"}}>Pris i alt (inklusiv moms): </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem'}}>
                        <Button className="checkoutButton" variant="contained" style={{width: '50%', minHeight: '2rem', margin:'1.5rem',}}>Check out</Button>
                    </div>
                </Card>

                <Card style={{marginTop:"2rem"}}>
                <h5 style={{paddingTop:"1rem"}}>Tilføj rabatkode:</h5>

                </Card>


            </Grid>  
        </Grid>
    )

});

export default BasketPage;