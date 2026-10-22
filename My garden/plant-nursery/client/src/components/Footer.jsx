import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useNursery } from '../context/NurseryContext';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const Footer = () => {
  const { nursery } = useNursery();

  const displayPhone = nursery?.phone || '+91 94473 12890';
  const displayEmail = nursery?.email || 'info@kinattukara.com';
  const displayAddress = nursery?.address
    ? `${nursery.address}, ${nursery.city || ''}, ${nursery.state || 'Kerala'}`
    : 'Kinattukara, Thrissur / Palakkad Highway, Thrissur, Kerala';

  const nurseryName = nursery?.name || 'Kinattukara Nutmeg Plantation & Nursery';
  const rawWhatsapp = nursery?.whatsapp || nursery?.phone || '919447312890';
  const footerWhatsappUrl = getWhatsAppUrl(
    rawWhatsapp,
    `Hello ${nurseryName}, I would like to enquire about your nutmeg plants and saplings.`
  );

  const instagramUrl = nursery?.socialLinks?.instagram || 'https://www.instagram.com';
  const facebookUrl = nursery?.socialLinks?.facebook || 'https://www.facebook.com';
  const mapUrl = 'https://maps.google.com/?q=Kinattukara+Nutmeg+Plantation+and+Nursery+Kerala';

  return (
    <footer className="bg-[#04110C] text-[#F2F0E5] border-t border-[#123D27]/40 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 px-5 sm:px-8 lg:px-12 xl:px-14">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Main 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-start">
          
          {/* COLUMN 1 — CONTACT (5 cols) */}
          <div className="md:col-span-12 lg:col-span-5 xl:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                GET IN TOUCH
              </p>

              <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#F2F0E5] leading-[1.05] tracking-[-0.03em] uppercase max-w-[460px]">
                LET'S TALK <br />
                <span className="text-[#C4E85A]">ABOUT NUTMEG.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#D8D9C9] font-normal leading-relaxed max-w-md">
              For plant enquiries, nursery information, or more details about our nutmeg plants, get in touch with Kinattukara.
            </p>

            <div>
              <Link
                to="/contact"
                className="group inline-flex items-center space-x-2 text-xs sm:text-sm font-bold tracking-wider text-[#C4E85A] hover:text-[#F2F0E5] uppercase transition-colors"
              >
                <span>CONTACT US</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

            {/* CONNECT WITH US — Icon-Only Action Row (Instagram, Facebook, WhatsApp, Phone, Email) */}
            <div className="pt-2 border-t border-[#123D27]/40 space-y-2.5">
              <span className="text-[11px] font-bold tracking-widest text-[#C4E85A] uppercase block">
                CONNECT WITH US
              </span>

              <div className="flex items-center space-x-2 sm:space-x-2.5">
                {/* 1. Instagram */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  title="Instagram"
                  className="w-9 h-9 rounded-lg border border-[#123D27]/70 hover:border-[#C4E85A]/60 bg-[#071C14]/40 text-[#D8D9C9] hover:text-[#C4E85A] transition-colors flex items-center justify-center group"
                >
                  <svg
                    className="w-[18px] h-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>

                {/* 2. Facebook */}
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  title="Facebook"
                  className="w-9 h-9 rounded-lg border border-[#123D27]/70 hover:border-[#C4E85A]/60 bg-[#071C14]/40 text-[#D8D9C9] hover:text-[#C4E85A] transition-colors flex items-center justify-center group"
                >
                  <svg
                    className="w-[18px] h-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>

                {/* 3. WhatsApp */}
                <a
                  href={footerWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  title="WhatsApp"
                  className="w-9 h-9 rounded-lg border border-[#123D27]/70 hover:border-[#C4E85A]/60 bg-[#071C14]/40 text-[#D8D9C9] hover:text-[#C4E85A] transition-colors flex items-center justify-center group"
                >
                  <svg
                    className="w-[18px] h-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </a>

                {/* 4. Phone */}
                <a
                  href={`tel:${displayPhone.replace(/[^0-9+]/g, '')}`}
                  aria-label={`Call ${displayPhone}`}
                  title="Call Us"
                  className="w-9 h-9 rounded-lg border border-[#123D27]/70 hover:border-[#C4E85A]/60 bg-[#071C14]/40 text-[#D8D9C9] hover:text-[#C4E85A] transition-colors flex items-center justify-center group"
                >
                  <svg
                    className="w-[18px] h-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </a>

                {/* 5. Email */}
                <a
                  href={`mailto:${displayEmail}`}
                  aria-label={`Email ${displayEmail}`}
                  title="Send Email"
                  className="w-9 h-9 rounded-lg border border-[#123D27]/70 hover:border-[#C4E85A]/60 bg-[#071C14]/40 text-[#D8D9C9] hover:text-[#C4E85A] transition-colors flex items-center justify-center group"
                >
                  <svg
                    className="w-[18px] h-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 2 — EXPLORE (3 cols) */}
          <div className="md:col-span-5 lg:col-span-3 xl:col-span-3 space-y-4 pt-4 md:pt-0">
            <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
              EXPLORE
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs sm:text-sm">
              <div className="flex flex-col space-y-2.5">
                <Link to="/" className="font-medium text-[#D8D9C9] hover:text-[#C4E85A] transition-colors">
                  Home
                </Link>
                <Link to="/about" className="font-medium text-[#D8D9C9] hover:text-[#C4E85A] transition-colors">
                  About
                </Link>
                <Link to="/plants/nutmeg" className="font-medium text-[#D8D9C9] hover:text-[#C4E85A] transition-colors">
                  Nutmeg
                </Link>
                <Link to="/planting-tips" className="font-medium text-[#D8D9C9] hover:text-[#C4E85A] transition-colors">
                  Planting Tips
                </Link>
              </div>
              <div className="flex flex-col space-y-2.5">
                <Link to="/gallery" className="font-medium text-[#D8D9C9] hover:text-[#C4E85A] transition-colors">
                  Gallery
                </Link>
                <Link to="/awards" className="font-medium text-[#D8D9C9] hover:text-[#C4E85A] transition-colors">
                  Awards
                </Link>
                <Link to="/testimonials" className="font-medium text-[#D8D9C9] hover:text-[#C4E85A] transition-colors">
                  Testimonials
                </Link>
                <Link to="/contact" className="font-medium text-[#D8D9C9] hover:text-[#C4E85A] transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* COLUMN 3 — VISIT KINATTUKARA (4 cols) */}
          <div className="md:col-span-7 lg:col-span-4 xl:col-span-4 space-y-4 pt-4 md:pt-0">
            <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
              VISIT KINATTUKARA
            </p>

            <div className="space-y-4 text-xs sm:text-[13px]">
              {/* Plantation & View Location */}
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#C4E85A] uppercase block">
                  PLANTATION & NURSERY
                </span>
                <p className="text-sm sm:text-base text-[#F2F0E5] font-medium leading-relaxed">
                  {displayAddress}
                </p>
                <div className="pt-0.5">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#C4E85A] hover:text-[#F2F0E5] uppercase tracking-wider transition-colors"
                  >
                    <span>VIEW LOCATION</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="pt-3 border-t border-[#123D27]/35 space-y-0.5">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#C4E85A] uppercase block">
                  PHONE
                </span>
                <a
                  href={`tel:${displayPhone.replace(/[^0-9+]/g, '')}`}
                  className="text-sm sm:text-base font-medium text-[#F2F0E5] hover:text-[#C4E85A] transition-colors block"
                >
                  {displayPhone}
                </a>
              </div>

              {/* Email */}
              <div className="pt-3 border-t border-[#123D27]/35 space-y-0.5">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#C4E85A] uppercase block">
                  EMAIL
                </span>
                <a
                  href={`mailto:${displayEmail}`}
                  className="text-sm sm:text-base font-medium text-[#D8D9C9] hover:text-[#C4E85A] transition-colors block"
                >
                  {displayEmail}
                </a>
              </div>

              {/* Visiting Hours */}
              <div className="pt-3 border-t border-[#123D27]/35 space-y-0.5">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#C4E85A] uppercase block">
                  VISITING HOURS
                </span>
                <p className="text-xs sm:text-sm text-[#D8D9C9]/85 font-normal leading-relaxed">
                  Monday to Saturday: 8:00 AM – 6:30 PM <br />
                  Sunday: Prior appointment welcomed
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Divider & Compact Copyright Row */}
        <div className="mt-10 sm:mt-12 pt-5 border-t border-[#123D27]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#D8D9C9]/50 gap-2 pr-14 sm:pr-0">
          <p>© 2026 Kinattukara Nutmeg Plantation & Nursery. All rights reserved.</p>
          <p className="text-[11px] sm:text-xs text-[#D8D9C9]/40 italic">
            Dedicated to Agricultural Excellence in Kerala
          </p>
        </div>

      </div>
    </footer>
  );
};
