import { useState,useEffect } from "react";
import CartBody from "../../assets/css/cart.module.css";
import {  Row, Col, Container } from "react-bootstrap";
import {getDatabase,ref,get,set} from "firebase/database";
import {useAuth} from "../authentication/AuthContext";
import cart from "../../assets/images/cart.jpg";
import CartItem from "./CartItem";
import HomepageNav from "../navbar";


function Wishlist(){
const {user} = useAuth();
const [wishlistData, setWishlistData] = useState([])

useEffect ( ()=>{
    const getWishlistData = async () =>{
        try{
            const db = getDatabase();
            const wishlistRef = ref(db, `wishlist/${user.uid}`);
            const snapshot = await get(wishlistRef)
            if(snapshot.exists()){
                console.log("inside if")
                const wishlistdata = snapshot.val();
                const  wishlistdataArray = Object.values(wishlistdata)
                setWishlistData(wishlistdataArray)
            } else{
                //console.log("inside else")
                setWishlistData([])
            }
    
        }catch(error){
            alert(error.code + error.message)
        }
    }
    if(user){
        getWishlistData()
    }
},[user])


    return(
        <div>
            <HomepageNav/>
                <div className={CartBody.container}>
                    <Container>
                        {wishlistData.length === 0 ? (
                            <div className={CartBody.empty_container}>
                                <img src={cart} alt="Empty Wishlist"></img>
                                <h2>Your Wishlist is empty!</h2>
                            </div>
                        ) : (
                            <Row>
                                <h3 className={CartBody.header}>My Wishlist:</h3>
                                <Col xs={12} lg={8}>
                                    {wishlistData.map((item) => (
                                        <CartItem key={item.id} product={item} setCartItems={setWishlistData} />
                                    ))}
                                </Col>
                                </Row>
                                )}
                    </Container>
            </div>
        </div>
    )
}

export default Wishlist;