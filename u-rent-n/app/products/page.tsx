
import React from 'react';
import { getProducts } from '@/lib/actions/product';
import { Product } from '@/lib/actions/types';
import ProductsList from './components/ProductList';
import ClientHeader from '@/components/ClientHeader';

const ProductsPage = async () => {
  const rawProducts = await getProducts();

  const products: Product[] = rawProducts.map((product) => ({
    id: product.id,
    name: product.name || "",
    description: product.description || "",
    price: Number(product.price) || 0,
    picture: product.picture || "/codes.jpg",
    createdAt: product.createdAt || new Date(),
    updatedAt: product.updatedAt || new Date(),
  }));

  return (
    <div>
      
      <ProductsList products={products} />
    </div>
  );
};

export default ProductsPage;