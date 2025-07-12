import React, { useContext, } from 'react';
import { ShoppingCart } from 'lucide-react';
import { ContextStore } from '../context/contextStore';

export const Item = ({ id, name, image, price, description }) => {
  const {cartItem,addItem,removeItem ,url} = useContext(ContextStore)

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <img
        src={url + "/image/" + image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-lg tracking-tight font-semibold text-gray-800">{name}</h3>
        <p className="text-sm tracking-tighter sm:tracking-tight text-gray-600 mt-1 line-clamp-2">{description}</p>

        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-md font-bold text-indigo-600">${price}</span>

          {!cartItem[id] ? (
            <button
              onClick={() => addItem(id)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-3 sm:px-4 py-1.5 text-sm rounded-md hover:bg-indigo-700 transition"
            >
              <ShoppingCart className="w-4 h-4" />
              Add
            </button>
          ) : (
            <div className="flex p-1 bg-blue-100  rounded-3xl items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => removeItem(id)}
                className="bg-green-200 px-2 rounded-full hover:bg-gray-300 transition  text:sm sm:text-lg"
              >
                −
              </button>
              <span className="min-w-[20px] text-center font-medium">{cartItem[id]}</span>
              <button
                onClick={() => addItem(id)}
                className="bg-red-200 px-2 rounded-full hover:bg-gray-300 transition text:sm sm:text-lg"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
