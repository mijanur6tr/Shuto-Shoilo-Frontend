import { createContext, useEffect, useState } from "react";
import axios from "axios"


export const ContextStore = createContext(null)

const ContextStoreProvider = (props) => {

    const [cartItem, setCartItem] = useState([])
    const [itemList, setItemList] = useState([])
    const [token, setToken] = useState("")
    const [orderId,setOrderId] = useState("")
    const [loading,setLoading] = useState(true)
    const url = import.meta.env.VITE_BACKEND_URL


    const addItem = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        try {
            if (token) {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const removeItem = async (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        try {
            if (token) {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const totalProductAmount = () => {
        let total = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                const selectedItem = itemList.find((product) => product._id === item)

                total += selectedItem.price * cartItem[item]
            }
        }
        return total;
    }

    const fetchItemList = async () => {
        try {
            const response = await axios.get(`${url}/api/product/list`)

            setItemList(response.data.data)
        } catch (error) {
            console.log(error.message)
        }finally{
            setLoading(false)
        }
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.get(url + "/api/cart/get-cart", {
                headers: {
                    token: token
                }
            });

            setCartItem(response.data.cartData);
        } catch (error) {
            console.error("Failed to load cart data:",error.message);
        }
    };


    useEffect(() => {

        async function getItem() {
            await fetchItemList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        getItem()
    }, [])

    const contextValue = {
        itemList,
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
    }

    return (
        <ContextStore.Provider value={contextValue}>
            {props.children}
        </ContextStore.Provider>
    )

}

export default ContextStoreProvider;