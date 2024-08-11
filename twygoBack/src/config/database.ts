import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

const connectDB = async () => {
 const dbUri = process.env.MONGO_URI;
  try {
    await mongoose.connect(dbUri!);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;