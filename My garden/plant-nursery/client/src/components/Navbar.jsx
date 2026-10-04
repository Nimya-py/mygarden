import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogIn,
  LogOut,
  LayoutDashboard,
  Settings,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNursery } from '../context/NurseryContext';
import { LoginModal } from './LoginModal';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { nursery } = useNursery();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [nutmegDropdownOpen, setNutmegDropdownOpen] = useState(false);
  const [mobileNutmegOpen, setMobileNutmegOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const dropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const location = useLocation();

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  // Close dropdowns on clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNutmegDropdownOpen(false);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setNutmegDropdownOpen(false);
    setAccountDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isNutmegActive =
    location.pathname.startsWith('/plants') ||
    location.pathname.startsWith('/nutmeg') ||
    location.pathname.startsWith('/uses-of-nutmeg');

  return (
    <header className="sticky top-0 z-50 bg-[#F7F5EE]/95 backdrop-blur-md border-b border-[#084F09]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px] sm:h-[80px] gap-2 lg:gap-4">
          
          {/* ==================================================
              1. LEFT: ORIGINAL GREEN SQUARE LOGO + BRAND IDENTITY
              - 54px x 54px square with ~11px rounded corners
              - No outer circle, no extra border, no shadow
              - Original dark green background & colors preserved
              - Controlled width: ~300–310px
              - 14–16px gap between logo and brand text
              - KINATTUKARA: Cormorant Garamond, 28px, 600/700, deep forest green
              - Subtitle: Inter, 13px, medium weight, same brand green
             ================================================== */}
          <Link
            to="/"
            className="logo-section flex items-center gap-[12px] xl:gap-[15px] shrink-0 w-auto lg:w-[280px] xl:w-[310px] max-w-[310px] group py-1"
            style={{ flexShrink: 0 }}
          >
            {/* Original Green Square Logo: 54px × 54px */}
            <div className="w-[50px] h-[50px] xl:w-[54px] xl:h-[54px] rounded-[11px] overflow-hidden shrink-0">
              <img
                src="/images/kinattukara_square_logo.png"
                alt="Kinattukara Nutmeg Logo"
                className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-300"
              />
            </div>

            {/* Brand Titles */}
            <div className="flex flex-col min-w-0 justify-center">
              <span className="font-cormorant text-[24px] xl:text-[28px] font-bold text-[#084F09] leading-none tracking-[0.02em] uppercase group-hover:text-[#053806] transition-colors">
                KINATTUKARA
              </span>
              <span className="font-sans text-[12px] xl:text-[13px] font-medium text-[#084F09] tracking-[0.2px] whitespace-nowrap leading-tight mt-1">
                Nutmeg Plantation & Nursery
              </span>
            </div>
          </Link>

          {/* ==================================================
              2. CENTER: MAIN PUBLIC NAVIGATION
              - Sufficient spacing between brand area and Home (pl-4 xl:pl-6)
              - Do not allow KINATTUKARA to visually collide with Home
              - Flexible spacing between navigation items
              - Thin deep-green underline for active item (no pills)
             ================================================== */}
          <nav
            className="navigation-section hidden lg:flex items-center justify-center flex-1 pl-4 xl:pl-6 pr-2 space-x-2.5 xl:space-x-5 text-[14px] xl:text-[15px] font-medium whitespace-nowrap"
            style={{ flex: 1 }}
          >
            {/* 1. HOME */}
            <Link
              to="/"
              className={`transition-colors py-1 border-b-2 ${
                isActive('/')
                  ? 'text-[#084F09] font-semibold border-[#084F09]'
                  : 'text-[#172018] hover:text-[#084F09] border-transparent'
              }`}
            >
              Home
            </Link>

            {/* 2. ABOUT US */}
            <Link
              to="/about"
              className={`transition-colors py-1 border-b-2 ${
                isActive('/about')
                  ? 'text-[#084F09] font-semibold border-[#084F09]'
                  : 'text-[#172018] hover:text-[#084F09] border-transparent'
              }`}
            >
              About Us
            </Link>

            {/* 3. NUTMEG DROPDOWN */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setNutmegDropdownOpen(true)}
              onMouseLeave={() => setNutmegDropdownOpen(false)}
            >
              <button
                onClick={() => setNutmegDropdownOpen(!nutmegDropdownOpen)}
                className={`inline-flex items-center space-x-1 transition-colors py-1 border-b-2 ${
                  isNutmegActive
                    ? 'text-[#084F09] font-semibold border-[#084F09]'
                    : 'text-[#172018] hover:text-[#084F09] border-transparent'
                }`}
                aria-expanded={nutmegDropdownOpen}
              >
                <span>Nutmeg</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    nutmegDropdownOpen ? 'rotate-180 text-[#084F09]' : 'text-[#647563]'
                  }`}
                />
              </button>

              {nutmegDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-56 z-50 animate-fadeIn">
                  <div className="bg-white border border-[#084F09]/10 rounded-xl shadow-lg p-2 space-y-1">
                    <Link
                      to="/plants/nutmeg"
                      className={`block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        location.pathname.startsWith('/plants')
                          ? 'bg-[#084F09]/10 text-[#084F09] font-semibold'
                          : 'text-[#172018] hover:bg-[#084F09]/5 hover:text-[#084F09]'
                      }`}
                    >
                      Our Nutmeg Plants
                    </Link>
                    <Link
                      to="/uses-of-nutmeg"
                      className={`block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        location.pathname.includes('/uses')
                          ? 'bg-[#084F09]/10 text-[#084F09] font-semibold'
                          : 'text-[#172018] hover:bg-[#084F09]/5 hover:text-[#084F09]'
                      }`}
                    >
                      Uses of Nutmeg
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 4. PLANTING TIPS */}
            <Link
              to="/planting-tips"
              className={`transition-colors py-1 border-b-2 ${
                isActive('/planting-tips') || isActive('/plant-care')
                  ? 'text-[#084F09] font-semibold border-[#084F09]'
                  : 'text-[#172018] hover:text-[#084F09] border-transparent'
              }`}
            >
              Planting Tips
            </Link>

            {/* 5. AWARDS */}
            <Link
              to="/awards"
              className={`transition-colors py-1 border-b-2 ${
                isActive('/awards')
                  ? 'text-[#084F09] font-semibold border-[#084F09]'
                  : 'text-[#172018] hover:text-[#084F09] border-transparent'
              }`}
            >
              Awards
            </Link>

            {/* 6. GALLERY */}
            <Link
              to="/gallery"
              className={`transition-colors py-1 border-b-2 ${
                isActive('/gallery')
                  ? 'text-[#084F09] font-semibold border-[#084F09]'
                  : 'text-[#172018] hover:text-[#084F09] border-transparent'
              }`}
            >
              Gallery
            </Link>

            {/* 7. CONTACT */}
            <Link
              to="/contact"
              className={`transition-colors py-1 border-b-2 ${
                isActive('/contact')
                  ? 'text-[#084F09] font-semibold border-[#084F09]'
                  : 'text-[#172018] hover:text-[#084F09] border-transparent'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* ==================================================
              3. RIGHT: AUTHENTICATED USER ACCOUNT / LOGIN
              - Username never cut off (controlled max width & ellipsis)
              - Never overlaps center navigation
             ================================================== */}
          <div
            className="account-section hidden lg:flex items-center justify-end shrink-0 min-w-[120px]"
            style={{ flexShrink: 0 }}
          >
            {user ? (
              <div className="relative" ref={accountDropdownRef}>
                <button
                  type="button"
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="inline-flex items-center space-x-2 text-[14px] font-medium text-[#172018] hover:text-[#084F09] transition-colors py-1.5 px-2.5 sm:px-3 rounded-lg hover:bg-[#084F09]/5 whitespace-nowrap"
                  aria-expanded={accountDropdownOpen}
                >
                  <span className="w-7 h-7 rounded-full bg-[#084F09]/10 text-[#084F09] flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </span>
                  <span className="max-w-[120px] xl:max-w-[160px] truncate font-medium text-[#0B2115]">
                    {user.name && user.name.length <= 18
                      ? user.name
                      : isSuperAdmin
                      ? 'Super Admin'
                      : isAdmin
                      ? 'Nursery Admin'
                      : user.name || 'User'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#647563] transition-transform duration-200 ${
                      accountDropdownOpen ? 'rotate-180 text-[#084F09]' : ''
                    }`}
                  />
                </button>

                {/* Account Dropdown */}
                {accountDropdownOpen && (
                  <div className="absolute right-0 top-full pt-2 w-64 z-50 animate-fadeIn">
                    <div className="bg-white border border-[#163A24]/10 rounded-xl shadow-lg p-2 space-y-1">
                      {/* Dropdown Header: User info */}
                      <div className="px-3 py-2.5 bg-[#F7F5EE]/70 rounded-lg mb-1 border-b border-[#163A24]/10">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-[#163A24] shrink-0" />
                          <span className="text-xs font-semibold text-[#0B2115] truncate">
                            {user.name || user.email}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#647563] font-medium pl-6">
                          {isSuperAdmin
                            ? 'Super Admin'
                            : isAdmin
                            ? 'Nursery Admin'
                            : 'Normal User'}
                        </p>
                      </div>

                      {/* Dropdown Links based on user role */}
                      {isAdmin ? (
                        <>
                          <Link
                            to={isSuperAdmin ? '/super-admin' : '/admin'}
                            className="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24] transition-colors"
                          >
                            <LayoutDashboard className="w-3.5 h-3.5 text-[#163A24]" />
                            <span>Admin Dashboard</span>
                          </Link>
                          <Link
                            to="/admin/settings"
                            className="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24] transition-colors"
                          >
                            <Settings className="w-3.5 h-3.5 text-[#163A24]" />
                            <span>Nursery Profile</span>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/contact"
                            className="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24] transition-colors"
                          >
                            <User className="w-3.5 h-3.5 text-[#163A24]" />
                            <span>My Profile</span>
                          </Link>
                          <Link
                            to="/contact"
                            className="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24] transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-[#163A24]" />
                            <span>My Enquiries</span>
                          </Link>
                        </>
                      )}

                      {/* Divider */}
                      <div className="border-t border-[#163A24]/10 my-1"></div>

                      {/* Logout Action */}
                      <button
                        onClick={() => {
                          logout();
                          setAccountDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5 shrink-0" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setLoginModalOpen(true)}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#163A24] hover:text-[#0B2115] bg-[#163A24]/10 hover:bg-[#163A24]/15 px-3.5 py-1.5 rounded-full transition-colors border border-[#163A24]/15 whitespace-nowrap cursor-pointer"
                title="Staff & Customer Login"
              >
                <LogIn className="w-3.5 h-3.5 text-[#163A24] shrink-0" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* ==================================================
              4. MOBILE MENU BUTTON [ ☰ ]
             ================================================== */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#163A24] hover:bg-[#163A24]/5 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ==================================================
            5. MOBILE NAVIGATION DRAWER
            - Home
            - About Us
            - Nutmeg
            - Planting Tips
            - Awards
            - Gallery
            - Contact
            - Authenticated user account links (only if logged in)
           ================================================== */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#163A24]/10 bg-[#F7F5EE] py-4 px-2 space-y-1 animate-fadeIn">
            {/* 1. Home */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive('/')
                  ? 'bg-[#163A24]/10 text-[#163A24] font-semibold'
                  : 'text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24]'
              }`}
            >
              Home
            </Link>

            {/* 2. About Us */}
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive('/about')
                  ? 'bg-[#163A24]/10 text-[#163A24] font-semibold'
                  : 'text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24]'
              }`}
            >
              About Us
            </Link>

            {/* 3. Nutmeg Accordion */}
            <div className="rounded-lg overflow-hidden">
              <button
                onClick={() => setMobileNutmegOpen(!mobileNutmegOpen)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  isNutmegActive
                    ? 'bg-[#163A24]/10 text-[#163A24] font-semibold'
                    : 'text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24]'
                }`}
              >
                <span>Nutmeg</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileNutmegOpen ? 'rotate-180 text-[#163A24]' : 'text-[#647563]'
                  }`}
                />
              </button>

              {mobileNutmegOpen && (
                <div className="pl-6 pr-2 py-1 space-y-1 bg-[#163A24]/5 rounded-b-lg">
                  <Link
                    to="/plants/nutmeg"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded text-xs text-[#172018] hover:text-[#163A24]"
                  >
                    • Our Nutmeg Plants
                  </Link>
                  <Link
                    to="/uses-of-nutmeg"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded text-xs text-[#172018] hover:text-[#163A24]"
                  >
                    • Uses of Nutmeg
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Planting Tips */}
            <Link
              to="/planting-tips"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive('/planting-tips') || isActive('/plant-care')
                  ? 'bg-[#163A24]/10 text-[#163A24] font-semibold'
                  : 'text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24]'
              }`}
            >
              Planting Tips
            </Link>

            {/* 5. Awards */}
            <Link
              to="/awards"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive('/awards')
                  ? 'bg-[#163A24]/10 text-[#163A24] font-semibold'
                  : 'text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24]'
              }`}
            >
              Awards
            </Link>

            {/* 6. Gallery */}
            <Link
              to="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive('/gallery')
                  ? 'bg-[#163A24]/10 text-[#163A24] font-semibold'
                  : 'text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24]'
              }`}
            >
              Gallery
            </Link>

            {/* 7. Contact (Final Public Item) */}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive('/contact')
                  ? 'bg-[#163A24]/10 text-[#163A24] font-semibold'
                  : 'text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24]'
              }`}
            >
              Contact
            </Link>

            {/* Mobile Authenticated User Session (Or Login Button if logged out) */}
            {user ? (
              <div className="pt-3 px-3 pb-1 border-t border-[#163A24]/10 space-y-1">
                <div className="px-3 py-1.5 text-xs font-semibold text-[#0B2115] flex items-center space-x-2">
                  <User className="w-3.5 h-3.5 text-[#163A24]" />
                  <span className="truncate">{user.name || user.email}</span>
                </div>

                {isAdmin ? (
                  <>
                    <Link
                      to={isSuperAdmin ? '/super-admin' : '/admin'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24]"
                    >
                      Admin Dashboard
                    </Link>
                    <Link
                      to="/admin/settings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24]"
                    >
                      Nursery Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24]"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm text-[#172018] hover:bg-[#163A24]/5 hover:text-[#163A24]"
                    >
                      My Enquiries
                    </Link>
                  </>
                )}

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="pt-3 px-3 pb-1 border-t border-[#163A24]/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLoginModalOpen(true);
                  }}
                  className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-lg bg-[#163A24] text-[#F7F5EE] hover:bg-[#0B2115] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Login Modal with background blur over homepage */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </header>
  );
};
