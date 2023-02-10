import './header.module.scss';

const Header: React.FC = function Navigationbar() {
 
  return (

    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"/></svg>
          </a>
  
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/" className="nav-link px-2 text-secondary">Home</a></li>
            <li><a href="/categories" className="nav-link px-2 text-white">Categories</a></li>
            <li><a href="/product" className="nav-link px-2 text-white">Product</a></li>
            <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
            <li><a href="#" className="nav-link px-2 text-white">About</a></li>
          </ul>
  
          {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <form typeof="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"/>
          </form> */}
  
          <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2">Login</button>
            <button type="button" className="btn btn-warning">Sign-up</button>
          </div>
        </div>
      </div>
    </header>
  //   <Navbar bg="light" expand="lg">
  //     <Container fluid>
  //       <Navbar.Brand href={EnvironmentKeys.companyUrl}>{EnvironmentKeys.companyName}</Navbar.Brand>
  //       <Navbar.Toggle aria-controls="navbarScroll" />
  //       <Navbar.Collapse id="navbarScroll">
  //         <Nav
  //           className="me-auto my-2 my-lg-0"
  //           style={{ maxHeight: '100px' }}
  //           navbarScroll
  //         >
  //           <Nav.Link href="#action1">Home</Nav.Link>
  //           <Nav.Link href="#action2">Link</Nav.Link>
  //           <NavDropdown title="Link" id="navbarScrollingDropdown">
  //             <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
  //             <NavDropdown.Item href="#action4">
  //               Another action
  //             </NavDropdown.Item>
  //             <NavDropdown.Divider />
  //             <NavDropdown.Item href="#action5">
  //               Something else here
  //             </NavDropdown.Item>
  //           </NavDropdown>
  //           <Nav.Link href="#" disabled>
  //             Link
  //           </Nav.Link>
  //         </Nav>
  //         <Form className="d-flex">
  //           <Form.Control
  //             type="search"
  //             placeholder="Search"
  //             className="me-2"
  //             aria-label="Search"
  //           />
  //           <Button variant="outline-success">Search</Button>
  //         </Form>
  //       </Navbar.Collapse>
  //     </Container>
  //   </Navbar>
  );
}

export default Header;