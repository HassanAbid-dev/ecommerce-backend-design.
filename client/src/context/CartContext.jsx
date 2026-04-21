import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart((prevCart) => {
      const isExisting = prevCart.find((item) => item._id === product._id);
      if (isExisting) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };
  const totalItems = cart.length;
  const clearCart = () => {
    setCart([]);
  };
  return (
    <>
      <CartContext.Provider
        value={{
          addToCart,
          setCart,
          cart,
          totalItems,
          removeFromCart,
          clearCart,
          getCartTotal,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
