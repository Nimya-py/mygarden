import React, { useEffect, useState } from 'react';
import { MessageSquare, Phone, Mail, Clock, Store, Package } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8DF] pb-5">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#0B2115] tracking-tight">Global Platform Enquiries</h1>
          <p className="text-sm text-[#526651] mt-1 font-medium">Audit customer inquiries across all nurseries on the platform.</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF0E8] text-[#163A24] border border-[#C5D0C4] self-start sm:self-auto">
          {enquiries.length} {enquiries.length === 1 ? 'Enquiry' : 'Enquiries'}
        </span>
      </div>

      {loading ? (
        <div className="py-24 text-center space-y-3 bg-white rounded-2xl border border-[#E2E8DF] shadow-xs">
          <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-serif text-sm text-[#526651]">Loading global enquiries...</p>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-[#E2E8DF] shadow-xs">
          <p className="text-sm text-[#526651]">No customer enquiries logged on the platform yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div
              key={enq._id}
              className="bg-white p-6 rounded-2xl border border-[#E2E8DF] space-y-3.5 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0F3EE] pb-3">
                <div className="flex items-center space-x-2">
                  <Store className="w-4 h-4 text-[#163A24]" />
                  <span className="font-serif text-base font-semibold text-[#0B2115]">
                    Target Nursery: {enq.nursery?.name || 'Kinattukara Nutmeg Nursery'}
                  </span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                  enq.status === 'PENDING'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  STATUS: {enq.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-[#0B2115]">{enq.name}</p>
                  <span className="flex items-center space-x-1 text-xs text-[#526651]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(enq.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-[#526651]">
                  <a href={`tel:${enq.phone}`} className="flex items-center space-x-1 hover:text-[#163A24]">
                    <Phone className="w-3.5 h-3.5 text-[#163A24]" />
                    <span>{enq.phone}</span>
                  </a>
                  {enq.email && (
                    <a href={`mailto:${enq.email}`} className="flex items-center space-x-1 hover:text-[#163A24]">
                      <Mail className="w-3.5 h-3.5 text-[#163A24]" />
                      <span>{enq.email}</span>
                    </a>
                  )}
                </div>

                {enq.product && (
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#EAF0E8] text-[#163A24] text-xs font-medium">
                    <Package className="w-3.5 h-3.5" />
                    <span>Specimen: {enq.product.name}</span>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-[#FAFBF9] border border-[#E2E8DF] text-xs text-[#172018] leading-relaxed">
                  "{enq.message}"
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
