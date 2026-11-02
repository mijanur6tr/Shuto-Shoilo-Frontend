import React, { useContext, useState } from 'react';
import { ContextStore } from '../context/contextStore';
import { Item } from './Item';
import { categoryList } from '../assets';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Product = ({ category: propCategory, setCategory: propSetCategory }) => {
  const { itemList, loading, categories: storeCategories } = useContext(ContextStore);
  const [internalCategory, setInternalCategory] = useState("All");

  const selectedCategory = propCategory !== undefined ? propCategory : internalCategory;
  const setSelectedCategory = propSetCategory || setInternalCategory;

  // Dynamic category pills from database categories or active items
  const dynamicCategoryNames = storeCategories && storeCategories.length > 0
    ? storeCategories.map(c => typeof c === 'string' ? c : c.name)
    : Array.from(new Set(itemList.map(item => item.category).filter(Boolean)));

  const categories = [
    "All",
    ...Array.from(new Set(dynamicCategoryNames.length > 0 ? dynamicCategoryNames : [
      "Artisan Brews & Teas",
      "Superfood Bowls",
      "Sourdough & Bakes",
      "Botanical Tonics"
    ]))
  ];

  const filteredItems = selectedCategory === "All"
    ? itemList
    : itemList.filter(item => {
        if (!item.category) return false;
        if (item.category === selectedCategory) return true;
        // Loose matching for convenience
        if (selectedCategory.includes("Brews") && item.category.includes("Brews")) return true;
        if (selectedCategory.includes("Bowls") && item.category.includes("Bowls")) return true;
        if (selectedCategory.includes("Bakes") && item.category.includes("Bakes")) return true;
        if (selectedCategory.includes("Tonics") && item.category.includes("Tonics")) return true;
        return false;
      });

  return (
    <section 
      id="menu"
      className="relative w-full bg-[#e9edc9] rounded-t-5rem pt-20 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-8 md:px-12 -mt-16 z-30"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section: Massive 15vw Anton Heading paired with Large Circular CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#01472e]/20">
          
          <div className="overflow-hidden">
            <div className="text-[11px] font-bold uppercase tracking-[0.35em] font-inter text-[#01472e]/80 mb-2">
              - FRESH BOTANICAL HARVEST
            </div>
            <h2 
              style={{
                fontSize: 'clamp(3rem, 15vw, 12rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.04em'
              }}
              className="font-anton uppercase text-[#01472e] m-0 p-0 tracking-[-0.04em]"
            >
              OUR MENU
            </h2>
          </div>

          {/* Large Circular CTA Button */}
          <Link
            to="/cart"
            className="group self-start lg:self-end w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#01472e] text-[#fefae0] flex flex-col items-center justify-center p-3 text-center shadow-forest hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 border border-[#fefae0]/20 cursor-pointer"
          >
            <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <span className="font-inter text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase mt-1 leading-tight">
              ORDER CART
            </span>
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="py-10 flex flex-wrap items-center gap-3 sm:gap-4 overflow-x-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full text-xs font-inter font-bold uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'bg-[#01472e] text-[#fefae0] border-[#01472e] shadow-forest-sm scale-105'
                    : 'bg-[#fefae0]/80 text-[#01472e] border-[#01472e]/20 hover:bg-[#fefae0]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Grid: 3-column layout */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[40vh] text-center font-inter uppercase tracking-[0.3em] text-[#01472e] font-bold">
            Preparing Botanical Menu...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
            {filteredItems.map((item) => (
              <Item
                key={item._id}
                id={item._id}
                _id={item._id}
                name={item.name}
                image={item.image}
                localAsset={item.localAsset}
                price={item.price}
                description={item.description}
                category={item.category}
              />
            ))}
          </div>
        )}

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="font-anton text-3xl uppercase text-[#01472e] mb-2">No Items in this Harvest</p>
            <p className="font-inter text-xs uppercase tracking-widest text-[#01472e]/70">
              Please choose another botanical category above.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
