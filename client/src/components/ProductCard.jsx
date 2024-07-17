import React, { useState } from 'react'
import Bag from "@/assets/images/bag.png"
import { Button } from './ui/button'
import { icons } from '@/assets'
import { Link, useNavigate } from 'react-router-dom'

const ProductCard = ({ title, rating, image, price, slug }) => {

    const navigate = useNavigate()

    const handleCartAdd = async (e) => {
        alert('Cart Item added  ')
    }

    return (
        <div className='bg-[#F5F5F5] w-[250px] rounded-[2px] cursor-pointer border border-slate-100'>
            <div className='relative group'>
                <div className='flex items-center justify-center relative overflow-clip w-full h-[250px]'>
                    <img src={image} className='w-full h-full object-cover group-hover:scale-110 transition-all' />
                    <div className='absolute bg-white rounded-full p-1 cursor-pointer right-3 top-3 z-10'>
                        <img alt='wishlist' src={icons.favorite} />
                    </div>
                    <div className='absolute bg-white rounded-full p-1 cursor-pointer right-3 top-[50px] z-10' onClick={() => navigate(`product/${slug}`)}>
                        <img alt='view' src={icons.view} />
                    </div>
                </div>
                <div className='absolute bottom-0 right-0 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                    <Button className="rounded-none w-full" onClick={handleCartAdd}>Add to cart</Button>
                </div>
            </div>
            <div className='flex flex-col p-3 bg-white'>
                <h2 className='font-medium text-sm line-clamp-2'>{title}</h2>
                <div className='flex items-center gap-2'><span className='text-primaryRed font-semibold mt-1 text-sm'>₹{price}</span>
                    <div className='flex'>
                        {Array(5).fill(false).map((_, i) => {
                            return <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={`${rating > i ? '#FFAD33' : '#F5F5F5'}`} xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.8284 9.93621C20.4517 9.93621 20.7176 10.7286 20.2205 11.1046L16.8905 13.6234C16.1688 14.1693 15.8661 15.1087 16.1334 15.9732L17.3864 20.0261C17.5735 20.6312 16.8729 21.1193 16.3701 20.7341L13.3075 18.3879C12.536 17.7969 11.464 17.7969 10.6925 18.3879L7.61357 20.7466C7.11152 21.1312 6.41161 20.645 6.59677 20.0403L7.83243 16.0046C8.09532 15.146 7.79694 14.2145 7.08413 13.6684L3.73432 11.1022C3.24111 10.7244 3.50831 9.93621 4.12961 9.93621H8.12744C9.07024 9.93621 9.90305 9.32198 10.1815 8.42125L11.379 4.5479C11.5678 3.93721 12.4322 3.93722 12.621 4.5479L13.8185 8.42124C14.0969 9.32198 14.9298 9.93621 15.8726 9.93621H19.8284Z" stroke={`${rating > i ? '#FFAD33' : '#F5F5F5'}`} stroke-width="1.5" />
                            </svg>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard