"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { useUserStore } from "@/app/utils/store";

export default function LoginPage(){

    const {setUser} = useUserStore();

    const [currentUser,setCurrentUser] = useState({
        email:"",
        password:"",
    })
    const [error, setError] = useState<boolean>(false);

    const router = useRouter();

    const isEmailValid = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        if (currentUser.email === '' || currentUser.password === '') {
            setError(true);
            return;
        }
        if (!isEmailValid(currentUser.email)) {
            setError(true);
            return;
        }
        try {
          const res = await axios.post('/api/auth/login', currentUser);
          setUser(res.data.sendUser);
          setError(false);
          router.push('/');
        } 
        catch (err:any) {
          setError(true);
          console.error("error");
        }
      };

    return(
        <div className='w-full flex justify-center items-center h-[70vh]'>
            <div className='w-[80%] md:w-[35%] flex flex-col justify-center items-center space-y-4'>
                <h1 className='text-2xl text-black font-bold text-left p-2'>Login To Your Account</h1>
                <input
                onChange={(e) => setCurrentUser({...currentUser, email:e.target.value})}
                className='w-full px-4 py-2 border-2 border-black bg-gray-200 text-black'
                type='email'
                placeholder='Enter Your E-Mail'
                />
                <input
                onChange={(e) => setCurrentUser({...currentUser, password:e.target.value})}
                className='w-full px-4 py-2 border-2 border-black bg-gray-200 text-black'
                type='password'
                placeholder='Enter Your Password'
                />
                <button
                onClick={handleLogin}
                className='w-full p-2 text-md text-black font-bold bg-emerald-400 rounded-lg hover:bg-black hover:text-emerald-400'
                >
                LOGIN
                </button>
                {error && <h3 className='text-red-500 text-sm'>Something Went Wrong</h3>}
                <div className='w-full flex justify-start items-center space-x-2'>
                <p className='italic text-black'>Not Registered?</p>
                <p className='font-semibold px-4 py-[4px] bg-slate-400 hover:bg-fuchsia-300 rounded-lg text-black'>
                    <Link href='signup'>SignUp</Link>
                </p>
                </div>
            </div>
        </div>
    )
}