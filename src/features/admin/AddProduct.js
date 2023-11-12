import React, { useState } from "react";
import  "../../assets/css/userAuth.css";
import HomepageNav from "../navbar";
import {getDatabase,ref,set, push} from "firebase/database"
import { useNavigate } from "react-router-dom";



function AddProduct(){
    const [productDetails, setProductDetails] = useState({
        id:'',
        prodName: '',
        description: '',
         price:0,
         image:'',
         count:0
    });
    const navigate = useNavigate();

    const handleFormChange =(event) => {
        const {name,value} = event.target;
        const newValue = (name === 'price' || name === 'count') ? parseFloat(value): value;
        setProductDetails({
            ...productDetails,
            [name]: newValue
        });
    }

  const  handleSubmitter = async (event) =>{
        event.preventDefault();
        try{
          const db = getDatabase();
          const prodRef = ref(db,'products/');

          const newProdRef = push(prodRef);
          
          await set(newProdRef, {
            ...productDetails,
            id: newProdRef.key
          });
          navigate("/admin");
        } catch(error){
          alert(error.code+ error.message);

        }
    }
console.log(productDetails);

return(
<div>
    <HomepageNav/>
    <div >
      <div>
        <h3 style={{textAlign:'center',marginTop:'30px',fontSize:'35px', fontFamily:"Georgia, 'Times New Roman', Times, serif",fontWeight: 'bold'}}> Add New Product</h3>
      </div>
    <div className='center-container'>
        <form className='center-content2' onSubmit={handleSubmitter}>
          <div className="form-outline mb-4">
            <input type="text" name="prodName" onChange={handleFormChange}   className="form-control" required/>
            <label className="form-label" htmlFor="form2Example1">Product Name</label>
          </div>

          <div className="form-outline mb-4">
          <input type="number" step="0.001"  name="price" onChange={handleFormChange} className="form-control" min={1} required/>
            <label className="form-label" htmlFor="form2Example2"> Product price </label>
          </div>
          <div className="form-outline mb-4">
            <input type="number"  name="count" onChange={handleFormChange} className="form-control" min={1} required/>
            <label className="form-label" htmlFor="form2Example3"> Number of products to add</label>
          </div>
          <div className="form-outline mb-4">
            <input type="url" name="image" onChange={handleFormChange} className="form-control" required/>
            <label className="form-label" htmlFor="form2Example4"> Product image link </label>
          </div>

          <div>
            <textarea name="description" rows="3" onChange={handleFormChange} className="form-control"/>
            <label className="form-label" htmlFor="form2Example5"> Product Description </label>
          </div>
          <button type="submit"  className="btn btn-primary btn-block mb-4">Add Product</button>
  </form>
  </div>
    </div>

</div>

)
}

export default AddProduct;