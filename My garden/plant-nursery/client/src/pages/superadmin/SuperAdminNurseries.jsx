import React, { useEffect, useState } from 'react';
import { Store, ShieldCheck, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import API from '../../services/api';

export const SuperAdminNurseries = () => {
  const [nurseries, setNurseries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchNurseries = async () => {
    setLoading(true);
    try {
      const res = await API.get('/nurseries');
      if (res.data.success) {
        setNurseries(res.data.data);
      }
    } catch (err) {
      console.error('Error loading nurseries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNurseries();
  }, []);

  const handleToggleApproval = async (id, currentStatus) => {
    setUpdatingId(id);
    try {
      const res = await API.patch(`/nurseries/${id}/approve`, { isApproved: !currentStatus });
      if (res.data.success) {
        setNurseries(
          nurseries.map((n) => (n._id === id ? { ...n, isApproved: !currentStatus } : n))
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update approval status.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#183522] pb-4">
        <h1 className="font-serif text-3xl font-light text-[#FAF9F5]">Manage All Nurseries</h1>
        <p className="text-xs text-[#FAF9F5]/60 mt-1">Approve or reject registered nursery sellers across the platform.</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-[#FAF9F5]/50">Loading nurseries...</div>
      ) : nurseries.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl">
          <p className="text-xs text-[#FAF9F5]/50">No nurseries registered yet.</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden border border-[#183522]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#FAF9F5]">
              <thead className="bg-[#183522]/50 text-[#B9A36A] uppercase text-[10px] tracking-wider border-b border-[#183522]">
                <tr>
                  <th className="px-6 py-4">Nursery Sanctuary</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Approval Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#183522]">
                {nurseries.map((nur) => (
                  <tr key={nur._id} className="hover:bg-[#183522]/20 transition-colors">
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#183522] border border-[#6F9657]/30 shrink-0">
                        <img
                          src={nur.logo || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=200&q=80'}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-serif text-sm font-semibold text-[#FAF9F5]">{nur.name}</p>
                        <p className="text-[10px] text-[#FAF9F5]/50">{nur.phone || nur.email}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-[#FAF9F5]/80">
                      <p className="font-medium">{nur.owner?.name || 'Unknown'}</p>
                      <p className="text-[10px] text-[#FAF9F5]/50">{nur.owner?.email}</p>
                    </td>

                    <td className="px-6 py-4 text-[#FAF9F5]/80">
                      {nur.city}, {nur.state}
                    </td>

                    <td className="px-6 py-4">
                      {nur.isApproved ? (
                        <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                          ✓ Approved
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold">
                          Pending Approval
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        disabled={updatingId === nur._id}
                        onClick={() => handleToggleApproval(nur._id, nur.isApproved)}
                        className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                          nur.isApproved
                            ? 'bg-red-950 hover:bg-red-900 text-red-300'
                            : 'bg-[#6F9657] hover:bg-[#B9A36A] text-[#0B0F0C]'
                        }`}
                      >
                        {nur.isApproved ? 'Revoke Approval' : 'Approve Nursery'}
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
