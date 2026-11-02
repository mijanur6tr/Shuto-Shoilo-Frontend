import React, { useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ContextStore } from '../context/contextStore';
import axios from "axios";
import { toast } from "react-toastify";

export const Signin = ({ setDisplaySignin }) => {
  const { url, setToken } = useContext(ContextStore);
  const [currentStatus, setCurrentStatus] = useState("SignIn");
  const [animateIn, setAnimateIn] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newUrl = url;
    if (currentStatus === "SignIn") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/signup";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setDisplaySignin(false);
        if (currentStatus === "SignIn") {
          toast.success("Welcome back to Shuto-Shoili!");
        } else {
          toast.success("Account created successfully!");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication error");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setAnimateIn(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    setAnimateIn(false);
    setTimeout(() => setDisplaySignin(false), 200);
  };

  return (
    <div 
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(1, 71, 46, 0.45)'
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md bg-[#fefae0] rounded-2-5rem p-8 sm:p-10 relative border border-[#01472e]/20 shadow-forest text-[#01472e] transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          animateIn ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-[#01472e]/60 hover:text-[#01472e] transition cursor-pointer p-1 rounded-full hover:bg-[#ccd5ae]/40"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] font-inter text-[#01472e]/70 block mb-1">
            - BOTANICAL SANCTUARY
          </span>
          <h2 className="font-anton text-3xl uppercase tracking-tight text-[#01472e]">
            {currentStatus === "SignIn" ? "WELCOME BACK" : "JOIN THE CIRCLE"}
          </h2>
        </div>

        <div className="space-y-3.5 mb-6">
          {currentStatus === "SignUp" && (
            <div>
              <label className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-[#01472e]/80 mb-1">
                NAME
              </label>
              <input
                type="text"
                placeholder="Full name"
                onChange={onchangeHandler}
                name="name"
                value={data.name}
                required
                className="w-full bg-[#e9edc9]/60 px-4 py-3 rounded-full border border-[#01472e]/20 text-xs font-inter text-[#01472e] focus:outline-none focus:border-[#01472e]"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-[#01472e]/80 mb-1">
              EMAIL
            </label>
            <input
              type="email"
              placeholder="eleanor@botanical.com"
              onChange={onchangeHandler}
              name="email"
              value={data.email}
              required
              className="w-full bg-[#e9edc9]/60 px-4 py-3 rounded-full border border-[#01472e]/20 text-xs font-inter text-[#01472e] focus:outline-none focus:border-[#01472e]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-[#01472e]/80 mb-1">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={onchangeHandler}
              name="password"
              value={data.password}
              required
              className="w-full bg-[#e9edc9]/60 px-4 py-3 rounded-full border border-[#01472e]/20 text-xs font-inter text-[#01472e] focus:outline-none focus:border-[#01472e]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 text-xs text-[#01472e]/80 font-inter">
          <input type="checkbox" required className="accent-[#01472e] rounded" />
          <span>I agree to the mindful living terms & privacy codex.</span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#01472e] text-[#fefae0] py-3.5 rounded-full font-inter font-bold text-xs uppercase tracking-[0.25em] hover:bg-[#01472e]/90 transition shadow-forest-sm cursor-pointer"
        >
          {currentStatus === "SignIn" ? "ENTER SANCTUARY" : "CREATE MEMBERSHIP"}
        </button>

        <div className="mt-6 text-center text-xs font-inter text-[#01472e]/80">
          {currentStatus === "SignIn" ? (
            <p>
              New to Shuto-Shoili?{" "}
              <span
                onClick={() => setCurrentStatus("SignUp")}
                className="font-bold underline cursor-pointer text-[#01472e]"
              >
                Create Account
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setCurrentStatus("SignIn")}
                className="font-bold underline cursor-pointer text-[#01472e]"
              >
                Sign In
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
