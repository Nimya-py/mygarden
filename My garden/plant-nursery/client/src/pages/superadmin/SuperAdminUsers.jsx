import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Users, ShieldCheck, UserCheck, UserX, Search } from 'lucide-react';
import API from '../../services/api';

export const SuperAdminUsers = () => {
  const location = useLocation();
  const targetRole = location.pathname.includes('admins') ? 'ADMIN' : 'CUSTOMER';

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/super-admin/users?role=${targetRole}`);
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [targetRole]);

  const handleToggleUserStatus = async (id) => {
    setUpdatingId(id);
    try {
      const res = await API.patch(`/super-admin/users/${id}/status`);
      if (res.data.success) {
        setUsers(
          users.map((u) => (u._id === id ? { ...u, isActive: res.data.data.isActive } : u))
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    return (
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone?.includes(search)
    );
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8DF] pb-5">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#0B2115] tracking-tight">
            Manage {targetRole === 'ADMIN' ? 'Nursery Admins' : 'Platform Customers'}
          </h1>
          <p className="text-sm text-[#526651] mt-1 font-medium">
            Active status management for registered {targetRole.toLowerCase()} accounts.
          </p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF0E8] text-[#163A24] border border-[#C5D0C4] self-start sm:self-auto">
          {users.length} {targetRole === 'ADMIN' ? 'Admins' : 'Customers'}
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search by name, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-[#D6DDD5] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] shadow-2xs"
        />
        <Search className="w-4 h-4 text-[#637863] absolute left-3.5 top-3" />
      </div>

      {loading ? (
        <div className="py-24 text-center space-y-3 bg-white rounded-2xl border border-[#E2E8DF] shadow-xs">
          <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-serif text-sm text-[#526651]">Loading users...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-[#E2E8DF] shadow-xs">
          <p className="text-sm text-[#526651]">No {targetRole.toLowerCase()} accounts found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8DF] shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAFBF9] text-[#163A24] uppercase text-[11px] font-semibold tracking-wider border-b border-[#E2E8DF]">
                  <th className="px-6 py-4">USER NAME</th>
                  <th className="px-6 py-4">EMAIL</th>
                  <th className="px-6 py-4">PHONE</th>
                  <th className="px-6 py-4">ACCOUNT STATUS</th>
                  <th className="px-6 py-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F3EE]">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-[#F9FAF8] transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#0B2115]">{u.name}</td>
                    <td className="px-6 py-4 text-[#526651]">{u.email}</td>
                    <td className="px-6 py-4 text-[#526651]">{u.phone || 'N/A'}</td>
                    <td className="px-6 py-4">
                      {u.isActive ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold inline-flex items-center space-x-1">
                          <span>✓</span>
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold inline-flex items-center space-x-1">
                          <span>✕</span>
                          <span>Deactivated</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        disabled={updatingId === u._id}
                        onClick={() => handleToggleUserStatus(u._id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-2xs ${
                          u.isActive
                            ? 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {updatingId === u._id ? 'Updating...' : u.isActive ? 'Deactivate Account' : 'Activate Account'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
