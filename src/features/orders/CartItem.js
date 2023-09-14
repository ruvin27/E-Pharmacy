import React from 'react'
import { Card, Button } from 'react-bootstrap';
import CartItemCSS from '../../assets/css/cart.module.css';

const CartItem = ({ product }) => {
    const { productName, productDescription, quantity } = product;
    return (
          <Card className={CartItemCSS.cardItem}>
            <Card.Body>
              <Card.Title>{productName}</Card.Title>
              <Card.Text className='mb-1'>{productDescription}</Card.Text>
              <Card.Text  className='mb-2'>Quantity: {quantity}</Card.Text>
              <Button variant="danger">Delete</Button>
            </Card.Body>
          </Card>
          
      );
};

export default CartItem;