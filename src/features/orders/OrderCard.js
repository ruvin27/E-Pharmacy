import React from 'react'
import { Card } from 'react-bootstrap';
import '../../assets/css/cart.css';

const OrderCard = ({ order }) => {
    const { orderID, date, totalItems, status, totalCost, orderType } = order;
    return (
          <Card className='card-item'>
            <Card.Body>
              <Card.Title>Order#: {orderID}</Card.Title>
              <Card.Text className='mb-1'>Date: {date}</Card.Text>
              <Card.Text className='mb-1'>Order Status: {status}</Card.Text>
              <Card.Text className='mb-1'>Order Type: {orderType}</Card.Text>
              <Card.Text  className='mb-1'>Items: {totalItems}</Card.Text>
              <Card.Text  className='mb-2'><b>Total Cost: {totalCost}</b></Card.Text>
            </Card.Body>
          </Card>
          
      );
};

export default OrderCard;