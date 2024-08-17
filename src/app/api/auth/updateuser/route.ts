import { getTokenData } from "@/app/helpers/getTokenData";
import connectDB from "@/app/libs/connectDB";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req:NextRequest){
    try {
        const {cart} = await req.json();
        const tokenData = await getTokenData(req);
        const user = await User.findById(tokenData.id);
        user.cart = cart;
        await user.save();
        return NextResponse.json({ message: 'Cart updated successfully' });
    }
    catch (error:any) {
        return NextResponse.json({error:error.message},{status:400});
    }
}