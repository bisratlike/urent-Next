import React from 'react';
import { getProducts } from '@/lib/actions/product';
import { Product } from '@/lib/actions/types';
import { ThreeDCardDemo } from '@/components/Card';

const ProductsPage = async () => {
  const rawProducts = await getProducts();

  const products: Product[] = rawProducts.map((product) => ({
    id: product.id,
    name: product.name || "",
    description: product.description || "",
    price: Number(product.price) || 0,
    picture: product.picture 
    ? product.picture.startsWith('/') || product.picture.startsWith('http')
      ? product.picture 
      : `/${product.picture}`
    : "/codes.jpg",
    createdAt: product.createdAt || new Date(),
    updatedAt: product.updatedAt || new Date(),
  }));

  return (
    <div className="products-page">
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <ThreeDCardDemo
              picture={product.picture}
              price={product.price}
              productName={product.name}
              description={product.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;