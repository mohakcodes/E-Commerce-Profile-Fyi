"use client"
import { useEffect, useState } from "react";

export default function AddProduct() {
  
    const [productDetail, setProductDetail] = useState({
        image: null,
        productName: '',
        price: 0,
        description: '',
        brand: '',
        quantity: 0,
      });

      const [base64, setBase64] = useState<string | null>(null);

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductDetail((prevProductDetail) => ({
          ...prevProductDetail,
          [name]: value,
        }));
      };
    
      const handleFileChange = (e:any) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          const image = files[0];
          setProductDetail((prevProductDetail) => ({
            ...prevProductDetail,
            image,
          }));
        }
      };

      const toBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
          
      const handleAddProduct = async(e:any) => {
        e.preventDefault();
        console.log('Product Details:', productDetail);

        if (productDetail.image) {
            console.log("ok");

            const base64 = await toBase64(productDetail.image as File);
            console.log("B64",base64);
            setBase64(base64 as string);

            await fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({ ...productDetail, image: base64}),
                headers: {
                  "Content-Type": "application/json",
                },
              });
            
            setBase64(null);
        }
        else{
            console.log("No Image");
        }

        setProductDetail({
            image: null,
            productName: '',
            price: 0,
            description: '',
            brand: '',
            quantity: 0,
        });
      };

      useEffect(()=>{
        console.log(productDetail.image);
      },[productDetail.image]);

  return (
    <div className="w-[60%] mx-auto p-4">
      <div>
        <label className="border text-black bg-gray-200 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="mt-4">
        <label className="block text-sm text-black font-bold mb-2">Product Name:</label>
        <input
          type="text"
          name="productName"
          value={productDetail.productName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-black bg-gray-200 text-black"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm text-black font-bold mb-2">Price:</label>
        <input
          type="number"
          name="price"
          value={productDetail.price}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-black text-black bg-gray-200"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm text-black font-bold mb-2">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={productDetail.quantity}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-black text-black bg-gray-200"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm text-black font-bold mb-2">Description:</label>
        <textarea
          name="description"
          value={productDetail.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-black text-black bg-gray-200"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm text-black font-bold mb-2">Brand:</label>
        <input
          type="text"
          name="brand"
          value={productDetail.brand}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border-2 border-black text-black bg-gray-200"
        />
      </div>
      <button
        onClick={handleAddProduct}
        type="submit"
        className="mt-4 p-2 text-md font-bold bg-emerald-400 text-black rounded-lg hover:bg-black hover:text-emerald-400"
      >
        Add Product
      </button>
    </div>
  );
}