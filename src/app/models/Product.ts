import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
    },
    brand: {
        type: String, required: true,
    },
    price: {
        type: Number, required: true,
    },
    rating: {
        type: Number, default: 0,
    },
    description: {
        type: String, required: true,
    },
    quantity: {
        type: Number, required: true,
    },
    image: {
        type: String, required: true,
    },
})

export const Product = mongoose.models['product'] || mongoose.model("product", ProductSchema);