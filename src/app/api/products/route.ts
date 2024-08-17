import connectDB from "@/app/libs/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/app/models/Product";

connectDB();

export async function GET(req: NextRequest) {
    try {
        const allProducts = await Product.find({});
        return NextResponse.json(allProducts, { status: 200 });
    }
    catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}