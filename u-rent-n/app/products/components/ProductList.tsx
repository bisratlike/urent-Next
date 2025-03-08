
"use client";

import React from 'react';
import { ThreeDCardDemo } from '@/components/Card';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/actions/types';

interface ProductsListProps {
  products: Product[];
}

const ProductsList = ({ products }: ProductsListProps) => {
  const { addToCart } = useCart();

  return (
    <div className="products-page p-4 md:p-8">
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <div key={product.id} className="w-full h-full">
            <ThreeDCardDemo
              picture={product.picture || "/codes.jpg"}
              price={product.price || 0}
              productName={product.name || "Unnamed Product"}
              description={product.description || "No description available"}
              onAddToCart={() => addToCart({
                id: product.id,
                name: product.name || "Unnamed Product",
                price: Number(product.price) || 0,
                picture: product.picture || "/default-image.jpg",
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