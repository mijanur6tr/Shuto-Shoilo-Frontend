import React from 'react';
import { categoryList } from '../assets';

export const Category = ({ category, setCategory }) => {
  return (
    <section id="philosophy" className="py-16 sm:py-20 bg-[#ccd5ae] px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#01472e]/20 pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] font-inter text-[#01472e]/80">
              - BOTANICAL DISCIPLINES
            </span>
            <h3 className="font-anton text-4xl sm:text-6xl uppercase text-[#01472e] mt-1 tracking-tight">
              PURE PILLARS
            </h3>
          </div>
          <p className="font-inter text-xs sm:text-sm text-[#01472e]/80 max-w-md mt-4 md:mt-0 uppercase tracking-wider font-medium">
            Rooted in slow extraction, living enzymes, and heirloom grains for mindful nourishment.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryList.map((item, index) => {
            const isActive = category === item.name;
            return (
              <div
                key={index}
                onClick={() => {
                  setCategory(item.name);
                  const menuEl = document.getElementById('menu');
                  if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-[#fefae0]/80 hover:bg-[#fefae0] p-6 rounded-2-5rem border border-[#01472e]/10 shadow-forest-sm hover:shadow-forest transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-square rounded-2-5rem overflow-hidden mb-6 bg-[#e9edc9] relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#01472e] text-[#fefae0] text-xs font-inter font-bold flex items-center justify-center">
                      0{index + 1}
                    </div>
                  </div>

                  <h4 className="font-anton text-2xl uppercase text-[#01472e] mb-2">
                    {item.name}
                  </h4>
                  <p className="font-inter text-xs text-[#01472e]/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#01472e]/10 flex items-center justify-between">
                  <span className="font-inter text-[10px] font-bold uppercase tracking-[0.25em] text-[#01472e]">
                    EXPLORE
                  </span>
                  <span className="text-[#01472e] font-bold transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
