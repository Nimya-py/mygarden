import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store, ShieldCheck, Users, Package, MessageSquare, Grid, AlertTriangle } from 'lucide-react';
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
    return <div className="py-20 text-center text-xs text-[#FAF9F5]/50">Loading Super Admin Platform Metrics...</div>;
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#183522] pb-4">
        <h1 className="font-serif text-3xl font-light text-[#FAF9F5]">Platform Overview</h1>
        <p className="text-xs text-[#FAF9F5]/60 mt-1">Global administrative metrics across all nurseries and users.</p>
      </div>

      {stats?.pendingNurseries > 0 && (
        <div className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-2xl flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-amber-300">
                {stats.pendingNurseries} Nursery Registration(s) Pending Approval
              </p>
              <p className="text-[11px] text-amber-200/80">Review pending nursery applications to grant public listing access.</p>
            </div>
          </div>
          <Link
            to="/super-admin/nurseries"
            className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-4 py-2 rounded-lg text-xs"
          >
            Review Applications →
          </Link>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="glass-card p-6 rounded-2xl space-y-2 border border-[#6F9657]/30">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#FAF9F5]/60 font-medium">Total Nurseries</span>
            <div className="p-2 bg-[#183522] rounded-lg text-[#6F9657]">
              <Store className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold font-serif text-[#FAF9F5]">{stats?.totalNurseries || 0}</p>
          <Link to="/super-admin/nurseries" className="text-xs text-[#6F9657] hover:underline">
            Manage Nurseries →
          </Link>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-2 border border-[#B9A36A]/30">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#FAF9F5]/60 font-medium">Nursery Admins</span>
            <div className="p-2 bg-[#183522] rounded-lg text-[#B9A36A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold font-serif text-[#FAF9F5]">{stats?.totalAdmins || 0}</p>
          <Link to="/super-admin/admins" className="text-xs text-[#B9A36A] hover:underline">
            Manage Admins →
          </Link>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-2 border border-[#6F9657]/30">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#FAF9F5]/60 font-medium">Platform Customers</span>
            <div className="p-2 bg-[#183522] rounded-lg text-[#6F9657]">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold font-serif text-[#FAF9F5]">{stats?.totalCustomers || 0}</p>
          <Link to="/super-admin/customers" className="text-xs text-[#6F9657] hover:underline">
            View Customers →
          </Link>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-2 border border-[#B9A36A]/30">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#FAF9F5]/60 font-medium">Total Plant Products</span>
            <div className="p-2 bg-[#183522] rounded-lg text-[#B9A36A]">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold font-serif text-[#FAF9F5]">{stats?.totalProducts || 0}</p>
          <span className="text-[11px] text-[#FAF9F5]/50 block">Live on Sanctuary</span>
        </div>

      </div>

    </div>
  );
};
