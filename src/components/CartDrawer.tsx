import {IconButton, Button, Drawer, Grid, Divider, Box, Badge, List  } from "@mui/material";
import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom"
import MobXContext from "@stores/MobXContext";
import { useContext} from "react";
import { CartItem } from "./CartItem";
import { observer } from "mobx-react-lite";
import { Padding } from "@mui/icons-material";
import { Stack } from "react-bootstrap";


const CartDrawer: React.FC = observer(function CartDrawer(){

    const {basketStore } = useContext(MobXContext);
    const [drawerState, setDrawerState] = React.useState(false); 
    const navigate = useNavigate();
    const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab')   
      ) {
        return;
      }
      setDrawerState(open);
    };    

    
    const getTotal = (bas = basketStore.Basket) => {
      let sum = 0;
      for (let i = 0; i < bas.length; i++) {
        sum = sum + bas[i].price;
      }
      return sum;
    }

    function handleClick() {
      navigate('/basket' , { state: { } })
  }
    const cartElements = () => (
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
      
          {<div style={{width: '18vw'}}>
    
            <Stack direction="vertical"> 

            <List style={{height:'80%', overflow:'auto', marginBottom:'6rem'}}>
              {basketStore.Basket.map((item, index) => (
                <div>
                  <CartItem key={item.id} item={item} />
                  <Divider style={{paddingTop:"1rem"}}/>
                </div>
                ))} 
          </List>  
            

        <div style={{position: 'fixed', bottom: 0, marginBottom : '3vh'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '18vw', margin: 'auto'}}>
                  <div style={{textAlign: 'start', marginLeft: '1.5rem', fontSize: '1.2 rem', fontWeight:"bold" }}>
                    {'Subtotal ('+ basketStore.Basket.length + ')'}
                  </div>
                  <div style={{textAlign: 'end' , marginRight: '1.5rem',  fontSize: '1.2 rem', fontWeight:"bold"}}>
                    {getTotal() + ' DKK'}
                  </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem'}}>
              <Button className="cartButton" variant="outlined"  onClick={() => handleClick()} style={{width: '100%', minHeight: '5rem', marginLeft: '1.5rem', marginRight: '1.5rem',}}>View cart</Button>
            </div>
          </div>
          </Stack>

        </div>


          }
        </Box>
      );

  
        return(
            <div>
            <React.Fragment>
              <IconButton onClick={toggleDrawer(true)}>
                  <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'}}
                    badgeContent={basketStore.Basket.length} color="warning">
                    <ShoppingCartIcon style={{ color: 'white' , fontSize: 40  }}/>
                  </Badge>
              </IconButton>
              <Drawer
                anchor='right'
                open={drawerState}
                onClose={toggleDrawer(false)}>
                {cartElements()}
              </Drawer>
            </React.Fragment>
            </div>    
        )   
});
export default CartDrawer;