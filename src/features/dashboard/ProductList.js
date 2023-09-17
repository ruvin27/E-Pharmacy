import Product from "./Product";
import { Container } from 'react-bootstrap';
import productClass from "../../assets/css/product.module.css";
import { useState, useEffect } from "react";


function ProductList() {
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        return response.json();
      })
      .then((element) => {
        const products = element.products;
        const prod_arr = [];
        products.map((product) => {
          const prod_obj = {
            id: product.id,
            name: product.title,
            description: product.description,
            price: product.price,
            image: product.images[0],
            count: product.stock
          };
          prod_arr.push(prod_obj);
        });
        setProductDetails(prod_arr);
      });
  }, []);

 

  return (
    <Container className={productClass.product}>
      <Product key = {productDetails.id} prod={productDetails} />
   </Container>
  );
}

export default ProductList;
