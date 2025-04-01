import mongoose from "mongoose";
import { CONSTANTS } from "../constants/constants.js";

const mongoURI = process.env.MONGODB_URI as string;

if (!mongoURI) {
  console.error("MongoDB URI is missing. Check your .env file.");
  process.exit(1);
}

const ConnectDB = async () => {
  try {
    await mongoose.connect(`${mongoURI}/${CONSTANTS.DB_NAME}`);
    console.log(`MongoDB connected successfully to ${CONSTANTS.DB_NAME}`);
  } catch (error) {
    console.error("MongoDB connection failed :", error);
    process.exit(1);
  }
};

export { ConnectDB };
