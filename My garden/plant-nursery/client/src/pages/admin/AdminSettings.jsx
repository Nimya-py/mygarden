import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  PhoneCall,
  MapPin,
  Image as ImageIcon,
  Clock,
  Share2,
  CheckCircle2,
  AlertCircle,
  Upload,
  Trash2,
  RotateCcw,
  Save,
  Instagram,
  Facebook,
  Youtube,
  ExternalLink,
} from 'lucide-react';
import API from '../../services/api';
import { useNursery } from '../../context/NurseryContext';

const ALL_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const TIME_OPTIONS = [
  '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM',
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM',
  '09:00 PM', '09:30 PM', '10:00 PM',
];

export const AdminSettings = () => {
  const { updateNursery } = useNursery();
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const defaultState = {
    // 1. Basic Information
    name: '',
    establishedYear: '',
    description: '',
    tagline: '',

    // 2. Contact Information
    phone: '',
    whatsapp: '',
    email: '',
    altPhone: '',

    // 3. Address
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    googleMapsLink: '',

    // 4. Branding
    logo: '',
    coverImage: '',

    // 5. Business Hours
    openingTime: '08:00 AM',
    closingTime: '06:30 PM',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    // 6. Social Media
    socialLinks: {
      instagram: '',
      facebook: '',
      youtube: '',
    },
  };

  const [formData, setFormData] = useState(defaultState);
  const [initialData, setInitialData] = useState(defaultState);

  // Branding Previews & Upload Validation
  const [logoPreview, setLogoPreview] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [logoError, setLogoError] = useState('');
  const [bannerError, setBannerError] = useState('');

  // Page States
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch Nursery Profile on Mount
  useEffect(() => {
    const fetchNursery = async () => {
      setLoading(true);
      try {
        const res = await API.get('/nurseries/my/profile');
        if (res.data.success && res.data.data) {
          const nur = res.data.data;
          const parsedData = {
            name: nur.name || '',
            establishedYear: nur.establishedYear || '',
            description: nur.description || '',
            tagline: nur.tagline || '',
            phone: nur.phone || '',
            whatsapp: nur.whatsapp || '',
            email: nur.email || '',
            altPhone: nur.altPhone || '',
            address: nur.address || '',
            city: nur.city || '',
            district: nur.district || '',
            state: nur.state || '',
            pincode: nur.pincode || '',
            googleMapsLink: nur.googleMapsLink || '',
            logo: nur.logo || '',
            coverImage: nur.coverImage || '',
            openingTime: nur.openingTime || '08:00 AM',
            closingTime: nur.closingTime || '06:30 PM',
            workingDays:
              Array.isArray(nur.workingDays) && nur.workingDays.length > 0
                ? nur.workingDays
                : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            socialLinks: {
              instagram: nur.socialLinks?.instagram || '',
              facebook: nur.socialLinks?.facebook || '',
              youtube: nur.socialLinks?.youtube || '',
            },
          };

          setFormData(parsedData);
          setInitialData(parsedData);
          setLogoPreview(nur.logo || '');
          setBannerPreview(nur.coverImage || '');
        }
      } catch (err) {
        console.error('Error fetching nursery profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNursery();
  }, []);

  // Check if form is dirty
  const isDirty = JSON.stringify(formData) !== JSON.stringify(initialData);

  // Prevent accidental loss of unsaved changes before tab close
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Handle Logo Upload
  const handleLogoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoError('');
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setLogoError('Invalid file type. Please upload a JPG, PNG, or WebP image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setLogoError('Logo file size must be 5MB or less.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setLogoPreview(result);
      setFormData((prev) => ({ ...prev, logo: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoPreview('');
    setFormData((prev) => ({ ...prev, logo: '' }));
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  // Handle Cover Banner Upload
  const handleBannerFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBannerError('');
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setBannerError('Invalid file type. Please upload a JPG, PNG, or WebP image.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setBannerError('Cover banner file size must be 8MB or less.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setBannerPreview(result);
      setFormData((prev) => ({ ...prev, coverImage: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBanner = () => {
    setBannerPreview('');
    setFormData((prev) => ({ ...prev, coverImage: '' }));
    if (bannerInputRef.current) bannerInputRef.current.value = '';
  };

  // Toggle Working Days
  const handleToggleDay = (day) => {
    setFormData((prev) => {
      const exists = prev.workingDays.includes(day);
      let updated;
      if (exists) {
        if (prev.workingDays.length === 1) {
          alert('You must have at least one active working day.');
          return prev;
        }
        updated = prev.workingDays.filter((d) => d !== day);
      } else {
        updated = ALL_DAYS.filter((d) => d === day || prev.workingDays.includes(d));
      }
      return { ...prev, workingDays: updated };
    });
  };

  // Cancel Handler
  const handleCancel = () => {
    if (isDirty) {
      const confirmed = window.confirm(
        'Discard all unsaved changes and restore the previous profile settings?'
      );
      if (!confirmed) return;
    }
    setFormData(initialData);
    setLogoPreview(initialData.logo || '');
    setBannerPreview(initialData.coverImage || '');
    setError('');
    setSuccess('');
    setLogoError('');
    setBannerError('');
  };

  // Form Validation & Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validations
    if (!formData.name.trim()) {
      setError('Nursery Name is required.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!formData.phone.trim()) {
      setError('Primary Phone Number is required.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please provide a valid email address.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!formData.address.trim()) {
      setError('Street Address is required.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!formData.city.trim() || !formData.district.trim() || !formData.state.trim() || !formData.pincode.trim()) {
      setError('City, District, State, and Pincode are all required.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);

    try {
      const res = await API.put('/nurseries/my/profile', formData);
      if (res.data.success) {
        const saved = res.data.data;
        if (updateNursery) {
          updateNursery(saved);
        }
        const updatedInitial = {
          ...formData,
          logo: saved.logo || formData.logo,
          coverImage: saved.coverImage || formData.coverImage,
        };
        setFormData(updatedInitial);
        setInitialData(updatedInitial);
        setSuccess('Nursery Profile updated successfully! Changes are live on your sanctuary platform.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Save nursery error:', err);
      setError(
        err.response?.data?.message ||
          'Failed to update nursery profile. Please check your network connection and try again.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-serif text-sm text-[#526651]">Loading Nursery Profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      
      {/* 3. Small Top Utility Bar (56-64px high) */}
      <div className="h-14 -mt-6 lg:-mt-10 -mx-6 lg:-mx-10 px-6 lg:px-10 border-b border-[#E2E8DF] bg-white/80 backdrop-blur-sm flex items-center justify-between sticky top-0 z-20">
        {/* Left: Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs text-[#637863]">
          <Link to="/admin" className="hover:text-[#163A24] transition-colors font-medium">
            Dashboard
          </Link>
          <span className="text-[#A4B5A3]">/</span>
          <span className="text-[#0B2115] font-semibold">Nursery Profile</span>
        </div>

        {/* Right: Utility Links */}
        <div className="flex items-center space-x-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#163A24] hover:bg-[#EAF0E8] border border-[#D6DDD5] transition-colors bg-white shadow-2xs"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <div className="hidden sm:inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium text-[#465945] bg-[#F4F6F1] border border-[#E2E8DF]">
            <div className="w-2 h-2 rounded-full bg-[#163A24]"></div>
            <span>Admin Profile</span>
          </div>
        </div>
      </div>

      {/* Main Container - Centered max-w-5xl (approx 1100px) */}
      <div className="max-w-5xl mx-auto space-y-6 pt-2">
        
        {/* 4. Page Header in Dark Green with Clear Contrast */}
        <div className="space-y-1">
          <h1 className="font-serif text-3xl font-light text-[#0B2115] tracking-tight">
            Nursery Profile
          </h1>
          <p className="text-xs text-[#526651]">
            Manage the information displayed on your nursery website.
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="p-4 bg-[#EAF5EB] border border-[#9DD4A5] rounded-xl flex items-center justify-between text-xs text-[#1E4620] shadow-xs">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
              <span className="font-medium">{success}</span>
            </div>
            <button
              type="button"
              onClick={() => setSuccess('')}
              className="text-[#1E4620]/70 hover:text-[#1E4620] text-xs font-bold px-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-[#FDF2F2] border border-[#F8B4B4] rounded-xl flex items-center justify-between text-xs text-[#9B1C1C] shadow-xs">
            <div className="flex items-center space-x-2.5">
              <AlertCircle className="w-4 h-4 text-[#D32F2F] shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
            <button
              type="button"
              onClick={() => setError('')}
              className="text-[#9B1C1C]/70 hover:text-[#9B1C1C] text-xs font-bold px-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* 1. BASIC INFORMATION CARD */}
          <section className="bg-white rounded-2xl border border-[#E2E8DF] p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center space-x-3 border-b border-[#F0F3EE] pb-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#EAF0E8] text-[#163A24] flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-base font-medium text-[#0B2115]">
                  Basic Information
                </h2>
                <p className="text-[11px] text-[#637863]">
                  Primary identity and story of your nursery.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Nursery Name */}
              <div className="space-y-1 md:col-span-2">
                <label className="block text-xs font-semibold text-[#172018]">
                  Nursery Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kinattukara Nutmeg Plantation & Nursery"
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all"
                />
              </div>

              {/* Established Year */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#172018]">
                  Established Year
                </label>
                <input
                  type="text"
                  value={formData.establishedYear}
                  onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                  placeholder="e.g. 1988"
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all"
                />
              </div>

              {/* Website Tagline */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#172018]">
                  Website Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Generations of Craft, Proven Excellence in Nutmeg"
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all"
                />
              </div>

              {/* Short Description */}
              <div className="space-y-1 md:col-span-2">
                <label className="block text-xs font-semibold text-[#172018]">
                  Short Description / About Nursery
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your heritage, specialization, grafted varieties, and quality standards..."
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all leading-relaxed"
                ></textarea>
                <p className="text-[11px] text-[#637863]">
                  This description is displayed on your public homepage and about sections.
                </p>
              </div>
            </div>
          </section>

          {/* 2. CONTACT INFORMATION CARD */}
          <section className="bg-white rounded-2xl border border-[#E2E8DF] p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center space-x-3 border-b border-[#F0F3EE] pb-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#EAF0E8] text-[#163A24] flex items-center justify-center">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-base font-medium text-[#0B2115]">
                  Contact Information
                </h2>
                <p className="text-[11px] text-[#637863]">
                  Direct phone, WhatsApp, and email channels for customer queries.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Phone Number */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#172018]">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 94473 12890"
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all"
                />
              </div>

              {/* WhatsApp Number */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#172018]">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="919447312890 (country code with no +)"
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all"
                />
                <p className="text-[10px] text-[#637863]">Used for direct WhatsApp enquiry buttons.</p>
              </div>

              {/* Contact Email */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#172018]">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@kinattukara.com"
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all"
                />
              </div>

              {/* Alternative Contact Number */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#172018]">
                  Alternative Contact Number
                </label>
                <input
                  type="tel"
                  value={formData.altPhone}
                  onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
                  placeholder="+91 98471 23456"
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all"
                />
              </div>
            </div>
          </section>

          {/* 3. ADDRESS CARD */}
          <section className="bg-white rounded-2xl border border-[#E2E8DF] p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center space-x-3 border-b border-[#F0F3EE] pb-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#EAF0E8] text-[#163A24] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-base font-medium text-[#0B2115]">
                  Address
                </h2>
                <p className="text-[11px] text-[#637863]">
                  Physical nursery farm address for visitors and direction maps.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Street Address */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#172018]">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Kinattukara, Thrissur / Palakkad Highway"
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-4 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {/* City */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#172018]">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Thrissur"
                    className="w-full bg-white border border-[#D6DDD5] rounded-xl px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24] transition-all"
                  />
                </div>

                {/* District */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#172018]">
                    District <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="Thrissur"
                    className="w-full bg-white border border-[#D6DDD5] rounded-xl px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24] transition-all"
                  />
                </div>

                {/* State */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#172018]">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Kerala"
                    className="w-full bg-white border border-[#D6DDD5] rounded-xl px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24] transition-all"
                  />
                </div>

                {/* Pincode */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#172018]">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="680001"
                    className="w-full bg-white border border-[#D6DDD5] rounded-xl px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24] transition-all"
                  />
                </div>
              </div>

              {/* Google Maps Link */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#172018]">
                  Google Maps Link
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={formData.googleMapsLink}
                    onChange={(e) => setFormData({ ...formData, googleMapsLink: e.target.value })}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full bg-white border border-[#D6DDD5] rounded-xl pl-4 pr-10 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all"
                  />
                  {formData.googleMapsLink && (
                    <a
                      href={formData.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-3 top-2.5 text-[#163A24] hover:text-[#2D5A3D] transition-colors"
                      title="Open map link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-[11px] text-[#637863]">
                  Enables one-click Google Maps navigation on the Contact Us page.
                </p>
              </div>
            </div>
          </section>

          {/* 4. BRANDING CARD (NO RAW URLS EXPOSED) */}
          <section className="bg-white rounded-2xl border border-[#E2E8DF] p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center space-x-3 border-b border-[#F0F3EE] pb-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#EAF0E8] text-[#163A24] flex items-center justify-center">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-base font-medium text-[#0B2115]">
                  Branding
                </h2>
                <p className="text-[11px] text-[#637863]">
                  Upload and preview your nursery emblem and scenic hero banner.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Logo Upload Box */}
              <div className="bg-[#FAFBF9] p-5 rounded-xl border border-[#E2E8DF] space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#172018]">Nursery Logo</span>
                  {logoPreview && (
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="text-[11px] text-red-600 hover:text-red-700 font-medium flex items-center space-x-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                {/* Light preview box */}
                <div className="w-28 h-28 mx-auto rounded-xl border border-dashed border-[#C5D0C4] bg-white flex items-center justify-center overflow-hidden shadow-2xs">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Nursery logo preview"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="text-center p-2 text-[#9CA3AF]">
                      <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-50" />
                      <span className="text-[10px] block">No logo selected</span>
                    </div>
                  )}
                </div>

                {logoError && (
                  <p className="text-[11px] text-red-600 text-center font-medium">{logoError}</p>
                )}

                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleLogoFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="w-full bg-white hover:bg-[#F2F4EF] text-[#163A24] font-medium py-2 rounded-lg text-xs transition-colors flex items-center justify-center space-x-2 border border-[#D6DDD5] shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{logoPreview ? 'Change Logo' : 'Upload Logo'}</span>
                </button>

                <p className="text-[10px] text-[#637863] text-center leading-tight">
                  Supports JPG, PNG, or WebP. Max file size: 5MB.
                </p>
              </div>

              {/* Cover Banner Upload Box */}
              <div className="bg-[#FAFBF9] p-5 rounded-xl border border-[#E2E8DF] space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#172018]">Cover Banner</span>
                  {bannerPreview && (
                    <button
                      type="button"
                      onClick={handleRemoveBanner}
                      className="text-[11px] text-red-600 hover:text-red-700 font-medium flex items-center space-x-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                {/* Light banner preview box */}
                <div className="w-full h-28 rounded-xl border border-dashed border-[#C5D0C4] bg-white flex items-center justify-center overflow-hidden shadow-2xs">
                  {bannerPreview ? (
                    <img
                      src={bannerPreview}
                      alt="Cover banner preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-2 text-[#9CA3AF]">
                      <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-50" />
                      <span className="text-[10px] block">No banner image selected</span>
                    </div>
                  )}
                </div>

                {bannerError && (
                  <p className="text-[11px] text-red-600 text-center font-medium">{bannerError}</p>
                )}

                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleBannerFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => bannerInputRef.current?.click()}
                  className="w-full bg-white hover:bg-[#F2F4EF] text-[#163A24] font-medium py-2 rounded-lg text-xs transition-colors flex items-center justify-center space-x-2 border border-[#D6DDD5] shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{bannerPreview ? 'Change Banner' : 'Upload Banner'}</span>
                </button>

                <p className="text-[10px] text-[#637863] text-center leading-tight">
                  Supports JPG, PNG, or WebP. Max file size: 8MB.
                </p>
              </div>

            </div>
          </section>

          {/* 5. BUSINESS HOURS CARD */}
          <section className="bg-white rounded-2xl border border-[#E2E8DF] p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center space-x-3 border-b border-[#F0F3EE] pb-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#EAF0E8] text-[#163A24] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-base font-medium text-[#0B2115]">
                  Business Hours
                </h2>
                <p className="text-[11px] text-[#637863]">
                  Select nursery operating hours and active visit days.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Opening & Closing Times */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#172018]">
                    Opening Time
                  </label>
                  <select
                    value={formData.openingTime}
                    onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
                    className="w-full bg-white border border-[#D6DDD5] rounded-xl px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24] transition-all cursor-pointer"
                  >
                    {TIME_OPTIONS.map((time) => (
                      <option key={`open-${time}`} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#172018]">
                    Closing Time
                  </label>
                  <select
                    value={formData.closingTime}
                    onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
                    className="w-full bg-white border border-[#D6DDD5] rounded-xl px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24] transition-all cursor-pointer"
                  >
                    {TIME_OPTIONS.map((time) => (
                      <option key={`close-${time}`} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Working Days Selector */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-semibold text-[#172018]">
                  Working Days
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {ALL_DAYS.map((day) => {
                    const isSelected = formData.workingDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleToggleDay(day)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-medium transition-all text-center border ${
                          isSelected
                            ? 'bg-[#163A24] border-[#163A24] text-[#F7F5EE] shadow-2xs'
                            : 'bg-[#F4F6F1] border-[#D6DDD5] text-[#637863] hover:bg-[#EAF0E8]'
                        }`}
                      >
                        <span className="block font-semibold">{day.slice(0, 3)}</span>
                        <span className="text-[9px] opacity-80 block mt-0.5">
                          {isSelected ? 'Open' : 'Closed'}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="p-2.5 bg-[#FAFBF9] border border-[#E2E8DF] rounded-xl text-[11px] text-[#465945]">
                  <span className="font-semibold text-[#163A24]">Active Schedule: </span>
                  {formData.workingDays.length === 7
                    ? 'Open 7 days a week'
                    : formData.workingDays.join(', ')}{' '}
                  ({formData.openingTime} - {formData.closingTime})
                </div>
              </div>
            </div>
          </section>

          {/* 6. SOCIAL MEDIA CARD */}
          <section className="bg-white rounded-2xl border border-[#E2E8DF] p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center space-x-3 border-b border-[#F0F3EE] pb-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#EAF0E8] text-[#163A24] flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-base font-medium text-[#0B2115]">
                  Social Media (Optional)
                </h2>
                <p className="text-[11px] text-[#637863]">
                  Connect your social profiles to grow customer engagement.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {/* Instagram */}
              <div className="space-y-1">
                <label className="flex items-center space-x-1.5 text-xs font-semibold text-[#172018]">
                  <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                  <span>Instagram</span>
                </label>
                <input
                  type="text"
                  value={formData.socialLinks.instagram}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                    })
                  }
                  placeholder="https://instagram.com/..."
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-3.5 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all"
                />
              </div>

              {/* Facebook */}
              <div className="space-y-1">
                <label className="flex items-center space-x-1.5 text-xs font-semibold text-[#172018]">
                  <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
                  <span>Facebook</span>
                </label>
                <input
                  type="text"
                  value={formData.socialLinks.facebook}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                    })
                  }
                  placeholder="https://facebook.com/..."
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-3.5 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all"
                />
              </div>

              {/* YouTube */}
              <div className="space-y-1">
                <label className="flex items-center space-x-1.5 text-xs font-semibold text-[#172018]">
                  <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
                  <span>YouTube</span>
                </label>
                <input
                  type="text"
                  value={formData.socialLinks.youtube}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                    })
                  }
                  placeholder="https://youtube.com/@..."
                  className="w-full bg-white border border-[#D6DDD5] rounded-xl px-3.5 py-2.5 text-xs text-[#172018] placeholder-[#9CA3AF] focus:outline-none focus:border-[#163A24] focus:ring-1 focus:ring-[#163A24]/15 transition-all"
                />
              </div>
            </div>
          </section>

          {/* 7. SAVE UX: ACTION BUTTONS */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3">
            {/* Secondary Neutral Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold text-[#465945] hover:text-[#0B2115] bg-white hover:bg-[#F2F4EF] border border-[#D6DDD5] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>

            {/* Clear Primary Green Save Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-semibold px-8 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-xs hover:shadow disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#F7F5EE] border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
