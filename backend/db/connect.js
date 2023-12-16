import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/blogReact`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error while trying to connect MongoDB");
    }
}