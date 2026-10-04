import React, { useEffect, useState } from 'react';
import {
  MessageSquare,
  Phone,
  Mail,
  Clock,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import API from '../../services/api';

export const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await API.get('/enquiries');
      if (res.data.success) {
        setEnquiries(res.data.data);
      }
    } catch (err) {
      console.error('Error loading enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await API.patch(`/enquiries/${id}/status`, { status: newStatus });
      if (res.data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update enquiry status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteEnquiry = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the enquiry from "${name}"?`)) return;
    try {
      const res = await API.delete(`/enquiries/${id}`);
      if (res.data.success) {
        setEnquiries((prev) => prev.filter((e) => e._id !== id));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete enquiry.');
    }
  };

  const pendingCount = enquiries.filter((e) => e.status === 'PENDING').length;

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch =
      enq.name?.toLowerCase().includes(search.toLowerCase()) ||
      enq.phone?.includes(search) ||
      enq.email?.toLowerCase().includes(search.toLowerCase()) ||
      enq.message?.toLowerCase().includes(search.toLowerCase()) ||
      (enq.product?.name && enq.product.name.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || enq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8DF] pb-5">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="font-serif text-3xl font-bold text-[#0B2115] tracking-tight">
              Customer Enquiries
            </h1>
            {!loading && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EAF0E8] text-[#163A24] border border-[#C5D0C4]">
                {enquiries.length} {enquiries.length === 1 ? 'Message' : 'Messages'}
              </span>
            )}
            {pendingCount > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEF9EE] text-[#9A6B0A] border border-[#E8D49B]">
                {pendingCount} Pending
              </span>
            )}
          </div>
          <p className="text-sm text-[#526651] mt-1 font-medium">
            Manage and respond to direct customer inquiries sent to your nursery.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search by customer name, phone, message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#D6DDD5] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all shadow-2xs"
          />
          <Search className="w-4 h-4 text-[#637863] absolute left-3.5 top-3" />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-[#637863]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-[#D6DDD5] rounded-xl px-3 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24] transition-all cursor-pointer shadow-2xs"
          >
            <option value="ALL">All Statuses ({enquiries.length})</option>
            <option value="PENDING">Pending ({enquiries.filter((e) => e.status === 'PENDING').length})</option>
            <option value="IN_PROGRESS">In Progress ({enquiries.filter((e) => e.status === 'IN_PROGRESS').length})</option>
            <option value="RESOLVED">Resolved ({enquiries.filter((e) => e.status === 'RESOLVED').length})</option>
            <option value="CLOSED">Closed ({enquiries.filter((e) => e.status === 'CLOSED').length})</option>
          </select>
        </div>
      </div>

      {/* Content View */}
      {loading ? (
        <div className="py-24 text-center space-y-3 bg-white rounded-2xl border border-[#E2E8DF] shadow-xs">
          <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-serif text-sm text-[#526651]">Loading customer enquiries...</p>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        /* Empty State */
        <div className="bg-white p-12 text-center rounded-2xl border border-[#E2E8DF] space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF0E8] text-[#163A24] flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#0B2115]">
              {search || statusFilter !== 'ALL'
                ? 'No matching enquiries found'
                : 'No Customer Enquiries Yet'}
            </h3>
            <p className="text-xs text-[#637863] max-w-sm mx-auto mt-1">
              {search || statusFilter !== 'ALL'
                ? 'Try clearing or changing your search filter.'
                : 'Incoming customer messages from your public website and plant listings will appear here.'}
            </p>
          </div>
          {(search || statusFilter !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setStatusFilter('ALL');
              }}
              className="inline-block bg-white hover:bg-[#F2F4EF] text-[#163A24] font-medium text-xs px-4 py-2 rounded-lg border border-[#D6DDD5] transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        /* Enquiry Cards List */
        <div className="space-y-4">
          {filteredEnquiries.map((enq) => {
            const cleanPhone = enq.phone ? enq.phone.replace(/[^0-9]/g, '') : '';
            const whatsappUrl = cleanPhone
              ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Hello ${enq.name}, thank you for contacting Kinattukara Nursery regarding your enquiry.`
                )}`
              : null;

            return (
              <div
                key={enq._id}
                className="bg-white rounded-2xl border border-[#E2E8DF] p-6 shadow-xs hover:border-[#163A24]/30 transition-all space-y-4"
              >
                {/* Top Row: Customer Name, Status Badge, and Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0F3EE] pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF0E8] text-[#163A24] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                      {enq.name ? enq.name.charAt(0).toUpperCase() : 'C'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-[#0B2115]">
                        {enq.name}
                      </h3>
                      <div className="flex items-center space-x-1.5 text-xs text-[#637863]">
                        <Clock className="w-3.5 h-3.5 text-[#A4B5A3]" />
                        <span>{formatDate(enq.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        enq.status === 'PENDING'
                          ? 'bg-[#FEF9EE] text-[#9A6B0A] border-[#E8D49B]'
                          : enq.status === 'IN_PROGRESS'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : enq.status === 'RESOLVED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          enq.status === 'PENDING'
                            ? 'bg-[#B9A36A]'
                            : enq.status === 'IN_PROGRESS'
                            ? 'bg-blue-600'
                            : enq.status === 'RESOLVED'
                            ? 'bg-emerald-600'
                            : 'bg-gray-500'
                        }`}
                      ></span>
                      <span>
                        {enq.status === 'IN_PROGRESS' ? 'IN PROGRESS' : enq.status}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Contact Channels */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                  {enq.phone && (
                    <a
                      href={`tel:${enq.phone}`}
                      className="inline-flex items-center space-x-1.5 text-[#172018] hover:text-[#163A24] font-medium transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#163A24]" />
                      <span>{enq.phone}</span>
                    </a>
                  )}

                  {enq.email && (
                    <a
                      href={`mailto:${enq.email}`}
                      className="inline-flex items-center space-x-1.5 text-[#172018] hover:text-[#163A24] font-medium transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#163A24]" />
                      <span>{enq.email}</span>
                    </a>
                  )}

                  {enq.product && (
                    <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-[#EAF0E8] text-[#163A24] border border-[#C5D0C4] text-[11px] font-semibold">
                      <span>Inquiring for:</span>
                      <span className="font-bold underline">{enq.product.name}</span>
                    </div>
                  )}
                </div>

                {/* Customer Message Box */}
                <div className="bg-[#FAFBF9] p-4 rounded-xl border border-[#E2E8DF]">
                  <p className="text-xs text-[#172018] leading-relaxed whitespace-pre-wrap font-normal">
                    "{enq.message}"
                  </p>
                </div>

                {/* Action Bar: Status Selector, WhatsApp Direct Reply, and Delete */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-[#F0F3EE]">
                  {/* Status Dropdown */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[#637863] font-medium">Update Status:</span>
                    <select
                      disabled={updatingId === enq._id}
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                      className="bg-white border border-[#D6DDD5] rounded-lg px-3 py-1.5 text-xs text-[#172018] font-medium focus:outline-none focus:border-[#163A24] transition-all cursor-pointer shadow-2xs"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="RESOLVED">RESOLVED</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>

                  {/* Reply & Delete Buttons */}
                  <div className="flex items-center space-x-2.5">
                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 border border-[#25D366]/30 transition-colors shadow-2xs"
                        title="Chat with customer on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Reply on WhatsApp</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeleteEnquiry(enq._id, enq.name)}
                      className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-[#F8B4B4] transition-colors shadow-2xs inline-flex items-center space-x-1"
                      title="Delete enquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
