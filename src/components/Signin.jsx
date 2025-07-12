import React, { useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ContextStore } from '../context/contextStore';
import axios from "axios"
import {toast} from "react-toastify"

export const Signin = ({ setDisplaySignin }) => {
  const { url ,setToken } = useContext(ContextStore)
  const [currentStatus, setCurrentStatus] = useState("SignIn");
  const [animateIn, setAnimateIn] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(prevData => ({ ...prevData, [name]: value }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    let newUrl = url;
    if (currentStatus === "SignIn") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/signup"
    }

    const response = await axios.post(newUrl,data)

    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setDisplaySignin(false)
      if(currentStatus==="SignIn"){
        toast.success("Logged IN Successfully")
      }else{
        toast.success("Registered Successfully")
      }
      
    }else{
     toast.error(response.data.message)
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
    <div className="fixed inset-0 bg-[#b4bcc66f] bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8 relative mx-4 my-10
          transform transition-all duration-300 ease-in-out
          ${animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          {currentStatus === "SignIn" ? "Welcome Back" : "Create an Account"}
        </h2>

        <div className="space-y-4 mb-4">
          {currentStatus === "SignUp" && (
            <input
              type="text"
              placeholder="Name"
              onChange={onchangeHandler}
              name='name'
              value={data.name}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            onChange={onchangeHandler}
            name='email'
            value={data.email}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={onchangeHandler}
            name='password'
            value={data.password}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-start mb-4">
          <input type="checkbox" required className="mt-1 mr-2" />
          <p className="text-sm text-gray-600">
            Agree with the <span className="text-indigo-600 font-medium">terms and conditions</span>.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {currentStatus === "SignIn" ? "Sign In" : "Create Account"}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          {currentStatus === "SignIn" ? (
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => setCurrentStatus("SignUp")}
                className="text-indigo-600 font-medium cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setCurrentStatus("SignIn")}
                className="text-indigo-600 font-medium cursor-pointer"
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
