import Product from "./Product";
import { Container } from "react-bootstrap";
import productClass from "../../assets/css/product.module.css";
import { useState, useEffect } from "react";
import { ref, getDatabase , get} from "firebase/database";



function ProductList() {
	const [productDetails, setProductDetails] = useState([]);
	

	// useEffect(() => {
	// 	fetch("https://dummyjson.com/products")
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((element) => {
	// 			const products = element.products;
	// 			const prod_arr = [];
	// 			products.map((product) => {
	// 				const prod_obj = {
	// 					id: product.id,
	// 					name: product.title,
	// 					description: product.description,
	// 					price: product.price,
	// 					image: product.images[0],
	// 					count: product.stock,
	// 				};
	// 				prod_arr.push(prod_obj);
	// 			});
	// 			setProductDetails(prod_arr);
	// 		});
	// }, []);

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
