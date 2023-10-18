import Product from "./Product";
import { Container } from "react-bootstrap";
import productClass from "../../assets/css/product.module.css";
import { useState, useEffect } from "react";
import { ref, getDatabase , get} from "firebase/database";
import { useSearchContext } from "./SearchContext";



function ProductList() {
	
	const {searchData, setSearchData, productDetails,setProductDetails} = useSearchContext();
	console.log("productslist " +searchData)

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

	},[]);
	console.log(productDetails);

	return (
		<Container className={productClass.product}>
			{  productDetails.length !== 0 ? (
				<Product key={productDetails.id} prod={productDetails} />
			) : (
				<div style={{margin:'10rem',padding:'15px', minWidth:"50vw",textAlign:'center'}}><h3> No products available to display!!!</h3> </div>
			)
		}

		</Container>
	);
}

export default ProductList;
