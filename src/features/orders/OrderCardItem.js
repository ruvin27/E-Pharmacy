import React from 'react'
import { Card, Button } from 'react-bootstrap';
import '../../assets/css/cart.css';

const OrderCardItem = ({ product }) => {
    const { productName, productDescription, quantity } = product;
    return (
          <Card className='card-item'>
            <Card.Body>
              <Card.Title>{productName}</Card.Title>
              <Card.Text>{productDescription}</Card.Text>
              <Card.Text>Quantity: {quantity}</Card.Text>
              <Button variant="danger">Delete</Button>
            </Card.Body>
          </Card>
          
      );
};

export default OrderCardItem;