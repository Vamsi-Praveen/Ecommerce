import { icons } from '@/assets'
import { Link, useNavigate } from 'react-router-dom'
import { MenuIcon, X } from "lucide-react"
import { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import useCart from '@/hooks/useCart'

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
    const navMobileLinks = [
        {
            href: '/',
            link: 'Home'
        },
        {
            href: '/products',
            link: 'Products'
        },
        {
            href: '/me/cart',
            link: 'Cart'
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

    const [isSideOpen, setIsSideOpen] = useState(false)

    const { cartItems } = useCart()

    const navigate = useNavigate()

    return (
        <header className='bg-white py-4 pt-6 flex justify-center items-baseline border-b border-slate-200'>
            <div className='w-full flex items-center justify-between md:justify-around mx-5 md:mx-0'>
                <Link to="/">
                    <h1 className='font-semibold tracking-tight text-2xl'><span className='text-[#DB4444]'>X</span>clusive.</h1>
                </Link>
                <div className='md:hidden'>
                    <div className='flex items-center gap-4'>
                        <div className='cursor-pointer bg-primaryRed rounded-full p-1'>
                            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </div>
                        <div onClick={() => setIsSideOpen(true)}>
                            <MenuIcon />
                        </div>
                    </div>
                </div>
                {/* mobile sidebar */}
                <AnimatePresence>
                    {isSideOpen && (
                        <>
                            <motion.div
                                className='fixed inset-0 bg-black bg-opacity-50 z-50'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setIsSideOpen(false)}
                            />
                            <motion.div
                                className='fixed right-0 top-0 bg-white w-2/3 max-w-xs h-full p-6 z-50'
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'tween', stiffness: 300, damping: 30, duration: 0.3 }}
                            >
                                <div className='flex justify-end'>
                                    <X onClick={() => setIsSideOpen(false)} className="cursor-pointer" />
                                </div>
                                <ul className='list-none flex flex-col gap-4 mt-4'>
                                    {navMobileLinks.map((link) => (
                                        <li key={link.href} className='font-medium text-[#7D8184] hover:text-black transition text-[18px]'>
                                            <Link to={link.href} onClick={() => setIsSideOpen(false)}>{link.link}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
                <div className='hidden md:flex items-center gap-10'>
                    <div>
                        <ul className='list-none flex items-center gap-8'>
                            {
                                navLinks?.map((link) => {
                                    return <li key={link.href} className='font-medium text-[#7D8184] hover:text-black transition text-sm'>
                                        <Link to={link.href}>{link.link}</Link>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className='flex items-center gap-8'>
                        <div className='bg-[#F5F5F5] py-1.5 px-2.5 flex items-center rounded-sm w-[250px]'>
                            <input type="text" className='border-none outline-none bg-transparent focus:ring-0 text-sm flex-1' placeholder='What are you looking for?' />
                            <img src={icons.search} />
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='cursor-pointer'>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 5C5.7912 5 4 6.73964 4 8.88594C4 10.6185 4.7 14.7305 11.5904 18.8873C11.7138 18.961 11.8555 19 12 19C12.1445 19 12.2862 18.961 12.4096 18.8873C19.3 14.7305 20 10.6185 20 8.88594C20 6.73964 18.2088 5 16 5C13.7912 5 12 7.35511 12 7.35511C12 7.35511 10.2088 5 8 5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className='cursor-pointer' onClick={() => navigate('/me/cart')}>
                                <div className='relative'>

                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.25 20.25C8.66421 20.25 9 19.9142 9 19.5C9 19.0858 8.66421 18.75 8.25 18.75C7.83579 18.75 7.5 19.0858 7.5 19.5C7.5 19.9142 7.83579 20.25 8.25 20.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18.75 20.25C19.1642 20.25 19.5 19.9142 19.5 19.5C19.5 19.0858 19.1642 18.75 18.75 18.75C18.3358 18.75 18 19.0858 18 19.5C18 19.9142 18.3358 20.25 18.75 20.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2.25 3.75H5.25L7.5 16.5H19.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7.5 12.5H19.1925C19.2792 12.5001 19.3633 12.4701 19.4304 12.4151C19.4975 12.3601 19.5434 12.2836 19.5605 12.1986L20.9105 5.44859C20.9214 5.39417 20.92 5.338 20.9066 5.28414C20.8931 5.23029 20.8679 5.18009 20.8327 5.13717C20.7975 5.09426 20.7532 5.05969 20.703 5.03597C20.6528 5.01225 20.598 4.99996 20.5425 5H6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>


                                    <span className='absolute -top-1 -right-1 inline-flex items-center justify-center bg-primaryRed rounded-full text-white text-[10px] w-4 h-4 font-medium '>{cartItems}</span>
                                </div>



                            </div>
                            <div className='cursor-pointer bg-primaryRed rounded-full p-1' onClick={() => navigate('/me')}>
                                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header