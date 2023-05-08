import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import './header.scss';
import LionLogo from '../LionLogo';
import { Dk, Us } from "react-flags-select";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import { observer } from 'mobx-react-lite';
import CartDrawer from '@components/CartDrawer';
import { ProductItemWeb } from '@models/ProductItemWeb';
import React from 'react';
import { SearchState } from '@models/SearchState';

interface INavModel {
  path: string;
  text: string;
}

const Header: React.FC = observer(function Header() {

  const { languageStore, webshopStore } = useContext(MobXContext);
  const [displayedProductItems, setDisplayedProductItems] = React.useState<ProductItemWeb[]>([]);
  const [searchText, setSearchText] = React.useState<string>('');
  const navigate = useNavigate();

  const handleItemsChanged = (productItems: ProductItemWeb[]) => {
    setDisplayedProductItems(productItems);
    console.log(displayedProductItems);
  }


  const navPaths: INavModel[] = [];
  navPaths.push({ path: "/", text: `${languageStore.currentLanguage.HomeTabText}` });
  navPaths.push({ path: "/productList", text: `${languageStore.currentLanguage.ProductTabText}` });
  navPaths.push({ path: "/categories", text: `${languageStore.currentLanguage.CategoriesTabText}` });
  //navPaths.push({ path: "/payment", text: `${languageStore.currentLanguage.PaymentTabText}` });
  //navPaths.push({ path: "/confirmation", text: `${languageStore.currentLanguage.ConfirmationTabText}` });
  //navPaths.push({ path: "/backoffice", text: `${languageStore.currentLanguage.BackOfficeTabText}` })

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

  function searchOnProducts(searchPar : string){
    const searchState = new SearchState();
    searchState.searchString = searchPar;
    navigate('/productList', { state: { searchState } })
  } 

  return (
    <Navbar expand="lg" className='header' key="navbar">
      <Container fluid>
        <Navbar.Brand>
          <NavLink to={"/"} className="nav-brand">
            <LionLogo width={70} />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScrolls" />

        <Navbar.Collapse id="navbarScroll">
        <Button onClick={() => {
              languageStore.toggleLanguage();
            }}>
              <Dk />
            </Button>
            <Button style={{paddingRight:'20rem'}} onClick={() => {
              languageStore.toggleLanguage();
            }}>
              <Us/>
            </Button>
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
          <Form className="d-flex">
            <Form.Control
              type="search"
              style={{width:"20rem"}}
              onKeyDown={(e)=>{
                if (e.key === "Enter"){
                  e.preventDefault();
                  searchOnProducts(e.currentTarget.value);
                }
              }}
              placeholder={languageStore.currentLanguage.SearchBarText}
              className="me-2"
              aria-label="Search"
             /> 
          </Form>


          {/* <ProductSearchBar
            headerBar ={true}
            searchText={searchText}
            setSearchText={setSearchText}
            productItems={webshopStore.productItems}
            onItemsChanged={handleItemsChanged}
            showSearchBar={true}
            style={{ width: "30rem", backgroundColor: "white", borderRadius: '5px' }}
          /> */}
         

          {/* <Button className='search-button'>
              <NavLink
                to={"/search"}
                className={'search-button'}
              >
                {languageStore.currentLanguage.SearchBarText}
              </NavLink>
            </Button> */}
          <CartDrawer />
          {/* </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default Header;