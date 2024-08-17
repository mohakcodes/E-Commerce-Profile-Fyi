import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const getTokenData = async (req:NextRequest) => {
    try {
        let token = req.cookies.get("token")?.value;
        if(!token){
            return NextResponse.json({error:"Token Not Found"},{status:400});
        }
        const tokenDecoded:any = jwt.verify(token, process.env.JWT_SECRET_KEY! as string);
        return tokenDecoded;
    } 
    catch (error:any) {
        throw new Error(error.message);
    }
}