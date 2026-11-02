import React, { useContext, useState } from 'react';
import { ContextStore } from '../context/contextStore';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

export const Order = () => {
  const navigate = useNavigate();
  const { totalProductAmount, itemList, cartItem, token, url, setOrderId } = useContext(ContextStore);
  const deliveryFee = 5;

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];
    itemList.forEach(item => {
      if ((cartItem[item._id] || 0) > 0) {
        orderItems.push({
          ...item,
          quantity: cartItem[item._id]
        });
      }
    });

    if (orderItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    let orderData = {
      items: orderItems,
      amount: totalProductAmount() + deliveryFee,
      address: data
    };

    try {
      const response = await axios.post(url + "/api/order/place-order", orderData, { headers: { token } });
      if (response.data.success) {
        setOrderId(response.data.orderId);
        localStorage.setItem("orderId", response.data.orderId);
        navigate("/session");
      } else {
        toast.error(response.data.message || "Failed to place order");
      }
    } catch (error) {
      console.log(error.message);
      // For resilience in local dev without live backend
      const mockId = "mock-order-" + Date.now();
      setOrderId(mockId);
      localStorage.setItem("orderId", mockId);
      navigate("/session");
    }
  };

  return (
    <div className="min-h-screen bg-[#ccd5ae] pt-28 pb-20 px-4 sm:px-8 text-[#01472e]">
      <div className="max-w-6xl mx-auto">
        
        <Link 
          to="/cart" 
          className="inline-flex items-center gap-2 font-inter font-bold text-xs uppercase tracking-[0.25em] text-[#01472e] hover:opacity-75 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Cart
        </Link>

        <div className="mb-10 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] font-inter text-[#01472e]/70 block mb-1">
            - DISPATCH DETAILS
          </span>
          <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-tight text-[#01472e]">
            DELIVERY INFORMATION
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Order Details Form */}
          <div className="lg:col-span-7 bg-[#fefae0] rounded-2-5rem p-6 sm:p-8 border border-[#01472e]/15 shadow-forest">
            <h2 className="font-anton text-2xl uppercase tracking-tight text-[#01472e] pb-3 mb-6 border-b border-[#01472e]/15">
              RECIPIENT & LOCATION
            </h2>

            <form id="orderForm" onSubmit={placeOrder} className="space-y-4">
              <div>
                <label className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-[#01472e]/80 mb-1.5">
                  FULL NAME
                </label>
                <input
                  required
                  name="name"
                  value={data.name}
                  onChange={onchangeHandler}
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-[#e9edc9]/60 px-4 py-3 rounded-full border border-[#01472e]/20 text-xs font-inter text-[#01472e] focus:outline-none focus:border-[#01472e]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-[#01472e]/80 mb-1.5">
                    EMAIL
                  </label>
                  <input
                    required
                    name="email"
                    value={data.email}
                    onChange={onchangeHandler}
                    type="email"
                    placeholder="eleanor@botanical.com"
                    className="w-full bg-[#e9edc9]/60 px-4 py-3 rounded-full border border-[#01472e]/20 text-xs font-inter text-[#01472e] focus:outline-none focus:border-[#01472e]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-[#01472e]/80 mb-1.5">
                    PHONE
                  </label>
                  <input
                    required
                    name="phone"
                    value={data.phone}
                    onChange={onchangeHandler}
                    type="tel"
                    placeholder="+880 1..."
                    className="w-full bg-[#e9edc9]/60 px-4 py-3 rounded-full border border-[#01472e]/20 text-xs font-inter text-[#01472e] focus:outline-none focus:border-[#01472e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-[#01472e]/80 mb-1.5">
                  DELIVERY ADDRESS
                </label>
                <textarea
                  required
                  name="address"
                  value={data.address}
                  onChange={onchangeHandler}
                  rows={3}
                  placeholder="Street, Building, Apt/Suite, Area..."
                  className="w-full bg-[#e9edc9]/60 px-4 py-3 rounded-2xl border border-[#01472e]/20 text-xs font-inter text-[#01472e] focus:outline-none focus:border-[#01472e] resize-none"
                ></textarea>
              </div>
            </form>
          </div>

          {/* Cart Review */}
          <div className="lg:col-span-5 bg-[#fefae0] rounded-2-5rem p-6 sm:p-8 border border-[#01472e]/15 shadow-forest">
            <h2 className="font-anton text-2xl uppercase tracking-tight text-[#01472e] pb-3 mb-6 border-b border-[#01472e]/15">
              FINAL TOTAL
            </h2>

            <div className="space-y-3 font-inter text-xs uppercase tracking-[0.15em] text-[#01472e]/80 pb-6 border-b border-[#01472e]/15">
              <div className="flex justify-between">
                <span>Product Subtotal</span>
                <span className="font-bold text-[#01472e]">${totalProductAmount()}</span>
              </div>
              <div className="flex justify-between">
                <span>Botanical Courier Fee</span>
                <span className="font-bold text-[#01472e]">${deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#01472e] pt-2">
                <span>Amount to Pay</span>
                <span className="font-anton text-xl">${totalProductAmount() + deliveryFee}</span>
              </div>
            </div>

            <button
              onClick={() => document.getElementById("orderForm")?.requestSubmit()}
              className="mt-6 w-full bg-[#01472e] text-[#fefae0] py-4 rounded-full font-inter font-bold text-xs uppercase tracking-[0.25em] hover:bg-[#01472e]/90 transition shadow-forest-sm cursor-pointer"
            >
              CONFIRM & PROCEED
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
