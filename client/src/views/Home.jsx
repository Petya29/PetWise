import React, { useEffect, useRef, useState } from 'react';
import ProductService from '../services/ProductService';
import ProductsList from '../components/products/ProductsList';

export default function Home() {

  const [products, setProducts] = useState([]);

  let getProducts = useRef(async () => { });

  getProducts = async () => {
    try {
      const response = await ProductService.getProducts();
      setProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);


  return (
    <div className="home-view">
      <ProductsList products={products} />
    </div>
  )
}

