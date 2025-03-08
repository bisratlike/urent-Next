// context/CartContext.tsx
"use client";
import React, { createContext, useContext, useReducer } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  picture: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalPrice: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}>({
  cartItems: [],
  totalPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          totalPrice: state.totalPrice + (action.payload.price * action.payload.quantity),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        totalPrice: state.totalPrice + (action.payload.price * action.payload.quantity),
      };
    }
    case 'REMOVE_ITEM': {
        const remainingItems = state.items.filter(item => item.id !== action.payload);
        
        const newTotal = remainingItems.reduce(
          (sum, item) => sum + Number((item.price * item.quantity).toFixed(2)),
          0
        );
      
        return {
          items: remainingItems,
          totalPrice: Number(newTotal.toFixed(2)),
        };
      }
    case 'CLEAR_CART':
      return { items: [], totalPrice: 0 };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], totalPrice: 0 });

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        totalPrice: state.totalPrice,
        addToCart: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
        removeFromCart: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);