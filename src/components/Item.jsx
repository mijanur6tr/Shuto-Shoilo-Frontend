import React, { useContext } from 'react';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { ContextStore } from '../context/contextStore';
import assets from '../assets';

export const Item = ({ id, _id, name, image, localAsset, price, description, category }) => {
  const { cartItem, addItem, removeItem, url } = useContext(ContextStore);
  const itemId = id || _id;
  const currentQuantity = cartItem[itemId] || 0;

  // Resolve image source gracefully
  const getImageSrc = () => {
    if (localAsset) return localAsset;
    if (image?.startsWith("http")) return image;
    if (image?.includes("cafe_matcha") || image?.includes("matcha")) return assets.cafeMatcha;
    if (image?.includes("cafe_bowl") || image?.includes("bowl")) return assets.cafeBowl;
    if (image?.includes("cafe_bake") || image?.includes("bake")) return assets.cafeBake;
    if (image) return `${url}/image/${image}`;
    return assets.cafeMatcha;
  };

  return (
    <div className="group relative flex flex-col bg-[#fefae0] rounded-2-5rem p-4 sm:p-5 shadow-forest-sm hover:shadow-forest transition-all duration-700 select-none border border-[#01472e]/10">
      
      {/* 4/5 Aspect Ratio Image Container with 2.5rem radius */}
      <div className="relative w-full aspect-[4/5] rounded-2-5rem overflow-hidden bg-[#e9edc9]/50">
        
        {/* Scaled Product Image on Hover (1.1x) */}
        <img
          src={getImageSrc()}
          alt={name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = assets.cafeMatcha;
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />

        {/* Category Pill Badge on top-left of image */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#fefae0]/90 backdrop-blur-md text-[#01472e] text-[9px] font-inter font-bold tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full shadow-sm border border-[#01472e]/10">
            {category}
          </span>
        </div>

        {/* Current quantity indicator if > 0 */}
        {currentQuantity > 0 && (
          <div className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-[#01472e] text-[#fefae0] flex items-center justify-center text-xs font-bold font-inter shadow-md">
            {currentQuantity}
          </div>
        )}

        {/* Blur-Reveal Hover Overlay & Quick Add Button */}
        <div 
          style={{
            background: 'rgba(1, 71, 46, 0.35)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)'
          }}
          className="absolute inset-0 flex flex-col items-center justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 pointer-events-none group-hover:pointer-events-auto"
        >
          {/* Inner Button translates up 32px (translate-y-8 -> translate-y-0) */}
          <button
            onClick={() => addItem(itemId)}
            className="w-full bg-white text-[#01472e] font-inter font-bold text-xs uppercase tracking-[0.3em] py-3.5 px-6 rounded-full shadow-forest transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#fefae0] cursor-pointer flex items-center justify-center gap-2"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="flex flex-col justify-between flex-grow pt-4 sm:pt-5 px-1">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <h3 className="font-anton text-xl sm:text-2xl text-[#01472e] tracking-tight line-clamp-1 uppercase">
              {name}
            </h3>
            <span className="font-anton text-lg sm:text-xl text-[#01472e] tracking-wide shrink-0">
              ${price}
            </span>
          </div>

          <p className="font-inter text-xs text-[#01472e]/75 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Counter Action Controls if added */}
        {currentQuantity > 0 && (
          <div className="mt-4 flex items-center justify-between bg-[#ccd5ae]/40 rounded-full px-3 py-1.5 border border-[#01472e]/10">
            <span className="text-[10px] font-inter font-bold tracking-[0.2em] uppercase text-[#01472e]">
              In Cart
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeItem(itemId)}
                className="w-6 h-6 rounded-full bg-white text-[#01472e] flex items-center justify-center shadow-sm hover:bg-red-50 text-xs cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-inter font-bold text-xs text-[#01472e] min-w-4 text-center">
                {currentQuantity}
              </span>
              <button
                onClick={() => addItem(itemId)}
                className="w-6 h-6 rounded-full bg-[#01472e] text-[#fefae0] flex items-center justify-center shadow-sm hover:opacity-90 text-xs cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
