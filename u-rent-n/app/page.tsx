import React from 'react';
// import {ThreeDCardDemo} from '../components/Card';
import Header from '../components/Header';
import ClientHeader from '../components/ClientHeader';
import ProductsPage from "./products/page"
export default function Home() {
  return (

   <div>
    <ClientHeader
      />
      <ProductsPage/>
    {/* <ThreeDCardDemo
        picture="/codes.jpg"
        price={100}
        productName="Awesome Product"
        description="hola hola hola "
      /> */}
   </div>
  );
}
