"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import axios from "axios";

export default function Signup() {
  
  const [user,setUser] = useState({
    username:"",
    email:"",
    password:"",
  })
  const [error, setError] = useState<boolean>(false);

  const router = useRouter(); 

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (user.username === '' || user.email === '' || user.password === '') {
      setError(true);
      return;
    }
    if (!isEmailValid(user.email)) {
      setError(true);
      return;
    }
    try {
      const res = await axios.post('/api/auth/signup', user);
      setError(false);
      router.push('login');
    } 
    catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className='w-full flex justify-center items-center h-[70vh]'>
      <div className='w-[80%] md:w-[35%] flex flex-col justify-center items-center space-y-4'>
        <h1 className='text-2xl text-black font-bold text-left p-2'>Create Your Account</h1>
        <input
          onChange={(e) => setUser({...user, username:e.target.value})}
          className='w-full px-4 py-2 border-2 border-black bg-gray-200 text-black'
          type='text'
          placeholder='Enter Username'
        />
        <input
          onChange={(e) => setUser({...user, email:e.target.value})}
          className='w-full px-4 py-2 border-2 border-black bg-gray-200 text-black'
          type='email'
          placeholder='Enter Your E-Mail'
        />
        <input
          onChange={(e) => setUser({...user, password:e.target.value})}
          className='w-full px-4 py-2 border-2 border-black bg-gray-200 text-black'
          type='password'
          placeholder='Enter Your Password'
        />
        <button
          onClick={handleSubmit}
          className='w-full p-2 text-md font-bold bg-emerald-400 rounded-lg text-black hover:bg-black hover:text-emerald-400'
        >
          SIGN UP
        </button>
        {error && <h3 className='text-red-500 text-sm'>Something Went Wrong</h3>}
        <div className='w-full flex justify-start items-center space-x-2'>
          <p className='italic text-black'>Already Registered?</p>
          <p className='font-semibold px-4 py-[4px] bg-slate-400 text-black hover:bg-fuchsia-300 rounded-lg'>
            <Link href='login'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}