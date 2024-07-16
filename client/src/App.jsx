import React from 'react'
import HeaderBanner from './components/HeaderBanner'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='antialiased'>
      <HeaderBanner />
      <Header />
      <Footer />
    </div>
  )
}

export default App