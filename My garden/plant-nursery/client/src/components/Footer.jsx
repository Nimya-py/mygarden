import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { useNursery } from '../context/NurseryContext';

export const Footer = () => {
  const { nursery } = useNursery();
  const rawPhone = nursery?.whatsapp || nursery?.phone || "919447312890";
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${nursery?.name || 'Kinattukara Nutmeg Nursery'}, I would like to enquire about your plant collection.`
  )}`;
  const mapUrl = nursery?.googleMapsLink || "https://maps.google.com/?q=Kinattukara+Nutmeg+Plantation+and+Nursery+Kerala";

  return (
    <footer className="bg-[#0B2115] text-[#F7F5EE] border-t border-[#163A24]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 3-Column Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#163A24]">
          
          {/* Column 1: Brand & Narrative */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-2.5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-md">
                <img
                  src="/images/kinattukara_square_logo.png"
                  alt="Kinattukara Emblem"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-cormorant text-3xl sm:text-4xl tracking-[0.03em] uppercase font-bold text-[#F7F5EE] block">
                KINATTUKARA
              </span>
              <p className="text-xs sm:text-[13px] tracking-[0.14em] text-[#A7C2A6] uppercase font-medium">
                Nutmeg Plantation & Nursery
              </p>
            </div>
            <p className="text-xs text-[#F7F5EE]/70 font-light leading-relaxed max-w-sm">
              {nursery?.description || "Kerala's trusted source for premium grafted nutmeg plants, spice crops, and authentic agricultural expertise. Dedicated to sustainable farming and exceptional sapling quality."}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold text-[#647563]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-[#F7F5EE]/80 hover:text-[#F7F5EE] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#F7F5EE]/80 hover:text-[#F7F5EE] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/plants/nutmeg" className="text-[#F7F5EE]/80 hover:text-[#F7F5EE] transition-colors">
                  Nutmeg Plants
                </Link>
              </li>
              <li>
                <Link to="/awards" className="text-[#F7F5EE]/80 hover:text-[#F7F5EE] transition-colors">
                  Awards
                </Link>
              </li>
              <li>
                <Link to="/planting-tips" className="text-[#F7F5EE]/80 hover:text-[#F7F5EE] transition-colors">
                  Planting Tips
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-[#F7F5EE]/80 hover:text-[#F7F5EE] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#F7F5EE]/80 hover:text-[#F7F5EE] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-[#F7F5EE]/60 hover:text-[#F7F5EE] transition-colors">
                  Staff & Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold text-[#647563]">
              Contact
            </h4>
            <ul className="space-y-3 text-xs text-[#F7F5EE]/80">
              <li className="flex items-center space-x-2.5">
                <Phone className="w-3.5 h-3.5 text-[#647563] shrink-0" />
                <a href="tel:+919447312890" className="hover:text-[#F7F5EE] transition-colors">
                  +91 94473 12890
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <MessageCircle className="w-3.5 h-3.5 text-[#4ade80] shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#F7F5EE] transition-colors">
                  WhatsApp: +91 94473 12890
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-3.5 h-3.5 text-[#647563] shrink-0" />
                <a href="mailto:info@kinattukara.com" className="hover:text-[#F7F5EE] transition-colors">
                  info@kinattukara.com
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#647563] shrink-0 mt-0.5" />
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#F7F5EE] transition-colors flex items-center space-x-1">
                  <span>Kinattukara, Thrissur / Palakkad Highway, Kerala, India</span>
                  <ArrowUpRight className="w-3 h-3 text-[#647563]" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#647563]">
          <p>© 2026 Kinattukara Nutmeg Plantation & Nursery. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-serif italic text-xs text-[#F7F5EE]/40">
            Dedicated to Agricultural Excellence in Kerala
          </p>
        </div>

      </div>
    </footer>
  );
};
