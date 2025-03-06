import React from 'react';
import {ThreeDCardDemo} from '../components/Card';
import Header from '../components/Header';
export default function Home() {
  return (

   <div>
    <Header
        title="U-rent"
        navLinks={[
          { href: '/products', label: 'Product' },
          { href: '/cart', label: 'my Cart' },
        ]}
      />
    <ThreeDCardDemo
        picture="/codes.jpg"
        price="$99.99"
        productName="Awesome Product"
        description="hola hola hola "
      />
   </div>
  );
}
