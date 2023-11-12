import React from 'react'
import { Card } from 'react-bootstrap';
import OrderItemCSS from '../../assets/css/order.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import {useState} from "react";
import { getDatabase,ref,set } from 'firebase/database';



const OrderCard = ({ order,displaybutton }) => {
  const [adminStatus, setAdminStatus] = useState('');
      const {  status, total, type, orderId, items, orderdate,name,time,date,uid } = order;
    const navigate = useNavigate();
    const location = useLocation();

    const statusOnchange = (event) =>{
     const {value} = event.target;
      setAdminStatus(value);
    }

    const orderDetailsHandler = () =>{
    navigate("/orderdetails",{state:{data:order}})
    }

    const orderProcessingHandler = async () =>{
    try{
      const db=  getDatabase();
      const orderRef = ref(db,`orders/${uid}/${orderId}`);
      await set(orderRef, {
        ...order,
        status: adminStatus
      })
      alert("User has been notified with the status")
      navigate("/admin");

    }catch(error){
      alert(error.code+error.message);
    }
  }
 console.log(order);
 console.log(adminStatus);
    return (
      
          <Card className={OrderItemCSS.cardItem}>
            <Card.Body>
              <Card.Title>OrderID: {orderId}</Card.Title>
              {location.pathname ==="/adminorders" &&(
                <>
                <Card.Text className='mb-1'>Username: {name}</Card.Text>
                </>
              )}
              <Card.Text className='mb-1'>Order Date: {orderdate}</Card.Text>
              <Card.Text className='mb-1'>Order Type: {type}</Card.Text>
              {type ==='pickup' &&(
                <>
                <Card.Text className='mb-1'>Pickup time: {time}</Card.Text>
                <Card.Text className='mb-1'>Pickup Date: {date}</Card.Text>
                </>
              )}
              <Card.Text  className='mb-1'>Number of items: {items.length}</Card.Text>
              {location.pathname ==="/adminorders" &&(
                <>
                <Card.Text className='mb-1'>Items: </Card.Text>
                <ol>
                {items.map(item=>{
                   return <li> {item.prodName} </li>
                })}
                </ol>
                </>
              )}
              {location.pathname ==="/adminorders" ? (
                <>
                <Card.Text className='mb-1 d-inline'>Status: </Card.Text>
                <select onChange={statusOnchange} defaultValue={status} style={{minWidth:"10vw", padding:"3px",marginLeft:"5px",borderRadius:"5px", backgroundColor:"rgb(236, 238, 239)",color:"red",fontWeight:"bold"}}>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Ready to pickup">Ready to pickup</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
                </>
              ):(
                
                <Card.Text className='mb-1' > Order Status: < b style={{color: status!== 'Confirmed' ? 'red' : 'black'}}> {status}</b></Card.Text>
              )}
              <Card.Text  className='mb-2'><b>Order Total: ${total}</b></Card.Text>
              {displaybutton === 'true'? (
                  location.pathname ==='/adminorders' ? (
                    <button onClick={orderProcessingHandler} className={OrderItemCSS.btn}> Update Status </button>
                  ) :(
                    <button onClick={orderDetailsHandler} className={OrderItemCSS.btn}> View Order </button>
                  )
              ) : (
                  null
              )}
              
               
              
            </Card.Body>
          </Card>
          
      );
};

export default OrderCard;