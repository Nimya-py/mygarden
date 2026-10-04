import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store, ShieldCheck, Users, Package, MessageSquare, Grid, AlertTriangle, ArrowRight } from 'lucide-react';
import API from '../../services/api';

export const SuperAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await API.get('/super-admin/stats');
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error('Error loading super admin stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3 bg-white rounded-2xl border border-[#E2E8DF] shadow-xs">
        <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-serif text-sm text-[#526651]">Loading Super Admin Platform Metrics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-7 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8DF] pb-5">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#0B2115] tracking-tight">Platform Overview</h1>
          <p className="text-sm text-[#526651] mt-1 font-medium">Global administrative metrics across all nurseries and users.</p>
        </div>
      </div>

      {stats?.pendingNurseries > 0 && (
        <div className="p-4.5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-xs">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-semibold text-amber-900">
                {stats.pendingNurseries} Nursery Registration(s) Pending Approval
              </p>
              <p className="text-[11px] text-amber-800/80">Review pending nursery applications to grant public listing access.</p>
            </div>
          </div>
          <Link
            to="/super-admin/nurseries"
            className="inline-flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors shrink-0 shadow-xs"
          >
            <span>Review Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl space-y-2 border border-[#E2E8DF] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#526651] font-semibold uppercase tracking-wider">Total Nurseries</span>
            <div className="p-2.5 bg-[#EAF0E8] rounded-xl text-[#163A24]">
              <Store className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold font-serif text-[#0B2115]">{stats?.totalNurseries || 0}</p>
          <Link to="/super-admin/nurseries" className="inline-flex items-center space-x-1 text-xs text-[#163A24] font-semibold hover:underline pt-1">
            <span>Manage Nurseries</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl space-y-2 border border-[#E2E8DF] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#526651] font-semibold uppercase tracking-wider">Nursery Admins</span>
            <div className="p-2.5 bg-[#EAF0E8] rounded-xl text-[#163A24]">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold font-serif text-[#0B2115]">{stats?.totalAdmins || 0}</p>
          <Link to="/super-admin/admins" className="inline-flex items-center space-x-1 text-xs text-[#163A24] font-semibold hover:underline pt-1">
            <span>Manage Admins</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl space-y-2 border border-[#E2E8DF] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#526651] font-semibold uppercase tracking-wider">Platform Customers</span>
            <div className="p-2.5 bg-[#EAF0E8] rounded-xl text-[#163A24]">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold font-serif text-[#0B2115]">{stats?.totalCustomers || 0}</p>
          <Link to="/super-admin/customers" className="inline-flex items-center space-x-1 text-xs text-[#163A24] font-semibold hover:underline pt-1">
            <span>View Customers</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl space-y-2 border border-[#E2E8DF] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#526651] font-semibold uppercase tracking-wider">Plant Products</span>
            <div className="p-2.5 bg-[#EAF0E8] rounded-xl text-[#163A24]">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold font-serif text-[#0B2115]">{stats?.totalProducts || 0}</p>
          <span className="text-[11px] text-[#526651] font-medium block pt-1">Live in Platform Catalog</span>
        </div>

      </div>
    </div>
  );
};
