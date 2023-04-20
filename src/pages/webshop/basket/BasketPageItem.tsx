import ProductItem from "@models/ProductItem";
import Grid from "@mui/material/Grid";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite"
import { useContext } from "react";
import { Button } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";


interface IBasketPageItemProps {
    item : ProductItem
}



const BasketPageItem: React.FC<IBasketPageItemProps> = observer(function BasketPage(props: IBasketPageItemProps) {
    const { languageStore, basketStore} = useContext(MobXContext);  

    function removeFromCart(item : ProductItem ){
        basketStore.removeFromBasket(item);
    }
    return (
        <Grid container
        spacing={2}
        padding={'1rem'}
        >   
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                 <img
                        src={props.item.images[0]}
                        style={{ maxWidth:'100%', paddingLeft:'0.5rem',
                        paddingRight:'0.5rem', display:'flex'}}
                        alt=""
                    /> 
            </Grid>
                <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                    <div style={{padding:"1rem"}}>
                        <div style={{fontWeight:"800"}}>{props.item.product.name}</div>
                        <div className="productDe_modelNumber">{languageStore.currentLanguage.productPage_productModelNumber} : {props.item.product.modelNumber}</div>
                        <div className="B_Text">{languageStore.currentLanguage.OrderDetailsManufacturer} : {props.item.product.manufacturer}</div>
                        <div className="B_Text">{languageStore.currentLanguage.getCondition(props.item.condition)} </div>
                        <div className="B_Text">{languageStore.currentLanguage.getQuality(props.item.quality)} </div>
                        <div className="B_Text">{props.item.customText}</div>
                    </div>   
                </Grid>
            
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <div style={{padding:"1rem"}}>
                    <div style={{fontWeight:'700'}}>{props.item.currentPrice} Kr </div>

                    <IconButton onClick={()=>removeFromCart(props.item)}>
                            <DeleteIcon style={{ color: 'Grey' , fontSize: 30  }}/>
                    </IconButton> 
                </div>
                
            </Grid>
        </Grid>
    )

});

export default BasketPageItem;