import React, { useContext } from 'react';
import { Item } from '../components';
import { ContextStore } from '../context/contextStore';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const Bangle = () => {
  const { itemList } = useContext(ContextStore);
  const selectedItemList = itemList.filter((item) => 
    item.category?.includes("Bowls") || item.category === "Superfood Bowls"
  );

  return (
    <div className="min-h-screen bg-[#ccd5ae] pt-28 pb-20 px-4 sm:px-8 text-[#01472e]">
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 font-inter font-bold text-xs uppercase tracking-[0.25em] text-[#01472e] hover:opacity-75 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Menu
        </Link>

        <div className="mb-12 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] font-inter text-[#01472e]/70 block mb-1">
            - DISCIPLINE 02
          </span>
          <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-tight text-[#01472e]">
            SUPERFOOD BOWLS
          </h1>
          <p className="font-inter text-xs uppercase tracking-[0.2em] text-[#01472e]/80 max-w-md mx-auto mt-2">
            Live spirulina, wild acai, sprouted seeds, and nutrient-dense living nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedItemList.map((item) => (
            <Item key={item._id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};
