import mongoose from "mongoose";
import 'dotenv/config'


const connectDB = async (): Promise<void> => {
    try {
        const MONGO_URLURL = process.env.MONGO_URL
        if (!MONGO_URLURL) {
            throw new Error("MONGO_URL is not defined in environment variables.")
        }
        await mongoose.connect(MONGO_URLURL)
        console.log("database Connected.....");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}

export default connectDB