import React from 'react'
import { Card, Button } from 'react-bootstrap';
import '../../assets/css/cart.css';

const OrderCardItem = ({ product }) => {
    const { productName, productDescription, quantity } = product;
    return (
          <Card className='card-item'>
            <Card.Body>
              <Card.Title>{productName}</Card.Title>
              <Card.Text className='mb-1'>{productDescription}</Card.Text>
              <Card.Text  className='mb-2'>Quantity: {quantity}</Card.Text>
              <Button variant="danger">Delete</Button>
            </Card.Body>
          </Card>
          
      );
};

export default OrderCardItem;