import React from 'react';
import { Button, Container, Form, Nav, NavItem, Navbar } from 'react-bootstrap';
import { useAuth } from './authentication/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {Link} from "react-router-dom";

function HomepageNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const HandleLogout = () => {
    console.log("Logging out...");
    logout();
    console.log("User logged out.");
    navigate('/');
  }
  

  return (
    <Navbar expand="lg" className="">
      <Container fluid>
      {location.pathname ==="/admin" || location.pathname ==="/adminorders" || location.pathname ==="/addproduct" ?(
          <Navbar.Brand as={Link} to="/admin" style={{ color: 'white' }}>UTA E-Pharmacy</Navbar.Brand>
        ) :(
          <Navbar.Brand as={Link} to="/" style={{ color: 'white' }}>UTA E-Pharmacy</Navbar.Brand>
      )}
         
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {location.pathname ==="/admin" || location.pathname ==="/adminorders" || location.pathname ==="/addproduct" ? (
              <Nav>
              <Nav.Link as={Link} to="/addproduct" style={{ color: 'white' }}>Add New Product</Nav.Link>
              <Nav.Link as={Link} to="/adminorders" style={{ color: 'white' }} > Orders </Nav.Link>
              </Nav>
            ) : (
              <Nav>
             <Nav.Link  as={Link} to="/cart" style={{ color: 'white' }}>Cart</Nav.Link>
              <Nav.Link as={Link} to="/orders" style={{ color: 'white' }}>Orders</Nav.Link>
              <Nav.Link as={Link} to="/profile" style={{ color: 'white' }}>Profile</Nav.Link>
              {user ? 
              <Nav.Link  as={Link} to="/" onClick={HandleLogout} style={{ color: 'white' }}>Logout</Nav.Link> :
              <Nav.Link  as={Link} to="/login" style={{ color: 'white' }}>Login/Register</Nav.Link> 
              }
            
            {(user && user.hasOwnProperty('admin') ) &&(
              <Nav.Link as={Link} to="/admin" style={{ color: 'white' }}>Admin Dashboard</Nav.Link>
            )}
              
              <Form className="d-flex" style={{width:'30vw',marginLeft:"30px"}}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <Button variant="primary">Search</Button>
                </Form>

              </Nav>
            )}
          </Nav>

        </Navbar.Collapse>
        {location.pathname === '/admin' ? (
          <NavItem style={{fontSize:'20px'}}> Welcome Admin !!!</NavItem>
        ) : (
          <NavItem style={{fontSize:'20px'}}> Welcome {user ? user.name: ""} !!!</NavItem>
        )}

      </Container>
    </Navbar>
  );
}

export default HomepageNav;
