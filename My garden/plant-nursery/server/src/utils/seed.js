import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Nursery } from '../models/Nursery.js';
import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';
import { Enquiry } from '../models/Enquiry.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    // Clear existing collections
    await User.deleteMany({});
    await Nursery.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Enquiry.deleteMany({});

    console.log('Cleared old database records.');

    // 1. Create Super Admin
    const superAdmin = await User.create({
      name: 'Super Admin',
      email: 'superadmin@kinattukara.com',
      password: 'SuperAdmin123!',
      phone: '+91 9447312890',
      role: 'SUPER_ADMIN',
      isActive: true,
    });

    // 2. Create Nursery Admin (Kinattukara Owner)
    const nurseryAdmin = await User.create({
      name: 'Kinattukara Nursery Owner',
      email: 'admin@kinattukara.com',
      password: 'Kinattukara123!',
      phone: '+91 9447312890',
      role: 'ADMIN',
      isActive: true,
    });

    // 3. Create Sample Customer
    const customer = await User.create({
      name: 'Ramesh Varma',
      email: 'ramesh.farmer@example.com',
      password: 'Customer123!',
      phone: '+91 9847123456',
      role: 'CUSTOMER',
      isActive: true,
    });

    console.log('Created users: Super Admin, Nursery Admin, Customer');

    // 4. Create Nursery Record
    const nursery = await Nursery.create({
      name: 'Kinattukara Nutmeg Plantation & Nursery',
      slug: 'kinattukara-nutmeg-nursery',
      description: 'An ancestral business started 35 years ago by Mr. K.T. Mathew and Mr. Arun Mathew. ISO 9001:2000 certified by ANAB, producing exceptional grafted nutmeg saplings yielding up to 60% Oleoresins in mace.',
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
      latitude: 10.5276,
      longitude: 76.2144,
      openingHours: '8:00 AM - 6:30 PM (Mon-Sat)',
      isApproved: true,
      owner: nurseryAdmin._id,
    });

    console.log(`Created Nursery: ${nursery.name}`);

    // 5. Create the 4 Required Categories
    const categoriesData = [
      {
        name: 'Nutmeg Plants',
        slug: 'nutmeg',
        description: 'Premium varieties and healthy saplings',
        image: '/images/cat-nutmeg.jpg',
      },
      {
        name: 'Spice Plants',
        slug: 'spices',
        description: 'Cardamom, Pepper, Clove and more',
        image: '/images/cat-spices.jpg',
      },
      {
        name: 'Fruit Plants',
        slug: 'fruits',
        description: 'Mango, Jackfruit, Guava and more',
        image: '/images/cat-fruits.jpg',
      },
      {
        name: 'Ornamental Plants',
        slug: 'ornamental',
        description: 'Beautiful plants for home and garden',
        image: '/images/cat-ornamental.jpg',
      },
    ];

    const categories = await Category.insertMany(categoriesData);
    console.log(`Created ${categories.length} categories.`);

    const nutmegCat = categories.find((c) => c.slug === 'nutmeg');
    const spiceCat = categories.find((c) => c.slug === 'spices');
    const fruitCat = categories.find((c) => c.slug === 'fruits');
    const ornamentalCat = categories.find((c) => c.slug === 'ornamental');

    // 6. Create Authentic Kerala Nursery Products
    const productsData = [
      {
        nursery: nursery._id,
        category: nutmegCat._id,
        name: 'Grafted Nutmeg - Keralashree Variety',
        slug: 'grafted-nutmeg-keralashree',
        description: 'Selected heavy-bearing scion wood grafted on hardy native rootstock. Yields thick crimson mace and heavy aromatic nuts.',
        price: 350,
        salePrice: 320,
        images: ['/images/cat-nutmeg.jpg', '/images/hero-nutmeg.jpg'],
        stockStatus: 'IN_STOCK',
        featured: true,
        isActive: true,
      },
      {
        nursery: nursery._id,
        category: nutmegCat._id,
        name: 'Viswashree Grafted Nutmeg Sapling',
        slug: 'viswashree-grafted-nutmeg',
        description: 'Proven commercial cultivar with high essential oil content, early canopy development, and reliable fruit setting.',
        price: 380,
        salePrice: 350,
        images: ['/images/hero-nutmeg.jpg', '/images/cta-nutmeg.jpg'],
        stockStatus: 'IN_STOCK',
        featured: true,
        isActive: true,
      },
      {
        nursery: nursery._id,
        category: spiceCat._id,
        name: 'Panniyur-1 Black Pepper Vines',
        slug: 'panniyur-1-black-pepper',
        description: 'Acclimated rooted pepper cuttings with vigorous climbing habit and heavy long spike formation.',
        price: 80,
        salePrice: 70,
        images: ['/images/cat-spices.jpg'],
        stockStatus: 'IN_STOCK',
        featured: true,
        isActive: true,
      },
      {
        nursery: nursery._id,
        category: spiceCat._id,
        name: 'Malabar Green Cardamom Seedlings',
        slug: 'malabar-green-cardamom',
        description: 'Shade-loving aromatic spice plants with high capsule formation suitable for Kerala mixed farming plantations.',
        price: 120,
        salePrice: 110,
        images: ['/images/cat-spices.jpg'],
        stockStatus: 'IN_STOCK',
        featured: true,
        isActive: true,
      },
      {
        nursery: nursery._id,
        category: fruitCat._id,
        name: 'Vietnam Super Early Jackfruit (Grafted)',
        slug: 'vietnam-super-early-jackfruit',
        description: 'Dwarf bearing grafted jackfruit yielding sweet golden flakes within 18 to 24 months in gardens or orchards.',
        price: 250,
        salePrice: 220,
        images: ['/images/cat-fruits.jpg'],
        stockStatus: 'IN_STOCK',
        featured: true,
        isActive: true,
      },
      {
        nursery: nursery._id,
        category: fruitCat._id,
        name: 'Alphonso Mango Grafted Sapling',
        slug: 'alphonso-mango-grafted-sapling',
        description: 'True-to-type mother branch grafted mango with fragrant pulp and compact garden canopy.',
        price: 220,
        salePrice: 199,
        images: ['/images/cat-fruits.jpg'],
        stockStatus: 'IN_STOCK',
        featured: true,
        isActive: true,
      },
      {
        nursery: nursery._id,
        category: ornamentalCat._id,
        name: 'Exotic Tropical Heliconia & Cordyline',
        slug: 'tropical-heliconia-and-cordyline',
        description: 'Vibrant foliage and architectural blooms for luxury home landscapes, shade borders, and courtyards.',
        price: 190,
        salePrice: 160,
        images: ['/images/cat-ornamental.jpg'],
        stockStatus: 'IN_STOCK',
        featured: true,
        isActive: true,
      },
    ];

    const products = await Product.insertMany(productsData);
    console.log(`Created ${products.length} products.`);
    console.log('Kinattukara Database Seeding Complete!');
  } catch (error) {
    console.error('Seeding Error:', error);
    throw error;
  }
};

const isDirectRun = process.argv[1] && process.argv[1].replace(/\\/g, '/').includes('src/utils/seed.js');
if (isDirectRun) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log('Connected to MongoDB for direct seeding...');
      await seedDatabase();
      process.exit(0);
    })
    .catch((err) => {
      console.error('Direct Seeding Error:', err);
      process.exit(1);
    });
}
