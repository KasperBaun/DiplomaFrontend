import {IconButton, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Divider  } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom"
import { randomBytes } from "crypto";

export default function CartDrawer(){
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

    function handleClick() {
      navigate('/basket' , { state: { } })
  }

    const cartElements = () => (
        <Box 
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List style={{width: '15vw'}}>
            {['Royal Copenhagen Skål', '20 stk Illums bolighus stel', 'Figur fra Patrick Swazy INC', 'etc'].map((text, index, array) => (
              <div key={"cart" + Math.random()}>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
              <Divider style={{backgroundColor: 'black', height: '2px'}}/>
              </div>
            ))}
          </List>
          <div style={{position: 'fixed', bottom: 0, marginBottom : '3vh'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '15vw', margin: 'auto'}}>
                  <div style={{textAlign: 'start', marginLeft: '1.5rem', fontSize: '1.2 rem', fontWeight:"bold" }}>
                    {'Subtotal (5 items)'}
                  </div>
                  <div style={{textAlign: 'end' , marginRight: '1.5rem',  fontSize: '1.2 rem', fontWeight:"bold"}}>
                    {'100,00 DKK'}
                  </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem'}}>
              <Button className="cartButton" variant="outlined"  onClick={() => handleClick()} style={{width: '100%', minHeight: '5rem', marginLeft: '1.5rem', marginRight: '1.5rem',}}>View cart</Button>
            </div>
          </div>
        </Box>
      );

    return(
        <div>
        <React.Fragment>
          <IconButton onClick={toggleDrawer(true)}><ShoppingCartIcon style={{ color: 'white' , fontSize: 40  }}/></IconButton>
          <Drawer
            anchor='right'
            open={drawerState}
            onClose={toggleDrawer(false)}>
            {cartElements()}
          </Drawer>
        </React.Fragment>
        </div>    
    )
}