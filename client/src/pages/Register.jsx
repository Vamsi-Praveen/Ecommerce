import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <>
            <Helmet>
                <title>Register | Xclusive</title>
            </Helmet>
            <div className='h-full py-5 w-full flex items-center justify-center flex-col gap-3'>
                <div className='flex items-center gap-1'>
                    <h1 className='font-semibold text-xl'>Join with</h1>
                    <h1 className='font-semibold tracking-tight text-xl'><span className='text-[#DB4444]'>X</span>clusive.</h1>
                </div>
                <div className='md:w-[300px] space-y-3'>
                    <div className="space-y-3">
                        <Input type="text" placeholder="Username" className="focus-visible:ring-0 outline-none h-[40px]" />
                        <Input type="email" placeholder="Email Address" className="focus-visible:ring-0 outline-none h-[40px]" />
                        <Input type="text" placeholder="Phone Number" className="focus-visible:ring-0 outline-none h-[40px]" />
                        <Input type="password" placeholder="Password" className="focus-visible:ring-0 outline-none h-[40px]" />
                    </div>
                    <div className='flex items-center justify-between'>
                        <Button variant="primary" className="px-5">Create Account</Button>
                    </div>
                    <p className='text-[14px] text-[#7D8184] font-light'>Already have an account? <Link to={"/auth/login"} className='text-primaryRed/90 font-medium hover:underline underline-offset-1'>Login</Link></p>
                </div>


            </div>
        </>
    )
}

export default Register