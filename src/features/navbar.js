import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { useAuth } from './authentication/AuthContext';
import { useNavigate } from 'react-router-dom';

function HomepageNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  const HandleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <Navbar expand="lg" className="">
      <Container fluid>
          <Navbar.Brand href="/" style={{ color: 'white' }}>UTA E-Pharmacy</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
              <Nav.Link href="/cart" style={{ color: 'white' }}>Cart</Nav.Link>
              <Nav.Link href="/orders" style={{ color: 'white' }}>Orders</Nav.Link>
              <Nav.Link href="/profile" style={{ color: 'white' }}>Profile</Nav.Link>
              {user ? 
              <Nav.Link href="/" onClick={HandleLogout} style={{ color: 'white' }}>Logout</Nav.Link> :
              <Nav.Link href="/login" style={{ color: 'white' }}>Login/Register</Nav.Link> 
              
              }
             
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomepageNav;
