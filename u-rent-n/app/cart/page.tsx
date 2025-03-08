// app/cart/page.tsx
"use client";
import { useCart } from '@/context/CartContext';
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import ClientHeader from "@/components/ClientHeader";
import { useState } from "react";
const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    clearCart, 
    addToCart,
    totalPrice 
  } = useCart();

  const [error, setError] = useState("");

  const updateQuantity = (id: number, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;

    if (item.quantity + change < 0) {
      setError("Quantity cannot be negative");
      return;
    }
    
    if (change > 0) {
      addToCart(item);
    } else {
      if (item.quantity === 1) {
        removeFromCart(id);
      } else {
        // For decreasing quantity, we add with negative quantity
        addToCart({ ...item, quantity: -1 });
      }
    }
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <ClientHeader />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 transition-all hover:bg-gray-50">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <img
                    src={item.picture}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13";
                    }}
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 text-center min-w-[3rem]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove item"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>

                  <div className="text-right min-w-[100px]">
                    <p className="text-lg font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              onClick={() => alert("Proceeding to checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;