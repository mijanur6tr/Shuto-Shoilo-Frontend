import React from 'react';
import { categoryList } from '../assets';

export const Category = ({ category, setCategory }) => {
  return (
    <section className="py-10  bg-white">
      <div className="max-w-7xl  px-4 sm:px-7 md:px-15 lg:px-20 xl:px-25">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-700 pb-10">
          Product Category
        </h2>

        <div className="overflow-x-auto">
          <div className="flex flex-nowrap gap-4  sm:gap-10">
            {categoryList.map((item, index) => {
              const isActive = category === item.name;

              return (
                <div
                  key={index}
                  onClick={() =>
                    setCategory((prev) => (prev === item.name ? 'All' : item.name))
                  }
                  className="text-center flex-shrink-0 cursor-pointer transition-all duration-300"
                >
                
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mx-auto rounded-full object-cover shadow-md border-4 transition-all duration-300 ${
                      isActive ? 'border-cyan-300' : 'border-transparent'
                    }`}
                  />

                 
                  <p className={`mt-2 font-bold text-sm tracking-tight sm:text-base md:text-md lg:text-lg  relative ${
                      isActive ? 'text-cyan-500' : 'text-gray-700'
                    }`}>
                    {item.name}

                    
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
