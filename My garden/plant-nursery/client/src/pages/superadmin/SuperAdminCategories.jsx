import React, { useEffect, useState } from 'react';
import { Grid, Plus, Edit, Trash2, Save, X, AlertCircle } from 'lucide-react';
import API from '../../services/api';

export const SuperAdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await API.get('/categories');
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', image: '' });
    setError('');
    setShowModal(true);
  };

  const openEditModal = (cat) => {
    setEditingId(cat._id);
    setFormData({
      name: cat.name,
      description: cat.description || '',
      image: cat.image || '',
    });
    setError('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (editingId) {
        await API.put(`/categories/${editingId}`, formData);
      } else {
        await API.post('/categories', formData);
      }
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save category.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;

    try {
      const res = await API.delete(`/categories/${id}`);
      if (res.data.success) {
        setCategories(categories.filter((c) => c._id !== id));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete category.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8DF] pb-5">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#0B2115] tracking-tight">Botanical Categories</h1>
          <p className="text-sm text-[#526651] mt-1 font-medium">Manage platform taxonomy for grouping nursery plants.</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold px-4 py-2.5 rounded-lg text-xs transition-colors inline-flex items-center space-x-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {loading ? (
        <div className="py-24 text-center space-y-3 bg-white rounded-2xl border border-[#E2E8DF] shadow-xs">
          <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-serif text-sm text-[#526651]">Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-[#E2E8DF] shadow-xs">
          <p className="text-sm text-[#526651]">No categories found. Click 'Add New Category' to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat._id} className="bg-white rounded-2xl overflow-hidden border border-[#E2E8DF] space-y-3 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-44 rounded-xl overflow-hidden relative bg-[#EAE6DB] border border-[#E2E8DF]">
                  <img
                    src={cat.image || '/images/cat-nutmeg.jpg'}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-3">
                  <h3 className="font-serif text-xl font-bold text-[#0B2115]">{cat.name}</h3>
                  <p className="text-xs text-[#526651] line-clamp-2 mt-1">{cat.description || 'No description provided.'}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8DF] flex items-center justify-between">
                <span className="text-[11px] text-[#163A24] font-mono bg-[#EAF0E8] px-2 py-0.5 rounded">/{cat.slug}</span>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 bg-[#FAFBF9] hover:bg-[#EAF0E8] text-[#163A24] border border-[#D6DDD5] rounded-lg transition-colors"
                    title="Edit category"
                    aria-label="Edit category"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id, cat.name)}
                    className="p-1.5 bg-[#FDF2F2] hover:bg-red-100 text-red-700 border border-red-200 rounded-lg transition-colors"
                    title="Delete category"
                    aria-label="Delete category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#E2E8DF] p-6 shadow-xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#E2E8DF] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#0B2115]">
                {editingId ? 'Edit Category' : 'Create Category'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#526651] hover:text-[#0B2115] p-1 rounded-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label htmlFor="cat-name-input" className="block text-xs font-semibold text-[#172018] mb-1">
                  Category Name *
                </label>
                <input
                  id="cat-name-input"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Spice Plants"
                  className="w-full bg-[#FAFBF9] border border-[#D6DDD5] rounded-lg px-3 py-2 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
                />
              </div>

              <div>
                <label htmlFor="cat-desc-input" className="block text-xs font-semibold text-[#172018] mb-1">
                  Description
                </label>
                <textarea
                  id="cat-desc-input"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short description of this category..."
                  className="w-full bg-[#FAFBF9] border border-[#D6DDD5] rounded-lg px-3 py-2 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
                />
              </div>

              <div>
                <label htmlFor="cat-image-input" className="block text-xs font-semibold text-[#172018] mb-1">
                  Image Path / URL
                </label>
                <input
                  id="cat-image-input"
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/cat-spices.jpg"
                  className="w-full bg-[#FAFBF9] border border-[#D6DDD5] rounded-lg px-3 py-2 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-[#D6DDD5] text-xs font-medium text-[#526651] hover:bg-[#F2F4EF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] text-xs font-semibold"
                >
                  {submitting ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
