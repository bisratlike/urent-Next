
"use client";

import React from 'react';
import { ThreeDCardDemo } from '@/components/Card';
import { Product } from '@/lib/actions/types';
import { deleteProduct } from '@/lib/actions/product';
import { Button } from '@mantine/core';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface ManageProductsListProps {
  products: Product[];
}

const ManageProductList = ({ products }: ManageProductsListProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (productId: number) => {
    try {
      await deleteProduct(productId);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="products-page p-4 md:p-8">
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">

     
        {products.map((product) => (
          <div key={product.id} className="w-full h-full relative group">
            <ThreeDCardDemo
              picture={product.picture || "/codes.jpg"}
              price={product.price || 0}
              productName={product.name || "Unnamed Product"}
              description={product.description || "No description available"}
            />
            <Button
              variant="gradient"
              gradient={{ from: 'red', to: 'pink' }}
              size="x"
              className="absolute top-2 right-2 z-50 opacity-0 group-hover:opacity-100  shadow-lg"
              onClick={() => handleDelete(product.id)}
              disabled={isPending}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProductList;