import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Building2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useNursery } from '../context/NurseryContext';
import { useAuth } from '../context/AuthContext';

export const Contact = () => {
  const { nursery } = useNursery();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Sync user info if available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        phone: prev.phone || user.phone || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  const rawPhone = nursery?.whatsapp || nursery?.phone || "919447312890";
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const nurseryName = nursery?.name || 'Kinattukara Nutmeg Plantation & Nursery';
  const displayPhone = nursery?.phone || "+91 94473 12890";
  const displayEmail = nursery?.email || "info@kinattukara.com";
  const displayAddress = nursery?.address
    ? `${nursery.address}, ${nursery.city || ''}${nursery.state ? `, ${nursery.state}` : ''}`
    : "Kinattukara, Thrissur / Palakkad Highway, Thrissur, Kerala";
  const displayHours = nursery?.openingHours || "Monday to Saturday: 8:00 AM – 6:30 PM";

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${nurseryName}, I am reaching out to enquire about nutmeg plant availability, nursery visits, and plantation guidance.`
  )}`;
  const mapUrl = nursery?.googleMapsLink || "https://maps.google.com/?q=Kinattukara+Nutmeg+Plantation+and+Nursery+Kerala";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess('');
    setError('');

    try {
      const nurseryId = nursery?._id;
      const res = await API.post('/enquiries', {
        nursery: nurseryId,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      });

      if (res.data?.success) {
        setSuccess('Thank you for contacting Kinattukara. Our team will review your enquiry and get back to you promptly.');
        setFormData({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '', message: '' });
      } else {
        setError(res.data?.message || 'Failed to submit enquiry.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to send your message. Please reach out via WhatsApp or call us directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-[#071C14] text-[#F2F0E5] selection:bg-[#C4E85A] selection:text-[#071C14] min-h-screen">

      {/* ==================================================
          1. HERO HEADER SECTION
          - Dark forest-green background (#071C14)
          - Bold editorial headline matching homepage
         ================================================== */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-18 pb-12 sm:pb-16 border-b border-[#123D27]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          
          {/* Breadcrumb Navigation */}
          <div className="mb-6 sm:mb-8 flex items-center space-x-2 text-xs font-bold tracking-wider uppercase">
            <Link
              to="/"
              className="text-[#D8D9C9]/70 hover:text-[#C4E85A] transition-colors inline-flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C4E85A]" />
              <span>HOME</span>
            </Link>
            <span className="text-[#D8D9C9]/30">/</span>
            <span className="text-[#C4E85A]">CONTACT & VISITS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end justify-between">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C4E85A]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  GET IN TOUCH WITH KINATTUKARA
                </span>
              </div>

              <h1 className="font-display text-[42px] sm:text-[58px] lg:text-[76px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
                LET'S TALK <br />
                <span className="text-[#C4E85A]">ABOUT NUTMEG.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-2xl">
                Have questions about our grafted cultivars, tree spacing, bulk nursery orders, or planning a visit to our mother groves in Kerala? Reach out to us directly.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#123D27] hover:bg-[#C4E85A] text-[#F2F0E5] hover:text-[#071C14] text-xs font-bold tracking-wider uppercase border border-[#123D27] hover:border-[#C4E85A] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>QUICK WHATSAPP CHAT</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          2. MAIN TWO-COLUMN CONTACT & ENQUIRY SECTION
          - Left: Physical Plantation Location & Nursery Hours
          - Right: High-End Editorial Message Form
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column — Plantation & Nursery Coordinates (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Authentic Nursery Photo Card */}
              <div className="relative aspect-[16/10] rounded-[16px] overflow-hidden bg-[#0B2419] border border-[#123D27] shadow-xl group">
                <img
                  src="/images/about-nursery.jpg"
                  alt="Kinattukara Nutmeg Nursery plantation rows in Kerala"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110C]/90 via-[#04110C]/20 to-transparent p-5 flex items-end">
                  <div>
                    <span className="font-display text-xs font-bold tracking-wider text-[#C4E85A] uppercase block">
                      PROPAGATION FACILITY
                    </span>
                    <p className="text-[11px] text-[#F2F0E5]/80 font-normal">
                      Acclimatized shade houses & mother grove orchards in Thrissur
                    </p>
                  </div>
                </div>
              </div>

              {/* Coordinates List */}
              <div className="rounded-[16px] bg-[#0B2419] border border-[#123D27] p-6 sm:p-7 space-y-5">
                
                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="w-9 h-9 rounded-lg bg-[#071C14] border border-[#123D27] flex items-center justify-center text-[#C4E85A] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-display text-xs font-bold text-[#F2F0E5] uppercase tracking-wider block">
                      PLANTATION & NURSERY ADDRESS
                    </span>
                    <p className="text-xs text-[#D8D9C9] leading-relaxed">
                      {displayAddress}
                    </p>
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#C4E85A] hover:underline pt-1"
                    >
                      <span>VIEW ON GOOGLE MAPS</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="border-t border-[#123D27]/60"></div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-9 h-9 rounded-lg bg-[#071C14] border border-[#123D27] flex items-center justify-center text-[#C4E85A] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-display text-xs font-bold text-[#F2F0E5] uppercase tracking-wider block">
                      VISITING & NURSERY HOURS
                    </span>
                    <p className="text-xs text-[#D8D9C9] leading-relaxed">
                      {displayHours}
                    </p>
                    <span className="text-[11px] text-[#D8D9C9]/60 font-mono">
                      Sundays open for scheduled plantation pickups
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#123D27]/60"></div>

                {/* Direct Contacts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[#D8D9C9]/50 uppercase tracking-widest block">
                      PHONE CONTACT
                    </span>
                    <a
                      href={`tel:${cleanPhone}`}
                      className="text-xs font-mono font-bold text-[#F2F0E5] hover:text-[#C4E85A] transition-colors block"
                    >
                      {displayPhone}
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[#D8D9C9]/50 uppercase tracking-widest block">
                      EMAIL DESK
                    </span>
                    <a
                      href={`mailto:${displayEmail}`}
                      className="text-xs font-mono text-[#F2F0E5] hover:text-[#C4E85A] transition-colors block truncate"
                    >
                      {displayEmail}
                    </a>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column — Direct Enquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-[16px] bg-[#0B2419] border border-[#123D27] p-7 sm:p-9 lg:p-10 space-y-6 shadow-2xl">
                
                <div className="space-y-2">
                  <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase block">
                    ONLINE ENQUIRY DESK
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F2F0E5] uppercase tracking-tight">
                    SEND A DIRECT MESSAGE
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D8D9C9]/80 font-normal leading-relaxed">
                    Fill in your details below and our horticultural team will contact you regarding sapling availability, pricing, or planting recommendations.
                  </p>
                </div>

                {/* Success Alert */}
                {success && (
                  <div className="p-4 rounded-xl bg-[#123D27] border border-[#C4E85A]/40 text-[#F2F0E5] flex items-start space-x-3 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 text-[#C4E85A] shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed">{success}</p>
                  </div>
                )}

                {/* Error Alert */}
                {error && (
                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs leading-relaxed animate-fadeIn">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#D8D9C9] uppercase tracking-wider block">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Mr. George Varghese"
                      className="w-full bg-[#071C14] border border-[#123D27] rounded-xl px-4 py-3 text-[#F2F0E5] placeholder-[#D8D9C9]/40 focus:border-[#C4E85A] outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#D8D9C9] uppercase tracking-wider block">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 94470 00000"
                        className="w-full bg-[#071C14] border border-[#123D27] rounded-xl px-4 py-3 text-[#F2F0E5] placeholder-[#D8D9C9]/40 focus:border-[#C4E85A] outline-none transition-colors font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#D8D9C9] uppercase tracking-wider block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-[#071C14] border border-[#123D27] rounded-xl px-4 py-3 text-[#F2F0E5] placeholder-[#D8D9C9]/40 focus:border-[#C4E85A] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#D8D9C9] uppercase tracking-wider block">
                      Enquiry or Requirements *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention the number of grafted saplings required, location, or questions regarding soil and spacing..."
                      className="w-full bg-[#071C14] border border-[#123D27] rounded-xl p-4 text-[#F2F0E5] placeholder-[#D8D9C9]/40 focus:border-[#C4E85A] outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-[#C4E85A] hover:bg-[#d4f570] text-[#071C14] px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                    >
                      <span>{sending ? 'SENDING ENQUIRY...' : 'SEND ENQUIRY →'}</span>
                    </button>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
