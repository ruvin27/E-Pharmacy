import React from "react";
// import { useAuth } from "../authentication/AuthContext";
import HomepageNav from "../navbar";
import OrdersCSS from '../../assets/css/order.module.css';
import {
  Row,
  Col,
  Container,
} from "react-bootstrap";
import OrderCard from "./OrderCard";
import cart from "../../assets/images/cart.jpg";

const Orders = () => {
  // const { user } = useAuth();

  const orderItems = [
    {
        orderID: 'ODR12345',
        date: '2023-09-15',
        totalItems: 3,
        status: 'Processing',
        totalCost: '$50.00',
        orderType: 'PickUp',
      },
      {
        orderID: 'ODR67890',
        date: '2023-09-14',
        totalItems: 5,
        status: 'Shipped',
        totalCost: '$75.00',
        orderType: 'Delivery',
      },
      {
        orderID: 'ODR24680',
        date: '2023-09-13',
        totalItems: 2,
        status: 'Delivered',
        totalCost: '$30.00',
        orderType: 'PickUp',
      },
      {
        orderID: 'ODR13579',
        date: '2023-09-12',
        totalItems: 4,
        status: 'Processing',
        totalCost: '$60.00',
        orderType: 'Delivery',
      },
      {
        orderID: 'ODR54321',
        date: '2023-09-11',
        totalItems: 6,
        status: 'Shipped',
        totalCost: '$90.00',
        orderType: 'PickUp',
      },
    
  ];

  return (
    <div>
      <HomepageNav />
      <div className={OrdersCSS.container}>
        <Container>
          {!orderItems ? (
            <div className={OrdersCSS.empty_container}>
              <img src={cart} alt="Empty Cart" style={{width:'300px', height:'300px'}}></img>
              <h2>No Past Orders!</h2>
            </div>
          ) : (
            <Row>
              <h3 className={OrdersCSS.header}>My Orders:</h3>
              <Col>
                {orderItems.map((item) => (
                  <OrderCard key={item.orderID} order={item} />
                ))}
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Orders;
