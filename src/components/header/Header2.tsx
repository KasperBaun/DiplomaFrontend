import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

function Header2() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand><NavLink to={"/"}>Grønlund&Lefort</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink
              to={"/"}
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "red" : "inherit",
                  padding: '5px',
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
            >
              Home
            </NavLink>

            <NavLink
              to={"/product"}
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "red" : "inherit",
                  padding: '5px',
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
            >
              Product
            </NavLink>

            <NavLink
              to={"/categories"}
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "red" : "inherit",
                  padding: '5px',
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
            >
              Categories
            </NavLink>

            <NavLink
              to={"/subcategories"}
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "red" : "inherit",
                  padding: '5px',
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
            >
              Subcategories
            </NavLink>

            <NavLink
              to={"/basket"}
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "red" : "inherit",
                  padding: '5px',
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
            >
              Basket
            </NavLink>

            <NavLink
              to={"/payment"}
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "red" : "inherit",
                  padding: '5px',
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
            >
              Payment
            </NavLink>

            <NavLink
              to={"/confirmation"}
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "red" : "inherit",
                  padding: '5px',
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
            >
              Confirmation
            </NavLink>

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success"><NavLink
              to={"/search"}
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "red" : "inherit",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
            >
              Search
            </NavLink></Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header2;