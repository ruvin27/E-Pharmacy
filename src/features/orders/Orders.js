import React, { useState, useEffect } from "react";
import { useAuth } from "../authentication/AuthContext";
import HomepageNav from "../navbar";
import OrdersCSS from "../../assets/css/order.module.css";
import { Row, Col, Container } from "react-bootstrap";
import OrderCard from "./OrderCard";
import cart from "../../assets/images/cart.jpg";
import { getDatabase, ref, get } from "firebase/database";

const Orders = () => {
	const { user } = useAuth();

	const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
		const fetchData = async () => {
			const db = getDatabase();
			const userRef = ref(db, `orders/${user.uid}`);

			const snapshot = await get(userRef);

			if (snapshot.exists()) {
				let orderData = snapshot.val();
				orderData = Object.values(orderData);

				setOrderItems(orderData);
			} else {
				setOrderItems([]);
			}
		};
		if (user) {
			fetchData();
		}
	}, [user]);
	console.log(orderItems);

	return (
		<div>
			<HomepageNav />
			<div className={OrdersCSS.container}>
				<Container>
					{!orderItems ? (
						<div className={OrdersCSS.empty_container}>
							<img src={cart} alt="Empty Cart" style={{ width: "300px", height: "300px" }}></img>
							<h2>No Past Orders!</h2>
						</div>
					) : (
						<Row>
							<h3 className={OrdersCSS.header}>My Orders:</h3>
							<Col>
								{orderItems.map((item) => (
									<OrderCard key={item.orderId} order={item} displaybutton='true' />
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
