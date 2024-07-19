import { X } from 'lucide-react'
import React from 'react'

const HeaderBanner = ({ toggle }) => {
  return (
    <div className='bg-black flex items-center justify-center p-2 py-3 relative'>
      <div>
        <h1 className='text-white text-[12px] hidden md:block'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <span className='underline underline-offset-2 ml-2 cursor-pointer'>ShopNow</span></h1>
        <h1 className='text-white text-[12px] md:hidden'>Summer Sale is Live<span className='underline underline-offset-2 ml-2'>ShopNow</span></h1>
      </div>
      <div className='absolute right-5 cursor-pointer' onClick={() => toggle(false)}>
        <X className='text-white w-4 h-4' />
      </div>
    </div >
  )
}

export default HeaderBanner