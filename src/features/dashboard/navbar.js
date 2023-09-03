import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../assets/css/homepage.css'

export default class HomepageNav extends Component {
  render() {
    return (
        <Navbar expand="lg" className="">
        <Container fluid>
        <Navbar.Brand href="#" style={{color: 'white'}}>UTA E-Pharmacy</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px'}}
            navbarScroll
          >
            <Nav.Link href="#action1" style={{color: 'white'}}>Home</Nav.Link>
            <Nav.Link href="#action2" style={{color: 'white'}}>Login/Register</Nav.Link>
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
    )
  }
}
