import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Navbar, Footer, Signin } from "./components"
import { ToastContainer, toast } from 'react-toastify';


function App() {
  const [count, setCount] = useState(0)
  const [displaySignin, setDisplaySignin] = useState(false)

  return (
    <>

      {displaySignin ? <Signin setDisplaySignin={setDisplaySignin} /> : <div></div>}
      <div>
        <ToastContainer />
        <Navbar setDisplaySignin={setDisplaySignin} />
        <Outlet />
        <Footer />
      </div>
      
    </>
  )
}

export default App
