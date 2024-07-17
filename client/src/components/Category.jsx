import React from 'react'

const Category = ({ image, categoryName }) => {
    return (
        <div className={` w-[110px] h-[110px] border border-slate-200 rounded-sm flex items-center justify-center hover:text-white hover:bg-primaryRed cursor-pointer transition-colors group`}>
            <div className='flex items-center justify-center flex-col gap-1'>
                <img src={image} alt='category' className={`group-hover:invert`} />
                <p className='text-sm capitalize font-medium'>{categoryName}</p>
            </div>
        </div>
    )
}

export default Category