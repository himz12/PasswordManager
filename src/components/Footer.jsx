import React from 'react'

const Footer = () => {
  return (
    <footer className='flex justify-between bg-slate-950 px-6 py-2.5 text-white'>
      <div className='logo font-bold flex items-center ml-45'>
        <span className='text-yellow-200'>&lt;</span>
        <span>Lock</span>
        <span className='text-yellow-200'>/IN&gt;</span>
      </div>

      <div className='flex items-center mr-55 font-semibold'>
        Created by Himz. Save your Passwords.
      </div>
    </footer>
  )
}

export default Footer
