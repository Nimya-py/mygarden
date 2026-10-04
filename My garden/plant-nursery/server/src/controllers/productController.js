import { Product } from '../models/Product.js';
import { Nursery } from '../models/Nursery.js';
import { Category } from '../models/Category.js';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

// @desc    Get all active products with search & filter
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { search, category, nursery, featured, minPrice, maxPrice } = req.query;

    let query = { isActive: true };

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      // Allow category by slug or ID
      const catDoc = await Category.findOne({
        $or: [{ _id: category.match(/^[0-9a-fA-F]{24}$/) ? category : null }, { slug: category }],
      });
      if (catDoc) {
        query.category = catDoc._id;
      }
    }

    if (nursery) {
      const nurDoc = await Nursery.findOne({
        $or: [{ _id: nursery.match(/^[0-9a-fA-F]{24}$/) ? nursery : null }, { slug: nursery }],
      });
      if (nurDoc) {
        query.nursery = nurDoc._id;
      }
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query)
      .populate('nursery', 'name slug city state whatsapp phone isApproved')
      .populate('category', 'name slug');

    // Only show products from approved nurseries in public view unless super admin
    const filteredProducts = req.user?.role === 'SUPER_ADMIN'
      ? products
      : products.filter((p) => p.nursery && p.nursery.isApproved !== false);

    res.status(200).json({
      success: true,
      count: filteredProducts.length,
      data: filteredProducts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product by slug
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('nursery', 'name slug description phone whatsapp email address city district state pincode logo coverImage openingHours')
      .populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get products owned by logged in admin
// @route   GET /api/products/my/all
// @access  Private (ADMIN)
export const getMyProducts = async (req, res, next) => {
  try {
    const nursery = await Nursery.findOne({ owner: req.user._id });
    if (!nursery) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
      });
    }

    const products = await Product.find({ nursery: nursery._id })
      .populate('category', 'name slug')
      .populate('nursery', 'name slug');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product for logged in admin's nursery
// @route   POST /api/products
// @access  Private (ADMIN, SUPER_ADMIN)
export const createProduct = async (req, res, next) => {
  try {
    const { name, category, description, price, salePrice, images, stockStatus, featured } = req.body;

    // Find nursery for logged-in user
    let nurseryId;
    if (req.user.role === 'SUPER_ADMIN' && req.body.nursery) {
      nurseryId = req.body.nursery;
    } else {
      const nursery = await Nursery.findOne({ owner: req.user._id });
      if (!nursery) {
        return res.status(400).json({
          success: false,
          message: 'You must set up your Nursery details before adding products.',
        });
      }
      nurseryId = nursery._id;
    }

    if (!name || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, category and price are required',
      });
    }

    const slug = slugify(`${name}-${Date.now().toString().slice(-4)}`);

    const product = await Product.create({
      nursery: nurseryId,
      category,
      name,
      slug,
      description,
      price,
      salePrice: salePrice || null,
      images: images || [],
      stockStatus: stockStatus || 'IN_STOCK',
      featured: featured || false,
    });

    const populatedProduct = await Product.findById(product._id)
      .populate('nursery', 'name slug')
      .populate('category', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: populatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (ADMIN, SUPER_ADMIN)
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('nursery');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Security Isolation: Verify ownership
    if (
      req.user.role !== 'SUPER_ADMIN' &&
      (!product.nursery || product.nursery.owner.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to modify this product.',
      });
    }

    const { name, category, description, price, salePrice, images, stockStatus, featured, isActive } = req.body;

    if (name) {
      product.name = name;
      product.slug = slugify(`${name}-${product._id.toString().slice(-4)}`);
    }
    if (category) product.category = category;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (salePrice !== undefined) product.salePrice = salePrice;
    if (images !== undefined) product.images = images;
    if (stockStatus !== undefined) product.stockStatus = stockStatus;
    if (featured !== undefined) product.featured = featured;
    if (isActive !== undefined) product.isActive = isActive;

    await product.save();

    const updatedProduct = await Product.findById(product._id)
      .populate('nursery', 'name slug')
      .populate('category', 'name slug');

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (ADMIN, SUPER_ADMIN)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('nursery');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Security Isolation: Verify ownership
    if (
      req.user.role !== 'SUPER_ADMIN' &&
      (!product.nursery || product.nursery.owner.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to delete this product.',
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
