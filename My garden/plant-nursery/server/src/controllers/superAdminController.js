import { User } from '../models/User.js';
import { Nursery } from '../models/Nursery.js';
import { Product } from '../models/Product.js';
import { Enquiry } from '../models/Enquiry.js';
import { Category } from '../models/Category.js';

// @desc    Get Super Admin Dashboard Overview Statistics
// @route   GET /api/super-admin/stats
// @access  Private (SUPER_ADMIN)
export const getPlatformStats = async (req, res, next) => {
  try {
    const totalNurseries = await Nursery.countDocuments();
    const pendingNurseries = await Nursery.countDocuments({ isApproved: false });
    const totalAdmins = await User.countDocuments({ role: 'ADMIN' });
    const totalCustomers = await User.countDocuments({ role: 'CUSTOMER' });
    const totalProducts = await Product.countDocuments();
    const totalEnquiries = await Enquiry.countDocuments();
    const pendingEnquiries = await Enquiry.countDocuments({ status: 'PENDING' });
    const totalCategories = await Category.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalNurseries,
        pendingNurseries,
        totalAdmins,
        totalCustomers,
        totalProducts,
        totalEnquiries,
        pendingEnquiries,
        totalCategories,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get users by role (ADMIN or CUSTOMER)
// @route   GET /api/super-admin/users
// @access  Private (SUPER_ADMIN)
export const getUsersByRole = async (req, res, next) => {
  try {
    const { role } = req.query;
    let filter = {};
    if (role) filter.role = role;

    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle user active status (deactivate/activate account)
// @route   PATCH /api/super-admin/users/:id/status
// @access  Private (SUPER_ADMIN)
export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.role === 'SUPER_ADMIN') {
      return res.status(400).json({
        success: false,
        message: 'Cannot deactivate SUPER_ADMIN account.',
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User status changed to ${user.isActive ? 'active' : 'inactive'}`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    next(error);
  }
};
