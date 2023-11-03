import Container from "react-bootstrap/Container";
import CheckoutCss from "../../assets/css/checkout.module.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import HomepageNav from "../navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { useAuth } from "../authentication/AuthContext";

function Checkout() {
  const {user} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state ? location.state.data : null;
  const orderId = formData ? formData.orderId : "";
  const orderTotal = formData ? formData.total : '0.0';
  const items = formData.items;
  console.log(formData);

  const submitCheckouthandler = async (event) => {
    event.preventDefault();
    try {
      const db = getDatabase();
      //storing the order details in db
      const userRef = ref(db, `orders/${user.uid}/${orderId}`);
      await set(userRef, formData);
      //reducing the product count in db after the order is placed
      items.map( async (item) =>{
        const prodRef = ref(db,`products/${item.id}`)
        const snapshot = await get(prodRef);
        if(snapshot.exists()) {
          const prodData = snapshot.val();
          await set(prodRef,{
            ...prodData,
            count: (prodData.count - item.count )
          })
        }
      })
      // removing the order details from cart
      const cartRef = ref(db, `cart/${user.uid}`);
      await remove(cartRef);
     // alert("Order Confirmed");
      navigate("/orders");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ": " + errorMessage);
    }
  };

  return (
    <div>
      <HomepageNav />
      <div className={CheckoutCss.checkoutctn} >
      <Container >
        <Row>
        <Col md="8">
        
        <Card className={CheckoutCss.checkoutcard}>
          <Card.Body>
            <Card.Title className={CheckoutCss.heading}>Checkout</Card.Title>
            <div className="d-flex justify-content-center around align-items-center">
              <Form   style={{ justifyContent: "center" }}  onSubmit={submitCheckouthandler} >
                <Row className="mb-4">
                  <Form.Group md="14">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      pattern="\d{4} \d{4} \d{4} \d{4}"
                      title="Please enter a valid card number in the format 1234 1234 1234 1234"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Expiration</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="MM/YY"
                      pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                      title="Please enter a valid date in MM/YY format"
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>CVC</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="CVC"
                      pattern="\d{3}"
                      title="Please enter a valid 3 digit CVC"
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="United States"
                      pattern="[A-Za-z ]+"
                      title="Country name can only be in alphabets"
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="12345"
                      pattern="\d{5}"
                      title="Enter a valid 5 digit code"
                      required
                    />
                  </Form.Group>
                </Row>
                <button className={CheckoutCss.checkoutbtn} type="submit">
                  Pay now
                </button>
              </Form>
            </div>
          </Card.Body>
        </Card>
        </Col>
        <Col md="4">
        <Card className={CheckoutCss.checkoutcard} >
          <Card.Body>
            <Card.Title className={CheckoutCss.heading}>Total Amount</Card.Title>
            <div className="d-flex justify-content-center align-items-center">
            
            <h5> Estimated Total:<span style={{color:'red'}}> $ {orderTotal} </span> </h5>
        
            </div>
          </Card.Body>
        </Card>
        </Col>
        </Row>
      </Container>
      </div>
      </div>
  );
}

export default Checkout;
