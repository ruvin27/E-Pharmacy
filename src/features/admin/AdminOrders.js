import { useState } from "react";
import { getDatabase,get,ref } from "firebase/database";
import { useAuth } from "../authentication/AuthContext";
import HomepageNav from "../navbar";
import OrderCard from "../orders/OrderCard";
import { Container,Row,Col } from "react-bootstrap";
import OrdersCSS from "../../assets/css/order.module.css";


function AdminOrders(){
const {user} = useAuth();
const [ordersData, setOrdersData] = useState([]);
const [displayOrderType , setDisplayOrderType] = useState('toprocess');

const fetchOrders = async () =>{
    try{
        const db = getDatabase();
        const ordersRef = ref(db,"orders/");
        const snapshot = await get(ordersRef);
        const orderObj = snapshot.val();
        const orderDataArray = [];

        for(const ordersKey in orderObj){
            const orderVal = orderObj[ordersKey];
            const orderData = Object.values(orderVal);
            orderDataArray.push(orderData)
        }
        setOrdersData(orderDataArray);
    }catch(error){
        alert(error.code + ": " + error.message)
    }
}

if ( user.hasOwnProperty("admin")){
    fetchOrders();
}
//console.log(ordersData);

const displayAllOrders = (orderType) =>{
   
        return ordersData.map(item =>{
            return item.map(orders =>{
                 return <OrderCard key={orders.orderId} order={orders} displaybutton='false'/>
             })

         })

    }

    const displayOrdersToProcess = () =>{
        return  ordersData.map(item =>{
            return item.filter(orders => orders.status ==='Confirmed' || orders.status ==='On Hold')
            .map(orders =>{
                return <OrderCard key={orders.orderId} order={orders} displaybutton = 'true'/>
            })
        })
    }

    return(
        <div>
            <HomepageNav/>
            <div className={OrdersCSS.container}>
            
            <Container>
            <div className={OrdersCSS.cardItem}> 
            <h3 className={OrdersCSS.header} style={{display:"inline"}}> Orders:</h3>
            {displayOrderType === 'toprocess'?(
                <button style={{float:'right'}} onClick={() =>setDisplayOrderType('all')}> All orders</button>
            ):(
                <button style={{float:'right'}} onClick={() =>setDisplayOrderType('toprocess')}> Orders to process</button>
            )}
            </div>
            
            <Row>
            <Col>
            {displayOrderType === 'all' ? displayAllOrders(): displayOrdersToProcess()}
            </Col>
            </Row>
            </Container>
            </div>
        </div>
    )
}

export default AdminOrders;