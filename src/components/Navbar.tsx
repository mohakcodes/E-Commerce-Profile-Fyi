"use client"
import { useFilterDropDownStore, useUserStore } from "@/app/utils/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navbar(){

    const router = useRouter();
    const {user,setUser} = useUserStore();

    const {isFilterDropdownOpen,toggleFilterDropDown}:any = useFilterDropDownStore();

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/auth/refresh');
            const data = response.data.data;
            if(data === null){
                setUser({email:"",username:"",id:"",isAdmin:false,cart:[]});
                return;
            }
            setUser({email:data.email,username:data.username,id:data._id,isAdmin:data.isAdmin,cart:data.cart});
        } 
        catch (error) {
            console.log("Error",error);
        }
    }

    const logoutFn = async() => {
        try {
            await axios.get('/api/auth/logout');
            router.push('/auth/login');
            setUser({email:"",username:"",id:"",isAdmin:false,cart:[]});
        } 
        catch (error:any) {
            console.log(error.message);    
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return(
        <div className="navbar bg-gray-200 relative z-50">
        <div className="flex-1">
            <a 
                className="bg-gray-300 py-1 px-2 rounded-md text-blue-950 font-bold text-[16px] sm:text-xl md:text-2xl absolute"
                href="/"
            >
                KnowledgeKart
            </a>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal" style={{padding:0,margin:0,marginRight:0}}>
                <li className="sm:hidden text-black font-medium">
                        <a onClick={toggleFilterDropDown}>
                            Filter
                        </a>
                    </li>
            {
                user.email && user.id && user.username ? (
                    null
                ) : (
                    <li className="sm:text-base md:text-lg lg:text-[20px] text-black font-medium"><a href="/auth/login">Login</a></li>
                )
            }
            {
                user.isAdmin ? (
                    <li className="hidden sm:inline sm:text-sm md:text-base lg:text-[20px] text-black font-medium"><a href="/addproduct">Add Product</a></li>
                ) : (
                    null
                )
            }
            <li>
                {
                    user.email && user.id && user.username ? (
                        <details>
                            <summary className="sm:text-sm md:text-base lg:text-[20px] mr-3 text-black font-medium">
                                More
                            </summary>
                            <ul className="p-0 sm:p-2 rounded-t-none bg-slate-500 sm:mr-0 border-2 border-slate-600">
                                {
                                    user.isAdmin ? (
                                        <li className="sm:hidden text-white font-medium"><a href="/addproduct">Add Product</a></li>
                                    ) : (
                                        null
                                    )
                                }
                                <li className="sm:text-[16px] text-white font-medium"><a href="/cart">Cart</a></li>
                                <li className="sm:text-[16px] text-white font-medium"><a onClick={logoutFn}>Logout</a></li>
                            </ul>
                        </details>
                    ) : (
                        null
                    )
                }
            </li>
            </ul>
        </div>
        </div>
    )
}