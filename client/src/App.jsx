import React, { useState } from 'react'
import HeaderBanner from './components/HeaderBanner'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import PaddingWrapper from './components/PaddingWrapper'
import ProductDetails from './pages/ProductDetails'
import Error404 from './pages/Error404'
import AuthProvider from './context/AuthContext'
import CartProvider from './context/CartContext'
import WishlistProvider from './context/WishlistContext'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectWrapper from './components/auth/ProtectWrapper'

const App = () => {
  const [isBannerOpen, setIsBannerOpen] = useState(true)
  return (
    <div className='antialiased h-screen w-full flex flex-col'>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {isBannerOpen && <HeaderBanner toggle={setIsBannerOpen} />}
            <Header />
            <div className='flex-1'>
              <PaddingWrapper>
                <Routes>
                  <Route path='/auth/login' element={<Login />} />
                  <Route path='/auth/register' element={<Register />} />
                  <Route path="/" index element={<Home />} />
                  <Route path="/product/:slug" element={<ProductDetails />} />
                  <Route element={<ProtectWrapper />}>
                    <Route path="/me/cart" element={<Cart />} />
                    <Route path="/me" element={<Profile />} />
                  </Route>
                  <Route path="*" element={<Error404 />} />

                </Routes>
              </PaddingWrapper>
            </div>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  )
}

export default App