import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import connectDB from "@/app/libs/connectDB";

connectDB();

export async function POST(req: NextRequest, res:NextResponse) {
    try {
        const {username,email,password} = await req.json();
        if(!username || !email || !password){
            throw new Error("Please fill all fields");
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return NextResponse.json({ message: "User exists, Login instead" }, { status: 400 });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({username, email, password:hashedPassword});
        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json({
            message:"User Created",
            success:true,
            savedUser
        })
    } 
    catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}