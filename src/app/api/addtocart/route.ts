import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/libs/connectDB";
import { User } from "@/app/models/User";
import { getTokenData } from "@/app/helpers/getTokenData";

connectDB();

export async function POST(req:NextRequest){
    try {
        const {product} = await req.json();
        const user = await getTokenData(req);
        const userDetails:any = await User.findById(user.id);
        const cart = userDetails.cart;
        const doesProductExist = cart.find((item:any)=>item._id === product._id);
        if(doesProductExist){
            return NextResponse.json({message:"Product Already Exists In Cart",success:true},{status:200});
        }
        else{
            cart.push(product);
            await userDetails.save();
            return NextResponse.json({message:"Product Added To Cart",success:true},{status:200});
        }

    }
    catch (error:any) {
        return NextResponse.json({error:error.message},{status:400});
    }
}