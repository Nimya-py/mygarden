import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { seedDatabase } from '../utils/seed.js';

import { Category } from '../models/Category.js';
import { Nursery } from '../models/Nursery.js';

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
      
      // Auto-populate initial seed data only if explicitly requested
      if (process.env.AUTO_SEED === 'true') {
        console.log('Seeding initial Kinattukara nursery data...');
        await seedDatabase();
        console.log('Kinattukara nursery data successfully initialized.');
      } else {
        // Ensure standard category definitions exist if none found
        const catCount = await Category.countDocuments();
        if (catCount === 0) {
          await Category.insertMany([
            { name: 'Nutmeg Plants', slug: 'nutmeg', description: 'Premium varieties and healthy saplings', image: '/images/cat-nutmeg.jpg' },
            { name: 'Spice Plants', slug: 'spices', description: 'Cardamom, Pepper, Clove and more', image: '/images/cat-spices.jpg' },
            { name: 'Fruit Plants', slug: 'fruits', description: 'Mango, Jackfruit, Guava and more', image: '/images/cat-fruits.jpg' },
            { name: 'Ornamental Plants', slug: 'ornamental', description: 'Beautiful plants for home and garden', image: '/images/cat-ornamental.jpg' },
          ]);
        }

        // Ensure baseline nursery shell exists without an owner
        const nurseryCount = await Nursery.countDocuments();
        if (nurseryCount === 0) {
          await Nursery.create({
            name: 'Kinattukara Nutmeg Plantation & Nursery',
            slug: 'kinattukara-nutmeg-nursery',
            description: 'Producing exceptional grafted nutmeg saplings and authentic Kerala plantation crops.',
            logo: '/images/hero-nutmeg.jpg',
            coverImage: '/images/hero-nutmeg.jpg',
            phone: '+91 94473 12890',
            whatsapp: '919447312890',
            email: 'info@kinattukara.com',
            address: 'Kinattukara, Thrissur / Palakkad Highway',
            city: 'Thrissur',
            district: 'Thrissur',
            state: 'Kerala',
            pincode: '680001',
            openingHours: '8:00 AM - 6:30 PM (Mon-Sat)',
            isApproved: true,
            owner: null,
          });
        }
      }
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

