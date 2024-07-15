import { icons } from '@/assets'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const navLinks = [
        {
            href: '/',
            link: 'Home'
        },
        {
            href: '/products',
            link: 'Products'
        },
        {
            href: '/about',
            link: 'About'
        },
        {
            href: '/auth/login',
            link: 'Sign In'
        }
    ]
    const path = useLocation()
    return (
        <div className='bg-white py-3 flex justify-center items-baseline'>
            <div className='w-full flex items-center justify-around'>
                <h1 className='font-semibold tracking-tight text-2xl'><span className='text-[#DB4444]'>X</span>clusive.</h1>
                <div>
                    <ul className='list-none flex items-center gap-10'>
                        {
                            navLinks?.map((link) => {
                                return <li key={link.href} className='font-medium text-[#7D8184] hover:text-black transition'>
                                    <Link to={link.href}>{link.link}</Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className='flex items-center gap-5'>
                    <div className='bg-[#F5F5F5] p-2 px-2.5 flex items-center rounded-sm w-[250px]'>
                        <input type="text" className='border-none outline-none bg-transparent focus:ring-0 text-sm flex-1' placeholder='What are you looking for?' />
                        <img src={icons.search} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='cursor-pointer'>
                            <icons.HeadphoneIcon />
                        </div>
                        <div className='cursor-pointer'>
                            <img src={icons.cart} alt='Cart' />
                        </div>
                        <div className='cursor-pointer'>
                            <img src={icons.user} alt='User' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header