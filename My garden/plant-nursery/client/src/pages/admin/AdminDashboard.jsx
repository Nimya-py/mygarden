import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  MessageSquare,
  Clock,
  Plus,
  ExternalLink,
  Globe,
  Settings,
  ArrowRight,
  AlertCircle,
  Calendar,
  Grid,
  ShieldCheck,
} from 'lucide-react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [nursery, setNursery] = useState(null);
  const [products, setProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [nurRes, prodRes, enqRes] = await Promise.all([
          API.get('/nurseries/my/profile').catch(() => ({ data: { success: false } })),
          API.get('/products/my/all').catch(() => ({ data: { success: false, data: [] } })),
          API.get('/enquiries').catch(() => ({ data: { success: false, data: [] } })),
        ]);

        if (nurRes.data.success) setNursery(nurRes.data.data);
        if (prodRes.data.success) setProducts(prodRes.data.data);
        if (enqRes.data.success) setEnquiries(enqRes.data.data);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const pendingEnquiries = enquiries.filter((e) => e.status === 'PENDING').length;

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-serif text-sm text-[#526651]">Loading Nursery Portal Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-7 pb-12">
      
      {/* 3. Page Header: Compact & Professional */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8DF] pb-5">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="font-serif text-3xl font-bold text-[#0B2115] tracking-tight">
              Nursery Dashboard
            </h1>
            {user && (
              <span className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Admin</span>
              </span>
            )}
          </div>
          <p className="text-sm text-[#526651] mt-1 font-medium flex items-center flex-wrap gap-x-2">
            <span>{nursery?.name || 'Kinattukara Nutmeg Plantation & Nursery'}</span>
            {user?.email && (
              <span className="text-xs text-[#8E9B8D] font-normal">
                • Signed in as {user.email}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/products/new"
            className="bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold px-4 py-2.5 rounded-lg text-xs transition-colors flex items-center space-x-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-[#F2F4EF] text-[#163A24] border border-[#D6DDD5] font-medium px-4 py-2.5 rounded-lg text-xs transition-colors flex items-center space-x-1.5 shadow-xs"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 & 5. Summary Statistics: Clean Light Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Total Products Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8DF] p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#163A24]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#172018] tracking-wide">
              Total Products
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#EAF0E8] text-[#163A24] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold font-serif text-[#0B2115] tracking-tight">
              {products.length}
            </p>
            <p className="text-xs text-[#637863] mt-1">Products in your catalog</p>
          </div>
          <div className="pt-2 border-t border-[#F0F3EE]">
            <Link
              to="/admin/products"
              className="text-xs font-semibold text-[#163A24] hover:text-[#0B2115] hover:underline inline-flex items-center space-x-1"
            >
              <span>View Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Total Customer Enquiries Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8DF] p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#B45309]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#172018] tracking-wide">
              Total Customer Enquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FDF6E2] text-[#B45309] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold font-serif text-[#0B2115] tracking-tight">
              {enquiries.length}
            </p>
            <p className="text-xs text-[#637863] mt-1">Total customer messages received</p>
          </div>
          <div className="pt-2 border-t border-[#F0F3EE]">
            <Link
              to="/admin/enquiries"
              className="text-xs font-semibold text-[#163A24] hover:text-[#0B2115] hover:underline inline-flex items-center space-x-1"
            >
              <span>View Messages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Pending Enquiries Card (Gold Warning Accent) */}
        <div className="bg-white rounded-2xl border border-[#E2E8DF] p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#B9A36A]/50 transition-all sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#172018] tracking-wide">
              Pending Enquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FEF9EE] text-[#9A6B0A] border border-[#E8D49B]/60 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold font-serif text-[#9A6B0A] tracking-tight">
              {pendingEnquiries}
            </p>
            <p className="text-xs text-[#637863] mt-1">Requires response</p>
          </div>
          <div className="pt-2 border-t border-[#F0F3EE]">
            <Link
              to="/admin/enquiries"
              className="text-xs font-semibold text-[#9A6B0A] hover:underline inline-flex items-center space-x-1"
            >
              <span>Review Pending</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* 7 & 8. Quick Actions & Optional Website Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Quick Actions (2 Columns) */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="font-serif text-lg font-semibold text-[#0B2115]">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <Link
              to="/admin/products/new"
              className="bg-white hover:bg-[#F2F4EF] border border-[#E2E8DF] hover:border-[#163A24]/40 rounded-xl p-3.5 flex flex-col justify-between space-y-2 transition-all shadow-xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EAF0E8] text-[#163A24] flex items-center justify-center group-hover:bg-[#163A24] group-hover:text-[#F7F5EE] transition-colors">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-[#0B2115]">
                  Add Product
                </span>
                <span className="block text-[11px] text-[#637863]">New specimen</span>
              </div>
            </Link>

            <Link
              to="/admin/categories"
              className="bg-white hover:bg-[#F2F4EF] border border-[#E2E8DF] hover:border-[#163A24]/40 rounded-xl p-3.5 flex flex-col justify-between space-y-2 transition-all shadow-xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EAF0E8] text-[#163A24] flex items-center justify-center group-hover:bg-[#163A24] group-hover:text-[#F7F5EE] transition-colors">
                <Grid className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-[#0B2115]">
                  Categories
                </span>
                <span className="block text-[11px] text-[#637863]">Plant groups</span>
              </div>
            </Link>

            <Link
              to="/admin/enquiries"
              className="bg-white hover:bg-[#F2F4EF] border border-[#E2E8DF] hover:border-[#163A24]/40 rounded-xl p-3.5 flex flex-col justify-between space-y-2 transition-all shadow-xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FDF6E2] text-[#B45309] flex items-center justify-center group-hover:bg-[#B45309] group-hover:text-white transition-colors">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-[#0B2115]">
                  View Enquiries
                </span>
                <span className="block text-[11px] text-[#637863]">Messages</span>
              </div>
            </Link>

            <Link
              to="/admin/settings"
              className="bg-white hover:bg-[#F2F4EF] border border-[#E2E8DF] hover:border-[#163A24]/40 rounded-xl p-3.5 flex flex-col justify-between space-y-2 transition-all shadow-xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EAF0E8] text-[#163A24] flex items-center justify-center group-hover:bg-[#163A24] group-hover:text-[#F7F5EE] transition-colors">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-[#0B2115]">
                  Edit Profile & Settings
                </span>
                <span className="block text-[11px] text-[#637863]">WhatsApp & Info</span>
              </div>
            </Link>

          </div>
        </div>

        {/* 8. Website Status Card */}
        <div className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-[#0B2115]">
            Website Status
          </h2>
          <div className="bg-white border border-[#E2E8DF] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#637863] font-medium">Status</span>
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Published</span>
              </span>
            </div>

            <div>
              <p className="text-[11px] text-[#637863]">Last updated:</p>
              <p className="text-xs font-semibold text-[#0B2115] mt-0.5 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-[#163A24]" />
                <span>
                  {nursery?.updatedAt
                    ? new Date(nursery.updatedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : '27 September 2026'}
                </span>
              </p>
            </div>

            <div className="pt-2 border-t border-[#F0F3EE]">
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#163A24] hover:text-[#0B2115] hover:underline inline-flex items-center space-x-1"
              >
                <span>View Website</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* 6. Recent Customer Enquiries Table/List */}
      <div className="bg-white rounded-2xl border border-[#E2E8DF] shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#F0F3EE] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#0B2115]">
              Recent Customer Enquiries
            </h2>
            <p className="text-xs text-[#637863] mt-0.5">
              Latest inquiries received from customers visiting your plants catalog.
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-semibold text-[#163A24] hover:text-[#0B2115] hover:underline inline-flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {enquiries.length === 0 ? (
          <div className="p-10 text-center space-y-2">
            <MessageSquare className="w-8 h-8 text-[#A4B5A3] mx-auto" />
            <p className="text-sm font-medium text-[#0B2115]">No customer enquiries received yet.</p>
            <p className="text-xs text-[#637863]">
              Incoming customer messages from plant listings will appear right here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAFBF9] border-b border-[#F0F3EE] text-[#526651] font-semibold">
                  <th className="py-3 px-5">Customer</th>
                  <th className="py-3 px-5">Message</th>
                  <th className="py-3 px-5 whitespace-nowrap">Date</th>
                  <th className="py-3 px-5 text-right whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F3EE]">
                {enquiries.slice(0, 6).map((enq) => (
                  <tr
                    key={enq._id}
                    className="hover:bg-[#FAFBF9] transition-colors group cursor-pointer"
                  >
                    {/* Customer */}
                    <td className="py-3.5 px-5 align-top">
                      <div className="font-semibold text-[#0B2115] text-sm">
                        {enq.name || 'Anonymous Customer'}
                      </div>
                      {enq.phone && (
                        <div className="text-[11px] text-[#637863] mt-0.5">
                          {enq.phone}
                        </div>
                      )}
                    </td>

                    {/* Message */}
                    <td className="py-3.5 px-5 align-top max-w-md">
                      <p className="text-[#172018] line-clamp-2 leading-relaxed">
                        "{enq.message}"
                      </p>
                      {enq.product && (
                        <span className="inline-block mt-1 text-[10px] font-medium text-[#163A24] bg-[#EAF0E8] px-2 py-0.5 rounded border border-[#C5D0C4]">
                          Plant: {enq.product.name}
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-5 align-top whitespace-nowrap text-[#637863] font-medium">
                      {formatDate(enq.createdAt)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-5 align-top text-right whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          enq.status === 'PENDING'
                            ? 'bg-[#FEF9EE] text-[#9A6B0A] border-[#E8D49B]'
                            : enq.status === 'IN_PROGRESS'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        {enq.status === 'PENDING' ? 'PENDING' : enq.status === 'IN_PROGRESS' ? 'IN PROGRESS' : 'REPLIED'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
