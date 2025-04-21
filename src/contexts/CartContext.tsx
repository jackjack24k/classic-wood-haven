
import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../api';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    [key: string]: any;
  };
  quantity: number;
}

interface CartContextType {
  cart: {
    items: CartItem[];
    total: number;
  };
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const { toast } = useToast();
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = cartAPI.getCart();
    setCart(savedCart);
  }, []);
  
  const addToCart = (product: any, quantity: number = 1) => {
    const updatedCart = cartAPI.addToCart(product, quantity);
    setCart(updatedCart);
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    });
  };
  
  const removeFromCart = (productId: string) => {
    const updatedCart = cartAPI.removeFromCart(productId);
    setCart(updatedCart);
    toast({
      title: "Removed from cart",
      description: "Item removed from your cart",
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    const updatedCart = cartAPI.updateQuantity(productId, quantity);
    setCart(updatedCart);
  };
  
  const clearCart = () => {
    const emptyCart = cartAPI.clearCart();
    setCart(emptyCart);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
