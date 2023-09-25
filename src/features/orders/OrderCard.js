import React from 'react'
import { Card } from 'react-bootstrap';
import OrderItemCSS from '../../assets/css/order.module.css';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
    const {  status, total, type, orderId, items, orderDate } = order;
    const navigate = useNavigate();

    const orderDetailsHandler = () =>{
    navigate("/orderdetails",{state:{data:order}})

    }
console.log(order);
    return (
          <Card className={OrderItemCSS.cardItem}>
            <Card.Body>
              <Card.Title>OrderID: {orderId}</Card.Title>
              <Card.Text className='mb-1'>Order Date: {orderDate}</Card.Text>
              <Card.Text className='mb-1'>Order Status: <b>{status}</b></Card.Text>
              <Card.Text className='mb-1'>Order Type: {type}</Card.Text>
              <Card.Text  className='mb-1'>Items: {items.length}</Card.Text>
              <Card.Text  className='mb-2'><b>Order Total: ${total}</b></Card.Text>
              <button onClick={orderDetailsHandler} className={OrderItemCSS.btn}> View Order </button>
            </Card.Body>
          </Card>
          
      );
};

export default OrderCard;