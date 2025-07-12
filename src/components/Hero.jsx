import React from 'react';
import assets from '../assets';

export const Hero = () => {
  return (
    <section className="relative h-[65vh] md:h-screen overflow-hidden">
     
      <img
        src={assets.hero}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      
      <div className="absolute inset-0 bg-black/50 bg-opacity-50" />

      
      <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold py-5  text-white mb-6">
            Experience The <span className='text-cyan-500'>Elegance</span>
          </h1>
          <p className="text-gray-100 text-lg tracking-tight md:text-xl mb-8">
            Catch yourself up in the beauty of a sky full of stars—each twinkle can have a story and each knot a wish. It is not an ordinary bow; it is the midnight dream you can dress up in.
          </p>
          <a  href='#productshow' className="bg-gradient-to-r from-purple-600 to-cyan-600 font-medium tracking-tight text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            Explore Products
          </a>
        </div>
      </div>
    </section>
  );
};
