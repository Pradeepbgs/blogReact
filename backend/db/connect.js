import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        await mongoose.connect("http://localhost:27017/blog_react");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error while trying to connect MongoDB");
    }
}