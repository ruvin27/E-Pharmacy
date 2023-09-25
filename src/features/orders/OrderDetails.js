import HomepageNav from "../navbar";
import Card from "react-bootstrap/Card";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import OrderDetailsCss from "../../assets/css/orderDetails.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocation } from "react-router-dom";

function OrderDetails() {
  const location = useLocation();
  const orderData = location.state ? location.state.data : null;
  const { status, total, type, orderId, items, date, orderdate, time } =orderData;
  console.log(orderData);

  return (
    <div>
      <HomepageNav />
      <Container className={OrderDetailsCss.orderdet}>
      <div className={OrderDetailsCss.flexctn}>
      {items.map((item) => {
        const { prodName, description, image } = item;
        console.log(item);
        return (
         
           
              <Card className={OrderDetailsCss.card}>
                <Card.Body className={OrderDetailsCss.cardBody}>
                <Card.Img
                variant="top"
                src={image}
                style={{ height: "100px", objectFit: "contain" }}
              />
                  <Card.Title style={{fontSize:"35px"}}>{prodName} </Card.Title>
                  <Card.Title>{description} </Card.Title>

                </Card.Body>
                </Card>
            
         
        );
      })}
       </div>
      </Container>
      <Container className={OrderDetailsCss.orderdet}>
                <ListGroup >
                <ListGroup.Item>
                <span className={OrderDetailsCss.heading}>Order Id:</span>
                <span className={OrderDetailsCss.values}>{orderId}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                <span className={OrderDetailsCss.heading}>Status:</span>
                <span className={OrderDetailsCss.values}>{status}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                <span className={OrderDetailsCss.heading}>Order Type:</span>
                <span className={OrderDetailsCss.values}>{type}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                <span className={OrderDetailsCss.heading}>Order Date:</span>
                <span className={OrderDetailsCss.values}>{orderdate}</span>
                </ListGroup.Item>

                {type === "pickup" && (
                    <>
                    <ListGroup.Item>
                    <span className={OrderDetailsCss.heading}>Pickup Date:</span>
                    <span className={OrderDetailsCss.values}>{date}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <span className={OrderDetailsCss.heading}>Pickup Time:</span>
                    <span className={OrderDetailsCss.values}>{time}</span>
                    </ListGroup.Item>
                    </>
                  )}
                  <ListGroup.Item>
                <span className={OrderDetailsCss.heading}>Total Amount:</span>
                <span className={OrderDetailsCss.values}>${total}</span>
                </ListGroup.Item>
                </ListGroup>
                </Container> 
    </div>
  );
}
export default OrderDetails;
