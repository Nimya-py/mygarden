import express from 'express';
import { Award } from '../models/Award.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();


// @desc    Get ISO 9001:2000 Award & Certificate Information
// @route   GET /api/awards
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    let award = await Award.findOne();
    if (!award) {
      award = await Award.create({
        title: 'ISO 9001:2000',
        certification: 'Quality Management Certification',
        year: '2008',
        organization: 'American National Accreditation Board (ANAB)',
        description:
          'Kinattukara Nutmeg Nursery received ISO 9001:2000 certification in 2008 through the American National Accreditation Board (ANAB).',
        certificateImage: '',
      });
    }
    return res.status(200).json({
      success: true,
      data: award,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update Award & Certificate Image
// @route   PUT /api/awards
// @access  Private (Admin / Super Admin)
router.put('/', requireAdmin, async (req, res, next) => {
  try {
    const {
      title,
      certification,
      year,
      organization,
      description,
      certificateImage,
      awardReceivingImage,
    } = req.body;

    let award = await Award.findOne();
    if (!award) {
      award = new Award();
    }

    if (title !== undefined) award.title = title;
    if (certification !== undefined) award.certification = certification;
    if (year !== undefined) award.year = year;
    if (organization !== undefined) award.organization = organization;
    if (description !== undefined) award.description = description;
    if (certificateImage !== undefined) award.certificateImage = certificateImage;
    if (awardReceivingImage !== undefined) award.awardReceivingImage = awardReceivingImage;

    await award.save();

    return res.status(200).json({
      success: true,
      message: 'Award and certificate information updated successfully',
      data: award,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
