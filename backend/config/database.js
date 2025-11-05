import mongoose from 'mongoose';
import { seedSampleData } from '../utils/seedData.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/discussion-forum');
    console.log(`🗄️ MongoDB Connected: ${conn.connection.host}`);
    
    // Seed sample data after connection
    await seedSampleData();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;