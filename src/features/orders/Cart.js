import React, { useState } from "react";
// import { useAuth } from "../authentication/AuthContext";
import HomepageNav from "../navbar";
import "../../assets/css/cart.css";
import {
  Button,
  Card,
  Form,
  ListGroup,
  Row,
  Col,
  Container,
  Tab,
  Tabs,
} from "react-bootstrap";
import OrderCardItem from "./OrderCardItem";
import cart from "../../assets/images/cart.jpg";

const Cart = () => {
  // const { user } = useAuth();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    date: "",
    time: "",
    oderType: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to a server)
    console.log("Submitted:", address);
  };
  const cartItems = [
    {
      id: 1,
      productName: "PainAway",
      productDescription: "Relief from minor aches and pains",
      quantity: 2,
    },
    {
      id: 2,
      productName: "ColdRelief",
      productDescription: "Effective cold and flu symptom relief",
      quantity: 3,
    },
    {
      id: 3,
      productName: "HeadacheRelief",
      productDescription: "Fast-acting headache relief tablets",
      quantity: 1,
    },
    {
      id: 4,
      productName: "AllergyRelief",
      productDescription: "Non-drowsy allergy relief medication",
      quantity: 4,
    },
    {
      id: 5,
      productName: "CoughSyrup",
      productDescription: "Honey-based cough syrup for soothing coughs",
      quantity: 2,
    },
  ];

  return (
    <div>
      <HomepageNav />
      <div className="container">
        <Container>
          {!cartItems ? (
            <div className="empty-container">
              <img src={cart} alt="Empty Cart"></img>
              <h2>Your Shopping cart is empty!</h2>
            </div>
          ) : (
            <Row>
              <h3 className="header">My Cart:</h3>
              <Col xs={12} lg={8}>
                {cartItems.map((item) => (
                  <OrderCardItem key={item.id} product={item} />
                ))}
              </Col>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Order Summary</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <b>Order Total: $10.99</b>
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Tabs
                      defaultActiveKey="profile"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="delivery" title="Delivery">
                        <Card.Title className="mb-3">Address</Card.Title>
                        <Form onSubmit={handleSubmit}>
                          <Form.Group controlId="firstName" className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              placeholder="Enter first name"
                              value={address.firstName}
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="lastName" className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              placeholder="Enter last name"
                              value={address.lastName}
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="addressLine1" className="mb-3">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control
                              type="text"
                              name="addressLine1"
                              placeholder="Enter address line 1"
                              value={address.addressLine1}
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="addressLine2" className="mb-3">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control
                              type="text"
                              name="addressLine2"
                              placeholder="Enter address line 2"
                              value={address.addressLine2}
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="city" className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              type="text"
                              name="city"
                              placeholder="Enter city"
                              value={address.city}
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="state" className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                              type="text"
                              name="state"
                              placeholder="Enter state"
                              value={address.state}
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="postalCode" className="mb-3">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                              type="text"
                              name="postalCode"
                              placeholder="Enter postal code"
                              value={address.postalCode}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Button
                            variant="primary"
                            className="checkout-btn mb-3"
                          >
                            Checkout
                          </Button>
                        </Form>
                      </Tab>
                      <Tab eventKey="pickup" title="Pick-Up">
                        <div>
                          <Card.Title className="mb-3">
                            Select Time for Pick-Up
                          </Card.Title>
                          <Form>
                          
                          <Form.Group controlId="date" className="mb-3">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control
                              type="date"
                              name="date"
                              value={address.date}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group controlId="time" className="mb-3">
                            <Form.Label>Select Time</Form.Label>
                            <Form.Control
                              type="time"
                              name="time"
                              value={address.time}
                              onChange={handleChange}
                            />
                          </Form.Group>
                            <Button
                              variant="primary"
                              className="checkout-btn mb-3"
                            >
                              Checkout
                            </Button>
                          </Form>
                        </div>
                      </Tab>
                    </Tabs>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Cart;
