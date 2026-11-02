import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ArrowRight } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to the Shuto-Shoili Botanical Dispatch!");
    setEmail('');
  };

  return (
    <footer 
      id="origin" 
      className="relative w-full bg-[#01472e] text-[#ccd5ae] pt-24 pb-12 px-4 sm:px-8 md:px-12 select-none"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-[#ccd5ae]/20">
          
          {/* Left 6 Columns: Large newsletter signup with uppercase underline-only input */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] font-inter text-[#ccd5ae]/70 block mb-3">
                - DISPATCH & ARCHIVE
              </span>
              <h3 className="font-anton text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#fefae0] leading-[0.95] mb-6">
                STAY ROOTED IN LIVING BOTANICALS.
              </h3>
              <p className="font-inter text-xs sm:text-sm text-[#ccd5ae]/80 max-w-md leading-relaxed mb-8">
                Receive seasonal forage dispatches, cellular health essays, and private tasting invitations directly to your inbox.
              </p>
            </div>

            {/* Uppercase underline-only input field */}
            <form onSubmit={handleNewsletter} className="relative w-full max-w-md">
              <div className="flex items-center border-b-2 border-[#ccd5ae] pb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  required
                  className="w-full bg-transparent text-[#fefae0] placeholder-[#ccd5ae]/50 text-xs sm:text-sm font-inter uppercase tracking-[0.25em] focus:outline-none"
                />
                <button
                  type="submit"
                  className="text-[#fefae0] hover:text-[#ccd5ae] p-2 transition-transform transform hover:translate-x-1 cursor-pointer shrink-0"
                >
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
              <span className="block text-[9px] font-inter uppercase tracking-[0.2em] text-[#ccd5ae]/60 mt-3">
                BY SUBSCRIBING YOU AGREE TO OUR MINDFUL LIVING PRIVACY POLICY.
              </span>
            </form>
          </div>

          {/* Right 6 Columns: Two columns of links using bold tracked-out 11px uppercase text */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 pt-4 md:pt-0">
            
            {/* Column 1: Offerings & Pillars */}
            <div>
              <h4 className="font-inter font-bold text-[11px] uppercase tracking-[0.35em] text-[#fefae0] mb-6 pb-2 border-b border-[#ccd5ae]/20">
                BOTANICAL DISCIPLINE
              </h4>
              <ul className="space-y-4 font-inter font-bold text-[11px] uppercase tracking-[0.25em] text-[#ccd5ae]">
                <li>
                  <a href="#menu" className="hover:text-[#fefae0] transition-colors block">
                    Cold-Drip Extractions
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#fefae0] transition-colors block">
                    Ceremonial Matcha
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#fefae0] transition-colors block">
                    Live Superfood Bowls
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#fefae0] transition-colors block">
                    Wild-Fermented Hearth
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#fefae0] transition-colors block">
                    Adaptogenic Tonics
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Sanctuary & Origin */}
            <div>
              <h4 className="font-inter font-bold text-[11px] uppercase tracking-[0.35em] text-[#fefae0] mb-6 pb-2 border-b border-[#ccd5ae]/20">
                SANCTUARY & HOURS
              </h4>
              <ul className="space-y-4 font-inter font-bold text-[11px] uppercase tracking-[0.25em] text-[#ccd5ae]">
                <li className="text-[#ccd5ae]/90">
                  FLAGSHIP: DHAKA, BD
                </li>
                <li className="text-[#ccd5ae]/90">
                  08:00 AM — 10:00 PM
                </li>
                <li>
                  <a href="tel:+8801234567890" className="hover:text-[#fefae0] transition-colors block">
                    TEL: +880 1234-567890
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@shuto-shoili.com" className="hover:text-[#fefae0] transition-colors block">
                    HELLO@SHUTO-SHOILI.COM
                  </a>
                </li>
                <li>
                  <span className="text-[#ccd5ae]/70">
                    100% ORGANIC CERTIFIED
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section: Copyright & Legal links with 30% opacity */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-inter text-[10px] uppercase tracking-[0.25em] text-[#ccd5ae]/30">
          <div>
            © {new Date().getFullYear()} SHUTO-SHOILI BOTANICAL CAFE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#ccd5ae] transition-colors cursor-pointer">
              PRIVACY POLICY
            </span>
            <span>•</span>
            <span className="hover:text-[#ccd5ae] transition-colors cursor-pointer">
              TERMS OF SERVICE
            </span>
            <span>•</span>
            <span className="hover:text-[#ccd5ae] transition-colors cursor-pointer">
              SOURCING CODEX
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
