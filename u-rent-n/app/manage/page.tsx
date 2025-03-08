
import React from 'react';
import { getProducts } from '@/lib/actions/product';
import { Product } from '@/lib/actions/types';
import ManageProductList from './components/ManageProductList';

import Link from 'next/link';

const ManagePage = async () => {
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 mt-10  ">
          <h1 className="text-3xl font-semibold lg:text-gray-900  ">Product Management</h1>
          <Link 
            href="/products/post" 
           className="px-2 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
      >
            Add New Product
          </Link>
                        



        </div>
        <ManageProductList products={products} />
      </div>
    </div>
  );
};

export default ManagePage;