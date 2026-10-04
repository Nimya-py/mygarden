import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  AlertCircle,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import API from '../../services/api';

export const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    salePrice: '',
    images: [''],
    stockStatus: 'IN_STOCK',
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const catRes = await API.get('/categories');
        if (catRes.data.success) {
          setCategories(catRes.data.data);
          if (!isEdit && catRes.data.data.length > 0) {
            setFormData((prev) => ({ ...prev, category: catRes.data.data[0]._id }));
          }
        }

        if (isEdit) {
          const prodRes = await API.get('/products/my/all');
          if (prodRes.data.success) {
            const prod = prodRes.data.data.find((p) => p._id === id);
            if (prod) {
              setFormData({
                name: prod.name,
                category: prod.category?._id || prod.category,
                description: prod.description || '',
                price: prod.price,
                salePrice: prod.salePrice || '',
                images: prod.images && prod.images.length > 0 ? prod.images : [''],
                stockStatus: prod.stockStatus || 'IN_STOCK',
                featured: Boolean(prod.featured),
              });
            } else {
              const publicRes = await API.get('/products');
              if (publicRes.data.success) {
                const p = publicRes.data.data.find((item) => item._id === id);
                if (p) {
                  setFormData({
                    name: p.name,
                    category: p.category?._id || p.category,
                    description: p.description || '',
                    price: p.price,
                    salePrice: p.salePrice || '',
                    images: p.images && p.images.length > 0 ? p.images : [''],
                    stockStatus: p.stockStatus || 'IN_STOCK',
                    featured: Boolean(p.featured),
                  });
                }
              }
            }
          }
        }
      } catch (err) {
        console.error('Error loading form data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEdit]);

  const handleImageChange = (index, value) => {
    const updated = [...formData.images];
    updated[index] = value;
    setFormData({ ...formData, images: updated });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index) => {
    const updated = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updated.length ? updated : [''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const cleanImages = formData.images.filter((img) => img.trim() !== '');

    const payload = {
      ...formData,
      price: Number(formData.price),
      salePrice: formData.salePrice ? Number(formData.salePrice) : null,
      images: cleanImages,
    };

    try {
      if (isEdit) {
        await API.put(`/products/${id}`, payload);
      } else {
        await API.post('/products', payload);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product details.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3 bg-white rounded-2xl border border-[#E2E8DF] shadow-xs max-w-4xl mx-auto">
        <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-serif text-sm text-[#526651]">Loading plant specimen details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-14">
      
      {/* Page Header with Back Button */}
      <div className="flex items-center space-x-4 border-b border-[#E2E8DF] pb-5">
        <Link
          to="/admin/products"
          className="p-2.5 bg-white hover:bg-[#F2F4EF] text-[#163A24] border border-[#D6DDD5] rounded-xl transition-colors shadow-2xs"
          title="Back to Products Catalog"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#0B2115] tracking-tight">
            {isEdit ? 'Edit Plant Specimen' : 'Add New Plant Specimen'}
          </h1>
          <p className="text-sm text-[#526651] mt-0.5 font-medium">
            Enter botanical specifications, stock status, and pricing details.
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-[#FDF2F2] border border-[#F8B4B4] rounded-xl text-xs text-[#9B1C1C] flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 text-[#D32F2F] shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
          <button
            type="button"
            onClick={() => setError('')}
            className="text-[#9B1C1C] font-bold px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Clean Light Form Container */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Section 1: Basic Specifications */}
        <section className="bg-white rounded-2xl border border-[#E2E8DF] p-6 sm:p-7 shadow-xs space-y-5">
          <div className="border-b border-[#F0F3EE] pb-3">
            <h2 className="font-serif text-base font-semibold text-[#0B2115]">
              Plant Details & Categorization
            </h2>
            <p className="text-xs text-[#637863]">
              Define the botanical cultivar, catalog collection, and inventory state.
            </p>
          </div>

          <div className="space-y-4">
            {/* Plant Name */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#172018]">
                Plant Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Grafted Nutmeg - Keralashree Variety"
                className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs"
              />
            </div>

            {/* Category & Stock Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#172018]">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24] transition-all cursor-pointer shadow-2xs"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#172018]">
                  Stock Status
                </label>
                <select
                  value={formData.stockStatus}
                  onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24] transition-all cursor-pointer shadow-2xs"
                >
                  <option value="IN_STOCK">In Stock</option>
                  <option value="OUT_OF_STOCK">Out of Stock</option>
                  <option value="ON_BACKORDER">On Backorder</option>
                </select>
              </div>
            </div>

            {/* Regular Price & Sale Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#172018]">
                  Regular Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="350"
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#172018]">
                  Sale Price (₹) <span className="text-[#637863] font-normal">(Optional)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.salePrice}
                  onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                  placeholder="320"
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Botanical Description */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#172018]">
                Botanical Description
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe plant foliage, yield characteristics, grafting technique, and canopy growth..."
                className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs leading-relaxed"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Section 2: Plant Imagery */}
        <section className="bg-white rounded-2xl border border-[#E2E8DF] p-6 sm:p-7 shadow-xs space-y-4">
          <div className="border-b border-[#F0F3EE] pb-3">
            <h2 className="font-serif text-base font-semibold text-[#0B2115]">
              Plant Photographs & Media
            </h2>
            <p className="text-xs text-[#637863]">
              Provide links or local file paths to showcase the foliage, rootstock, or fruit.
            </p>
          </div>

          <div className="space-y-3">
            {formData.images.map((img, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                {/* Visual Thumbnail Preview if valid URL */}
                <div className="w-11 h-11 rounded-lg border border-[#D6DDD5] bg-[#FAFBF9] flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                  {img && img.trim() ? (
                    <img
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-[#A4B5A3]" />
                  )}
                </div>

                <div className="flex-grow">
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    placeholder="/images/cat-nutmeg.jpg or https://images.unsplash.com/..."
                    className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs"
                  />
                </div>

                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(idx)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addImageField}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#163A24] hover:text-[#0B2115] hover:underline pt-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Image Field</span>
            </button>
          </div>
        </section>

        {/* Section 3: Highlight & Placement Settings */}
        <section className="bg-white rounded-2xl border border-[#E2E8DF] p-6 shadow-xs">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 mt-0.5 accent-[#163A24] rounded cursor-pointer"
            />
            <div>
              <span className="block text-xs font-semibold text-[#172018]">
                Feature this Specimen on Public Homepage
              </span>
              <span className="block text-[11px] text-[#637863] mt-0.5">
                Displays this plant prominently on the main sanctuary landing page under featured collections.
              </span>
            </div>
          </label>
        </section>

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
          <Link
            to="/admin/products"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold text-[#465945] hover:text-[#0B2115] bg-white hover:bg-[#F2F4EF] border border-[#D6DDD5] transition-all flex items-center justify-center space-x-1.5 shadow-2xs"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold px-8 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-xs hover:shadow disabled:opacity-50"
          >
            {submitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-[#F7F5EE] border-t-transparent rounded-full animate-spin"></div>
                <span>Saving Specimen...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{isEdit ? 'Update Plant Specimen' : 'Create Plant Specimen'}</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
