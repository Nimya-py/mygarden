import React, { useEffect, useState } from 'react';
import { Grid, Plus, Edit, Trash2, Save, X } from 'lucide-react';
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
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#183522] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-light text-[#FAF9F5]">Botanical Categories</h1>
          <p className="text-xs text-[#FAF9F5]/60 mt-1">Manage platform taxonomy for grouping nursery plants.</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#6F9657] hover:bg-[#B9A36A] text-[#0B0F0C] font-semibold px-4 py-2.5 rounded-lg text-xs transition-colors flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-[#FAF9F5]/50">Loading categories...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat._id} className="glass-card rounded-2xl overflow-hidden border border-[#183522] space-y-3 p-5">
              <div className="h-40 rounded-xl overflow-hidden relative">
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80'}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#FAF9F5]">{cat.name}</h3>
                <p className="text-xs text-[#FAF9F5]/60 line-clamp-2 mt-1">{cat.description}</p>
              </div>

              <div className="pt-3 border-t border-[#183522] flex items-center justify-between">
                <span className="text-[10px] text-[#B9A36A] font-mono">/{cat.slug}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 bg-[#183522] text-[#6F9657] rounded hover:text-white"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id, cat.name)}
                    className="p-1.5 bg-red-950/50 text-red-400 rounded hover:text-white"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0B0F0C] border border-[#6F9657]/40 w-full max-w-lg p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#183522] pb-3">
              <h3 className="font-serif text-2xl text-[#FAF9F5]">
                {editingId ? 'Edit Category' : 'Add Category'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-[#FAF9F5]/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#FAF9F5]/70 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Indoor Plants"
                  className="w-full bg-[#183522]/30 border border-[#6F9657]/30 rounded-xl px-4 py-2 text-xs text-[#FAF9F5] focus:outline-none focus:border-[#B9A36A]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#FAF9F5]/70 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short description..."
                  className="w-full bg-[#183522]/30 border border-[#6F9657]/30 rounded-xl px-4 py-2 text-xs text-[#FAF9F5] focus:outline-none focus:border-[#B9A36A]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs text-[#FAF9F5]/70 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#183522]/30 border border-[#6F9657]/30 rounded-xl px-4 py-2 text-xs text-[#FAF9F5] focus:outline-none focus:border-[#B9A36A]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs text-[#FAF9F5]/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#6F9657] hover:bg-[#B9A36A] text-[#0B0F0C] font-semibold px-5 py-2 rounded-xl text-xs"
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
