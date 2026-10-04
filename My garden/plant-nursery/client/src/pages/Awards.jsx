import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Award as AwardIcon,
  ShieldCheck,
  FileCheck,
  FileText,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  X,
  ArrowRight,
  ArrowLeft,
  Camera,
  Star,
  Phone,
  MapPin,
  Sprout,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import API from '../services/api';

export const Awards = () => {
  const location = useLocation();

  const defaultAwardData = {
    title: 'ISO 9001:2000',
    certification: 'Quality Management Certification',
    year: '2008',
    organization: 'American National Accreditation Board (ANAB)',
    description:
      'Kinattukara Nutmeg Nursery received ISO 9001:2000 certification in 2008 through the American National Accreditation Board (ANAB).',
    certificateImage: '',
    awardReceivingImage: '',
  };

  const defaultTestimonials = [
    {
      _id: 'default-1',
      name: 'Mr. Anto Nadumadam',
      place: 'Chemmalamattam',
      district: 'Kottayam District',
      phone: '94478619110',
      cultivation: '3 acre',
      plantationAge: '5 Year old plantation',
      rating: 5,
      comment:
        'Kinattukara nutmeg plants delivered exceptional yield and consistent growth across our 3-acre plantation. Truly genuine and trustworthy quality.',
    },
    {
      _id: 'default-2',
      name: 'Mr. Thommachan Pallivathukkal',
      place: 'Mannarcadu',
      district: 'Palakadu District',
      phone: '9446991554',
      cultivation: '10 acre',
      plantationAge: '5 Year old plantation',
      rating: 5,
      comment:
        'Outstanding vigor and heavy mace yield across our 10-acre estate. Their guidance and sapling quality have exceeded our expectations.',
    },
  ];

  const [award, setAward] = useState(() => {
    try {
      const cached = localStorage.getItem('kinattukara_award_data');
      return cached ? JSON.parse(cached) : defaultAwardData;
    } catch (e) {
      return defaultAwardData;
    }
  });

  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Review submission modal states
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    place: '',
    district: '',
    phone: '',
    cultivation: '',
    plantationAge: '',
    rating: 5,
    comment: '',
  });

  // Smooth scroll to hash anchor if present
  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  // Fetch award data and approved testimonials
  useEffect(() => {
    const fetchAward = async () => {
      try {
        const res = await API.get('/awards');
        if (res.data?.success && res.data?.data) {
          setAward(res.data.data);
          try {
            localStorage.setItem('kinattukara_award_data', JSON.stringify(res.data.data));
          } catch (e) {}
        }
      } catch (err) {
        console.log('Using local award data cache');
      } finally {
        setLoading(false);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const res = await API.get('/testimonials');
        if (res.data?.success && res.data?.data?.length > 0) {
          setTestimonials(res.data.data);
        }
      } catch (err) {
        console.log('Using default testimonials');
      }
    };

    fetchAward();
    fetchTestimonials();
  }, []);

  // Listen for storage events (e.g., when Admin uploads a certificate or photo in another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'kinattukara_award_data' && e.newValue) {
        try {
          setAward(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
        setZoomLevel(1);
      }
    };
    if (modalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  const openLightbox = (imageSrc, titleText) => {
    setModalImage(imageSrc);
    setModalTitle(titleText);
    setZoomLevel(1);
    setModalOpen(true);
  };

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.7));
  };

  const handleResetZoom = (e) => {
    e.stopPropagation();
    setZoomLevel(1);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name.trim()) {
      alert('Please enter your name.');
      return;
    }

    try {
      setReviewSubmitting(true);
      const res = await API.post('/testimonials', newReview);
      if (res.data?.success) {
        setReviewSuccess(true);
        setNewReview({
          name: '',
          place: '',
          district: '',
          phone: '',
          cultivation: '',
          plantationAge: '',
          rating: 5,
          comment: '',
        });
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting review. Please try again.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F5EE] min-h-screen pt-6 sm:pt-8 pb-12 sm:pb-16 text-[#172018]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 space-y-20">
        
        {/* ==================================================
            PAGE HEADER (2-COLUMN GRID FILLING THE RIGHT-SIDE GAP)
           ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#084F09]/10 pb-8">
          
          {/* Left Column: Title & Description */}
          <div className="lg:col-span-7 space-y-3">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-[#647563] hover:text-[#084F09] uppercase transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <p className="text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase">
              CERTIFICATION & RECOGNITION
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#053806] tracking-tight">
              Awards & Recognition
            </h1>
            <p className="text-sm sm:text-base text-[#172018]/75 font-light leading-relaxed max-w-xl">
              Official recognition of our 35+ years commitment to agricultural excellence, plant research, and certified quality standards in Kerala.
            </p>
          </div>

          {/* Right Column: ISO 9001:2000 Trust Badge Card (Fills Right-Side Void) */}
          <div className="lg:col-span-5">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#084F09]/15 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#084F09]/10 text-[#084F09] flex items-center justify-center shrink-0">
                    <AwardIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#053806] leading-none">
                      ISO 9001:2000
                    </h3>
                    <p className="text-[11px] text-[#647563] font-medium mt-0.5">
                      Quality Management System
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#084F09] bg-[#084F09]/10 px-2.5 py-1 rounded-full border border-[#084F09]/15">
                  Certified 2008
                </span>
              </div>

              <p className="text-xs text-[#172018]/80 font-light leading-relaxed">
                Accredited by the <strong>American National Accreditation Board (ANAB)</strong> for high-grade grafted nutmeg saplings & agricultural excellence.
              </p>

              <div className="pt-1 flex flex-wrap gap-2 text-[11px]">
                <span className="bg-[#F7F5EE] text-[#053806] px-2.5 py-1 rounded-md font-medium border border-[#084F09]/10">
                  🛡️ ANAB Accredited
                </span>
                <span className="bg-[#F7F5EE] text-[#053806] px-2.5 py-1 rounded-md font-medium border border-[#084F09]/10">
                  ✨ High-Oleoresin Mace
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================
            3 & 4. ISO 9001:2000 AWARD & PHOTO SECTION
           ================================================== */}
        <section className="bg-white rounded-lg p-8 sm:p-12 lg:p-14 border border-[#163A24]/10 space-y-12 shadow-sm">
          
          {/* Top Row: Left Info + Right Award Receiving Photo Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Award Metadata */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-[#163A24]/10 text-[#163A24] px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-[#163A24]" />
                <span>Certified Quality Standard</span>
              </div>

              <div className="space-y-1">
                <h2 className="font-serif text-3xl sm:text-4xl text-[#0B2115]">
                  {award.title}
                </h2>
                <p className="text-sm font-medium text-[#163A24]">
                  {award.certification} · {award.year}
                </p>
              </div>

              <p className="text-xs text-[#647563] tracking-wide uppercase font-semibold">
                {award.organization}
              </p>

              <p className="text-sm text-[#172018]/80 font-light leading-relaxed pt-1">
                {award.description}
              </p>
            </div>

            {/* Right Column: Card for Photo of Receiving the Award */}
            <div className="lg:col-span-5">
              <div className="bg-[#F7F5EE] rounded-lg p-5 border border-[#163A24]/15 space-y-3 shadow-xs">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Camera className="w-4 h-4 text-[#163A24]" />
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0B2115]">
                      Award Ceremony Photo
                    </span>
                  </div>

                  {award.awardReceivingImage && (
                    <button
                      onClick={() =>
                        openLightbox(
                          award.awardReceivingImage,
                          `${award.title} · Award Receiving Ceremony`
                        )
                      }
                      className="text-[11px] font-semibold text-[#163A24] hover:underline flex items-center space-x-1"
                    >
                      <ZoomIn className="w-3 h-3" />
                      <span>View</span>
                    </button>
                  )}
                </div>

                {/* Photo Display or Placeholder */}
                {award.awardReceivingImage ? (
                  <div
                    onClick={() =>
                      openLightbox(
                        award.awardReceivingImage,
                        `${award.title} · Award Receiving Ceremony`
                      )
                    }
                    className="relative group rounded-md overflow-hidden bg-white border border-[#163A24]/15 cursor-pointer aspect-[4/3] shadow-xs"
                  >
                    <img
                      src={award.awardReceivingImage}
                      alt="Award Receiving Ceremony - Kinattukara Nutmeg Nursery"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0B2115]/0 group-hover:bg-[#0B2115]/20 transition-all flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-[#0B2115] text-[10px] font-semibold px-3 py-1.5 rounded-full shadow flex items-center space-x-1.5">
                        <ZoomIn className="w-3 h-3" />
                        <span>Click to Zoom</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-md border-2 border-dashed border-[#163A24]/20 bg-white/70 py-10 px-4 text-center space-y-2">
                    <AwardIcon className="w-8 h-8 text-[#163A24]/60 mx-auto stroke-[1.5]" />
                    <p className="font-serif text-sm text-[#0B2115]">
                      Award Ceremony Photo
                    </p>
                    <p className="text-[11px] text-[#647563] max-w-xs mx-auto leading-relaxed">
                      Upload photo of receiving the award from Admin Dashboard
                    </p>
                  </div>
                )}

                <p className="text-[10px] text-[#647563] text-center italic">
                  ISO 9001:2000 Award Presentation Ceremony
                </p>

              </div>
            </div>

          </div>

          {/* Large Certificate Document Container */}
          <div className="space-y-4 pt-8 border-t border-[#163A24]/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-[#163A24]" />
                <span className="text-xs font-semibold tracking-wider uppercase text-[#0B2115]">
                  Official Certification Document
                </span>
              </div>

              {award.certificateImage && (
                <button
                  onClick={() =>
                    openLightbox(
                      award.certificateImage,
                      `${award.title} · Quality Management Certificate`
                    )
                  }
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#163A24] hover:text-[#0B2115] transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </button>
              )}
            </div>

            {/* Certificate Image Box or PDF Document or Clean Admin Placeholder */}
            {award.certificateImage ? (
              award.certificateImage.startsWith('data:application/pdf') || award.certificateImage.toLowerCase().includes('.pdf') ? (
                <div className="rounded-2xl p-8 bg-white border border-[#163A24]/15 max-w-xl mx-auto text-center space-y-4 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8 stroke-[1.8]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-[#0B2115]">
                      Official ISO 9001:2000 Certificate
                    </h4>
                    <p className="text-xs text-[#647563] mt-1 font-light">
                      Issued by American National Accreditation Board (ANAB)
                    </p>
                  </div>
                  <div className="pt-2">
                    <a
                      href={award.certificateImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition-all shadow"
                    >
                      <span>Open Certificate PDF</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() =>
                    openLightbox(
                      award.certificateImage,
                      `${award.title} · Quality Management Certificate`
                    )
                  }
                  className="relative group rounded-lg overflow-hidden border border-[#163A24]/15 bg-[#F7F5EE] cursor-pointer max-w-3xl mx-auto shadow-sm transition-all hover:border-[#163A24]/40"
                >
                  <img
                    src={award.certificateImage}
                    alt="ISO 9001:2000 Certificate - Kinattukara Nutmeg Nursery"
                    className="w-full max-h-[600px] object-contain mx-auto p-4 transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-[#0B2115]/0 group-hover:bg-[#0B2115]/20 transition-all flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-[#0B2115] text-xs font-semibold px-4 py-2 rounded-full shadow flex items-center space-x-2">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Click to Zoom & View Fullscreen</span>
                    </span>
                  </div>
                </div>
              )
            ) : (
              <div className="rounded-lg border-2 border-dashed border-[#163A24]/20 bg-[#F7F5EE] py-20 px-6 text-center max-w-3xl mx-auto space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#163A24]/10 text-[#163A24] flex items-center justify-center mx-auto">
                  <FileCheck className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-lg text-[#0B2115]">
                    Certificate Image or Document
                  </p>
                  <p className="text-xs text-[#647563] font-light max-w-sm mx-auto">
                    Upload certificate image or PDF from Admin Dashboard
                  </p>
                </div>
              </div>
            )}
          </div>

        </section>

        {/* ==================================================
            6. CUSTOMER TESTIMONIALS & SUCCESS STORIES
           ================================================== */}
        <section id="testimonials" className="bg-[#FFFFFF] rounded-2xl p-8 sm:p-12 border border-[#163A24]/10 shadow-sm space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#163A24]/10 pb-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs sm:text-[13px] font-semibold tracking-[0.22em] text-[#647563] uppercase">
                GROWER EXPERIENCES & SUCCESS STORIES
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#0B2115] tracking-tight leading-tight">
                Grower Stories
              </h2>
              <p className="text-sm sm:text-base text-[#647563] font-light leading-relaxed">
                Real cultivation experiences from farmers growing Kinattukara nutmeg plants.
              </p>
            </div>

            <button
              onClick={() => {
                setReviewSuccess(false);
                setReviewModalOpen(true);
              }}
              className="inline-flex items-center space-x-2 bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 shadow hover:shadow-md shrink-0 self-start md:self-end"
            >
              <Plus className="w-4 h-4" />
              <span>Share Your Experience</span>
            </button>
          </div>

          {/* Grower Story Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((t) => {
              const cleanDistrict = t.district?.replace(/\s*District/i, '').trim();
              const cleanLocation = [t.place, cleanDistrict].filter(Boolean).join(', ');

              return (
                <div
                  key={t._id}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-[#163A24]/10 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3.5">
                    {/* Subtle Grower Story Label */}
                    <div className="flex items-center">
                      <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#163A24] bg-[#F7F5EE] px-3 py-1 rounded-full border border-[#163A24]/10">
                        Grower Story
                      </span>
                    </div>

                    {/* Grower Name & Location */}
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#0B2115] leading-snug">
                        {t.name}
                      </h3>
                      {cleanLocation && (
                        <p className="text-xs sm:text-sm text-[#647563] font-light flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#163A24] shrink-0" />
                          <span>{cleanLocation}</span>
                        </p>
                      )}
                    </div>

                    {/* Cultivation Metadata Chips */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs">
                      {t.cultivation && (
                        <span className="inline-flex items-center space-x-1.5 bg-[#F7F5EE] text-[#163A24] px-3 py-1 rounded-md text-xs font-normal border border-[#163A24]/5">
                          <span>🌱</span>
                          <span>{t.cultivation}</span>
                        </span>
                      )}
                      {t.plantationAge && (
                        <span className="inline-flex items-center space-x-1.5 bg-[#F7F5EE] text-[#163A24] px-3 py-1 rounded-md text-xs font-normal border border-[#163A24]/5">
                          <span>📅</span>
                          <span>{t.plantationAge}</span>
                        </span>
                      )}
                    </div>

                    {/* Story Text */}
                    {t.comment && (
                      <p className="text-sm sm:text-[15px] text-[#172018]/85 font-light leading-relaxed pt-2 border-t border-[#163A24]/10 italic">
                        "{t.comment}"
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================================================
            7. OUR REACH SECTION
           ================================================== */}
        <section className="bg-white rounded-lg p-8 sm:p-12 border border-[#163A24]/10 space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase">
              OUR REACH
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#0B2115] tracking-tight">
              Serving Customers Across India
            </h2>
          </div>
          <p className="text-sm text-[#172018]/80 font-light leading-relaxed max-w-2xl">
            Kinattukara Nutmeg Nursery has clients in different states across India and is working toward expanding its reach to international markets.
          </p>
        </section>

        {/* ==================================================
            7. NURSERY VISIT SECTION (Minimal CTA)
           ================================================== */}
        <section className="bg-[#163A24] text-[#F7F5EE] rounded-lg p-8 sm:p-12 text-center space-y-5">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#A7C2A6] uppercase">
            VISIT OUR NURSERY
          </p>
          <p className="text-sm sm:text-base text-[#F7F5EE]/85 max-w-xl mx-auto font-light leading-relaxed">
            Interested visitors are welcome to visit our nursery and explore our plants and nursery operations.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-[#F7F5EE] hover:bg-[#FFFFFF] text-[#0B2115] px-7 py-3 rounded-full text-xs font-semibold tracking-wider transition-colors shadow"
            >
              <span>Visit Our Nursery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </div>

      {/* ==================================================
          LIGHTBOX / MODAL WITH ZOOM (CERTIFICATE & CEREMONY PHOTO)
         ================================================== */}
      {modalOpen && modalImage && (
        <div
          onClick={() => {
            setModalOpen(false);
            setZoomLevel(1);
          }}
          className="fixed inset-0 z-50 bg-[#0B2115]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          {/* Modal Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[92vh] w-full bg-[#FFFFFF] rounded-lg overflow-hidden flex flex-col shadow-2xl border border-white/20"
          >
            {/* Modal Bar */}
            <div className="p-4 px-6 bg-[#F7F5EE] border-b border-[#163A24]/10 flex items-center justify-between">
              <div>
                <p className="font-serif text-lg text-[#0B2115] leading-tight">
                  {modalTitle || `${award.title} · Recognition Document`}
                </p>
                <p className="text-[11px] text-[#647563]">
                  {award.certification} ({award.year})
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-full hover:bg-[#163A24]/10 text-[#0B2115] transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-full hover:bg-[#163A24]/10 text-[#0B2115] transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="text-xs px-2.5 py-1 rounded bg-[#163A24]/10 text-[#0B2115] font-medium"
                  title="Reset Zoom"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <div className="w-px h-4 bg-[#163A24]/20 mx-1"></div>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setZoomLevel(1);
                  }}
                  className="p-1.5 rounded-full hover:bg-red-50 text-red-600 transition-colors"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Zoomable Image Viewport */}
            <div className="flex-grow overflow-auto p-4 sm:p-8 flex items-center justify-center bg-[#172018]/5 min-h-[400px]">
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.2s ease-out',
                }}
                className="max-w-full"
              >
                <img
                  src={modalImage}
                  alt={modalTitle || 'Certificate Full View'}
                  className="max-h-[75vh] w-auto object-contain mx-auto shadow-md rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          CUSTOMER REVIEW SUBMISSION MODAL
         ================================================== */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B2115]/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#163A24]/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#163A24]/10">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#0B2115]">
                  Share Your Cultivation Story
                </h3>
                <p className="text-xs text-[#647563] mt-0.5">
                  Your review will be published upon approval by nursery admin.
                </p>
              </div>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="text-[#647563] hover:text-[#0B2115] p-1 rounded-full hover:bg-[#F7F5EE]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                <h4 className="font-serif text-xl text-[#0B2115]">
                  Thank You for Your Feedback!
                </h4>
                <p className="text-xs sm:text-sm text-[#647563] max-w-sm mx-auto leading-relaxed">
                  Your cultivation review has been submitted successfully. Once verified and approved by the nursery administrator, it will be proudly featured on our website.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setReviewModalOpen(false)}
                    className="px-6 py-2.5 bg-[#163A24] text-[#F7F5EE] rounded-full text-xs font-semibold tracking-wider hover:bg-[#0B2115] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. Anto Nadumadam"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                      Place / Town
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chemmalamattam"
                      value={newReview.place}
                      onChange={(e) => setNewReview({ ...newReview, place: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                      District
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kottayam District"
                      value={newReview.district}
                      onChange={(e) => setNewReview({ ...newReview, district: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 94478619110"
                      value={newReview.phone}
                      onChange={(e) => setNewReview({ ...newReview, phone: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                      Cultivation Acreage
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3 acre"
                      value={newReview.cultivation}
                      onChange={(e) => setNewReview({ ...newReview, cultivation: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                      Plantation Age
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5 Year old plantation"
                      value={newReview.plantationAge}
                      onChange={(e) => setNewReview({ ...newReview, plantationAge: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                      Your Rating (1 - 5)
                    </label>
                    <div className="flex items-center space-x-1.5 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newReview.rating
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-semibold ml-2 text-[#0B2115]">
                        {newReview.rating} Stars
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B2115] mb-1">
                    Your Experience & Yield Feedback *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Share how your plants grew, yield results, disease resistance, or nursery service experience..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-[#163A24]/20 focus:border-[#163A24] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end space-x-3 border-t border-[#163A24]/10">
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-[#647563] hover:text-[#0B2115]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="px-6 py-2.5 bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] rounded-full text-xs font-semibold tracking-wider transition-all disabled:opacity-50 shadow"
                  >
                    {reviewSubmitting ? 'Submitting...' : 'Submit Story for Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
