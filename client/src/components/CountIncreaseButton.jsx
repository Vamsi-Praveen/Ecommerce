import React from 'react'
import { Button } from './ui/button'

const CountIncreaseButton = () => {
    return (
        <div className='my-3 flex items-center'>
            <Button variant="ghost" className="rounded-sm rounded-tr-none rounded-br-none hover:bg-primaryRed hover:text-white transition text-xl border">-</Button>
            <p className='px-3.5 border-y text-[17px] py-1 pointer-events-none'>0</p>
            <Button variant="ghost" className="rounded-sm rounded-tl-none rounded-bl-none hover:bg-primaryRed hover:text-white transition text-xl border">+</Button>
        </div>
    )
}

export default CountIncreaseButton