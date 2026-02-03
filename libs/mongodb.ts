import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URL = process.env.MONGODB_URL;



if (!MONGODB_URL) {
    throw new Error('MongoDB URL should be defined');
}

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(MONGODB_URL);
        if(connection.readyState == 1) {
            console.log('MongoDB connected');
            return true;
        }
    } catch (e) {
        console.error('MongoDB connection error:', e);
        throw e;
    } 
}


