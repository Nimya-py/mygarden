import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { seedDatabase } from '../utils/seed.js';

let mongodInstance = null;

export const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/plant_nursery_db';
  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Local MongoDB not detected (${error.message}). Starting in-memory MongoDB server...`);
    try {
      mongodInstance = await MongoMemoryServer.create();
      const memUri = mongodInstance.getUri();
      const conn = await mongoose.connect(memUri);
      console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
      
      // Auto-populate initial seed data
      console.log('Seeding initial Kinattukara nursery data...');
      await seedDatabase();
      console.log('Kinattukara nursery data successfully initialized.');
    } catch (memError) {
      console.error(`In-Memory MongoDB Error: ${memError.message}`);
      process.exit(1);
    }
  }
};

process.on('SIGINT', async () => {
  if (mongodInstance) {
    await mongodInstance.stop();
  }
  process.exit(0);
});

