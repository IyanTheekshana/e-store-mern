import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
  // Database connection logic will go here
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); //1 indicates failure, 0 indicates success
  }
};
