import { ProductType } from "@/app/types"
import { useSuccessStore } from "@/app/utils/store";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

type Props = {
    product: ProductType;
}

export default function ProductCard({product}:Props){

    const router = useRouter();
    const {successToast,errorToast} = useSuccessStore();

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

    return(
        <div className="card card-compact w-90 bg-gray-300 shadow-xl border-2 border-gray-200">
        <Toaster/>
        <figure className="h-44 overflow-hidden">
            <Image 
                src={product.image} 
                width={100} 
                height={100} 
                alt="img" 
                className="w-full h-full object-cover"
                onClick={()=>{router.push(`/product/${product._id}`)}}
            />
        </figure>
        <div className="card-body" onClick={()=>{router.push(`/product/${product._id}`)}}>
            <div>
                <h3 
                    className="card-title text-[16px] text-black whitespace-nowrap overflow-ellipsis overflow-hidden
                               flex items-center font-semibold justify-left"
                >
                    {product.name}
                </h3>
            </div>
            <div className="flex justify-left gap-2">
                <h3 className="card-title text-[13px] text-black">{product.rating}⭐</h3>
                <h3 className="card-title text-[13px] text-black">{product.price} RS</h3>
            </div>
            <div className="text-left text-black">
            <p>{product.description.length <= 70 ? product.description : product.description.substring(0,70)}...</p>
            </div>
            <div className="card-actions justify-between font-semibold">
                <button 
                    className="px-3 py-2 bg-blue-400 text-black rounded-md"
                >
                    Read More
                </button>
                <button 
                    className="px-3 py-2 bg-blue-400 text-black rounded-md"
                    onClick={(e)=>{addToCartNavigation(e)}}
                >
                    Add to Cart
                </button>
            </div>
        </div>
        </div>
    )
}