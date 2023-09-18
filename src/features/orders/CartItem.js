import React from 'react'
import { Card, Button } from 'react-bootstrap';
import CartItemCSS from '../../assets/css/cart.module.css';

const CartItem = ({ product }) => {
    const { name, description, price } = product;
    return (
          <Card className={CartItemCSS.cardItem}>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text className='mb-1'>{description}</Card.Text>
              <Card.Text  className='mb-2'>Price: ${price}</Card.Text>
              <Button variant="danger">Delete</Button>
            </Card.Body>
          </Card>
          
      );
};

export default CartItem;