import React, { useContext, useState } from 'react';
import { ContextStore } from '../context/contextStore';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import assets from '../assets';

export const Cart = () => {
  const { cartItem, itemList, removeItem, addItem, totalProductAmount, url, token } = useContext(ContextStore);
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  const orderNavigate = () => { 
    if (!token) {
      toast.error("Please sign in to proceed with your order");
    } else {
      navigate("/order");
    }
  };

  const cartItems = itemList.filter((item) => (cartItem[item._id] || 0) > 0);
  const deliveryFee = 5;

  const getImageSrc = (item) => {
    if (item.localAsset) return item.localAsset;
    if (item.image?.startsWith("http")) return item.image;
    if (item.image?.includes("cafe_matcha") || item.image?.includes("matcha")) return assets.cafeMatcha;
    if (item.image?.includes("cafe_bowl") || item.image?.includes("bowl")) return assets.cafeBowl;
    if (item.image?.includes("cafe_bake") || item.image?.includes("bake")) return assets.cafeBake;
    if (item.image) return `${url}/image/${item.image}`;
    return assets.cafeMatcha;
  };

  return (
    <div className="min-h-screen bg-[#ccd5ae] pt-28 pb-20 px-4 sm:px-8 text-[#01472e]">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation Back */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 font-inter font-bold text-xs uppercase tracking-[0.25em] text-[#01472e] hover:opacity-75 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Menu
        </Link>

        {/* Header */}
        <div className="mb-10 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] font-inter text-[#01472e]/70 block mb-1">
            - YOUR SELECTIONS
          </span>
          <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-tight text-[#01472e]">
            NOURISHMENT CART
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center bg-[#fefae0] rounded-5rem p-8 sm:p-16 border border-[#01472e]/15 shadow-forest text-center">
            <span className="text-4xl mb-4">🍃</span>
            <p className="font-anton text-2xl sm:text-3xl uppercase text-[#01472e] mb-3">
              Your Harvest Basket is Empty
            </p>
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-[#01472e]/70 max-w-md mb-8">
              Explore our ceremonial cold brews, living bowls, and wild sourdough bakes.
            </p>
            <Link
              to="/"
              className="bg-[#01472e] text-[#fefae0] px-8 py-3.5 rounded-full font-inter font-bold text-xs uppercase tracking-[0.25em] hover:bg-[#01472e]/90 transition-all shadow-forest-sm"
            >
              Explore Offerings
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-7 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#fefae0] rounded-2-5rem p-4 sm:p-5 border border-[#01472e]/10 shadow-forest-sm flex items-center gap-4 sm:gap-6"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-[#e9edc9]">
                    <img
                      src={getImageSrc(item)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[9px] font-inter font-bold uppercase tracking-[0.2em] text-[#01472e]/60">
                          {item.category}
                        </span>
                        <h3 className="font-anton text-lg sm:text-xl uppercase text-[#01472e] truncate">
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-[#01472e]/50 hover:text-red-700 p-1 cursor-pointer transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-anton text-lg text-[#01472e]">
                        ${item.price}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-[#e9edc9] rounded-full px-3 py-1 border border-[#01472e]/10">
                        <button
                          onClick={() => removeItem(item._id)}
                          className="w-5 h-5 rounded-full bg-white text-[#01472e] flex items-center justify-center text-xs shadow-sm cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-inter font-bold text-xs text-[#01472e] min-w-4 text-center">
                          {cartItem[item._id]}
                        </span>
                        <button
                          onClick={() => addItem(item._id)}
                          className="w-5 h-5 rounded-full bg-[#01472e] text-[#fefae0] flex items-center justify-center text-xs shadow-sm cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-5 bg-[#fefae0] rounded-2-5rem p-6 sm:p-8 border border-[#01472e]/15 shadow-forest">
              <h2 className="font-anton text-2xl uppercase tracking-tight text-[#01472e] pb-4 mb-6 border-b border-[#01472e]/15">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 font-inter text-xs uppercase tracking-[0.15em] text-[#01472e]/80 pb-6 border-b border-[#01472e]/15">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#01472e]">${totalProductAmount()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Botanical Courier Fee</span>
                  <span className="font-bold text-[#01472e]">${totalProductAmount() === 0 ? 0 : deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#01472e] pt-2">
                  <span>Estimated Total</span>
                  <span className="font-anton text-xl">${totalProductAmount() === 0 ? 0 : totalProductAmount() + deliveryFee}</span>
                </div>
              </div>

              {/* Promo input */}
              <div className="my-6">
                <label className="block text-[9px] font-inter font-bold uppercase tracking-[0.2em] text-[#01472e]/70 mb-2">
                  HAVE A BOTANICAL CODE?
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="ENTER PROMO"
                    className="flex-1 bg-[#e9edc9]/70 text-[#01472e] text-xs font-inter uppercase tracking-wider px-3 py-2 rounded-l-full border border-[#01472e]/20 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      if (promoCode) toast.info("Promo code applied!");
                    }}
                    className="bg-[#01472e] text-[#fefae0] px-4 py-2 rounded-r-full font-inter font-bold text-[10px] uppercase tracking-wider hover:opacity-90 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={orderNavigate}
                className="w-full bg-[#01472e] text-[#fefae0] py-4 rounded-full font-inter font-bold text-xs uppercase tracking-[0.25em] hover:bg-[#01472e]/90 transition shadow-forest-sm cursor-pointer"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
