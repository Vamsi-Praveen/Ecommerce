import useAuth from '@/hooks/useAuth'
import React from 'react'
import { Helmet } from 'react-helmet'

const Profile = () => {
  const { user } = useAuth()
  return (
    <>
      <Helmet>
        <title>Profile | Xclusive.</title>
      </Helmet>
      <div className='h-full w-full'>
        <div className='flex items-center justify-between'>
          <h1>Profile</h1>
          <h1 className='text-sm'>Welcome,&nbsp;<span className='text-primaryRed font-medium'>{user?.username}</span></h1>
        </div>
        <div>
          <div>
            
          </div>
          <div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Profile