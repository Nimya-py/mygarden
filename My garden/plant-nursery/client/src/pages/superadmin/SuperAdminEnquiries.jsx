import React, { useEffect, useState } from 'react';
import { MessageSquare, Phone, Mail, Clock, Store } from 'lucide-react';
import API from '../../services/api';

export const SuperAdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalEnquiries = async () => {
      setLoading(true);
      try {
        const res = await API.get('/enquiries');
        if (res.data.success) {
          setEnquiries(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching global enquiries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalEnquiries();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#183522] pb-4">
        <h1 className="font-serif text-3xl font-light text-[#FAF9F5]">Global Platform Enquiries</h1>
        <p className="text-xs text-[#FAF9F5]/60 mt-1">Audit customer inquiries across all nurseries on GreenLeaf.</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-[#FAF9F5]/50">Loading global enquiries...</div>
      ) : enquiries.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-2xl">
          <p className="text-xs text-[#FAF9F5]/50">No customer enquiries logged on the platform yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div
              key={enq._id}
              className="glass-card p-6 rounded-2xl border border-[#183522] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#183522] pb-3">
                <div className="flex items-center space-x-2">
                  <Store className="w-4 h-4 text-[#B9A36A]" />
                  <span className="font-serif text-base font-semibold text-[#B9A36A]">
                    Target Nursery: {enq.nursery?.name || 'Nursery'}
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                  enq.status === 'PENDING' ? 'bg-amber-950 text-amber-300' : 'bg-emerald-950 text-emerald-300'
                }`}>
                  STATUS: {enq.status}
                </span>
              </div>

              <div className="space-y-1.5">
                <p className="font-semibold text-sm text-[#FAF9F5]">{enq.name}</p>
                <div className="flex flex-wrap gap-4 text-xs text-[#FAF9F5]/70">
                  <span className="flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-[#6F9657]" />
                    <span>{enq.phone}</span>
                  </span>
                  {enq.email && (
                    <span className="flex items-center space-x-1">
                      <Mail className="w-3.5 h-3.5 text-[#6F9657]" />
                      <span>{enq.email}</span>
                    </span>
                  )}
                  <span className="flex items-center space-x-1 text-[#FAF9F5]/50">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(enq.createdAt).toLocaleString()}</span>
                  </span>
                </div>
                {enq.product && (
                  <p className="text-xs text-[#6F9657]">Inquiring Product: {enq.product.name}</p>
                )}
                <p className="text-xs text-[#F4F0E7]/90 bg-[#0B0F0C]/60 p-3 rounded-xl border border-[#183522] font-light">
                  "{enq.message}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
