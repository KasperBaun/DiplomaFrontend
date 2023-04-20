import Grid from "@mui/material/Grid";
import { observer } from "mobx-react-lite"
import { useContext} from "react";
import MobXContext from "@stores/MobXContext";
import BasketPageItem from "./BasketPageItem";

interface IBasketPageProps {

}



const BasketPage: React.FC<IBasketPageProps> = observer(function BasketPage(props: IBasketPageProps) {
    const {basketStore, languageStore } = useContext(MobXContext);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <h3 style={{paddingTop:"1rem", paddingLeft:"1rem"}}>{languageStore.currentLanguage.yourBasket}</h3>
                {basketStore.Basket.map((item, index) => (
                <BasketPageItem key={item.id + index} item={item} />
              ))}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <h3 style={{paddingTop:"1rem"}}>{languageStore.currentLanguage.yourTotal}</h3>
            </Grid>  
        </Grid>
    )

});

export default BasketPage;