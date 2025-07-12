import React, { useContext, useState } from 'react'
import { ContextStore } from '../context/contextStore'
import { Amphora } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Order = () => {
  const navigate = useNavigate();
  const { totalProductAmount , itemList , cartItem , token ,url , setOrderId } = useContext(ContextStore)
  const deliveryFee = 10;
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(prevData => ({ ...prevData, [name]: value }))
  }

  const placeOrder = async(e)=>{
    e.preventDefault();

    let orderItems = [];
    itemList.forEach(item => {
  if (cartItem[item._id] > 0) {
    orderItems.push({
      ...item,
      quantity: cartItem[item._id]
    });
  }
});


    let orderData = {
      items:orderItems,
      amount:totalProductAmount(),
      address:data
    }


    try {
      
      const response = await axios.post(url+"/api/order/place-order",orderData,{headers:{token}})

      if(response.data.success){      
        setOrderId(response.data.orderId)
         localStorage.setItem("orderId",response.data.orderId)
        navigate("/session")
      }
    } catch (error) {
      console.log(error.message)
    }

  }


  return (
    <div className=" bg-white px-4 pt-25 pb-10 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

        <div className="w-full md:w-1/2 bg-gray-100 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Order Information</h2>

          <form
           id="orderForm"
          onSubmit={placeOrder}
          className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                required
                name='name'
                value={data.name}
                onChange={onchangeHandler}
                type="text"
                placeholder="Enter your name"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                required
                name='email'
                value={data.email}
                onChange={onchangeHandler}
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                required
                name='phone'
                value={data.phone}
                onChange={onchangeHandler}
                type="tel"
                placeholder="Enter your phone number"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                required
                name='address'
                value={data.address}
                onChange={onchangeHandler}
                rows={4}
               placeholder={`House/Road/Flat No.\nArea/Locality\nCity/Town, Zip Code`}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              ></textarea>
            </div>
          </form>
        </div>


        <div className="w-full my-auto px-16 py-6 md:py-25 md:w-1/2 bg-gray-100 rounded-lg  shadow-md">
          <h3 className="text-xl font-semibold my-4 md:my-10 text-gray-800">Total Cart</h3>

          <div className="space-y-3 text-sm sm:text-base text-gray-700">
            <div className="flex justify-between">
              <span>Product Total</span>
              <span>${totalProductAmount()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${deliveryFee}</span>
            </div>
            <hr className="my-2 md:my-5" />
            <div className="flex justify-between font-bold text-base text-gray-900">
              <span>Total Price</span>
              <span>${totalProductAmount() + deliveryFee}</span>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
               onClick={() => document.getElementById("orderForm").requestSubmit()}
              className="bg-green-600 text-white tracking-tighter w-full lg:w-1/2 p-3 md:mt-10 rounded-md hover:bg-green-700 transition duration-300 font-medium"
            >
              Proceed to Payment
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
