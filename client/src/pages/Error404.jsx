import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {
    const navigate = useNavigate()
    return (
        <div className='h-full flex items-center justify-center flex-col '>
            <h1 className='font-semibold text-5xl'>404</h1>
            <p className='text-sm'>The requested page not found.</p>
            <Button variant="primary" className="mt-4" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
    )
}

export default Error404