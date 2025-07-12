import React, { useContext, useState } from 'react';
import { ContextStore } from '../context/contextStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Cart = () => {
  const { cartItem, itemList, removeItem, totalProductAmount , url ,token } = useContext(ContextStore);
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  const orderNavigate = () => { 
    if(!token){
        toast.error("Signin to order")
      }else{
        navigate("/order") 
      }

  }

  
  const cartItems = itemList.filter((item) => cartItem[item._id] > 0);

  const deliveryFee = 10;

  return (
    <div className="min-h-80vh bg-gray-100 py-20 px-3 sm:px-5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 text-gray-800">Your Cart</h2>

        {cartItems.length === 0 ? (<div className='min-h-[60vh] flex items-center flex-col justify-center'>
          <p className="text-center lg:text-3xl text-gray-500">Your cart is empty.</p>
          <div className="flex justify-center  mt-4">
            <a
              href='/'
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-full shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Add to Cart
            </a>
          </div>
        </div>

        ) : (
          <>
            <div className="grid gap-4 sm:gap-6 mb-10">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-row items-center gap-2 sm:gap-6 bg-white px-3 py-2 sm:px-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
                >
                  <img
                    src={url + "/image/" + item.image}
                    alt={item.name}
                    className="w-14 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border"
                  />

                  <div className="flex1 w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-md sm:text-lg lg:text-xl font-semibold text-gray-800">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-500 hover:text-red-700 text-xl font-bold"
                      >
                        &times;
                      </button>
                    </div>
                    <hr className="border-t-2 border-gray-400" />


                    <div className="mt-1 md:mt-3 grid grid-cols-3 sm:text-center sm:grid-cols-4 gap-2 sm:gap-4 text-gray-700 text-sm sm:text-base">
                      <div>
                        <p className="font-semibold">Price</p>
                        <p>${item.price}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Quantity</p>
                        <p>{cartItem[item._id]}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Total</p>
                        <p>${cartItem[item._id] * item.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>


            <div className="flex flex-col md:flex-row justify-between items-start gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-md">

              <div className="w-full md:w-1/2">
                <p className="mb-2 text-gray-700 font-medium text-sm sm:text-base">
                  If you have any Promo Code, apply it here:
                </p>
                <div className="flex">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm sm:text-base hover:bg-blue-700 transition">
                    Apply
                  </button>
                </div>
              </div>


              <div className="w-full md:w-1/2 bg-gray-50 rounded-lg p-4 sm:p-6 shadow-inner">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Total Cart</h3>
                <div className="space-y-2 text-sm sm:text-base text-gray-700">
                  <div className="flex justify-between">
                    <span>Product Total</span>
                    <span>${totalProductAmount()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${totalProductAmount == 0 ? 0 : deliveryFee}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-base text-gray-900">
                    <span>Total Price</span>
                    <span>${totalProductAmount == 0 ? 0 : totalProductAmount() + deliveryFee}</span>
                  </div>
                </div>
                <button onClick={orderNavigate} className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition text-sm sm:text-base">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
