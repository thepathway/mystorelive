//frontend/src/App.jsx < this file path


import { useState } from 'react'

// import viteLogo from '@/publice/vite.svg'
import './index.css'

import TemuClone from '@/components/TemuClone.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoryPage from '@/pages/CategoryPage'; // 👈 new file


import Login from "@/pages/Login";
import Register from "@/pages/Register";
import MyOrders from "@/pages/MyOrders";


function App() {
  const [count, setCount] = useState(0)
  return (
    <>
  
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-orders" element={<MyOrders />} />
        
        <Route path="/" element={<TemuClone />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>

    

    </>
  )
}
export default App


  