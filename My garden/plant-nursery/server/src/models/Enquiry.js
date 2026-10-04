import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    nursery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nursery',
      required: [true, 'Enquiry must be associated with a nursery'],
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: null,
    },
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Customer phone is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Enquiry message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
