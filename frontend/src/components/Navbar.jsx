import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';

const Navbar = () => {
  const { authUser, checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className='bg-blue-950 flex justify-between items-center px-4 sm:px-6 py-2.5 sm:h-14 text-white mb-2'>
      <div className='logo font-bold text-base sm:text-lg'>
        <span className='text-blue-200'>&lt;</span>
        <span>Lock</span>
        <span className='text-blue-200'>/IN&gt;</span>    
      </div>

      {authUser && (
        <button 
          onClick={handleLogout} 
          className='cursor-pointer bg-blue-50 text-blue-950 px-2 py-1 sm:px-3 sm:py-1.5 rounded hover:bg-blue-100 font-semibold text-sm sm:text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
          aria-label="Log out"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;