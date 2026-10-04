import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MessageCircle } from 'lucide-react';

export const PublicLayout = () => {
  const whatsappNumber = "919447312890";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Kinattukara Nutmeg Nursery, I would like to enquire about your plant collection."
  )}`;

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
        className="fixed bottom-6 right-6 z-40 bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] p-3.5 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105 border border-[#F7F5EE]/20 group"
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
