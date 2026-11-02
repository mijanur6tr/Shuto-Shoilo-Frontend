import React from 'react';
import assets from "../assets";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      <div className="flex flex-col">
        <span className="font-anton text-lg sm:text-xl tracking-wider text-[#01472e] leading-none">
          SHUTO SHOILI
        </span>
        <span className="font-inter text-[8px] font-bold tracking-[0.3em] uppercase text-[#01472e]/70 mt-0.5">
          Botanical Cafe
        </span>
      </div>
    </div>
  );
};
