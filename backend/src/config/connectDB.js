import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/ecommerce";

export async function connectDB(){
    try {
        console.log("MongoDB connecting..")
        await mongoose.connect(MONGO_URL)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("Error while connecting",error.message)
    }

}