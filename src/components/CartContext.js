import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const persistCartItems = (updatedCartItems) => {
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);
  
    if (existingItemIndex !== -1) {
      // Item already exists in cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += product.quantity;
      persistCartItems(updatedCartItems);
    } else {
      // Item doesn't exist in cart, add it to cartItems array
      const updatedCartItems = [...cartItems, product];
      persistCartItems(updatedCartItems);
    }
  };
  

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    persistCartItems(updatedCartItems);
  };

  const clearCart = () => {
    persistCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
