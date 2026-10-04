import { Enquiry } from '../models/Enquiry.js';
import { Nursery } from '../models/Nursery.js';

// @desc    Submit a new enquiry
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req, res, next) => {
  try {
    const { nursery, product, name, phone, email, message } = req.body;

    if (!nursery || !name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Nursery ID, name, phone and message are required',
      });
    }

    const enquiry = await Enquiry.create({
      nursery,
      product: product || null,
      customer: req.user ? req.user._id : null,
      name,
      phone,
      email: email || '',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. The nursery will contact you soon.',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get enquiries (Nursery Admin sees own nursery's, Super Admin sees all)
// @route   GET /api/enquiries
// @access  Private (ADMIN, SUPER_ADMIN)
export const getEnquiries = async (req, res, next) => {
  try {
    let filter = {};

    if (req.user.role === 'ADMIN') {
      const nursery = await Nursery.findOne({ owner: req.user._id });
      if (!nursery) {
        return res.status(200).json({
          success: true,
          count: 0,
          data: [],
        });
      }
      filter.nursery = nursery._id;
    }

    const enquiries = await Enquiry.find(filter)
      .populate('nursery', 'name slug phone whatsapp email')
      .populate('product', 'name price images slug')
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status
// @route   PATCH /api/enquiries/:id/status
// @access  Private (ADMIN, SUPER_ADMIN)
export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findById(req.params.id).populate('nursery');

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    // Role Security: Admin can only update status of enquiries belonging to their own nursery
    if (
      req.user.role !== 'SUPER_ADMIN' &&
      (!enquiry.nursery || enquiry.nursery.owner.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You cannot modify enquiries for another nursery.',
      });
    }

    if (!['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    enquiry.status = status;
    await enquiry.save();

    res.status(200).json({
      success: true,
      message: `Enquiry status updated to ${status}`,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (ADMIN, SUPER_ADMIN)
export const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id).populate('nursery');

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    // Role Security: Admin can only delete enquiries belonging to their own nursery
    if (
      req.user.role !== 'SUPER_ADMIN' &&
      (!enquiry.nursery || enquiry.nursery.owner.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You cannot delete enquiries for another nursery.',
      });
    }

    await enquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Enquiry removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

