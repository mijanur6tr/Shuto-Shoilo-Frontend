import React, { useState, useContext } from 'react';
import { ContextStore } from '../context/contextStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckCircle2 } from 'lucide-react';

export const Session = (props) => {
  const navigate = useNavigate();
  const { orderId: contextOrderId, url, token, setCartItem } = useContext(ContextStore);
  const orderId = contextOrderId || localStorage.getItem("orderId");

  const [loading, setLoading] = useState(false);

  const confirmOrder = async (isSuccess) => {
    setLoading(true);
    try {
      if (token) {
        await axios.post(url + "/api/order/verify", { orderId, success: isSuccess ? "true" : "false" }, { headers: { token } });
      }
      if (isSuccess) {
        toast.success("Order Placed Successfully!");
        setCartItem({});
        localStorage.removeItem("orderId");
        navigate("/my-order");
      } else {
        toast.error("Order Cancelled");
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      if (isSuccess) {
        toast.success("Order Confirmed!");
        setCartItem({});
        localStorage.removeItem("orderId");
        navigate("/my-order");
      } else {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ccd5ae] pt-28 pb-20 px-4 sm:px-8 text-[#01472e] flex items-center justify-center">
      <div className="w-full max-w-lg bg-[#fefae0] rounded-5rem p-8 sm:p-12 border border-[#01472e]/15 shadow-forest text-center">
        
        <div className="w-16 h-16 rounded-full bg-[#01472e] text-[#fefae0] flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
        </div>

        <span className="text-[10px] font-bold uppercase tracking-[0.35em] font-inter text-[#01472e]/70 block mb-2">
          - FINAL CONFIRMATION
        </span>

        <h1 className="font-anton text-3xl sm:text-4xl uppercase tracking-tight text-[#01472e] mb-4">
          CASH ON DELIVERY
        </h1>

        <p className="font-inter text-xs text-[#01472e]/80 max-w-sm mx-auto mb-8 leading-relaxed">
          Please confirm your botanical nourishment order. Our courier will deliver with care, and you can pay directly in cash or digital transfer upon receipt.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            disabled={loading}
            onClick={() => confirmOrder(false)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#01472e]/30 text-[#01472e] font-inter font-bold text-xs uppercase tracking-[0.25em] hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
          >
            Cancel Order
          </button>

          <button
            disabled={loading}
            onClick={() => confirmOrder(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#01472e] text-[#fefae0] font-inter font-bold text-xs uppercase tracking-[0.25em] hover:bg-[#01472e]/90 transition shadow-forest-sm cursor-pointer"
          >
            {loading ? "Confirming..." : "Confirm & Place"}
          </button>
        </div>
      </div>
    </div>
  );
};
