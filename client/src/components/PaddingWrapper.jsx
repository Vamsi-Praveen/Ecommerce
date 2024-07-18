import React from 'react'

const PaddingWrapper = ({ children }) => {
    return (
        <div className='py-3 px-4 md:px-20 mx-auto md:mx-0 h-full'>
            {children}
        </div>
    )
}

export default PaddingWrapper