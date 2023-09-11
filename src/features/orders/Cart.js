import React from "react";
import { useAuth } from "../authentication/AuthContext";
import HomepageNav from "../navbar";
import "../../assets/css/cart.css";
import { Button, Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import OrderCardItem from "./OrderCardItem";
import cart from '../../assets/images/cart.jpg'

const Cart = () => {
  const { user } = useAuth();
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
                <img src={cart}></img>
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
                      <b>Subtotal: $10.99</b>
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Button variant="primary" className="checkout-btn">
                      Checkout
                    </Button>
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
