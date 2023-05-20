import { IconButton, Button, Drawer, Badge, List, ListItem, Typography, Divider } from "@mui/material";
import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom"
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import { CartItem } from "./CartItem";
import { observer } from "mobx-react-lite";

const CartDrawer: React.FC = observer(function CartDrawer() {

  const { basketStore, languageStore } = useContext(MobXContext);
  const [drawerState, setDrawerState] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setDrawerState(!drawerState);
  const handleClick = () => navigate('/basket');
  const getTotal = basketStore.Basket.reduce((acc, item) => acc + item.currentPrice, 0);

  return (
    <>
      {/* Button to toggle the basket and see how many items is in it */}
      <IconButton onClick={toggleDrawer}>
        <Badge
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          badgeContent={basketStore.Basket.length} color="warning">
          <ShoppingCartIcon style={{ color: 'white', fontSize: 40 }} />
        </Badge>
      </IconButton>

      {/* The basketmodal itself */}
      <Drawer
        variant="temporary"
        anchor='right'
        open={drawerState}
        onClose={toggleDrawer}

      >
        <List sx={{ width: '300px', height: '85vh' }} >
          {basketStore.Basket.map((item, index) => (
            <ListItem key={'basketItem' + index} sx={{ padding: "1rem" }}>
              <CartItem key={item.id} item={item} />
              <Divider color={"primary"} />
            </ListItem>
          ))}
        </List>

        <List sx={{ width: '300px', marginTop: 'auto' }}>
          <Divider color={"primary"} />
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
            <Typography variant="body1">{'Subtotal (' + basketStore.Basket.length + ')'}</Typography>
            <Typography variant="body1">{getTotal + ' DKK'}</Typography>

          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
            <Button className="cartButton" variant="contained" onClick={() => handleClick()} >{languageStore.currentLanguage.shopButton}</Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  )




});
export default CartDrawer;

