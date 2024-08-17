import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import connectDB from "@/app/libs/connectDB";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest){
    console.log("msg");
    try {
        console.log("came here");
        const {email,password} = await req.json();    
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User not exists, Signup"},{status:400});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return NextResponse.json({error:"Invalid Password"},{status:400});
        }
        console.log("user",user);

        //creating token
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email,
        }
        const sendUser = {
            id:user._id,
            username:user.username,
            email:user.email,
            isAdmin:user.isAdmin,
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn:"1h"});
        const response = NextResponse.json({message:"Login Successful",success:true,sendUser},{status:200});
        response.cookies.set("token",token,{httpOnly:true});
        return response;
    } 
    catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}