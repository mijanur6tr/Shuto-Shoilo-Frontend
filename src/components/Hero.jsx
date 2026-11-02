import React, { useEffect, useState } from 'react';
import assets from '../assets';

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const titleText = "BOTANICAL";
  const letters = titleText.split("");

  return (
    <section 
      id="hero"
      className="relative min-h-[100svh] sm:min-h-screen w-full bg-[#ccd5ae] text-[#01472e] flex flex-col justify-between pt-20 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-8 md:px-12 overflow-hidden select-none"
    >

      {/* Centerpiece: Massive 23vw Anton Display Typography with Floating Organic Cards */}
      <div className="relative w-full my-auto flex flex-col items-center justify-center py-8 sm:py-10">
        
        {/* Floating Organic Card 1: Top Right */}
        <div 
          style={{
            transform: `translateY(${scrollY * -0.05}px)`,
            transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="absolute -top-2 right-0 sm:-top-6 sm:right-12 md:right-24 z-20 pointer-events-none"
        >
          <div className="w-20 sm:w-44 md:w-56 aspect-square rounded-3rem overflow-hidden shadow-forest border-4 border-[#ccd5ae] animate-float">
            <img 
              src={assets.cafeMatcha} 
              alt="Cold Brew Botanicals" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Floating Organic Card 2: Mid-Left */}
        <div 
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
            transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="absolute bottom-2 left-0 sm:bottom-6 sm:left-8 md:left-16 z-20 pointer-events-none"
        >
          <div className="w-24 sm:w-48 md:w-60 aspect-square rounded-3rem overflow-hidden shadow-forest border-4 border-[#ccd5ae] animate-float-delayed">
            <img 
              src={assets.cafeBowl} 
              alt="Superfood Bowl" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Floating Organic Card 3: Far Bottom Right */}
        <div 
          style={{
            transform: `translateY(${scrollY * 0.04}px)`,
            transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="hidden lg:block absolute -bottom-10 right-48 z-10 pointer-events-none"
        >
          <div className="w-40 aspect-square rounded-3rem overflow-hidden shadow-forest border-4 border-[#ccd5ae] animate-float-slow">
            <img 
              src={assets.cafeBake} 
              alt="Wild Sourdough" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* The Massive 23vw Anton Display Heading with Staggered Letter Reveal */}
        <div className="relative z-10 w-full text-center overflow-hidden leading-[0.75]">
          <h1 
            style={{
              lineHeight: 0.75,
              letterSpacing: '-0.05em',
            }}
            className="font-anton text-[18vw] sm:text-[23vw] uppercase text-[#01472e] flex justify-center items-center m-0 p-0 select-none tracking-[-0.05em]"
          >
            {letters.map((letter, index) => (
              <span
                key={index}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
                className="inline-block animate-reveal transform"
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Editorial Sub-banner inside Hero */}
        <div className="relative z-20 mt-5 sm:mt-6 px-16 sm:px-0 flex items-center justify-center gap-4 text-center">
        
          <span className="font-inter font-bold text-[10px] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#01472e]">
            Earthy Editorial Cafe & Nourishment
          </span>
          
        </div>
      </div>

      {/* Bottom: Dual-column descriptive text and location/origin labels */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-end border-t border-[#01472e]/20 pt-5 sm:pt-8 relative z-20">
        
        {/* Left Column: Descriptive text */}
        <div className="md:col-span-7">
          <p className="font-inter text-xs sm:text-base leading-relaxed text-[#01472e] font-normal max-w-xl">
            A sensorial haven balancing the vitality of raw unrefined flora and mindful artisan craft. 
            From single-origin cold drops to live spirulina elixirs and slow fermented hearth breads, 
            every offering is curated for cellular balance and untamed flavor.
          </p>
        </div>

        {/* Right Column: Origin, Hours & Quick Action */}
        <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between items-start sm:items-end md:items-start lg:items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-inter font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#01472e]">
          <div>
            <p className="text-[10px] text-[#01472e]/70 mb-1">LOCATION & HOURS</p>
            <p>EST. 2024 / DHAKA CITY</p>
            <p className="text-[#01472e]/80">08:00 — 22:00 DAILY</p>
          </div>

          <a
            href="#menu"
            className="inline-flex items-center gap-2 bg-[#01472e] text-[#fefae0] px-5 sm:px-6 py-3 rounded-full hover:bg-[#01472e]/90 transition-all duration-300 shadow-forest-sm group cursor-pointer"
          >
            <span className="font-inter text-[10px] lg:text-[14px] font-bold tracking-[0.3em] uppercase">
              EXPLORE MENU
            </span>
            <span className="transform group-hover:translate-x-1 transition-transform">↓</span>
          </a>
        </div>
      </div>

    </section>
  );
};
