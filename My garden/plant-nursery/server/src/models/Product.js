import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    nursery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nursery',
      required: [true, 'Product must belong to a nursery'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product must have a category'],
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    salePrice: {
      type: Number,
      default: null,
    },
    images: {
      type: [String],
      default: [],
    },
    stockStatus: {
      type: String,
      enum: ['IN_STOCK', 'OUT_OF_STOCK', 'ON_BACKORDER'],
      default: 'IN_STOCK',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model('Product', productSchema);
