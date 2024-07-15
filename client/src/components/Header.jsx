import { icons } from '@/assets'
import { Link } from 'react-router-dom'

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

    return (
        <div className='bg-white py-3 pt-5 flex justify-center items-baseline'>
            <div className='w-full flex items-center justify-around'>
                <h1 className='font-semibold tracking-tight text-2xl'><span className='text-[#DB4444]'>X</span>clusive.</h1>
                <div className='flex items-center gap-10'>
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
                                    <path d="M8 5C5.7912 5 4 6.73964 4 8.88594C4 10.6185 4.7 14.7305 11.5904 18.8873C11.7138 18.961 11.8555 19 12 19C12.1445 19 12.2862 18.961 12.4096 18.8873C19.3 14.7305 20 10.6185 20 8.88594C20 6.73964 18.2088 5 16 5C13.7912 5 12 7.35511 12 7.35511C12 7.35511 10.2088 5 8 5Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div className='cursor-pointer'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.97738 9.84C4.0176 9.33881 4.24513 8.87115 4.61465 8.53017C4.98417 8.18918 5.46857 7.9999 5.97138 8H18.0294C18.5322 7.9999 19.0166 8.18918 19.3861 8.53017C19.7556 8.87115 19.9832 9.33881 20.0234 9.84L20.8264 19.84C20.8485 20.1152 20.8133 20.392 20.7232 20.6529C20.6331 20.9139 20.4899 21.1533 20.3027 21.3562C20.1155 21.5592 19.8883 21.7211 19.6354 21.8319C19.3825 21.9427 19.1095 21.9999 18.8334 22H5.16738C4.8913 21.9999 4.61823 21.9427 4.36536 21.8319C4.11249 21.7211 3.88529 21.5592 3.69808 21.3562C3.51086 21.1533 3.36768 20.9139 3.27755 20.6529C3.18742 20.392 3.15229 20.1152 3.17438 19.84L3.97738 9.84V9.84Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16 11V6C16 4.93913 15.5786 3.92172 14.8284 3.17157C14.0783 2.42143 13.0609 2 12 2C10.9391 2 9.92172 2.42143 9.17157 3.17157C8.42143 3.92172 8 4.93913 8 6V11" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>
                            <div className='cursor-pointer bg-primaryRed rounded-full p-1'>
                                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header