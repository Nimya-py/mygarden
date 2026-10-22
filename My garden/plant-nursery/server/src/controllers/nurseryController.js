import { Nursery } from '../models/Nursery.js';
import { User } from '../models/User.js';

// Helper to convert string to slug
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

// @desc    Get all approved nurseries (or all if SUPER_ADMIN)
// @route   GET /api/nurseries
// @access  Public
export const getNurseries = async (req, res, next) => {
  try {
    const nurseries = await Nursery.find().populate('owner', 'name email phone');

    res.status(200).json({
      success: true,
      count: nurseries.length,
      data: nurseries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get nursery by slug
// @route   GET /api/nurseries/:slug
// @access  Public
export const getNurseryBySlug = async (req, res, next) => {
  try {
    const nursery = await Nursery.findOne({ slug: req.params.slug }).populate('owner', 'name email phone');

    if (!nursery) {
      return res.status(404).json({
        success: false,
        message: 'Nursery not found',
      });
    }

    res.status(200).json({
      success: true,
      data: nursery,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in admin's nursery profile
// @route   GET /api/nurseries/my/profile
// @access  Private (ADMIN)
export const getMyNurseryProfile = async (req, res, next) => {
  try {
    let nursery = await Nursery.findOne({ owner: req.user._id });
    if (!nursery) {
      nursery = await Nursery.findOne();
    }

    if (!nursery) {
      return res.status(404).json({
        success: false,
        message: 'No nursery found for this account. Please set up your nursery details.',
      });
    }

    res.status(200).json({
      success: true,
      data: nursery,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or Update logged in admin's nursery profile
// @route   PUT /api/nurseries/my/profile
// @desc    Create or Update logged in admin's nursery profile
// @route   PUT /api/nurseries/my/profile
// @access  Private (ADMIN)
export const updateMyNurseryProfile = async (req, res, next) => {
  try {
    const {
      name,
      establishedYear,
      description,
      tagline,
      logo,
      coverImage,
      phone,
      whatsapp,
      email,
      altPhone,
      address,
      city,
      district,
      state,
      pincode,
      googleMapsLink,
      latitude,
      longitude,
      openingTime,
      closingTime,
      workingDays,
      openingHours,
      socialLinks,
    } = req.body;

    let nursery = await Nursery.findOne({ owner: req.user._id });
    if (!nursery) {
      nursery = await Nursery.findOne();
    }

    const slug = name ? slugify(name) : undefined;

    let effectiveOpeningHours = openingHours;
    if (openingTime && closingTime) {
      const daysCount = Array.isArray(workingDays) ? workingDays.length : 0;
      let daysLabel = '';
      if (daysCount === 7) {
        daysLabel = 'All Days';
      } else if (daysCount > 0) {
        daysLabel = workingDays.map((d) => d.slice(0, 3)).join(', ');
      }
      effectiveOpeningHours = daysLabel
        ? `${openingTime} - ${closingTime} (${daysLabel})`
        : `${openingTime} - ${closingTime}`;
    }

    if (!nursery) {
      // Create new nursery for this ADMIN
      nursery = await Nursery.create({
        name,
        slug: slug || `nursery-${Date.now()}`,
        establishedYear,
        description,
        tagline,
        logo,
        coverImage,
        phone,
        whatsapp,
        email,
        altPhone,
        address,
        city,
        district,
        state,
        pincode,
        googleMapsLink,
        latitude,
        longitude,
        openingTime,
        closingTime,
        workingDays: workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        openingHours: effectiveOpeningHours || openingHours || '9:00 AM - 6:00 PM',
        socialLinks: socialLinks || { instagram: '', facebook: '', youtube: '' },
        owner: req.user._id,
        isApproved: true,
      });
    } else {
      // Update existing nursery owned by this user
      if (name !== undefined) nursery.name = name;
      if (slug) nursery.slug = slug;
      if (establishedYear !== undefined) nursery.establishedYear = establishedYear;
      if (description !== undefined) nursery.description = description;
      if (tagline !== undefined) nursery.tagline = tagline;
      if (logo !== undefined) nursery.logo = logo;
      if (coverImage !== undefined) nursery.coverImage = coverImage;
      if (phone !== undefined) nursery.phone = phone;
      if (whatsapp !== undefined) nursery.whatsapp = whatsapp;
      if (email !== undefined) nursery.email = email;
      if (altPhone !== undefined) nursery.altPhone = altPhone;
      if (address !== undefined) nursery.address = address;
      if (city !== undefined) nursery.city = city;
      if (district !== undefined) nursery.district = district;
      if (state !== undefined) nursery.state = state;
      if (pincode !== undefined) nursery.pincode = pincode;
      if (googleMapsLink !== undefined) nursery.googleMapsLink = googleMapsLink;
      if (latitude !== undefined) nursery.latitude = latitude;
      if (longitude !== undefined) nursery.longitude = longitude;
      if (openingTime !== undefined) nursery.openingTime = openingTime;
      if (closingTime !== undefined) nursery.closingTime = closingTime;
      if (workingDays !== undefined) nursery.workingDays = workingDays;
      if (effectiveOpeningHours) {
        nursery.openingHours = effectiveOpeningHours;
      } else if (openingHours !== undefined) {
        nursery.openingHours = openingHours;
      }
      if (socialLinks !== undefined) nursery.socialLinks = socialLinks;

      await nursery.save();
    }

    res.status(200).json({
      success: true,
      message: 'Nursery profile updated successfully',
      data: nursery,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Super Admin: Approve or Reject a nursery
// @route   PATCH /api/nurseries/:id/approve
// @access  Private (SUPER_ADMIN)
export const toggleNurseryApproval = async (req, res, next) => {
  try {
    const { isApproved } = req.body;
    const nursery = await Nursery.findById(req.params.id);

    if (!nursery) {
      return res.status(404).json({
        success: false,
        message: 'Nursery not found',
      });
    }

    nursery.isApproved = typeof isApproved === 'boolean' ? isApproved : !nursery.isApproved;
    await nursery.save();

    res.status(200).json({
      success: true,
      message: `Nursery approval status changed to ${nursery.isApproved}`,
      data: nursery,
    });
  } catch (error) {
    next(error);
  }
};
