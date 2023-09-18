import React, { useState, useEffect } from "react";
import { useAuth } from "../authentication/AuthContext";
import HomepageNav from "../navbar";
import CartBody from "../../assets/css/cart.module.css";
import { Button, Card, Form, ListGroup, Row, Col, Container, Tab, Tabs } from "react-bootstrap";
import CartItem from "./CartItem";
import cart from "../../assets/images/cart.jpg";
import { getDatabase, ref, set, push } from "firebase/database";

const Cart = () => {
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		name: "",
		address: {
			addLine1: "",
			addLine2: "",
			city: "",
			state: "",
			code: "",
		},
		phone: "",
		uid: "",
		time: "",
		date: "",
	});

	useEffect(() => {
		if (user) {
			setFormData({
				email: user.email,
				name: user.name,
				address: user.address,
				phone: user.phone,
        uid: user.uid
			});
		}
	}, [user]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === "name" || name === "time" || name === "date") {
			setFormData({
				...formData,
				[name]: value,
			});
		} else {
			setFormData({
				...formData,
				address: {
					...formData.address,
					[name]: value,
				},
			});
		}
		console.log(formData);
	};

	const handleDeliverySubmit = async () => {
		try {
			const db = getDatabase();
			const userRef = ref(db, `orders/${user.uid}`);
			const newOrderRef = push(userRef);
			formData.items = cartItems;
			formData.type = "delivery";
      formData.status = "Confirmed";
			await set(newOrderRef, formData);
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(errorCode + ": " + errorMessage);
		}
	};

  const handlePickUpSubmit = async () => {
		try {
			const db = getDatabase();
			const userRef = ref(db, `orders/${user.uid}`);
			const newOrderRef = push(userRef);
			formData.items = cartItems;
			formData.type = "pickup";
      formData.status = "Confirmed";
			await set(newOrderRef, formData);
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(errorCode + ": " + errorMessage);
		}
	};
	const cartItems = [
		{
			id: 1,
			productName: "PainAway",
			productDescription: "Relief from minor aches and pains",
			quantity: 2,
		},
		{
			id: 2,
			productName: "ColdRelief",
			productDescription: "Effective cold and flu symptom relief",
			quantity: 3,
		},
		{
			id: 3,
			productName: "HeadacheRelief",
			productDescription: "Fast-acting headache relief tablets",
			quantity: 1,
		},
		{
			id: 4,
			productName: "AllergyRelief",
			productDescription: "Non-drowsy allergy relief medication",
			quantity: 4,
		},
		{
			id: 5,
			productName: "CoughSyrup",
			productDescription: "Honey-based cough syrup for soothing coughs",
			quantity: 2,
		},
	];

	return (
		<div>
			<HomepageNav />
			<div className={CartBody.container}>
				<Container>
					{!cartItems ? (
						<div className={CartBody.empty_container}>
							<img src={cart} alt="Empty Cart"></img>
							<h2>Your Shopping cart is empty!</h2>
						</div>
					) : (
						<Row>
							<h3 className={CartBody.header}>My Cart:</h3>
							<Col xs={12} lg={8}>
								{cartItems.map((item) => (
									<CartItem key={item.id} product={item} />
								))}
							</Col>
							<Col>
								<Card>
									<Card.Body>
										<Card.Title>Order Summary</Card.Title>
									</Card.Body>
									<ListGroup className="list-group-flush">
										<ListGroup.Item>
											<b>Order Total: $10.99</b>
										</ListGroup.Item>
									</ListGroup>
									<Card.Body>
										<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
											<Tab eventKey="delivery" title="Delivery">
												<Card.Title className="mb-3">Address</Card.Title>
												<Form>
													<Form.Group controlId="name" className="mb-3">
														<Form.Label>Full Name</Form.Label>
														<Form.Control type="text" name="name" placeholder="Enter Full Name" value={formData.name} onChange={handleInputChange} />
													</Form.Group>

													<Form.Group controlId="addLine1" className="mb-3">
														<Form.Label>Address Line 1</Form.Label>
														<Form.Control type="text" name="addLine1" placeholder="Enter address line 1" value={formData.address.addLine1} onChange={handleInputChange} />
													</Form.Group>

													<Form.Group controlId="addLine2" className="mb-3">
														<Form.Label>Address Line 2</Form.Label>
														<Form.Control type="text" name="addLine2" placeholder="Enter address line 2" value={formData.address.addLine2} onChange={handleInputChange} />
													</Form.Group>

													<Form.Group controlId="city" className="mb-3">
														<Form.Label>City</Form.Label>
														<Form.Control type="text" name="city" placeholder="Enter city" value={formData.address.city} onChange={handleInputChange} />
													</Form.Group>

													<Form.Group controlId="state" className="mb-3">
														<Form.Label>State</Form.Label>
														<Form.Control type="text" name="state" placeholder="Enter state" value={formData.address.state} onChange={handleInputChange} />
													</Form.Group>

													<Form.Group controlId="code" className="mb-3">
														<Form.Label>Postal Code</Form.Label>
														<Form.Control type="text" name="code" placeholder="Enter postal code" value={formData.address.code} onChange={handleInputChange} />
													</Form.Group>
													<Button variant="primary" className={CartBody.checkoutbtn} onClick={handleDeliverySubmit}>
														Checkout
													</Button>
												</Form>
											</Tab>
											<Tab eventKey="pickup" title="Pick-Up">
												<div>
													<Card.Title className="mb-3">Select Time for Pick-Up</Card.Title>
													<Form>
														<Form.Group controlId="date" className="mb-3">
															<Form.Label>Select Date</Form.Label>
															<Form.Control type="date" name="date" value={formData.date} onChange={handleInputChange} />
														</Form.Group>
														<Form.Group controlId="time" className="mb-3">
															<Form.Label>Select Time</Form.Label>
															<Form.Control type="time" name="time" value={formData.time} onChange={handleInputChange} />
														</Form.Group>
														<Button variant="primary" className={CartBody.checkoutbtn} onClick={handlePickUpSubmit}>
															Checkout
														</Button>
													</Form>
												</div>
											</Tab>
										</Tabs>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					)}
				</Container>
			</div>
		</div>
	);
};

export default Cart;
