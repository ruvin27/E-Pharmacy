import React from 'react';
import { Button, Container, Form, Nav, NavItem, Navbar } from 'react-bootstrap';
import { useAuth } from './authentication/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {Link} from "react-router-dom";
import { useSearchContext } from './dashboard/SearchContext';
import { getDatabase,get,ref} from 'firebase/database';
import NoAccess from './authentication/admin/NoAccess';

function HomepageNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {searchData,setSearchData,productDetails,setProductDetails} = useSearchContext();
  
  const searchValue = (event) =>{
    const data = event.target.value;
    setSearchData(data)
  }
  

  const searchProduct = async () =>{
   
    try{
        const db = getDatabase();
        const prodRef = ref(db,"products/");
        const snapshot =  await get(prodRef);
        if(snapshot.exists()){
          const prodData = snapshot.val();
          const prodList = Object.values(prodData)
          console.log("search data: " +searchData)
          const matchingProducts = prodList.filter((product) =>{
           return product.prodName.toLowerCase().split(" ").some((part) => part === searchData.toLowerCase())
          }
        );

        // Check if there are matching products
        if (matchingProducts.length === 0) {
          setProductDetails([]);
          console.log("no matching products");
        } else {
          setProductDetails(matchingProducts);
        }
       // alert("inside search")
      }

    }catch(err){
      alert(err.message+ err.code)
    }

  }
 // console.log(productDetails)

 const clearSearch = async () => {
    try{
        const db = getDatabase();
        const prodRef = ref(db,"products/");
        const snapshot =  await get(prodRef);
        if (snapshot.exists()){
          let prodData = snapshot.val();
          const prodList = Object.values(prodData);
          setProductDetails(prodList);
        } else{
          console.log("No products");
          setProductDetails([]);
        }
    } catch(err){
      alert(err.message+ err.code)
    }
 }

//  const handleSearchChange = (event) =>{
// searchValue(event)
// searchProduct()
//  }
  
  const HandleLogout = () => {
    console.log("Logging out...");
    logout();
    console.log("User logged out.");
    navigate('/');
  }



  return (
    <Navbar expand="lg" className="">
      <Container fluid>
      {location.pathname ==="/admin" || location.pathname ==="/adminorders" || location.pathname ==="/addproduct" ?(
          <Navbar.Brand as={Link} to="/admin" style={{ color: 'white' }}>UTA E-Pharmacy</Navbar.Brand>
        ) :(
          <Navbar.Brand as={Link} to="/" style={{ color: 'white' }}>UTA E-Pharmacy</Navbar.Brand>
      )}
         
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {location.pathname ==="/admin" || location.pathname ==="/adminorders" || location.pathname ==="/addproduct" ? (
              <Nav>
              <Nav.Link as={Link} to="/addproduct" style={{ color: 'white' }}>Add New Product</Nav.Link>
              <Nav.Link as={Link} to="/adminorders" style={{ color: 'white' }} > Orders </Nav.Link>
              </Nav>
            ) : (
              <Nav>
             <Nav.Link  as={Link} to="/cart" style={{ color: 'white' }}>Cart</Nav.Link>
             <Nav.Link  as={Link} to="/wishlist" style={{ color: 'white' }}>Wishlist</Nav.Link>
              <Nav.Link as={Link} to="/orders" style={{ color: 'white' }}>Orders</Nav.Link>
              <Nav.Link as={Link} to="/profile" style={{ color: 'white' }}>Profile</Nav.Link>
              {user ? 
              <Nav.Link  as={Link} to="/" onClick={HandleLogout} style={{ color: 'white' }}>Logout</Nav.Link> :
              <Nav.Link  as={Link} to="/login" style={{ color: 'white' }}>Login/Register</Nav.Link> 
              }
            
            {(user && user.hasOwnProperty('admin') ) &&(
              <Nav.Link as={Link} to="/admin" style={{ color: 'white' }}>Admin Dashboard</Nav.Link>
            )}
              {location.pathname ==='/' &&(
                <Form className="d-flex" style={{width:'30vw',marginLeft:"30px"}}>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={searchValue}
                    
                  />

                  {searchData &&(
                      <button onClick={clearSearch} > X </button>
                    )}
                  <Button variant="primary" onClick={searchProduct}>Search</Button>
                </Form>
              )}
              

              </Nav>
            )}
          </Nav>

        </Navbar.Collapse>
        {location.pathname === '/admin' ? (
          <NavItem style={{fontSize:'20px'}}> Welcome Admin !!!</NavItem>
        ) : (
          <NavItem style={{fontSize:'20px'}}> Welcome {user ? user.name: ""} !!!</NavItem>
        )}

      </Container>
    </Navbar>
  );
}

export default HomepageNav;
