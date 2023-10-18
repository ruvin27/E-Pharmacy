import { Card, ListGroup, Row, Col } from "react-bootstrap";
import { getDatabase, ref, set, get,remove } from "firebase/database";
import { useAuth } from "../authentication/AuthContext";
import ProductCSS from "../../assets/css/product.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Product(props) {
  const { user } = useAuth();
  const [cartBtnClicked, setCartBtnClicked] = useState([]);
  const [prdtQty, setPrdtQty] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCartBtn = (productId) => {
    if (cartBtnClicked.includes(productId)) {
      setCartBtnClicked(cartBtnClicked.filter((id) => id !== productId));
    } else {
      setCartBtnClicked([...cartBtnClicked, productId]);
    }
  };
 

  const incrementQty = (productId) => {
    setPrdtQty({
      ...prdtQty,
      [productId]: (prdtQty[productId] || 0) + 1,
    });
  };

  const decrementQty = (productId) => {
    if (prdtQty[productId] > 0) {
      setPrdtQty({ ...prdtQty, [productId]: prdtQty[productId] - 1 });
    }
  };

  const cancelCart = (productId) => {
	setPrdtQty({ ...prdtQty, [productId]:0})
	setCartBtnClicked([])
  }

  const removeFromCart = async (productId) => {
    const db = getDatabase();
    const itemRef = ref(db,`cart/${user.uid}/${productId}`);
    await remove(itemRef);
    alert("Item removed from cart")
    setPrdtQty({ ...prdtQty, [productId]:0});
  }

  const addToCart = async (productId) => {
    if (prdtQty[productId] >= 1) {
      if (!user) {
        console.log(user);
        navigate("/login");
      } else {
        try {
          const db = getDatabase();
          // to check if the user entered valid number of products
          const prodRef = ref(db, `products/${productId}`);
          const snapshot = await get(prodRef);
          console.log(prdtQty);
          if (snapshot.exists()) {
            const prodData = snapshot.val();
            if (prodData.count < prdtQty[productId]) {
              alert(`only ${prodData.count} available`);
              toggleCartBtn(productId);
              setPrdtQty({
                ...prdtQty,
                [productId]: 0,
              });
              return;
            }
          }
          const cartRef = ref(db, `cart/${user.uid}/${productId}`);
          await set(cartRef, {
            ...props.prod.find((item) => item.id === productId),
            count: prdtQty[productId],
          });
          alert("Item Added to Cart");
          toggleCartBtn(productId);
        } catch (error) {
          alert(error.code + error.message);
        }
      }
    } else{
		alert("please select atleast one item to add to the cart");
	 }
 };
  // console.log(cartBtnClicked);
 //console.log(prdtQty);
const AddToWishlist = async (productId) =>{
  try{
      const db = getDatabase();
      const wishlistRef = ref(db,`wishlist/${user.uid}/${productId}`)
      await set(wishlistRef,{
        ...props.prod.find(item => item.id ===productId),
        count:1
        })
      alert("Item added to Wishlist")
    } catch(error){
    alert(error.code + error.message)
  }
 
}

// to add products in admin side
const addProduct = async (productId,operation) =>{
  const multiplier = operation === "sub"? -1 : 1;
  try{
    const db=  getDatabase();
    const prodRef = ref(db,`products/${productId}`);
    const snapshot = await get(prodRef);
    if (snapshot.exists()){
      const prodData = snapshot.val();
      await set(prodRef,{
        ...prodData,
        count:prodData.count + multiplier * prdtQty[productId]
      })
    }
    alert(`item ${operation === "sub" ? "added" : "removed"} successfully`);
    toggleCartBtn(productId);
    } catch(error){
       alert(error.code + error.message);
    }

  }

  const deleteProduct = async (productId) =>{
    const db= getDatabase();
    const prodRef = ref(db,`products/${productId}`);
    await remove(prodRef);
    alert("Item deleted successfully");
  }


  return props.prod.map((item) => {
    const { id, prodName, description, price, image, count } = item;

    return (
      <div key={id} style={{ width: "18rem" }}>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={image}
                style={{ height: "300px", objectFit: "contain" }}
              />
              <Card.Body>
                <Card.Title>{prodName}</Card.Title>
                <Card.Text>{description}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>${price}</ListGroup.Item>
                <ListGroup.Item>Available: {count}</ListGroup.Item>
              </ListGroup>
              
                <Card.Body>
                  {cartBtnClicked.includes(id) ? ( // Check if the ID is in the array
                    <div>
                      <div className={ProductCSS.qtybtn}>
                                  <button onClick={() => incrementQty(id)}>+</button>
                                <span>{prdtQty[id]}</span>
                                  <button onClick={() => decrementQty(id)}>-</button>
                        </div>
                        <div className={ProductCSS.qtybtn}>
                                <button onClick={() =>{location.pathname === "/admin" ? addProduct(id,'add') : addToCart(id)}}> Add </button>
                                {location.pathname === "/admin" &&(
                                  <button onClick={() => addProduct(id,'sub')} > Remove </button>
                                )}
                                <button onClick={() =>cancelCart(id)}> Cancel </button>
                        </div>
                        </div>
                         ) : (
                      <div>
                         {(prdtQty[id] >= 1 && location.pathname !== "/admin" ) ? (
                          <button onClick={() =>removeFromCart(id)} className={ProductCSS.addbtn}> Remove</button>
                         ) : ( 
                                <>
                                <button  onClick={() => toggleCartBtn(id)} className={ProductCSS.addbtn} >
                                    {location.pathname !== "/admin" ? "Add to cart" : "Add/Remove"} 
                                      </button>
                                </>
                              
                         )}
                      <button className={ProductCSS.addbtn} onClick={ location.pathname !=="/admin" ? (() => AddToWishlist(id)) : (()=> deleteProduct(id))} >
                        {location.pathname !== "/admin" ? "Add to Wishlist" : "Delete"}
                        </button>
                      </div>
                  )}
                  
                </Card.Body>
              
            </Card>
          </Col>
        </Row>
      </div>
    );
  });
}

export default Product;
