import { useLocation, useNavigate } from 'react-router-dom';
import { Box, alpha, styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import { observer } from 'mobx-react-lite';
import { CartDrawer } from '@components/cart/CartDrawer';
import LionLogo from '../../../components/svgs/LionLogo';
import { LanguageSwitch } from '@components/language/LanguageSwitch';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Constants } from '@utils/Constants';
import React, { useState } from 'react';
import { Hidden, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavPath } from '@models/Navpath';
import { MobileNav } from './components/MobileNav';
import { DesktopNav } from './components/DesktopNav';



export const Header: React.FC = observer(function Header() {

  const { languageStore, searchStore } = useContext(MobXContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navPaths: NavPath[] = [];
  navPaths.push({ path: "/", text: `${languageStore.currentLanguage.HomeTabText}` });
  navPaths.push({ path: "/products", text: `${languageStore.currentLanguage.ProductTabText}` });
  navPaths.push({ path: "/categories", text: `${languageStore.currentLanguage.CategoriesTabText}` });
  navPaths.push({ path: "/contact", text: `${languageStore.currentLanguage.ContactTabText}` });
  navPaths.push({ path: "/faq", text: `${languageStore.currentLanguage.FAQTabText}` });
  navPaths.push({ path: "/aboutus", text: `${languageStore.currentLanguage.AboutUsTabText}` })

  function searchOnProducts(searchText: string) {
    searchStore.filterBySearchText(searchText);
    navigate(`/products`);
  }

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <Hidden mdUp>
            <MobileNav navPaths={navPaths} />
          </Hidden>
          <Hidden mdDown>
            <DesktopNav navPaths={navPaths} />
          </Hidden>

          {location.pathname !== "/products" &&
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={languageStore.currentLanguage.SearchBarText}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  event.preventDefault();
                  searchStore.setSearchText(event.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    searchOnProducts(searchStore.searchText);
                  }
                }}
              />
            </Search>
          }
          <LanguageSwitch />
          <CartDrawer />
        </Toolbar>
      </AppBar>
    </Box >
  );
});

// <AppBar position="static" color="primary" elevation={0}>
//   <Grid container display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
//     <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
//       <Toolbar>
//         <NavLink to={"/"} >
//           <LionLogo width={70} />
//         </NavLink>
//         <LanguageSwitch />
//       </Toolbar>
//     </Grid>

//     <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
//       <Box sx={{ flexGrow: 1 }}>
//         <Toolbar>
//           {navPaths.map((navItem, index) => (
//             <NavLink
//               to={navItem.path}
//               key={navItem.text + index}
//               className={({ isActive, isPending }) => navLinkStyling(isActive, isPending)}
//               style={HeaderLinkStyling}
//             >
//               {navItem.text}
//             </NavLink>
//           ))}
//         </Toolbar>
//       </Box>
//     </Grid>

//     <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
//       {location.pathname !== "/products" &&
//         <TextField
//           type="search"
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               searchOnProducts(e.currentTarget.textContent);
//             }
//           }}
//           placeholder={languageStore.currentLanguage.SearchBarText}
//           className="me-2"
//           aria-label="Search"
//         />
//       }
//       <Drawer anchor='right'>
//         <CartDrawer />
//       </Drawer>
//     </Grid>
//   </Grid>
// </AppBar>

