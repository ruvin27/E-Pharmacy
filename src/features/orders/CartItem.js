import React from "react";
import { Card, Button } from "react-bootstrap";
import CartItemCSS from "../../assets/css/cart.module.css";
import { getDatabase, ref, remove } from "firebase/database";
import { useAuth } from "../authentication/AuthContext";

const CartItem = ({ product,setCartItems }) => {
	const { user } = useAuth();
	const { name, description, price, id,count } = product;
	const deleteItem = async () => {
		try {
			const db = getDatabase();
			const itemRef = ref(db, `cart/${user.uid}/${id}`);
			await remove(itemRef);
      alert("Item Deleted from Cart");
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));

		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(errorCode + ": " + errorMessage);
		}
	};
	return (
		<Card className={CartItemCSS.cardItem}>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text className="mb-1">{description}</Card.Text>
				<Card.Text className="mb-2">Price: ${price}</Card.Text>
				<Card.Text className="mb-2">
				<label htmlFor="quantity">Quantity: {count} </label>
				</Card.Text>
				<button  className={CartItemCSS.deletebtn} onClick={deleteItem}>
					Delete
				</button>
			</Card.Body>
		</Card>
	);
};

export default CartItem;
