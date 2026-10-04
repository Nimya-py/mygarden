import mongoose from 'mongoose';

const awardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'ISO 9001:2000',
      required: true,
    },
    certification: {
      type: String,
      default: 'Quality Management Certification',
    },
    year: {
      type: String,
      default: '2008',
    },
    organization: {
      type: String,
      default: 'American National Accreditation Board (ANAB)',
    },
    description: {
      type: String,
      default:
        'Kinattukara Nutmeg Nursery received ISO 9001:2000 certification in 2008 through the American National Accreditation Board (ANAB).',
    },
    certificateImage: {
      type: String,
      default: '',
    },
    awardReceivingImage: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const Award = mongoose.model('Award', awardSchema);
