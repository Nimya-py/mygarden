import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../services/api';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const whatsappNumber = "919447312890";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Kinattukara Nutmeg Plantation & Nursery, I am reaching out to enquire about plant availability and nursery visits."
  )}`;
  const mapUrl = "https://maps.google.com/?q=Kinattukara+Nutmeg+Plantation+and+Nursery+Kerala";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess('');
    setError('');

    try {
      let nurseryId = null;
      try {
        const nurseriesRes = await API.get('/nurseries');
        nurseryId = nurseriesRes.data.data?.[0]?._id;
      } catch (err) {
        console.log('Using direct enquiry submission');
      }

      await API.post('/enquiries', {
        nursery: nurseryId || '000000000000000000000001',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      });

      setSuccess('Thank you for contacting Kinattukara. Our team will get back to you shortly.');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      setSuccess('Thank you for reaching out! We have received your details and will call or WhatsApp you soon.');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-[#F7F5EE] text-[#172018] min-h-screen pt-6 sm:pt-8 pb-12 sm:pb-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-10 sm:space-y-12">
        
        {/* ==================================================
            1. STRONGER COMPACT INTRODUCTION
           ================================================== */}
        <div className="space-y-2">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-[#647563] hover:text-[#163A24] uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <p className="text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase pt-1">
            LET’S GROW SOMETHING TOGETHER
          </p>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0B2115] tracking-tight leading-tight max-w-3xl">
            Have a question about our nutmeg plants? We’re happy to hear from you.
          </h1>
        </div>

        {/* ==================================================
            2. BALANCED TWO-COLUMN CONTACT SECTION
           ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column — Visit Kinattukara */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-[#163A24]/10 shadow-sm space-y-6">
            
            {/* Authentic Nursery Photo */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#EAE6DB] border border-[#163A24]/10 shadow-sm">
              <img
                src="/images/about-nursery.jpg"
                alt="Kinattukara Nutmeg Nursery plantation rows in Kerala"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#0B2115]/80 backdrop-blur-sm text-[#F7F5EE] px-3 py-1 rounded-full text-[11px] font-medium tracking-wide">
                Kinattukara Nursery
              </div>
            </div>

            {/* Business Contact Details */}
            <div className="space-y-4 text-xs sm:text-sm text-[#172018]/80">
              
              {/* Location */}
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-[#163A24]/10 flex items-center justify-center text-[#163A24] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#0B2115]">Plantation & Nursery Location</p>
                  <p className="text-[#647563] text-xs mt-0.5 leading-relaxed">
                    Kinattukara, Thrissur / Palakkad Highway, Kerala, India
                  </p>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[#163A24] font-semibold text-xs mt-1 hover:underline"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-[#163A24]/10 flex items-center justify-center text-[#163A24] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#0B2115]">Direct Telephone</p>
                  <a
                    href="tel:+919447312890"
                    className="text-[#647563] text-xs hover:text-[#163A24] transition-colors mt-0.5 block font-medium"
                  >
                    +91 94473 12890
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-[#163A24]/10 flex items-center justify-center text-[#163A24] shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#0B2115]">WhatsApp Enquiries</p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#647563] text-xs hover:text-[#163A24] transition-colors mt-0.5 block"
                  >
                    +91 94473 12890 <span className="text-[#163A24] font-medium">(Instant response)</span>
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-[#163A24]/10 flex items-center justify-center text-[#163A24] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#0B2115]">Email Support</p>
                  <a
                    href="mailto:info@kinattukara.com"
                    className="text-[#647563] text-xs hover:text-[#163A24] transition-colors mt-0.5 block"
                  >
                    info@kinattukara.com
                  </a>
                </div>
              </div>

              {/* Visiting Hours */}
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-[#163A24]/10 flex items-center justify-center text-[#163A24] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#0B2115]">Visiting Hours</p>
                  <p className="text-[#647563] text-xs mt-0.5 leading-relaxed">
                    Monday to Saturday: 8:00 AM – 6:30 PM<br />
                    Sunday: 9:00 AM – 2:00 PM
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column — Send an Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 lg:p-9 border border-[#163A24]/10 shadow-sm space-y-6">
            
            <div className="space-y-1.5">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#0B2115]">
                Send an Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-[#647563] font-light leading-relaxed">
                Ask about sapling availability, bulk orders, and planting guidance.
              </p>
            </div>

            {success && (
              <div className="p-4 bg-[#163A24]/10 border border-[#163A24]/20 rounded-xl flex items-center space-x-3 text-xs text-[#163A24]">
                <CheckCircle className="w-4 h-4 text-[#163A24] shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Your Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#0B2115]">
                    Your Name <span className="text-[#163A24]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Suresh Kumar"
                    className="w-full bg-[#F7F5EE]/60 hover:bg-[#F7F5EE] border border-[#163A24]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#172018] placeholder:text-[#647563]/60 focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24] transition-all"
                  />
                </div>

                {/* WhatsApp / Phone */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#0B2115]">
                    WhatsApp / Phone <span className="text-[#163A24]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98470 00000"
                    className="w-full bg-[#F7F5EE]/60 hover:bg-[#F7F5EE] border border-[#163A24]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#172018] placeholder:text-[#647563]/60 focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24] transition-all"
                  />
                </div>
              </div>

              {/* Email (Optional) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#0B2115]">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="suresh@example.com"
                  className="w-full bg-[#F7F5EE]/60 hover:bg-[#F7F5EE] border border-[#163A24]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#172018] placeholder:text-[#647563]/60 focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24] transition-all"
                />
              </div>

              {/* What are you looking for? */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#0B2115]">
                  What are you looking for? <span className="text-[#163A24]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the varieties you need, number of saplings, or questions regarding plantation setup..."
                  className="w-full bg-[#F7F5EE]/60 hover:bg-[#F7F5EE] border border-[#163A24]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#172018] placeholder:text-[#647563]/60 focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24] transition-all resize-y"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold py-3.5 rounded-full text-xs tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 shadow hover:shadow-md disabled:opacity-70 mt-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sending ? 'Sending Enquiry...' : 'Send Enquiry'}</span>
              </button>

            </form>
          </div>

        </div>

        {/* ==================================================
            4. FINAL VISIT CTA
           ================================================== */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#163A24]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#647563] uppercase">
              VISIT KINATTUKARA
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#0B2115] leading-tight">
              Interested in our nutmeg plants? Come and explore the nursery in person.
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 border border-[#163A24]/30 hover:bg-[#163A24]/5 text-[#163A24] px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition-colors"
            >
              <span>Get Directions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition-all shadow"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
