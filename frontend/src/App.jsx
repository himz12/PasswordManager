import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAuthStore } from './store/useAuthStore.js';
import './App.css'
import { Toaster } from 'react-hot-toast'; 

function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  // if(isCheckingAuth && !authUser) return (
  //   <div className='flex items-baseline justify-center h-screen'>
  //     <Loader className='size-10 animate-spin'/>
  //   </div>
  // ) 
  return (
    <div>
      <Navbar />
      <Routes>
         <Route path='/' element={authUser? <HomePage /> :<Navigate to='/login'/>} />
        <Route path='/signup' element={!authUser? <SignupPage />: <Navigate to='/'/>} />
        <Route path='/login' element={!authUser? <LoginPage /> : <Navigate to='/'/>} />
        </Routes>
      <Toaster/>
    </div>
  )
}

export default App
