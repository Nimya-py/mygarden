import React, { useEffect, useState } from 'react';
import {
  Star,
  Plus,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit2,
  Phone,
  MapPin,
  Sprout,
  Calendar,
  MessageSquare,
  AlertCircle,
  X,
  Search,
  Check,
} from 'lucide-react';
import API from '../../services/api';

export const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [filter, setFilter] = useState('ALL'); // ALL, PENDING, APPROVED, REJECTED
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    district: '',
    phone: '',
    cultivation: '',
    plantationAge: '',
    rating: 5,
    comment: '',
    status: 'approved',
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await API.get('/testimonials/admin');
      if (res.data?.success) {
        setTestimonials(res.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
      setError('Failed to load testimonials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      place: '',
      district: '',
      phone: '',
      cultivation: '',
      plantationAge: '',
      rating: 5,
      comment: '',
      status: 'approved',
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      place: item.place || '',
      district: item.district || '',
      phone: item.phone || '',
      cultivation: item.cultivation || '',
      plantationAge: item.plantationAge || '',
      rating: item.rating || 5,
      comment: item.comment || '',
      status: item.status || 'approved',
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await API.patch(`/testimonials/${id}/status`, { status: newStatus });
      if (res.data?.success) {
        setTestimonials((prev) =>
          prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
        );
        setSuccessMsg(`Testimonial ${newStatus === 'approved' ? 'approved' : 'rejected'} successfully.`);
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      alert('Failed to update status. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this testimonial?')) return;

    try {
      const res = await API.delete(`/testimonials/${id}`);
      if (res.data?.success) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
        setSuccessMsg('Testimonial deleted successfully.');
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      alert('Failed to delete testimonial.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Customer name is required.');
      return;
    }

    try {
      setSubmitting(true);
      if (editingItem) {
        const res = await API.put(`/testimonials/${editingItem._id}`, formData);
        if (res.data?.success) {
          setTestimonials((prev) =>
            prev.map((t) => (t._id === editingItem._id ? res.data.data : t))
          );
          setSuccessMsg('Testimonial updated successfully.');
        }
      } else {
        const res = await API.post('/testimonials/admin', formData);
        if (res.data?.success) {
          setTestimonials((prev) => [res.data.data, ...prev]);
          setSuccessMsg('New testimonial created and published successfully.');
        }
      }
      closeModal();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving testimonial.');
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered testimonials
  const filteredTestimonials = testimonials.filter((t) => {
    const matchesFilter =
      filter === 'ALL' || t.status.toLowerCase() === filter.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.place?.toLowerCase().includes(query) ||
      t.district?.toLowerCase().includes(query) ||
      t.phone?.includes(query);
    return matchesFilter && matchesSearch;
  });

  const pendingCount = testimonials.filter((t) => t.status === 'pending').length;
  const approvedCount = testimonials.filter((t) => t.status === 'approved').length;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#0B2115] font-normal tracking-tight">
            Customer Testimonials & Reviews
          </h1>
          <p className="text-xs sm:text-sm text-[#647563] mt-1 font-light">
            Manage customer success stories, ratings, and approve submissions before they appear on the website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center space-x-2 bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-all shadow shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Direct Testimonial</span>
        </button>
      </div>

      {/* Alert / Notification banner */}
      {successMsg && (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-xs sm:text-sm flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg('')} className="text-green-600 hover:text-green-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')} className="text-red-600 hover:text-red-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#163A24]/10 shadow-xs">
          <p className="text-[11px] font-semibold text-[#647563] uppercase tracking-wider">
            Total Reviews
          </p>
          <p className="text-2xl font-serif text-[#0B2115] font-semibold mt-1">
            {testimonials.length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#163A24]/10 shadow-xs">
          <p className="text-[11px] font-semibold text-green-700 uppercase tracking-wider">
            Live on Website (Approved)
          </p>
          <p className="text-2xl font-serif text-green-800 font-semibold mt-1">
            {approvedCount}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#163A24]/10 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
              Pending Approval
            </p>
            {pendingCount > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                Action Required
              </span>
            )}
          </div>
          <p className="text-2xl font-serif text-amber-900 font-semibold mt-1">
            {pendingCount}
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#163A24]/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
          {[
            { label: 'All Reviews', value: 'ALL', count: testimonials.length },
            { label: 'Pending Approval', value: 'PENDING', count: pendingCount },
            { label: 'Approved', value: 'APPROVED', count: approvedCount },
            { label: 'Rejected', value: 'REJECTED', count: testimonials.filter(t => t.status === 'rejected').length },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                filter === tab.value
                  ? 'bg-[#163A24] text-[#F7F5EE]'
                  : 'bg-[#F7F5EE] text-[#172018]/70 hover:bg-[#EAE6DB]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filter === tab.value
                    ? 'bg-white/20 text-white'
                    : 'bg-[#163A24]/10 text-[#0B2115]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#647563] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F5EE] border border-[#163A24]/15 rounded-lg focus:outline-none focus:border-[#163A24]"
          />
        </div>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-[#647563]">
          Loading testimonials...
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-[#163A24]/10 space-y-3">
          <MessageSquare className="w-10 h-10 text-[#647563]/40 mx-auto" />
          <p className="font-serif text-lg text-[#0B2115]">No testimonials found</p>
          <p className="text-xs text-[#647563] font-light max-w-sm mx-auto">
            {searchQuery
              ? 'No reviews match your current search query.'
              : 'No testimonials available in this category. Click "Add Direct Testimonial" to create one.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTestimonials.map((t) => (
            <div
              key={t._id}
              className={`bg-white rounded-xl p-5 border shadow-xs flex flex-col justify-between space-y-4 transition-all ${
                t.status === 'pending'
                  ? 'border-amber-300 ring-1 ring-amber-100 bg-amber-50/20'
                  : t.status === 'rejected'
                  ? 'border-red-200 opacity-75'
                  : 'border-[#163A24]/10 hover:border-[#163A24]/30'
              }`}
            >
              {/* Header: Customer Name & Status Badge */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#0B2115] leading-snug">
                      {t.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-[#647563] mt-0.5">
                      {(t.place || t.district) && (
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-[#163A24]" />
                          <span>{[t.place, t.district].filter(Boolean).join(', ')}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full shrink-0 ${
                      t.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : t.status === 'pending'
                        ? 'bg-amber-100 text-amber-800 animate-pulse'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < (t.rating || 5)
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-semibold text-[#0B2115] ml-1.5">
                    {t.rating || 5}.0
                  </span>
                </div>

                {/* Key Cultivation Details Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  {t.phone && (
                    <span className="inline-flex items-center space-x-1 bg-[#F7F5EE] text-[#0B2115] px-2.5 py-1 rounded-md text-[11px] font-medium border border-[#163A24]/10">
                      <Phone className="w-3 h-3 text-[#163A24]" />
                      <span>{t.phone}</span>
                    </span>
                  )}
                  {t.cultivation && (
                    <span className="inline-flex items-center space-x-1 bg-[#163A24]/5 text-[#163A24] px-2.5 py-1 rounded-md text-[11px] font-medium">
                      <Sprout className="w-3 h-3" />
                      <span>Cultivation : {t.cultivation}</span>
                    </span>
                  )}
                  {t.plantationAge && (
                    <span className="inline-flex items-center space-x-1 bg-[#163A24]/5 text-[#163A24] px-2.5 py-1 rounded-md text-[11px] font-medium">
                      <Calendar className="w-3 h-3" />
                      <span>{t.plantationAge}</span>
                    </span>
                  )}
                </div>

                {/* Review Text */}
                {t.comment && (
                  <p className="text-xs text-[#172018]/80 font-light leading-relaxed pt-1.5 italic bg-[#F7F5EE]/50 p-3 rounded-lg border border-[#163A24]/5">
                    "{t.comment}"
                  </p>
                )}
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-3 border-t border-[#163A24]/10 flex items-center justify-between gap-2">
                {/* Approval Quick Action Buttons */}
                <div className="flex items-center space-x-2">
                  {t.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(t._id, 'approved')}
                        className="inline-flex items-center space-x-1 text-xs font-semibold bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 rounded-md transition-colors shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(t._id, 'rejected')}
                        className="inline-flex items-center space-x-1 text-xs font-semibold bg-gray-200 hover:bg-red-100 text-gray-700 hover:text-red-700 px-3 py-1.5 rounded-md transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  )}

                  {t.status === 'approved' && (
                    <button
                      onClick={() => handleStatusChange(t._id, 'rejected')}
                      className="text-xs text-[#647563] hover:text-red-600 transition-colors"
                    >
                      Unpublish / Reject
                    </button>
                  )}

                  {t.status === 'rejected' && (
                    <button
                      onClick={() => handleStatusChange(t._id, 'approved')}
                      className="text-xs text-green-700 hover:text-green-800 font-medium transition-colors"
                    >
                      Re-approve
                    </button>
                  )}
                </div>

                {/* Edit & Delete */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openEditModal(t)}
                    className="p-1.5 text-[#647563] hover:text-[#163A24] hover:bg-[#F7F5EE] rounded transition-colors"
                    title="Edit Testimonial"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="p-1.5 text-[#647563] hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete Permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add or Edit Testimonial */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B2115]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#163A24]/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#163A24]/10">
              <h3 className="font-serif text-xl text-[#0B2115]">
                {editingItem ? 'Edit Testimonial' : 'Add Direct Testimonial'}
              </h3>
              <button
                onClick={closeModal}
                className="text-[#647563] hover:text-[#0B2115] p-1 rounded-full hover:bg-[#F7F5EE]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mr. Anto Nadumadam"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                    Place / Town
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chemmalamattam"
                    value={formData.place}
                    onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                    District / Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kottayam District"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 94478619110"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                    Cultivation Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3 acre or 10 acre"
                    value={formData.cultivation}
                    onChange={(e) => setFormData({ ...formData, cultivation: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                    Plantation Age / Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Year old plantation"
                    value={formData.plantationAge}
                    onChange={(e) => setFormData({ ...formData, plantationAge: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <div className="flex items-center space-x-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= formData.rating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-semibold ml-2 text-[#0B2115]">
                      {formData.rating} Stars
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                  Customer Review / Success Story
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details about plant growth, yield, mace quality, or customer satisfaction..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none"
                >
                  <option value="approved">Approved (Live on Website)</option>
                  <option value="pending">Pending Approval</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-xs font-medium text-[#647563] hover:text-[#0B2115]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] rounded-lg text-xs font-semibold tracking-wider transition-all disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingItem ? 'Save Changes' : 'Publish Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
