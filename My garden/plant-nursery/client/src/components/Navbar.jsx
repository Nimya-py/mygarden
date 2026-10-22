import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Sprout,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Desktop Nutmeg dropdown state
  const [nutmegDropdownOpen, setNutmegDropdownOpen] = useState(false);

  // Mobile drawer & accordion states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileNutmegOpen, setMobileNutmegOpen] = useState(false);

  // Ref for click outside dropdown
  const nutmegRef = useRef(null);

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  // Close dropdown on outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (nutmegRef.current && !nutmegRef.current.contains(event.target)) {
        setNutmegDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setNutmegDropdownOpen(false);
    setMobileNutmegOpen(false);
  }, [location.pathname]);

  // Route active state helpers
  const isHomeActive = location.pathname === '/';
  const isAboutActive = location.pathname === '/about';
  const isNutmegActive =
    location.pathname.startsWith('/plants') ||
    location.pathname.startsWith('/nutmeg') ||
    location.pathname.startsWith('/uses-of-nutmeg');
  const isPlantingActive =
    location.pathname.startsWith('/planting-tips') ||
    location.pathname.startsWith('/plant-care');
  const isGalleryActive = location.pathname.startsWith('/gallery');
  const isAwardsActive = location.pathname.startsWith('/awards');
  const isTestimonialsActive = location.pathname.startsWith('/testimonials');
  const isContactActive = location.pathname.startsWith('/contact');

  // Shared active underline indicator with vibrant lime accent (subtle and clean)
  const activeUnderline =
    "text-[#C4E85A] font-semibold after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-[#C4E85A] after:rounded-full";

  return (
    <header className="sticky top-0 z-50 bg-[#071C14]/95 backdrop-blur-md border-b border-[#123D27]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
        
        {/* Main Header Container: 88px desktop, 76px mobile */}
        <div className="flex items-center justify-between h-[76px] lg:h-[88px] w-full">
          
          {/* ==================================================
              DESKTOP VIEW (>= 1024px)
              Layout:
              [ LOGO ] ----------------- [ NAV LINKS ] [ CONTACT CTA ]
              - Logo visually dominant on left
              - Nav links: Home | About | Nutmeg ▾ | Planting Tips | Gallery | Awards | Testimonials
              - Comfortable horizontal spacing without crowding
              - Typography strictly 16–16.5px
              - Contact as compact lime-green CTA
             ================================================== */}
          <div className="hidden lg:flex items-center justify-between w-full gap-4 xl:gap-8">
            
            {/* Brand Logo & Typography (Visually Dominant) */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 py-1 group transition-transform duration-200"
              aria-label="Kinattukara Nutmeg Plantation & Nursery"
            >
              <div className="w-[46px] h-[46px] xl:w-[50px] xl:h-[50px] rounded-[10px] overflow-hidden shrink-0 shadow-sm border border-[#123D27]/60 bg-[#0B2419]">
                <img
                  src="/images/kinattukara_square_logo.png"
                  alt="Kinattukara Emblem"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-center">
                <span className="font-display text-[22px] xl:text-[24px] font-extrabold text-[#F2F0E5] leading-none tracking-[-0.03em] uppercase group-hover:text-[#C4E85A] transition-colors">
                  KINATTUKARA
                </span>
                <span className="font-sans text-[11px] xl:text-[12px] font-medium text-[#D8D9C9]/85 tracking-[0.2px] whitespace-nowrap leading-tight mt-1">
                  Nutmeg Plantation & Nursery
                </span>
              </div>
            </Link>

            {/* Desktop Navigation & Contact CTA */}
            <div className="flex items-center gap-4 xl:gap-6 2xl:gap-8">
              <nav className="flex items-center gap-3.5 xl:gap-5 2xl:gap-6 text-[15.5px] xl:text-[16.5px] font-semibold tracking-[-0.01em] whitespace-nowrap">
                
                {/* 1. HOME */}
                <Link
                  to="/"
                  className={`relative py-1 transition-colors duration-200 ${
                    isHomeActive
                      ? activeUnderline
                      : 'text-[#F2F0E5]/85 hover:text-[#C4E85A]'
                  }`}
                >
                  Home
                </Link>

                {/* 2. ABOUT */}
                <Link
                  to="/about"
                  className={`relative py-1 transition-colors duration-200 ${
                    isAboutActive
                      ? activeUnderline
                      : 'text-[#F2F0E5]/85 hover:text-[#C4E85A]'
                  }`}
                >
                  About
                </Link>

                {/* 3. NUTMEG DROPDOWN */}
                <div
                  className="relative py-1"
                  ref={nutmegRef}
                  onMouseEnter={() => setNutmegDropdownOpen(true)}
                  onMouseLeave={() => setNutmegDropdownOpen(false)}
                >
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <Link
                      to="/plants/nutmeg"
                      className={`transition-colors duration-200 ${
                        isNutmegActive
                          ? 'text-[#C4E85A] font-semibold'
                          : 'text-[#F2F0E5]/85 hover:text-[#C4E85A]'
                      }`}
                    >
                      Nutmeg
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNutmegDropdownOpen(!nutmegDropdownOpen);
                      }}
                      aria-label="Toggle Nutmeg submenu"
                      className="p-0.5 text-[#D8D9C9]/70 hover:text-[#C4E85A]"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          nutmegDropdownOpen ? 'rotate-180 text-[#C4E85A]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {isNutmegActive && (
                    <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#C4E85A] rounded-full pointer-events-none" />
                  )}

                  {/* Nutmeg Submenu Card */}
                  {nutmegDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 w-60 z-50 animate-fadeIn">
                      <div className="bg-[#0B2419] border border-[#123D27] rounded-xl shadow-2xl p-2 space-y-1">
                        <Link
                          to="/plants/nutmeg"
                          className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                            location.pathname === '/plants/nutmeg'
                              ? 'bg-[#123D27] text-[#C4E85A]'
                              : 'text-[#F2F0E5]/90 hover:bg-[#123D27]/60 hover:text-[#C4E85A]'
                          }`}
                        >
                          <Sprout className="w-3.5 h-3.5 text-[#A8D64B] shrink-0" />
                          <span>Nutmeg Varieties</span>
                        </Link>

                        <Link
                          to="/uses-of-nutmeg"
                          className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                            location.pathname === '/uses-of-nutmeg'
                              ? 'bg-[#123D27] text-[#C4E85A]'
                              : 'text-[#F2F0E5]/90 hover:bg-[#123D27]/60 hover:text-[#C4E85A]'
                          }`}
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#A8D64B] shrink-0" />
                          <span>Uses of Nutmeg</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. PLANTING TIPS */}
                <Link
                  to="/planting-tips"
                  className={`relative py-1 transition-colors duration-200 ${
                    isPlantingActive
                      ? activeUnderline
                      : 'text-[#F2F0E5]/85 hover:text-[#C4E85A]'
                  }`}
                >
                  Planting Tips
                </Link>

                {/* 5. GALLERY */}
                <Link
                  to="/gallery"
                  className={`relative py-1 transition-colors duration-200 ${
                    isGalleryActive
                      ? activeUnderline
                      : 'text-[#F2F0E5]/85 hover:text-[#C4E85A]'
                  }`}
                >
                  Gallery
                </Link>

                {/* 6. AWARDS */}
                <Link
                  to="/awards"
                  className={`relative py-1 transition-colors duration-200 ${
                    isAwardsActive
                      ? activeUnderline
                      : 'text-[#F2F0E5]/85 hover:text-[#C4E85A]'
                  }`}
                >
                  Awards
                </Link>

                {/* 7. TESTIMONIALS */}
                <Link
                  to="/testimonials"
                  className={`relative py-1 transition-colors duration-200 ${
                    isTestimonialsActive
                      ? activeUnderline
                      : 'text-[#F2F0E5]/85 hover:text-[#C4E85A]'
                  }`}
                >
                  Testimonials
                </Link>

              </nav>

              {/* 8. CONTACT (Compact Lime-Green CTA Button) */}
              <Link
                to="/contact"
                className={`inline-flex items-center justify-center px-4 xl:px-5 py-2 rounded-full text-xs xl:text-[13px] font-display font-extrabold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] shrink-0 ${
                  isContactActive
                    ? 'bg-[#d4f570] text-[#071C14] shadow-md ring-2 ring-[#C4E85A]/40'
                    : 'bg-[#C4E85A] hover:bg-[#d4f570] text-[#071C14]'
                }`}
              >
                Contact
              </Link>

            </div>

          </div>

          {/* ==================================================
              MOBILE / TABLET VIEW (< 1024px)
              Logo on left, Hamburger button on right
             ================================================== */}
          <div className="flex items-center justify-between w-full lg:hidden">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 shrink-0 py-1"
              aria-label="Kinattukara Home"
            >
              <div className="w-[40px] h-[40px] rounded-[8px] overflow-hidden shrink-0 border border-[#123D27]/50">
                <img
                  src="/images/kinattukara_square_logo.png"
                  alt="Kinattukara Emblem"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-display text-[19px] font-extrabold text-[#F2F0E5] leading-none tracking-[-0.03em] uppercase">
                  KINATTUKARA
                </span>
                <span className="font-sans text-[10px] font-medium text-[#D8D9C9]/80 tracking-[0.2px] whitespace-nowrap leading-tight mt-0.5">
                  Nutmeg Plantation & Nursery
                </span>
              </div>
            </Link>

            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#C4E85A] hover:bg-[#123D27]/40 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* ==================================================
            MOBILE NAVIGATION DRAWER (< 1024px)
            Clean, dark botanical slide-down list with all 8 items
           ================================================== */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#123D27]/40 bg-[#071C14] py-4 px-2 space-y-1 animate-fadeIn">
            
            {/* 1. Home */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isHomeActive
                  ? 'bg-[#123D27] text-[#C4E85A]'
                  : 'text-[#F2F0E5]/85 hover:bg-[#123D27]/50 hover:text-[#C4E85A]'
              }`}
            >
              Home
            </Link>

            {/* 2. About */}
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isAboutActive
                  ? 'bg-[#123D27] text-[#C4E85A]'
                  : 'text-[#F2F0E5]/85 hover:bg-[#123D27]/50 hover:text-[#C4E85A]'
              }`}
            >
              About
            </Link>

            {/* 3. Nutmeg Accordion (Primary Plant Section) */}
            <div className="rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileNutmegOpen(!mobileNutmegOpen)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isNutmegActive
                    ? 'bg-[#123D27] text-[#C4E85A]'
                    : 'text-[#F2F0E5]/85 hover:bg-[#123D27]/50 hover:text-[#C4E85A]'
                }`}
              >
                <span>Nutmeg</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileNutmegOpen ? 'rotate-180 text-[#C4E85A]' : 'text-[#D8D9C9]/60'
                  }`}
                />
              </button>

              {mobileNutmegOpen && (
                <div className="pl-6 pr-2 py-1 space-y-1 bg-[#0B2419] rounded-b-lg">
                  <Link
                    to="/plants/nutmeg"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded text-xs font-semibold transition-colors ${
                      location.pathname === '/plants/nutmeg'
                        ? 'text-[#C4E85A] bg-[#123D27]/40'
                        : 'text-[#F2F0E5]/80 hover:text-[#C4E85A]'
                    }`}
                  >
                    • Nutmeg Varieties & Saplings
                  </Link>
                  <Link
                    to="/uses-of-nutmeg"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded text-xs font-semibold transition-colors ${
                      location.pathname === '/uses-of-nutmeg'
                        ? 'text-[#C4E85A] bg-[#123D27]/40'
                        : 'text-[#F2F0E5]/80 hover:text-[#C4E85A]'
                    }`}
                  >
                    • Uses of Nutmeg
                  </Link>
                </div>
              )}
            </div>

            {/* 5. Planting Tips */}
            <Link
              to="/planting-tips"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isPlantingActive
                  ? 'bg-[#123D27] text-[#C4E85A]'
                  : 'text-[#F2F0E5]/85 hover:bg-[#123D27]/50 hover:text-[#C4E85A]'
              }`}
            >
              Planting Tips
            </Link>

            {/* 6. Gallery */}
            <Link
              to="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isGalleryActive
                  ? 'bg-[#123D27] text-[#C4E85A]'
                  : 'text-[#F2F0E5]/85 hover:bg-[#123D27]/50 hover:text-[#C4E85A]'
              }`}
            >
              Gallery
            </Link>

            {/* 7. Awards */}
            <Link
              to="/awards"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isAwardsActive
                  ? 'bg-[#123D27] text-[#C4E85A]'
                  : 'text-[#F2F0E5]/85 hover:bg-[#123D27]/50 hover:text-[#C4E85A]'
              }`}
            >
              Awards
            </Link>

            {/* 8. Testimonials */}
            <Link
              to="/testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isTestimonialsActive
                  ? 'bg-[#123D27] text-[#C4E85A]'
                  : 'text-[#F2F0E5]/85 hover:bg-[#123D27]/50 hover:text-[#C4E85A]'
              }`}
            >
              Testimonials
            </Link>

            {/* 9. Contact (Compact Lime CTA on Mobile) */}
            <div className="pt-2 px-2 pb-1">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-center py-2.5 px-4 rounded-full text-xs font-display font-extrabold uppercase tracking-wider transition-colors shadow ${
                  isContactActive
                    ? 'bg-[#d4f570] text-[#071C14] ring-2 ring-[#C4E85A]/40'
                    : 'bg-[#C4E85A] hover:bg-[#d4f570] text-[#071C14]'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Logged in admin shortcut if authenticated */}
            {user && isAdmin && (
              <div className="pt-3 px-3 pb-1 border-t border-[#123D27]/50 space-y-1">
                <Link
                  to={isSuperAdmin ? '/super-admin' : '/admin'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#C4E85A] bg-[#123D27]"
                >
                  Admin Portal ({isSuperAdmin ? 'Super Admin' : 'Nursery Admin'})
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-950/30"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
