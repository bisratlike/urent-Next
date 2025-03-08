// components/ClientHeader.tsx
"use client";

import { useCart } from '@/context/CartContext';
import Header from './Header';

const ClientHeader = () => {
  const { totalItems, totalPrice } = useCart();
  
  return (
    <Header
      title="U-rent"
      navLinks={[
        { href: '/products', label: 'Product' },
        
        { href: '/manage', label: 'Manage' },
        { href: '/cart', label: `My Cart ` },
      ]}
      totalPrice={totalPrice}
    />
  );
};

export default ClientHeader;