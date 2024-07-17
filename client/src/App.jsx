import React from 'react'
import HeaderBanner from './components/HeaderBanner'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import PaddingWrapper from './components/PaddingWrapper'
import ProductDetails from './pages/ProductDetails'

const App = () => {
  return (
    <div className='antialiased'>
      <HeaderBanner />
      <Header />
      <Routes>
        <Route path="/" element={<PaddingWrapper><Home /></PaddingWrapper>} />
        <Route path="/product/:slug" element={<PaddingWrapper><ProductDetails /></PaddingWrapper>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App