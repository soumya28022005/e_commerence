import mongoose from "mongoose";
    
export const ConnectDb= async ()=>{
    try{
        await mongoose.connect(process.env.MonngoDbUr)
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
    
}