"use client"

import { ProductType } from '@/app/types';
import { useSuccessStore } from '@/app/utils/store';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Toaster } from "react-hot-toast";

export default function ProductPage() {

  const [product, setProduct] = useState({} as ProductType);
  const [loading, setLoading] = useState(true);
  const [notExists, setNotExists] = useState(false);

  const {successToast,errorToast} = useSuccessStore();

  const {productID} = useParams();

  useEffect(()=>{
    const fetchProductDetails = async () => {
        try {
            const repsonse = await axios.get(`/api/products/${productID}`);
            setProduct(repsonse.data);
        } 
        catch (error) {
            console.log("Error",error);
            setNotExists(true);
        }
        finally {
            setLoading(false);
        }
    }
    fetchProductDetails();
  },[productID]);

  const addToCartNavigation = async(e:any) => {
    e.stopPropagation();
    const response = await axios.get('/api/auth/refresh');
    if(response.data.data === null){
        errorToast();
    }
    else{
        const response = await axios.post('/api/addtocart',{product});
        successToast();
    }
    return;
}

  if (loading) {
    return(
      <div className='flex justify-center my-auto text-black font-bold text-xl sm:text-2xl'>
        Loading Product Details...
      </div>
    )
  }

  if (notExists) {
    return(
      <div className='flex justify-center my-auto text-black font-bold text-xl sm:text-2xl'>
        Product Not Found
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 px-9">
      <Toaster/>
      <div className='text-black font-bold text-xl pl-3 my-4'>
        <a href="/" className='px-4 py-1 bg-red-400 rounded-lg'>BACK ↩</a>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="md:col-span-2 lg:col-span-2 w-[100%] sm:w-[40%]">
          <Image src={product.image} alt={product.name} width={450} height={450} />
        </div>
        <div className='w-[100%] sm:w-[60%] mt-5 p-4'>
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 bg-gray-200 rounded-md  p-2 leading-8">
            {product.name}
          </h1>
          <p className="text-gray-600 py-2 mt-3">
          <a className='bg-gray-200 rounded-md font-semibold text-red-600 p-1 px-3'>{product.brand}</a>
          </p>
          <p className="text-gray-600 p-2 font-semibold">User Ratings - {product.rating}⭐</p>
          <p className="text-lg mt-2 px-2 font-semibold text-gray-700">{product.price} RS</p>
          <p className="text-gray-800 p-2 mt-4">{product.description}</p>
          <div className='p-2 flex justify-between flex-col sm:flex-row'>
            <button 
                className="px-3 py-2 m-1 bg-primary text-white font-semibold rounded-md"
                onClick={(e)=>{addToCartNavigation(e)}}
            >
                ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}