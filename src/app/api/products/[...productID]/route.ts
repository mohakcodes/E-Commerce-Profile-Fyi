import { Product } from "@/app/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const url = new URL(req.url);
    const productID = url.pathname.split("/")[3];

    const response = await Product.findById(productID);
    if(!response){
        return NextResponse.json({error:"Product not found"},{status:404});
    }
    return NextResponse.json(response);
}