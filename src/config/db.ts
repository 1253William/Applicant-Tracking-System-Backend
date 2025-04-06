import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


async function connectDB(): Promise<void> { 
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('No MongoDB URI provided');
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB');
        
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
}

export default connectDB;