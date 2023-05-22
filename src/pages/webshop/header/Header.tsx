import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './header.scss';
import LionLogo from '../../../components/svgs/LionLogo';
import { Dk, Us } from "react-flags-select";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import { observer } from 'mobx-react-lite';
import { CartDrawer } from '@components/cart/CartDrawer';
import React from 'react';
import { Grid, IconButton, Tooltip } from '@mui/material';

interface INavModel {
  path: string;
  text: string;
}

const Header: React.FC = observer(function Header() {

  const { languageStore, searchStore } = useContext(MobXContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navPaths: INavModel[] = [];
  navPaths.push({ path: "/", text: `${languageStore.currentLanguage.HomeTabText}` });
  navPaths.push({ path: "/products", text: `${languageStore.currentLanguage.ProductTabText}` });
  navPaths.push({ path: "/categories", text: `${languageStore.currentLanguage.CategoriesTabText}` });
  navPaths.push({ path: "/contact", text: `${languageStore.currentLanguage.ContactTabText}` });
  navPaths.push({ path: "/faq", text: `${languageStore.currentLanguage.FAQTabText}` });
  navPaths.push({ path: "/aboutus", text: `${languageStore.currentLanguage.AboutUsTabText}` })

  const navLinkStyling = (isActive: boolean, isPending: boolean): string => {
    let result = 'header-links';
    if (isActive) {
      result += ' active';

    } else {
      result += ' inactive';
    }
    //if(isPending) result += ' pending';
    return result;
    //return  isActive ? "active" : isPending ? "inactive" : "header-links";
  }

  function searchOnProducts(searchText: string) {
    searchStore.filterBySearchText(searchText);
    navigate(`/products`);
  }
  const handleLanguageIconClicked = () => {
    languageStore.toggleLanguage();
  }

  return (
    <Navbar expand="lg" className='header' key="navbar">
      <Grid container display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} padding={1} display='flex'>
          <Navbar.Brand>
            <NavLink to={"/"} className="nav-brand">
              <LionLogo width={70} />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScrolls" />
          <Tooltip title={languageStore.currentLanguage.language + " " + languageStore.getCurrentLanguageCode()}>
            <IconButton onClick={handleLanguageIconClicked}>
              {languageStore.getCurrentLanguageCode() === 'da-DK' ? <Dk /> : <Us />}
            </IconButton>
          </Tooltip>

        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} padding={1} display='flex'>
          <Navbar.Collapse id="navbarScroll">

            <Nav
              className="me-auto my-2 my-lg-0 header-container d-flex justify-content-center"
              style={{ maxHeight: '100px', width: '100%' }}
              navbarScroll
            >
              {navPaths.map((navItem, index) => {
                return (
                  <NavLink
                    to={navItem.path}
                    key={navItem.text + index}
                    className={({ isActive, isPending }) => {
                      return navLinkStyling(isActive, isPending)
                    }}
                  >
                    {navItem.text}
                  </NavLink>
                )

              })}


            </Nav>
          </Navbar.Collapse>

        </Grid>
        {/* <Grid item xs={12} sm={6} md={4} lg={3} xl={3} padding={1} display='flex'></Grid> */}

        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} padding={1} display='flex' justifyContent={'end'}>
          {location.pathname !== "/productList" &&
            <Form className="d-flex">
              <Form.Control
                type="search"
                style={{ width: "20rem" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    searchOnProducts(e.currentTarget.value);
                  }
                }}
                placeholder={languageStore.currentLanguage.SearchBarText}
                className="me-2"
                aria-label="Search"
              />
            </Form>
          }

          <CartDrawer />
        </Grid>

      </Grid>

    </Navbar >
  );
});

export default Header;