import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

export const connect = mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB" + err.message);
});