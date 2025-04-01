import mongoose from "mongoose";

const connectDb = async (mongo_url) => {
    try {
        const conn = await mongoose.connect(mongo_url);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.name} - ${error.message}`);
        process.exit(1);
    }
};

export default connectDb;
