import { Stack, Button } from "react-bootstrap";
import { Grid } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { useContext} from "react";
import ProductItemWeb from "@models/ProductItemWeb";


export function CartItem( {item }: {item : ProductItemWeb}){
   
    const {basketStore} = useContext(MobXContext);

    function removeFromCart(item : ProductItemWeb ){
        basketStore.removeFromBasket(item);
    }
    
    return(
        <div style={{paddingTop:'0.5rem'}}>
            <Grid container>
                <Stack direction="horizontal" gap={2} className="d-flex-align-items-center">
                <Grid item xl={5}>
                    <img
                        src={item.images[0]}
                        style={{ width:'100%', paddingLeft:'0.5rem',
                        paddingRight:'0.5rem'}}
                        alt=""
                    /> 
                </Grid>
                <Stack direction="vertical">
                    <Grid item>
                        <div style={{fontSize:'16px'}}>
                            {item.product.name}
                        </div>      
                    </Grid>     
                    <Grid item>
                        <div style={{fontSize:'16px', marginTop:'1.5rem', fontWeight:'600'}}>
                            {item.price} DKK
                        </div>      
                    </Grid>  
                </Stack>
                    <  Grid item xl={2}>
                         <Button variant="outline-danger" size="sm" onClick={()=>removeFromCart(item)}> X </Button>   
                    </Grid>  
                </Stack>
            </Grid>
        </div>
    )
}