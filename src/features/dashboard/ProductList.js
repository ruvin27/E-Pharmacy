import Product from "./Product";
import { Container } from 'react-bootstrap';
import "../../assets/css/product.css";
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
    <Container className="product-container">
      <Product prod={productDetails} />
   </Container>
  );
}

export default ProductList;
