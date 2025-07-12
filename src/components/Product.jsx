import React, { useContext } from 'react';
import { ContextStore } from '../context/contextStore';
import { Item } from './Item';

export const Product = ({ category }) => {
  const { itemList } = useContext(ContextStore);

  
  const filteredItems =
    category === 'All'
      ? itemList
      : itemList.filter((item) => item.category === category);

  return (
    <section id='productshow' className="px-0 sm:px-4 md:px-6 xl:px-15 pt-10 lg:pt-15 pb-15 lg:pb-25 bg-gray-100">
     
      {category === 'All' ? (
        <p className="text-center text-md sm:text-lg lg:text-2xl  text-gray-600 mb-6 px-4 pb-5 lg:pb-8">
          <span className="font-medium text-indigo-600 md:text-3xl">All Products.</span> Click on a specific category to see specific product.
        </p>
      ):(
        <p className="text-center text-md sm:text-lg lg:text-2xl text-gray-600 mb-6 px-4 pb-5 lg:pb-10">
          <span className="font-medium text-indigo-600 md:text-3xl">Click Again on Category</span> to see all the products.
        </p>
      )}

      <div className="grid mx-3 sm:mx-4 xl:mx-6 gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <Item
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>

      
      {filteredItems.length === 0 && (
        <p className="text-center text-gray-600 mt-10">
          No products found for category: <strong>{category}</strong>
        </p>
      )}
    </section>
  );
};
