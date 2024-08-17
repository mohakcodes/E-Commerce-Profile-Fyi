import { getTokenData } from "@/app/helpers/getTokenData";
import connectDB from "@/app/libs/connectDB";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req:NextRequest){
    try {
        const tokenData = await getTokenData(req);
        const user = await User.findById(tokenData.id).select("-password");
        return NextResponse.json({message:"User Found",data:user},{status:200});
    }
    catch (error: any) {
        return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
    }
}