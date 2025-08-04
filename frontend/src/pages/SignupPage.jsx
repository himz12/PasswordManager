import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User, Mail, EyeOff, Eye, Lock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const { signup, isSignup } = useAuthStore();

  const validateForm = () => {
    if (!form.fullName.trim()) return toast.error("Full name is required");
    if (!form.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(form.email)) return toast.error("Invalid email format");
    if (!form.password) return toast.error("Password is required");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(form);
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-white'>
      <div className='w-full max-w-md space-y-8 bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200'>
        <div className='text-center mb-4'>
          <div className='flex flex-col items-center gap-2 group'>
            <div className='size-12 rounded-full bg-blue-100 flex items-center justify-center'>
              <MessageSquare className='size-6 text-blue-600' />
            </div>
            <h1 className='text-2xl font-bold mt-2 text-gray-800'>Create Account</h1>
            <p className='text-gray-500 text-sm'>Get started with your free account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Full Name */}
          <div className='form-control'>
            <label className='label mb-1'>
              <span className='label-text font-medium text-gray-700'>Full Name</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <User className='size-5 text-gray-400' />
              </div>
              <input
                type='text'
                className='input input-bordered w-full pl-10 py-3 rounded-lg text-gray-800 font-medium placeholder:text-sm shadow-sm border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition'
                placeholder='Enter your Full Name'
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div className='form-control'>
            <label className='label mb-1'>
              <span className='label-text font-medium text-gray-700'>Email</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Mail className='size-5 text-gray-400' />
              </div>
              <input
                type='email'
                className='input input-bordered w-full pl-10 py-3 rounded-lg text-gray-800 font-medium placeholder:text-sm shadow-sm border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition'
                placeholder='Enter your Email'
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div className='form-control'>
            <label className='label mb-1'>
              <span className='label-text font-medium text-gray-700'>Password</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className='size-5 text-gray-400' />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className='input input-bordered w-full pl-10 py-3 rounded-lg text-gray-800 font-medium placeholder:text-sm shadow-sm border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition'
                placeholder='Enter your Password'
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className='size-5 text-gray-400' />
                ) : (
                  <Eye className='size-5 text-gray-400' />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type='submit' className='bg-blue-600 text-white font-semibold cursor-pointer w-full py-3 rounded-lg hover:bg-blue-700 transition' disabled={isSignup}>
            {isSignup ? (
              <span className='flex items-center justify-center gap-2'>
                <Loader2 className='size-5 animate-spin' />
                Loading...
              </span>
            ) : "Create Account"}
          </button>
        </form>

        <div className='text-center mt-4'>
          <p className='text-gray-500'>
            Already have an account?{" "}
            <Link to="/login" className='text-blue-600 hover:underline font-medium'>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
