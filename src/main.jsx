import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import { Home } from "./pages/Home.jsx"
import { Order } from "./pages/Order.jsx"
import { Cart } from "./pages/Cart.jsx"
import { Contacts } from './pages/Contacts.jsx'
import { Session } from "./pages/Session.jsx"
import { MyOrder } from './pages/MyOrder.jsx'
import { Shoilo } from './pages/Shoilo.jsx'
import { Bangle } from './pages/Bangle.jsx'
import { Ring } from './pages/Ring.jsx'
import { Bookmark } from './pages/Bookmark.jsx'


import ContextStoreProvider from './context/contextStore.jsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/shoilo",
        element: <Shoilo />,
      },
      {
        path: "/bangle",
        element: <Bangle />,
      },
      {
        path: "/ring",
        element: <Ring />,
      },
      {
        path: "/bookmark",
        element: <Bookmark />,
      },
      {
        path: "/session",
        element: <Session />,
      },
      {
        path: "/my-order",
        element: <MyOrder />
      },
     
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextStoreProvider>
      <RouterProvider router={router} />
    </ContextStoreProvider>
  </StrictMode>,
)
