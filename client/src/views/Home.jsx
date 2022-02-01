import React, { useEffect, useRef, useState } from 'react';
import ProductService from '../services/ProductService';
import ProductsList from '../components/products/ProductsList';
import AppLoader from '../components/UI/AppLoader/AppLoader';

export default function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  let getProducts = useRef(async () => { });

  getProducts = async () => {
    try {
      setLoading(true);

      const response = await ProductService.getProducts();
      setProducts(response.data);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);


  return (
    <div className="home-view">
      {loading
        ?
        <div className="home-loader-wrap">
          <AppLoader style={{ width: "50px", height: "50px" }} color="#ffffff" />
        </div>
        :
        <ProductsList products={products} />
      }
    </div>
  )
}

