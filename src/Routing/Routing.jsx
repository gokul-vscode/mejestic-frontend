import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from '../../src/Navbar/Navbar'
import Footer from '../Footer/Footer'
import Homepage from '../Pages/Homepage'
import Login from '../Login/Login'
import ViewProduct from '../Components/Home/ViewProducts/ViewProducts'
import CartPage from '../Components/Home/CartPage/CartPage'
import CheckoutPage from '../Components/Home/CheckoutPage/CheckoutPage'
const Routing = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path="/viewproduct/:id" element={<ViewProduct/>}/>
        <Route path='/cart'element={<CartPage/>}/>
        <Route path='/checkout'element={<CheckoutPage/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default Routing