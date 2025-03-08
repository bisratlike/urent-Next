
"use client";

import React from 'react';
import { ThreeDCardDemo } from '@/components/Card';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/actions/types';

interface ProductsListProps {
  products: Product[];
}

// app/products/components/ProductList.tsx


const ProductsList = ({ products }: ProductsListProps) => {
  const { addToCart } = useCart();

  return (
    <div className="products-page">
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <ThreeDCardDemo
              picture={product.picture}
              price={product.price}
              productName={product.name}
              description={product.description}
              onAddToCart={() => addToCart({
                ...product,
                quantity: 1
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;