import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.map((p) =>
            p.id === product.id ? { ...p, qty: p.qty + 1 } : p
          )
        : [...prev, { ...product, qty: 1 }]
    );
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const changeQty = (id, qty) =>
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
    );

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, changeQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
