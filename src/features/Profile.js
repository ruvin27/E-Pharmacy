import Card from "react-bootstrap/Card";
import { Container, Form, Row, Col } from "react-bootstrap";
import profileClasses from "../assets/css/profile.module.css";
import HomepageNav from "./navbar";
import { useAuth } from "../features/authentication/AuthContext";
import namePic from "../assets/images/name.png";
import { useState, useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";

function Profile() {
	const { user, login } = useAuth();
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
    uid: ""
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
		if (name === "name" || name === "phone") {
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

  const handleUpdate = async (event) => {
	event.preventDefault();
    console.log("here")
    try{
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, formData)
      .then(async () => {
        await login(formData);
      })
	  alert("Profile updated successfully")
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ': ' + errorMessage);
    }
  }

	return (
		<div>
			<HomepageNav />
			<Container className={profileClasses.profile}>
				<Card className={profileClasses.card}>
					<Card.Body className={profileClasses.cardBody}>
						<Card.Title
							style={{
								margin: "2rem",
								textTransform: "uppercase",
								display: "flex",
								justifyContent: "center",
							}}>
							<img src={namePic} alt="contact" />
						</Card.Title>{" "}
						<hr />
						<Form onSubmit={handleUpdate}>
							<Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
								<Form.Label column sm="3">
									Name
								</Form.Label>
								<Col sm="9">
									<Form.Control type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
								<Form.Label column sm="3">
									Email
								</Form.Label>
								<Col sm="9">
									<Form.Control type="email" name="email" placeholder="Email" defaultValue={user ? user.email : ""} disabled />
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="formPlaintextPhone">
								<Form.Label column sm="3">
									Phone
								</Form.Label>
								<Col sm="9">
									<Form.Control type="phone" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="formPlaintextAddressLine1">
								<Form.Label column sm="3">
									Address Line 1
								</Form.Label>
								<Col sm="9">
									<Form.Control type="text" placeholder="Enter Address Line 1" name="addLine1" value={formData.address.addLine1} onChange={handleInputChange} />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="formPlaintextAddressLine2">
								<Form.Label column sm="3">
									Address Line 2
								</Form.Label>
								<Col sm="9">
									<Form.Control type="text" placeholder="Enter Address Line 2" name="addLine2" value={formData.address.addLine2} onChange={handleInputChange} />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="formPlaintextCity">
								<Form.Label column sm="3">
									City
								</Form.Label>
								<Col sm="9">
									<Form.Control type="text" placeholder="Enter City" name="city" value={formData.address.city} onChange={handleInputChange} />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="formPlaintextState">
								<Form.Label column sm="3">
									State
								</Form.Label>
								<Col sm="9">
									<Form.Control type="text" placeholder="Enter State" name="state" value={formData.address.state} onChange={handleInputChange} />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="formPlaintextPCode">
								<Form.Label column sm="3">
									Postal Code
								</Form.Label>
								<Col sm="9">
									<Form.Control type="text" placeholder="Enter Postal Code" name="code" value={formData.address.code} onChange={handleInputChange} />
								</Col>
							</Form.Group>
							<button className={profileClasses.updatebtn} id="update" >Update Profile</button>
						</Form>
						
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
}

export default Profile;
