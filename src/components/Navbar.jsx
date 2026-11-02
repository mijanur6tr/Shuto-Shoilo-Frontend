import React, { useContext, useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ShoppingBag, LogOut, UserCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ContextStore } from '../context/contextStore';

export const Navbar = ({ setDisplaySignin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalProductAmount, token, setToken, cartItem } = useContext(ContextStore);
  const navigate = useNavigate();
  const location = useLocation();

  // Calculate total item quantity in cart
  const cartItemCount = Object.values(cartItem || {}).reduce((acc, qty) => acc + (qty > 0 ? qty : 0), 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/#menu' },
    { name: 'Philosophy', path: '/#philosophy' },
    { name: 'Origin', path: '/#origin' },
  ];

  const handleNavClick = (path) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const target = document.getElementById(elementId);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 py-3 sm:py-5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo in bold uppercase with hyphen prefix */}
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Center: Pill-shaped navigation bar with blur(20px) and semi-transparent bg */}
        <nav 
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.18)',
            borderColor: 'rgba(1, 71, 46, 0.12)'
          }}
          className="hidden md:flex items-center gap-7 px-8 py-2.5 rounded-full border shadow-forest-sm transition-all duration-300"
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className="text-[#01472e] font-inter font-bold text-[10px] uppercase tracking-[0.25em] hover:opacity-70 transition-opacity cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right: Cart Button in White Pill with Numeric Badge & Account */}
        <div className="flex items-center gap-3">
          
          <Link
            to="/cart"
            className="flex items-center gap-2.5 bg-white text-[#01472e] px-4 py-2 rounded-full shadow-forest-sm hover:scale-105 transition-all duration-300 border border-[#01472e]/10 group"
          >
            <span className="font-inter font-bold text-[10px] uppercase tracking-[0.2em] hidden sm:inline">
              Cart
            </span>
            <div className="w-5 h-5 rounded-full bg-[#01472e] text-[#ccd5ae] flex items-center justify-center text-[10px] font-bold font-inter">
              {cartItemCount}
            </div>
          </Link>

          {!token ? (
            <button
              onClick={() => setDisplaySignin(true)}
              className="bg-[#01472e] text-[#fefae0] font-inter font-bold text-[10px] uppercase tracking-[0.25em] px-4 py-2.5 rounded-full hover:bg-[#01472e]/90 transition-all duration-300 shadow-forest-sm cursor-pointer"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpenDropdown((prev) => !prev)}
                className="w-9 h-9 rounded-full bg-white text-[#01472e] flex items-center justify-center border border-[#01472e]/15 shadow-sm hover:scale-105 transition-transform cursor-pointer"
              >
                <UserCircle className="w-5 h-5 text-[#01472e]" />
              </button>

              {openDropdown && (
                <div className="absolute right-0 mt-3 w-44 bg-[#fefae0] border border-[#01472e]/20 rounded-2xl shadow-forest p-2 z-50">
                  <button
                    onClick={() => {
                      setOpenDropdown(false);
                      navigate("/my-order");
                    }}
                    className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#ccd5ae]/40 text-[#01472e] text-xs font-inter font-semibold uppercase tracking-wider transition cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Orders
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-red-50 text-red-700 text-xs font-inter font-semibold uppercase tracking-wider transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full bg-white/80 backdrop-blur-md text-[#01472e] border border-[#01472e]/10 shadow-sm"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div 
          style={{
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            backgroundColor: 'rgba(254, 250, 224, 0.95)'
          }}
          className="md:hidden fixed top-20 right-4 left-4 p-6 rounded-3rem border border-[#01472e]/15 shadow-forest z-50 flex flex-col gap-4 animate-reveal"
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className="text-left text-[#01472e] font-inter font-bold text-xs uppercase tracking-[0.25em] py-2 border-b border-[#01472e]/10"
            >
              {link.name}
            </button>
          ))}
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="text-left text-[#01472e] font-inter font-bold text-xs uppercase tracking-[0.25em] py-2 border-b border-[#01472e]/10"
          >
            View Cart ({cartItemCount})
          </Link>
        </div>
      )}
    </header>
  );
};
