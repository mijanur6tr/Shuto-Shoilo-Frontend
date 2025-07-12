import React, { useState, useContext, useEffect } from 'react'
import { ContextStore } from '../context/contextStore'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const Session = (props) => {
  const navigate = useNavigate()
  const { orderId: contextOrderId, url, token, setCartItem } = useContext(ContextStore);
  const orderId = contextOrderId || localStorage.getItem("orderId");

  const [success, setSuccess] = useState("")

  const cancelOrder = async () => {
    try {
      await axios.post(url + "/api/order/verify", { orderId, success: "false" }, { headers: { token } });
      setCartItem("")
      localStorage.removeItem("orderId")
      toast.info("Order cancelled due to navigation")
    } catch (error) {
      console.log("Error cancelling order", error.message)
    }
  }

  useEffect(() => {
    // Handle browser/tab close or refresh
    const handleBeforeUnload = (e) => {
      cancelOrder();
      // Standard: prevent default
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    // Handle React route change/unmount
    return () => {
      cancelOrder()
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])  // run once on mount

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url + "/api/order/verify", { orderId, success }, { headers: { token } })
      if (response.data.success) {
        navigate("/my-order")
        toast.success("Order Placed")
        setCartItem("")
        localStorage.removeItem("orderId")
      } else {
        navigate("/")
        toast.error("Order Cancelled")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='p-25 min-h-[60vh] flex flex-col gap-5 items-center justify-center '>
      <h1>Cash on Delivery</h1>
      <form
        onSubmit={onSubmitHandler}
        className='flex gap-20 justify-center items-center'
      >
        <button
          type='submit'
          onClick={() => setSuccess("false")}
          className='bg-amber-300 rounded-xl p-2 '
        >Cancel</button>

        <button
          type='submit'
          onClick={() => setSuccess("true")}
          className='bg-amber-300 rounded-xl p-2 '
        >Confirm</button>
      </form>
    </div>
  )
}
