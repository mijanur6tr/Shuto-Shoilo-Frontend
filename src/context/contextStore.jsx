import { createContext, useEffect, useState } from "react";
import axios from "axios";
import assets from "../assets";

export const ContextStore = createContext(null);

export const ContextStoreProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [itemList, setItemList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  const addItem = async (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    try {
      if (token) {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      }
    } catch (error) {
      console.log("Cart add notice:", error.message);
    }
  };

  const removeItem = async (itemId) => {
    setCartItem((prev) => {
      const nextCount = (prev[itemId] || 0) - 1;
      const updated = { ...prev };
      if (nextCount <= 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = nextCount;
      }
      return updated;
    });

    try {
      if (token) {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      }
    } catch (error) {
      console.log("Cart remove notice:", error.message);
    }
  };

  const totalProductAmount = () => {
    let total = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const selectedItem = itemList.find((product) => String(product._id) === String(item));
        if (selectedItem) {
          total += selectedItem.price * cartItem[item];
        }
      }
    }
    return total;
  };

  const fetchItemList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/product/list`, { timeout: 8000 });
      if (response.data?.data && Array.isArray(response.data.data)) {
        setItemList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching menu from database:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/category/list`, { timeout: 8000 });
      if (response.data?.data && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching categories:", error.message);
    }
  };

  const loadCartData = async (activeToken) => {
    try {
      const response = await axios.get(url + "/api/cart/get-cart", {
        headers: { token: activeToken }
      });
      if (response.data?.cartData) {
        setCartItem(response.data.cartData);
      }
    } catch (error) {
      console.error("Cart data loading:", error.message);
    }
  };

  useEffect(() => {
    async function init() {
      await Promise.all([fetchItemList(), fetchCategories()]);
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }
    init();
  }, [url]);

  const contextValue = {
    itemList,
    setItemList,
    categories,
    setCategories,
    fetchItemList,
    fetchCategories,
    cartItem,
    setCartItem,
    addItem,
    removeItem,
    totalProductAmount,
    url,
    token,
    setToken,
    orderId,
    setOrderId,
    loading
  };

  return (
    <ContextStore.Provider value={contextValue}>
      {props.children}
    </ContextStore.Provider>
  );
};

export default ContextStoreProvider;