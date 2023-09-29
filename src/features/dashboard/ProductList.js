import Product from "./Product";
import { Container } from "react-bootstrap";
import productClass from "../../assets/css/product.module.css";
import { useState, useEffect } from "react";
import { ref, getDatabase , get} from "firebase/database";



function ProductList() {
	const [productDetails, setProductDetails] = useState([]);

	useEffect( () =>{
		const fetchData = async () =>{
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
		}
		fetchData();

	},[productDetails]);
	//console.log(productDetails);

	return (
		<Container className={productClass.product}>
			{  productDetails ? (
				<Product key={productDetails.id} prod={productDetails} />
			) : (
				<div><p> No product available to display</p> </div>
			)
		}

		</Container>
	);
}

export default ProductList;
