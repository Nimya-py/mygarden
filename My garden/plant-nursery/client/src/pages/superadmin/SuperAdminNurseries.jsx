import React, { useEffect, useState } from 'react';
import { Store, ShieldCheck, ShieldAlert, CheckCircle, XCircle, MapPin, Phone, Mail } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8DF] pb-5">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#0B2115] tracking-tight">Manage All Nurseries</h1>
          <p className="text-sm text-[#526651] mt-1 font-medium">Approve or reject registered nursery sellers across the platform.</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF0E8] text-[#163A24] border border-[#C5D0C4] self-start sm:self-auto">
          {nurseries.length} {nurseries.length === 1 ? 'Nursery' : 'Nurseries'}
        </span>
      </div>

      {loading ? (
        <div className="py-24 text-center space-y-3 bg-white rounded-2xl border border-[#E2E8DF] shadow-xs">
          <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-serif text-sm text-[#526651]">Loading nurseries...</p>
        </div>
      ) : nurseries.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-[#E2E8DF] shadow-xs">
          <p className="text-sm text-[#526651]">No nurseries registered yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8DF] shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAFBF9] text-[#163A24] uppercase text-[11px] font-semibold tracking-wider border-b border-[#E2E8DF]">
                  <th className="px-6 py-4">NURSERY</th>
                  <th className="px-6 py-4">OWNER</th>
                  <th className="px-6 py-4">LOCATION</th>
                  <th className="px-6 py-4">STATUS</th>
                  <th className="px-6 py-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F3EE]">
                {nurseries.map((nur) => (
                  <tr key={nur._id} className="hover:bg-[#F9FAF8] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#EAE6DB] border border-[#E2E8DF] shrink-0">
                          <img
                            src={nur.logo || '/images/hero-nutmeg.jpg'}
                            alt={nur.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-serif text-sm font-semibold text-[#0B2115]">{nur.name}</p>
                          <p className="text-[11px] text-[#526651]">{nur.phone || nur.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-[#172018]">
                      <p className="font-medium text-[#0B2115]">{nur.owner?.name || 'Unknown'}</p>
                      <p className="text-[11px] text-[#526651]">{nur.owner?.email}</p>
                    </td>

                    <td className="px-6 py-4 text-[#526651]">
                      {nur.city ? `${nur.city}, ${nur.state || 'Kerala'}` : 'Location unconfigured'}
                    </td>

                    <td className="px-6 py-4">
                      {nur.isApproved ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold inline-flex items-center space-x-1">
                          <span>✓</span>
                          <span>Approved</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold inline-flex items-center space-x-1">
                          <span>⏳</span>
                          <span>Pending Approval</span>
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        disabled={updatingId === nur._id}
                        onClick={() => handleToggleApproval(nur._id, nur.isApproved)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-2xs ${
                          nur.isApproved
                            ? 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
                            : 'bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE]'
                        }`}
                      >
                        {updatingId === nur._id ? 'Updating...' : nur.isApproved ? 'Revoke Approval' : 'Approve Nursery'}
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
