import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Product(props) {
  return props.prod.map((item) => {
    const { id, name, description, price, image, count } = item;
    return (
      <div key={id} style={{width: "18rem"}}>
      <Row>
        <Col >
        <Card style={{ width: "18rem"}}>
        <Card.Img variant="top" src={image} style={{ height:"300px",objectFit:"contain"}} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>${price}</ListGroup.Item>
          <ListGroup.Item>Available: {count}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Add to cart</Card.Link>
          <Card.Link href="#">Add to Wishlist</Card.Link>
        </Card.Body>
      </Card>
        </Col>
        
      </Row>
      
    </div>
  );
   
    
  });
}

export default Product;
