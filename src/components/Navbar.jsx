import React, { useContext, useState } from 'react';
import { Logo } from './Logo';
import { Menu, X, ShoppingCart, LogOut, UserCircle, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContextStore } from '../context/contextStore';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ setDisplaySignin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { totalProductAmount, token, setToken } = useContext(ContextStore)
  const cartAmount = totalProductAmount();
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("")
    navigate("/")
  };

  const handleOrder = () => {
    navigate("/my-order")
  }

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="  mx-auto px-2 sm:px-4 md:px-8 xl:px-18 py-2 flex items-center justify-between">

        <Link to="/">
          <div className="flex items-center">
            <Logo />
          </div>
        </Link>



        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <Link to='/' className="hover:text-indigo-600 text-lg transition">Home</Link>
          <Link to="/shoilo" className="hover:text-indigo-600 text-lg transition">Shoilo</Link>
          <Link to="/bangle" className="hover:text-indigo-600 text-lg transition">Bangles</Link>
          <Link to="/ring" className="hover:text-indigo-600 text-lg transition">Rings</Link>
          <Link to="/bookmark" className="hover:text-indigo-600 text-lg transition">Bookmarks</Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 hover:text-indigo-600 cursor-pointer" />

            {cartAmount > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3  bg-blue-500 rounded-full border-2 border-white" />
            )}
          </Link>

          {!token ? (<button
            onClick={() => setDisplaySignin(true)}
            className="bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition"
          >
            Sign In
          </button>)
            :
            (
              <div className="relative inline-block">
                {/* Profile Icon */}
                <UserCircle
                  className="w-8 h-8 text-gray-700 cursor-pointer"
                  onClick={() => setOpenDropdown((prev) => !prev)}
                />

                {/* Dropdown */}
                {openDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-10 animate-fadeSlide">
                    <div className="p-2 space-y-1">
                      {/* Orders */}
                      <div
                        onClick={() => {
                          setOpenDropdown(false);
                          setTimeout(() => {
                            navigate("/my-order");
                          }, 100);
                        }}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-800">Orders</span>
                      </div>


                      {/* Logout */}
                      <div
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-red-100 transition cursor-pointer"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-600">Logout</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          }


        </div>


        <div className="md:hidden flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 hover:text-indigo-600 cursor-pointer" />

            {cartAmount > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3  bg-blue-500 rounded-full border-2 border-white" />
            )}
          </Link>

          {!token ? (<button onClick={() => setDisplaySignin(true)} className="bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition text-sm">
            Sign In
          </button>) :
            (
              <div className="relative inline-block">
                {/* Profile Icon */}
                <UserCircle
                  className="w-8 h-8 text-gray-700 cursor-pointer"
                  onClick={() => setOpenDropdown((prev) => !prev)}
                />

                {/* Dropdown */}
                {openDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-10 animate-fadeSlide">
                    <div className="p-2 space-y-1">
                      {/* Orders */}
                      <div
                        onClick={() => {
                          navigate("/my-order");
                          setOpenDropdown(false)
                        }}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition cursor-pointer">
                        <ShoppingBag className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-800">Orders</span>
                      </div>

                      {/* Logout */}
                      <div
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-red-100 transition cursor-pointer"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-600">Logout</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          }


          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <></> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>


      {isOpen && (
        <div className="md:hidden fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6 space-y-4 transform transition-transform duration-300 translate-x-0">
            <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
      >
        <X className="w-6 h-6" />
      </button>
          <Link to='/' onClick={()=>isOpen(false)} className="block text-gray-700 hover:text-indigo-600">Home</Link>
          <Link to="/shoilo" onClick={()=>isOpen(false)} className="block text-gray-700 hover:text-indigo-600 scroll-smooth">Shoilo</Link>
          <Link to="/bangle" onClick={()=>isOpen(false)} className="block text-gray-700 hover:text-indigo-600 scroll-smooth">Bangles</Link>
          <Link to="/rings" onClick={()=>isOpen(false)} className="block text-gray-700 hover:text-indigo-600">Rings</Link>
          <Link to="/bookmark" onClick={()=>isOpen(false)} className="block text-gray-700 hover:text-indigo-600">Bookmarks</Link>
        </div>
      )}
    </nav>
  );
};
