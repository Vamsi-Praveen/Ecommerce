import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bg-black text-white py-4 container md:px-24'>
            <div className='grid grid-cols-1 gap-5 md:gap-0 md:grid-cols-4 pb-2 '>
                <Link to="/">
                    <h1 className='font-semibold tracking-tight text-2xl'><span className='text-[#DB4444]'>X</span>clusive.</h1>
                </Link>
                <div className='space-y-2'>
                    <h1 className='text-lg'>Support</h1>
                    <div className='flex flex-col gap-2 text-left'>
                        <Link to={'/'}>
                            <p className='text-[12px] text-[#FAFAFA]'>4-186/2, Hybrid Towers,Mumbai</p>
                        </Link>
                        <Link to={'/'}>
                            <p className='text-[12px] text-[#FAFAFA]'>+91 8888445522</p>
                        </Link>
                        <Link to={'/'}>
                            <p className='text-[12px] text-[#FAFAFA]'>support@xclusive.com</p>
                        </Link>
                    </div>
                </div>
                <div className='space-y-2'>
                    <h1 className='text-lg'>Account</h1>
                    <div className='flex flex-col gap-2'>
                        <Link to={'/'}>
                            <p className='text-[12px] text-[#FAFAFA]'>My Account</p>
                        </Link>
                        <Link to={'/'}>
                            <p className='text-[12px] text-[#FAFAFA]'>Login / Register</p>
                        </Link>
                        <Link to={'/'}>
                            <p className='text-[12px] text-[#FAFAFA]'>Cart</p>
                        </Link>
                        <Link to={'/'}>
                            <p className='text-[12px] text-[#FAFAFA]'>Wishlist</p>
                        </Link>
                        <Link to={'/'}>
                            <p className='text-[12px] text-[#FAFAFA]'>Shop</p>
                        </Link>
                    </div>
                </div>
                <div className='space-y-2'>
                    <h1 className='text-lg'>Quick Link</h1>
                    <div className='flex flex-col gap-2'>
                        <Link to={'/'}>
                            <p className='text-[12px] text-[#FAFAFA]'>Privacy Policy</p>
                        </Link>
                        <Link to={'/'}>
                            <p className='text-[12px] text-[#FAFAFA]'>Terms of Use</p>
                        </Link>
                        <Link to={'/'}>
                            <p className='text-[12px] text-[#FAFAFA]'>FAQ</p>
                        </Link>
                        <Link to={'/'}>
                            <p className='text-[12px] text-[#FAFAFA]'>Contact</p>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer