import React from 'react'

const Footer = () => {
  return (
    <footer className='flex justify-between items-center bg-blue-50 px-4 sm:px-6 py-2.5 text-black'>
      <div className='logo font-bold text-base sm:text-lg flex items-center'>
        <span className='text-blue-900'>&lt;</span>
        <span>Lock</span>
        <span className='text-blue-900'>/IN&gt;</span>
      </div>

      <div className='flex items-center font-semibold text-sm sm:text-base text-blue-900'>
        Created by Himz. Save your Passwords.
      </div>
    </footer>
  )
}

export default Footer