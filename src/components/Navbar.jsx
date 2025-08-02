import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-950 flex justify-between px-2 py-2 h-12 items-center text-md text-white'>
        <div className='logo font-bold mx-25'>
            <span className='text-yellow-200'>&lt;</span>
            <span>Lock</span>
            <span className='text-yellow-200'>/IN&gt;</span>    
        </div>
        <ul className='flex gap-4 mr-25'>
            <li><a className='hover:font-bold' href='#'>Home</a></li>
            <li><a className='hover:font-bold' href='#'>About</a></li>
            <li><a className='hover:font-bold' href='#'>Contact</a></li>
        </ul>
    </nav>
  )
}

export default Navbar
