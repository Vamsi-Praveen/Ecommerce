import React from 'react'
import Category from './Category'
import { icons } from '@/assets'

const Categories = () => {
    const categories = [
        {
            name: 'Phones',
            image: icons.cellphone
        },
        {
            name: 'Computers',
            image: icons.computer
        },
        {
            name: 'Men Shirts',
            image: icons.shirt
        },
        {
            name: 'Smart Watch',
            image: icons.smartwatch
        },
        {
            name: 'Camera',
            image: icons.camera
        },
        {
            name: 'Headphone',
            image: icons.headphone
        },
    ]
    return (
        <div className='my-5'>
            <div className='flex items-center gap-1 mb-2'>
                <div className='w-3.5 h-7 rounded-[3px] bg-primaryRed' />
                <span className='font-bold text-[12px] text-primaryRed tracking-wide'>Categories</span>
            </div>
            <h1 className='font-bold tracking-wide text-2xl'>Browse By Category</h1>
            <div className='my-5 flex gap-5 flex-wrap'>
                {
                    categories?.map((category) => {
                        return <Category key={category.name} image={category.image} categoryName={category.name} />
                    })
                }
            </div>
        </div>
    )
}

export default Categories