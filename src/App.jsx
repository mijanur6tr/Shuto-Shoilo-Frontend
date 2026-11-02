import { useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer, Signin, Chatbot } from "./components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [displaySignin, setDisplaySignin] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#ccd5ae] text-[#01472e] font-inter selection:bg-[#01472e] selection:text-[#fefae0]">
      {/* Fixed SVG Fractal Noise Texture Overlay across the entire viewport (0.04 opacity) */}
      <div className="noise-overlay" />

      {/* Sign-in Modal */}
      {displaySignin && <Signin setDisplaySignin={setDisplaySignin} />}

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        theme="light"
        toastClassName="!bg-[#fefae0] !text-[#01472e] !border !border-[#01472e]/20 !font-inter !text-xs !shadow-forest"
      />

      <Navbar setDisplaySignin={setDisplaySignin} />

      <main className="w-full">
        <Outlet />
      </main>

      <Footer />

      {/* Floating Botanical Health & Inquiry Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;
