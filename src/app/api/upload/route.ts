import connectDB from "@/app/libs/connectDB";
import { Product } from "@/app/models/Product";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const { image, productName, price, description, brand, quantity } : any = await req.json();
        const newProduct = new Product({
            name: productName,
            brand,
            price,
            description,
            quantity,
            image,
        });
        await newProduct.save();
        return NextResponse.json({ message: 'Product added successfully' }, { status: 200 });
    } 
    catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ message: 'Error uploading file' }, { status: 500 });    
    }
}