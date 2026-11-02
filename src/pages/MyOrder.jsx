import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ContextStore } from '../context/contextStore';
import { toast } from 'react-toastify';
import { PackageSearch, Truck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyOrder = () => {
  const { token, url } = useContext(ContextStore);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/get-order", {}, {
        headers: { token }
      });
      setData(response.data.data || []);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[#ccd5ae] pt-28 pb-20 px-4 sm:px-8 text-[#01472e]">
      <div className="max-w-6xl mx-auto">
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 font-inter font-bold text-xs uppercase tracking-[0.25em] text-[#01472e] hover:opacity-75 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Menu
        </Link>

        <div className="mb-10 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] font-inter text-[#01472e]/70 block mb-1">
            - DISPATCH STATUS
          </span>
          <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-tight text-[#01472e]">
            MY HARVEST ORDERS
          </h1>
        </div>

        {data.length === 0 ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center bg-[#fefae0] rounded-5rem p-8 border border-[#01472e]/15 shadow-forest text-center">
            <PackageSearch className="w-12 h-12 text-[#01472e]/40 mb-3" />
            <p className="font-anton text-2xl uppercase text-[#01472e] mb-2">No Past Orders Found</p>
            <p className="font-inter text-xs uppercase tracking-widest text-[#01472e]/70 mb-6">
              You haven't placed any botanical orders yet.
            </p>
            <Link
              to="/"
              className="bg-[#01472e] text-[#fefae0] px-6 py-3 rounded-full font-inter font-bold text-xs uppercase tracking-[0.25em]"
            >
              Start an Order
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((order, index) => (
              <div
                key={index}
                className="bg-[#fefae0] border border-[#01472e]/15 rounded-2-5rem p-6 shadow-forest-sm hover:shadow-forest transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-anton text-xl uppercase text-[#01472e]">
                    ORDER #{index + 1}
                  </h4>
                  <span className="px-3 py-1 text-[10px] rounded-full font-inter font-bold uppercase tracking-wider bg-[#01472e] text-[#fefae0]">
                    {order.status || 'Processing'}
                  </span>
                </div>

                <div className="text-xs font-inter text-[#01472e]/80 space-y-1 mb-4 border-y border-[#01472e]/10 py-3">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span>• {item.name}</span>
                      <span className="font-bold text-[#01472e]">× {item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <p className="font-anton text-lg text-[#01472e]">
                    Total: ${order.amount}
                  </p>
                  <button
                    onClick={fetchOrders}
                    className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-inter font-bold uppercase tracking-wider bg-[#ccd5ae] text-[#01472e] rounded-full hover:bg-[#01472e] hover:text-[#fefae0] transition cursor-pointer"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    Refresh
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
