import * as React from 'react';
import MobXContext from "@stores/MobXContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, Button, Drawer, Badge, List, ListItem, Typography, Divider, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { CartItem } from "./CartItem";
import { observer } from "mobx-react-lite";
import { ExtentionMethods } from "@utils/ExtentionMethods";

export const CartDrawer: React.FC = observer(() => {

  const { basketStore, languageStore } = useContext(MobXContext);
  const [drawerState, setDrawerState] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setDrawerState(!drawerState);
  const handleClick = () => {
    navigate('/basket')
    toggleDrawer();
  };
  const getTotal = ExtentionMethods.formatPrice(
    basketStore.Basket.reduce((acc, item) => acc + item.currentPrice, 0),
    languageStore.getCurrentLanguageCode(),
    'DKK'
  );

  return (
    <>
      {/* Button to toggle the basket and see how many items is in it */}
      <Tooltip title={languageStore.currentLanguage.BasketTabText}>
        <IconButton onClick={toggleDrawer}
        >
          <Badge
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            badgeContent={basketStore.Basket.length} color="warning">
            <ShoppingCartIcon style={{ color: 'white', fontSize: 24 }} onMouseEnter={(e) => {
              e.currentTarget.style.color = '#dc8665';
            }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white';
              }} />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* The basketmodal itself */}
      <Drawer
        variant="temporary"
        anchor='right'
        open={drawerState}
        onClose={toggleDrawer}

      >
        <List sx={{ width: '300px', height: '85vh', overflow: 'auto' }} >
          {basketStore.Basket.length === 0 &&
            <ListItem key={'noItems'} sx={{ padding: "1rem", display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h4" fontWeight={'bold'}>{languageStore.currentLanguage.noItemsInBasket}</Typography>
            </ListItem>
          }
          {basketStore.Basket.length > 0 && basketStore.Basket.map((item, index) => (
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
            <Typography variant="body1">{getTotal}</Typography>

          </ListItem>
          <ListItem sx={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
            <Button className="cartButton" variant="contained" onClick={() => handleClick()} >{languageStore.currentLanguage.shopButton}</Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
});

