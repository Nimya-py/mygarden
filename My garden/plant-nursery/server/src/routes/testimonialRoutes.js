import express from 'express';
import { Testimonial } from '../models/Testimonial.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Seed initial default testimonials if none exist
const seedInitialTestimonials = async () => {
  try {
    const count = await Testimonial.countDocuments();
    if (count === 0) {
      await Testimonial.create([
        {
          name: 'Mr. Anto Nadumadam',
          place: 'Chemmalamattam',
          district: 'Kottayam District',
          phone: '94478619110',
          cultivation: '3 acre',
          plantationAge: '5 Year old plantation',
          rating: 5,
          comment: 'Kinattukara nutmeg plants delivered exceptional yield and consistent growth across our 3-acre plantation. Truly genuine and trustworthy quality.',
          status: 'approved',
          isFeatured: true,
        },
        {
          name: 'Mr. Thommachan Pallivathukkal',
          place: 'Mannarcadu',
          district: 'Palakadu District',
          phone: '9446991554',
          cultivation: '10 acre',
          plantationAge: '5 Year old plantation',
          rating: 5,
          comment: 'Outstanding vigor and heavy mace yield across our 10-acre estate. Their guidance and sapling quality have exceeded our expectations.',
          status: 'approved',
          isFeatured: true,
        },
      ]);
      console.log('Seeded initial customer testimonials successfully.');
    }
  } catch (err) {
    console.error('Error seeding testimonials:', err);
  }
};

seedInitialTestimonials();

// @desc    Get all approved testimonials (Public)
// @route   GET /api/testimonials
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ status: 'approved' }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Submit customer review (Public)
// @route   POST /api/testimonials
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const { name, place, district, phone, cultivation, plantationAge, rating, comment } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    const testimonial = await Testimonial.create({
      name: name.trim(),
      place: place?.trim() || '',
      district: district?.trim() || '',
      phone: phone?.trim() || '',
      cultivation: cultivation?.trim() || '',
      plantationAge: plantationAge?.trim() || '',
      rating: Number(rating) || 5,
      comment: comment?.trim() || '',
      status: 'pending', // Requires admin approval
    });

    return res.status(201).json({
      success: true,
      message: 'Testimonial submitted successfully. It will appear once approved by admin.',
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all testimonials for Admin (includes pending, approved, rejected)
// @route   GET /api/testimonials/admin
// @access  Private (Admin / Super Admin)
router.get('/admin', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Directly create a testimonial by Admin (auto-approved)
// @route   POST /api/testimonials/admin
// @access  Private (Admin / Super Admin)
router.post('/admin', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res, next) => {
  try {
    const { name, place, district, phone, cultivation, plantationAge, rating, comment, isFeatured, status } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Customer name is required.',
      });
    }

    const testimonial = await Testimonial.create({
      name: name.trim(),
      place: place?.trim() || '',
      district: district?.trim() || '',
      phone: phone?.trim() || '',
      cultivation: cultivation?.trim() || '',
      plantationAge: plantationAge?.trim() || '',
      rating: Number(rating) || 5,
      comment: comment?.trim() || '',
      status: status || 'approved',
      isFeatured: !!isFeatured,
    });

    return res.status(201).json({
      success: true,
      message: 'Testimonial created successfully.',
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private (Admin / Super Admin)
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res, next) => {
  try {
    const { name, place, district, phone, cultivation, plantationAge, rating, comment, status, isFeatured } = req.body;

    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found.',
      });
    }

    if (name !== undefined) testimonial.name = name.trim();
    if (place !== undefined) testimonial.place = place.trim();
    if (district !== undefined) testimonial.district = district.trim();
    if (phone !== undefined) testimonial.phone = phone.trim();
    if (cultivation !== undefined) testimonial.cultivation = cultivation.trim();
    if (plantationAge !== undefined) testimonial.plantationAge = plantationAge.trim();
    if (rating !== undefined) testimonial.rating = Number(rating);
    if (comment !== undefined) testimonial.comment = comment.trim();
    if (status !== undefined) testimonial.status = status;
    if (isFeatured !== undefined) testimonial.isFeatured = isFeatured;

    await testimonial.save();

    return res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully.',
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Approve / Reject testimonial status
// @route   PATCH /api/testimonials/:id/status
// @access  Private (Admin / Super Admin)
router.patch('/:id/status', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value.',
      });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Testimonial status updated to ${status}.`,
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin / Super Admin)
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
