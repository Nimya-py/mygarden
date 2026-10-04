import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNursery } from '../context/NurseryContext';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Store,
  Users,
  Grid,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Award,
  Star,
} from 'lucide-react';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { nursery } = useNursery();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  const superAdminNav = [
    { label: 'Platform Overview', path: '/super-admin', icon: LayoutDashboard },
    { label: 'All Nurseries', path: '/super-admin/nurseries', icon: Store },
    { label: 'Awards (ISO 9001)', path: '/admin/awards', icon: Award },
    { label: 'Customer Reviews', path: '/admin/testimonials', icon: Star },
    { label: 'Nursery Admins', path: '/super-admin/admins', icon: ShieldCheck },
    { label: 'Customers', path: '/super-admin/customers', icon: Users },
    { label: 'Categories', path: '/super-admin/categories', icon: Grid },
    { label: 'Global Enquiries', path: '/super-admin/enquiries', icon: MessageSquare },
  ];

  const adminNav = [
    { label: 'Nursery Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Awards (ISO 9001)', path: '/admin/awards', icon: Award },
    { label: 'Customer Reviews', path: '/admin/testimonials', icon: Star },
    { label: 'Products Catalog', path: '/admin/products', icon: Package },
    { label: 'Add New Product', path: '/admin/products/new', icon: Grid },
    { label: 'Customer Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { label: 'Nursery Profile', path: '/admin/settings', icon: Settings },
  ];

  const navItems = isSuperAdmin ? superAdminNav : adminNav;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F7F5EE] text-[#172018] flex flex-col md:flex-row">
      
      {/* Mobile Top Nav Bar */}
      <div className="md:hidden bg-[#053806] border-b border-[#084F09] p-4 flex items-center justify-between text-[#F7F5EE]">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
            <img
              src="/images/kinattukara_square_logo.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-cormorant font-bold text-sm tracking-wider text-[#F7F5EE] uppercase">
            {isSuperAdmin ? 'KINATTUKARA SUPER ADMIN' : 'NURSERY MANAGEMENT'}
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 text-[#F7F5EE] rounded-md hover:bg-[#084F09]"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-[#053806] text-[#F7F5EE] border-r border-[#084F09] flex flex-col shrink-0 min-h-screen z-30`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#084F09] flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
              <img
                src="/images/kinattukara_square_logo.png"
                alt="Nursery logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-cormorant font-bold tracking-widest text-base text-[#F7F5EE] block">
                KINATTUKARA
              </span>
              <span className="text-[9px] text-[#A7C2A6] uppercase tracking-wider block">
                {isSuperAdmin ? 'SUPER ADMIN PANEL' : 'NURSERY PORTAL'}
              </span>
            </div>
          </Link>
        </div>

        {/* User Badge */}
        <div className="px-6 py-4 bg-[#163A24]/40 border-b border-[#163A24]">
          <p className="text-[11px] text-[#F7F5EE]/60">Logged in as:</p>
          <p className="text-xs font-semibold text-[#F7F5EE] truncate">{user?.name}</p>
          <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold tracking-wider rounded bg-[#163A24] text-[#A7C2A6] border border-[#A7C2A6]/30 uppercase">
            {user?.role}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#163A24] text-[#F7F5EE] font-semibold'
                    : 'text-[#F7F5EE]/70 hover:bg-[#163A24]/50 hover:text-[#F7F5EE]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#4ade80]' : 'text-[#A7C2A6]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#163A24] space-y-1.5">
          <Link
            to="/"
            className="flex items-center justify-between w-full px-3 py-2 text-xs text-[#F7F5EE]/70 hover:text-[#F7F5EE] hover:bg-[#163A24]/40 rounded-md transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#A7C2A6]" />
              <span>Public Website</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-3 py-2 text-xs text-red-300 hover:text-red-200 hover:bg-red-950/20 rounded-md transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content View with Cream Background */}
      <main className="flex-grow p-6 lg:p-10 overflow-y-auto min-h-screen bg-[#F7F5EE] text-[#172018]">
        <Outlet />
      </main>

    </div>
  );
};
