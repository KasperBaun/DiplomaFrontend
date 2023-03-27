import { Button, Drawer, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer  } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';

 
export default function CartDrawer(){
    const [drawerState, setDrawerState] = React.useState(false); 
    
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

    const cartElements = () => (
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {['Old boots', 'Golden Spoon', 'Your Mama', 'etc'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );

    return(
        <div>
        <React.Fragment>
          <Button onClick={toggleDrawer(true)}>Show my shopping list</Button>
          <Drawer
            anchor='right'
            open={drawerState}
            onClose={toggleDrawer(false)}
          >
            {cartElements()}
          </Drawer>
        </React.Fragment>
        </div>    
    )
}