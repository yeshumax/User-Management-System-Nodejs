import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Use an empty string fallback or '!' to tell TS it's defined
    const dbUri = process.env.MONGODB_URI || ""; 
    if (!dbUri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(dbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
