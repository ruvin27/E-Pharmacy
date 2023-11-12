import React from "react";
import { Card } from "react-bootstrap";
import CartItemCSS from "../../assets/css/cart.module.css";
import { get, getDatabase, ref, remove,set } from "firebase/database";
import { useAuth } from "../authentication/AuthContext";
import { useLocation } from "react-router-dom";
import {useState} from "react"

const CartItem = ({ product,setCartItems }) => {
	const location = useLocation();
	const { user } = useAuth();
	const [wishlistCount, setWishlistCount] = useState(1);
	const { name, description, price, id,count } = product;
	
	const setCount =(event) =>{
		const wcount = event.target.value;
		setWishlistCount(wcount);
	}
console.log(wishlistCount)

	const deleteFromCart = async () => {
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

	const sendWislistToCart = async() =>{
		try{
			const db = getDatabase();
			// to check if the wishlist count doesnt exceed the product count in db
			const prodRef = ref(db,`products/${id}`)
			const snapshot = await get(prodRef)
			if(snapshot.exists()){
				const prodData = snapshot.val();
				if(wishlistCount > prodData.count){
					return alert(`Product only has ${prodData.count} items left. choose a valid number of item`)

				}
			}
			// sending the wishlist data to cart
			const itemRef = ref(db,`cart/${user.uid}/${id}`)
			await set(itemRef,{
				...product,
				count: wishlistCount
			})
			alert("Item added to cart")
			//deleting data from wishlist
			const wishlistRef = ref(db,`wishlist/${user.uid}/${id}`)
			await remove(wishlistRef)
			setCartItems(prevCartItems =>prevCartItems.filter(item => item.id !==id))

		} catch(error) {
			alert(error.message + error.code);
		}

	}

	const deleteFromWishlist = async () =>{
		try{
			const db = getDatabase();
			const wishlistRef = ref(db, `wishlist/${user.uid}/${id}`)
			await remove(wishlistRef);
			alert("Item deleted from Wishlist");
			setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));

		}catch(error){
			alert(error.code + error.message)
		}
	}

	return (
		<Card className={CartItemCSS.cardItem}>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text className="mb-1">{description}</Card.Text>
				<Card.Text className="mb-2">Price: ${price}</Card.Text>
				<Card.Text className="mb-2">
				<label htmlFor="quantity">Quantity: 
				{location.pathname ==='/cart' ? count :(
					<select style={{marginLeft:'20px', width:'5rem'}} onChange={setCount}>
					{Array.from({ length: 30 }, (_, index) => {
					  return (
						<option key={index + 1} value={index + 1}>
						  {index + 1}
						</option>
					  );
					})}
				  </select>
				  
				)} 
				</label>
				</Card.Text>
				{ location.pathname ==='/wishlist' &&(
					<button  className={CartItemCSS.deletebtn} onClick={()=> sendWislistToCart()}>
					Add to Cart	
					</button>
				)}
				<button style={{marginLeft:'20px'}} className={CartItemCSS.deletebtn}
				onClick={location.pathname !=='/wishlist'?() => deleteFromCart() :() => deleteFromWishlist()}>
				   Delete	
				</button>
			</Card.Body>
		</Card>
	);
};

export default CartItem;
