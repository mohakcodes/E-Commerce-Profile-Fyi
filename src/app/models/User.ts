import mongoose from "mongoose";
import { ProductType } from "../types";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    cart:{
        type: Array<ProductType>(),
        default: [],
        required: true,
    }
})

export const User = mongoose.models['user'] || mongoose.model("user", userSchema);