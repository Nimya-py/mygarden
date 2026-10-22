import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MessageCircle } from 'lucide-react';

import { useNursery } from '../context/NurseryContext';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const PublicLayout = () => {
  const location = useLocation();
  const { nursery } = useNursery();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const rawPhone = nursery?.whatsapp || nursery?.phone || '919447312890';
  const nurseryName = nursery?.name || 'Kinattukara Nutmeg Plantation & Nursery';
  const presetMessage = `Hello ${nurseryName}, I would like to enquire about your nutmeg plants, sapling availability, and nursery visits.`;
  const whatsappUrl = getWhatsAppUrl(rawPhone, presetMessage);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EE] text-[#172018]">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      {/* Floating WhatsApp CTA Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[18px] right-[18px] sm:bottom-[24px] sm:right-[28px] z-40 bg-[#0B2419] hover:bg-[#123D27] text-[#F2F0E5] p-3 rounded-full shadow-xl flex items-center space-x-2 transition-all duration-300 hover:scale-105 border border-[#C4E85A]/30 group"
        title="Enquire on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-[#4ade80]" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-xs font-medium pr-1">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
};
