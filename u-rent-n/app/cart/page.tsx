"use client";
import { useCart } from '@/context/CartContext';
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

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
        addToCart({ ...item, quantity: -1 });
      }
    }
    setError("");
  };

  return (
<div>

<div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start gap-6 transition-all hover:bg-gray-50">
                  <div className="w-full sm:w-32 h-32 flex-shrink-0">
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

                  <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="w-full md:w-auto flex items-center justify-between gap-4">
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

                        <div className="flex items-center gap-2">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={clearCart}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  Clear Cart
                </button>
                <button
  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
  onClick={() => alert("Proceeding to checkout")}
>
  Checkout
</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
</div>
 
  );
};

export default CartPage;