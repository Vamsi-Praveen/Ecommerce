import React from 'react'
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

const App = () => {
  return (
    <div className='antialiased h-screen w-full flex flex-col'>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <HeaderBanner />
            <Header />
            <div className='flex-1'>
              <PaddingWrapper>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:slug" element={<ProductDetails />} />
                  <Route path="/me/cart" element={<Cart />} />
                  <Route path="/me" element={<Profile />} />
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