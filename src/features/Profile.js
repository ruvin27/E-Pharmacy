import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Container } from "react-bootstrap";
import profileClasses from "../assets/css/profile.module.css";
import HomepageNav from "./navbar";
import {useAuth} from "../features/authentication/AuthContext";
import contactPic from "../assets/images/contact.jpg";
import emailPic from "../assets/images/email.png";
import namePic from "../assets/images/name.png";
import addressPic from "../assets/images/address1.png";

function Profile() {

    const {user} = useAuth();

  return (
    <div>
      <HomepageNav />
      <Container className={profileClasses.profile}>
        <Card style={{ width: "50rem" , height:"35rem"}}>
          <Card.Body>
            <Card.Title style={{ margin: "2rem", textTransform:'uppercase', display: "flex", justifyContent: "center" }}>
            <span>  <img src={namePic} alt="contact" /> </span>
              <span style={{ flex: "0.5" }}><h1>{user? user.name: 'NAME'}</h1>  </span> 
                </Card.Title> <hr />

            <ListGroup className="list-group-flush">
              <ListGroup.Item style={{ border: "none", margin: "1rem", display: "flex", justifyContent: "center" }}>
              <span><img src={emailPic} alt="email"/></span>
                <span style={{ flex: "0.5" }}> 
                <p style={{fontSize:'20px'}}>{user ? user.email : 'EMAIL'}</p>
                </span>
              </ListGroup.Item>

              <ListGroup.Item style={{border: "none", margin: "1rem",display: "flex", justifyContent: "center" }}>
                <span>
                <img src={contactPic} alt="contact"/>
                </span>
                <span style={{ flex: "0.5" }}>
               <p style={{fontSize:'20px'}}>{user ? user.phone : 'CONTACT NUMBER'} </p>
                </span>
                </ListGroup.Item>

                <ListGroup.Item style={{ border: "none",margin: "1rem",display: "flex", justifyContent: "center" }}>
                <span>
                <img src={addressPic} alt="address"/>
                </span>
                <span style={{ flex: "0.5" }}>
                <p style={{fontSize:'20px'}}>{user ? user.address : 'ADDRESS'}</p>
                </span>
                </ListGroup.Item>
            </ListGroup>

          </Card.Body>
          <Card.Footer className="text-center" style={{ padding: "20px" }}>
            <Card.Link href="#">Edit Profile</Card.Link>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}

export default Profile;
