import { Card, ListGroup, Row, Col } from "react-bootstrap";
import { getDatabase, ref, set, push } from "firebase/database";
import { useAuth } from "../authentication/AuthContext";
import ProductCSS from '../../assets/css/product.module.css'
import { useNavigate } from 'react-router-dom';

function Product(props) {
  const { user } = useAuth();
  const navigate = useNavigate();

	return props.prod.map((item) => {
		const { id, name, description, price, image, count } = item;

		const addToCart = async () => {
      if (!user){
        console.log(user)
        navigate('/login');
      }
      else{
        try {
          const db = getDatabase();
          const userRef = ref(db, `cart/${user.uid}/${item.id}`);
          await set(userRef, item);
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode + ": " + errorMessage);
        }
      }
			
		};
		return (
			<div key={id} style={{ width: "18rem" }}>
				<Row>
					<Col>
						<Card style={{ width: "18rem" }}>
							<Card.Img variant="top" src={image} style={{ height: "300px", objectFit: "contain" }} />
							<Card.Body>
								<Card.Title>{name}</Card.Title>
								<Card.Text>{description}</Card.Text>
							</Card.Body>
							<ListGroup className="list-group-flush">
								<ListGroup.Item>${price}</ListGroup.Item>
								<ListGroup.Item>Available: {count}</ListGroup.Item>
							</ListGroup>
							<Card.Body>
								<Card.Link onClick={addToCart} className={ProductCSS.cartLink}>Add to Cart</Card.Link>
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
