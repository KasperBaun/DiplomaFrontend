import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import './header.scss';
import LionLogo from '../LionLogo';
import { Dk, Us } from "react-flags-select";
import { useState } from 'react';

function Header() {
  //Localization Functions
  const defaultLocale = localStorage['locale'] ? localStorage['locale'] : 'Dansk'
  const [ currentLocale, setCurrentLocale ] = useState(defaultLocale);

  const handleOnLanguageChange = (lang : string) => {
    if(lang !== currentLocale) {
      setCurrentLocale(lang);
      localStorage.setItem('locale', lang);
    }
  }

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

  return (
    <Navbar expand="lg" className='header'>
      <Container fluid >
        <Navbar.Brand>
          <NavLink to={"/"} className="nav-brand">
            <LionLogo width={70}/>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScrolls" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 header-container d-flex justify-content-center"
            style={{ maxHeight: '100px', width: '100%' }}
            navbarScroll
          >
            {navPaths.map((navItem) => {

              return (
                <NavLink
                  to={navItem.path}
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
            <Button onClick={() => {
                handleOnLanguageChange("Dansk")
              }}>
              <Dk/>
            </Button>
            <Button onClick={() => {
                handleOnLanguageChange("English")
              }}>
              <Us/>
            </Button>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className='search-button'>
              <NavLink
                to={"/search"}
                className={'search-button'}
              >
                Search
              </NavLink>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;


export const navPaths: { path: string, text: string }[] = [
  {
    path: "/",
    text: "Home"
  },
  {
    path: "/product",
    text: "Product"
  },
  {
    path: "/categories",
    text: "Categories"
  },
  {
    path: "/subcategories",
    text: "Subcategories"
  },
  {
    path: "/basket",
    text: "Basket"
  },
  {
    path: "/payment",
    text: "Payment"
  },
  {
    path: "/confirmation",
    text: "Confirmation"
  },
];