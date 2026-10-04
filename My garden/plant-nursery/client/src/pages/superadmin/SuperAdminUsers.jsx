import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Users, ShieldCheck, UserCheck, UserX } from 'lucide-react';
import API from '../../services/api';

export const SuperAdminUsers = () => {
  const location = useLocation();
  const targetRole = location.pathname.includes('admins') ? 'ADMIN' : 'CUSTOMER';

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

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

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#183522] pb-4">
        <h1 className="font-serif text-3xl font-light text-[#FAF9F5]">
          Manage {targetRole === 'ADMIN' ? 'Nursery Admins' : 'Platform Customers'}
        </h1>
        <p className="text-xs text-[#FAF9F5]/60 mt-1">
          Active status management for registered {targetRole.toLowerCase()} accounts.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-[#FAF9F5]/50">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl">
          <p className="text-xs text-[#FAF9F5]/50">No {targetRole.toLowerCase()} accounts found.</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden border border-[#183522]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#FAF9F5]">
              <thead className="bg-[#183522]/50 text-[#B9A36A] uppercase text-[10px] tracking-wider border-b border-[#183522]">
                <tr>
                  <th className="px-6 py-4">User Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Account Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#183522]">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-[#183522]/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#FAF9F5]">{u.name}</td>
                    <td className="px-6 py-4 text-[#FAF9F5]/80">{u.email}</td>
                    <td className="px-6 py-4 text-[#FAF9F5]/80">{u.phone || 'N/A'}</td>
                    <td className="px-6 py-4">
                      {u.isActive ? (
                        <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                          Active
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-red-950 text-red-300 border border-red-800 text-[10px] font-bold">
                          Deactivated
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        disabled={updatingId === u._id}
                        onClick={() => handleToggleUserStatus(u._id)}
                        className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                          u.isActive
                            ? 'bg-red-950 hover:bg-red-900 text-red-300'
                            : 'bg-[#6F9657] hover:bg-[#B9A36A] text-[#0B0F0C]'
                        }`}
                      >
                        {u.isActive ? 'Deactivate Account' : 'Activate Account'}
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
