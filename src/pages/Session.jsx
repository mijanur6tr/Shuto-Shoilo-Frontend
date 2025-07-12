import React, { useState, useContext } from 'react'
import { ContextStore } from '../context/contextStore'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


export const Session = (props) => {
  const navigate = useNavigate()
  const { orderId: contextOrderId, url, token, setCartItem } = useContext(ContextStore);
  const orderId = contextOrderId || localStorage.getItem("orderId");

  const [success, setSuccess] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url + "/api/order/verify", { orderId, success }, { headers: { token } })
      if (response.data.success) {

        navigate("/my-order")
        toast.success("Order Placed")
        setCartItem("")
      } else {
        navigate("/")
        toast.error("Order Cancelled")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='p-25 min-h-[60vh] flex items-center justify-center '>
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
