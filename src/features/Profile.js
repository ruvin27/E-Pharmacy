import Card from "react-bootstrap/Card";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import profileClasses from "../assets/css/profile.module.css";
import HomepageNav from "./navbar";
import { useAuth } from "../features/authentication/AuthContext";
import namePic from "../assets/images/name.png";

function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <HomepageNav />
      <Container className={profileClasses.profile}>
        <Card className={profileClasses.card}>
          <Card.Body
            className={profileClasses.cardBody}
          >
            <Card.Title
              style={{
                margin: "2rem",
                textTransform: "uppercase",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src={namePic} alt="contact" />
            </Card.Title>{" "}
            <hr />
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextName"
              >
                <Form.Label column sm="3">
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    defaultValue={user ? user.name : ""}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="3">
                  Email
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    defaultValue={user ? user.email : ""}
                    disabled
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPhone"
              >
                <Form.Label column sm="3">
                  Phone
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="phone" placeholder="Phone Number"
                  defaultValue={user ? user.phone : ""}
                   />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextAddressLine1"
              >
                <Form.Label column sm="3">
                  Address Line 1
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Enter Address Line 1"
                    defaultValue={user ? user.address.addLine1 : ""}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextAddressLine2"
              >
                <Form.Label column sm="3">
                  Address Line 2
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Enter Address Line 2"
                    defaultValue={user ? user.address.addLine2 : ""}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextCity"
              >
                <Form.Label column sm="3">
                  City
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Enter City"
                    defaultValue={user ? user.address.city : ""}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextState"
              >
                <Form.Label column sm="3">
                  State
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Enter State"
                    defaultValue={user ? user.address.state : ""}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPCode"
              >
                <Form.Label column sm="3">
                  Postal Code
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Enter Postal Code"
                    defaultValue={user ? user.address.code : ""}
                  />
                </Col>
              </Form.Group>
            </Form>
            <Button>Update Profile</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Profile;
