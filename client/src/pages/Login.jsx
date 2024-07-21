import { loginUser } from '@/api/API'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useAuth from '@/hooks/useAuth'
import usePersistent from '@/hooks/usePersistent'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigation = useNavigate()
    const { user, setUser, setToken } = useAuth()
    const { setPersistent } = usePersistent()
    useEffect(() => {
        if (!user) {
            navigation('/auth/login')
        }
    }, [])
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleLogin = async () => {
        const user = await loginUser({ email: loginDetails?.email, password: loginDetails?.password })
        console.log(user)
        setUser(user?.user);
        setToken(user?.jwt);
        setPersistent({ key: 'user', value: user?.user })
        setPersistent({ key: 'auth_token', value: user?.jwt })
        navigation('/', { replace: true })
    }

    return (
        <>
        <Helmet>
        <title>Login | Xclusive</title>
        </Helmet>
            <div className='h-full py-5 w-full flex items-center justify-center flex-col gap-3'>
                <div className='flex items-center gap-1'>
                    <h1 className='font-semibold text-xl'>Login into</h1>
                    <h1 className='font-semibold tracking-tight text-xl'><span className='text-[#DB4444]'>X</span>clusive.</h1>
                </div>
                <div className='md:w-[300px] space-y-3'>
                    <div className="space-y-3">
                        <Input type="email" placeholder="Email Address" className="focus-visible:ring-0 outline-none h-[40px]" onChange={handleChange} name="email" />
                        <Input type="password" placeholder="Password" className="focus-visible:ring-0 outline-none h-[40px]" onChange={handleChange} name="password" />
                    </div>
                    <div className='flex items-center justify-between'>
                        <Button variant="primary" className="px-5" onClick={handleLogin} disabled={loginDetails?.email == '' || loginDetails?.password == ''}>Login</Button>
                        <span className="text-primaryRed text-sm font-medium cursor-pointer hover:underline underline-offset-1">Forgot Password ?</span>
                    </div>
                    <p className='text-[14px] text-[#7D8184] font-light'>Don't have an account? <Link to="/auth/register" className='text-primaryRed/90 font-medium hover:underline underline-offset-1'>Create Now</Link></p>
                </div>
            </div>
        </>
    )
}

export default Login