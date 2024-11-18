import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB using Mongoose
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Remove deprecated options
    console.log('MongoDB connected with Mongoose');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
