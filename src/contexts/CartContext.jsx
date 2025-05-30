import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const CartContext = createContext();
const CART_KEY = "cart";
const ONE_HOUR = 1000 * 60 * 60;

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      try {
        const { data, timestamp } = JSON.parse(saved);
        if (Date.now() - timestamp < ONE_HOUR) {
          setItems(data);
        } else {
          localStorage.removeItem(CART_KEY);
        }
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify({ data: items, timestamp: Date.now() })
      );
    } else {
      localStorage.removeItem(CART_KEY);
    }
  }, [items]);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const changeQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalQty = useMemo(() => {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, changeQty, clearCart, totalQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
