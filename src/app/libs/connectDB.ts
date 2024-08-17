import mongoose from "mongoose"

export default async function connectDB():Promise<void>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected To MongoDB");
    } 
    catch (error) {
        console.log(error);
    }
}