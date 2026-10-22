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
      'Kinattukara Nutmeg Nursery was formally awarded ISO 9001:2000 certification in 2008 through the American National Accreditation Board (ANAB) for standardized horticultural practices, authenticated scion selection, and quality nursery management.',
    certificateImage: '',
    awardReceivingImage: '',
  };

  const defaultTestimonials = [
    {
      _id: 'default-1',
      name: 'Mr. Anto Nadumadam',
      place: 'Chemmalamattam',
      district: 'Kottayam District',
      phone: '9447861911',
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
        'Outstanding vegetative vigor and heavy crimson mace yield across our 10-acre estate. Their guidance and sapling quality have exceeded our expectations.',
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
        console.error('Error fetching award details:', err);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const res = await API.get('/testimonials');
        if (res.data?.success && Array.isArray(res.data?.data) && res.data.data.length > 0) {
          setTestimonials(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAward();
    fetchTestimonials();
  }, []);

  const openLightbox = (imgSrc, title) => {
    if (!imgSrc) return;
    setModalImage(imgSrc);
    setModalTitle(title || '');
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
    <div className="bg-[#071C14] text-[#F2F0E5] selection:bg-[#C4E85A] selection:text-[#071C14] min-h-screen">

      {/* ==================================================
          1. HERO HEADER SECTION
          - Dark forest-green background (#071C14)
          - Bold editorial display headline
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
            <span className="text-[#C4E85A]">AWARDS & RECOGNITION</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end justify-between">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C4E85A]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  VERIFIED HORTICULTURAL BENCHMARKS
                </span>
              </div>

              <h1 className="font-display text-[42px] sm:text-[58px] lg:text-[76px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
                STANDARDS & <br />
                <span className="text-[#C4E85A]">RECOGNITION.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-2xl">
                Certified quality management, systematic cultivar observation, and field-tested reliability documented across commercial plantations in South India.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="lg:col-span-4 lg:text-right space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D8D9C9]/50 block">
                ACCREDITATION STATUS
              </span>
              <span className="font-display text-xl sm:text-2xl font-bold text-[#C4E85A] block">
                ISO 9001:2000 ANAB
              </span>
              <span className="text-xs text-[#D8D9C9]/70 font-sans">
                Formal Horticultural Certification (2008)
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          2. ISO 9001:2000 CERTIFICATION SHOWCASE (WARM CREAM)
          - Background: #F2F0E5
          - Dark green typography: #071C14
         ================================================== */}
      <section id="certification" className="py-16 sm:py-20 lg:py-24 bg-[#F2F0E5] text-[#071C14] border-t border-[#123D27]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Metadata */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#084F09]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#084F09] uppercase">
                  INTERNATIONAL QUALITY BENCHMARK
                </span>
              </div>

              <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#071C14] leading-[0.98] tracking-[-0.03em] uppercase">
                {award.title} <br />
                <span className="text-[#084F09]">QUALITY CERTIFICATION.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#172018]/85 font-normal leading-relaxed">
                {award.description}
              </p>

              <div className="space-y-3 pt-2 border-t border-[#123D27]/15">
                <div className="flex items-center justify-between py-2 border-b border-[#123D27]/10 text-xs sm:text-sm">
                  <span className="text-[#172018]/60 uppercase tracking-wider font-mono">Issuing Authority</span>
                  <span className="font-bold text-[#071C14]">{award.organization}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#123D27]/10 text-xs sm:text-sm">
                  <span className="text-[#172018]/60 uppercase tracking-wider font-mono">Certification Scope</span>
                  <span className="font-bold text-[#071C14]">{award.certification}</span>
                </div>
                <div className="flex items-center justify-between py-2 text-xs sm:text-sm">
                  <span className="text-[#172018]/60 uppercase tracking-wider font-mono">Accreditation Year</span>
                  <span className="font-bold text-[#084F09] font-mono">{award.year}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Ceremony Photo / Certificate Card */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-[#E2DFD2] border border-[#123D27]/20 shadow-xl group">
                {award.awardReceivingImage ? (
                  <img
                    src={award.awardReceivingImage}
                    alt="ISO 9001:2000 Award Presentation Ceremony - Kinattukara Nursery"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                    onClick={() => openLightbox(award.awardReceivingImage, `${award.title} · Award Ceremony`)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-[#EAE6DB]">
                    <AwardIcon className="w-12 h-12 text-[#084F09]/60 stroke-[1.5]" />
                    <p className="font-display text-sm font-bold text-[#071C14] uppercase">
                      Official Award Presentation
                    </p>
                    <p className="text-xs text-[#172018]/60 max-w-xs">
                      Presentation ceremony for ISO 9001:2000 ANAB Accreditation
                    </p>
                  </div>
                )}
              </div>
              <div className="border-l-2 border-[#084F09] pl-3 py-1">
                <p className="text-[11px] sm:text-xs text-[#172018]/70 leading-relaxed italic">
                  ISO 9001:2000 Quality Management Accreditation awarded to Kinattukara Nutmeg Plantation & Nursery.
                </p>
              </div>
            </div>

          </div>

          {/* Certificate Document Container if available */}
          {award.certificateImage && (
            <div className="pt-6 border-t border-[#123D27]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#084F09]" />
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-[#071C14]">
                    Official Accreditation Certificate Document
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => openLightbox(award.certificateImage, `${award.title} Certificate Document`)}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#084F09] hover:underline"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Inspect Full Certificate</span>
                </button>
              </div>

              <div
                onClick={() => openLightbox(award.certificateImage, `${award.title} Certificate Document`)}
                className="relative rounded-[14px] overflow-hidden bg-[#071C14] border border-[#123D27]/30 p-4 max-h-[460px] flex items-center justify-center cursor-pointer group shadow-xl"
              >
                <img
                  src={award.certificateImage}
                  alt={`${award.title} Certificate`}
                  className="max-h-[420px] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ==================================================
          3. VERIFIED PLANTER EXPERIENCES BRIDGE
          - Background: #0B2419
          - Sleek link to dedicated Testimonials page
         ================================================== */}
      <section className="py-16 sm:py-20 bg-[#0B2419] border-t border-[#123D27]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="rounded-[20px] bg-[#071C14] border border-[#123D27] p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2">
                <Star className="w-4 h-4 text-[#C4E85A] fill-[#C4E85A]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  GROWER COMMUNITY & YIELD REPORTS
                </span>
              </div>

              <h2 className="font-display text-[32px] sm:text-[42px] lg:text-[48px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.03em] uppercase">
                COMMERCIAL PLANTER <br />
                <span className="text-[#C4E85A]">TESTIMONIALS.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#D8D9C9]/80 font-normal leading-relaxed">
                Discover firsthand cultivation feedback, orchard ages, mace yields, and crop experiences from multi-acre planters and estate owners across Kerala and South India.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/testimonials"
                className="inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-full bg-[#C4E85A] hover:bg-[#d4f570] text-[#071C14] text-xs sm:text-sm font-display font-extrabold tracking-wider uppercase transition-all shadow-xl"
              >
                <span>EXPLORE TESTIMONIALS</span>
                <ArrowRight className="w-4 h-4 text-[#071C14]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. NURSERY VISIT & CONSULTATION CTA
          - Dark forest-green background (#071C14)
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#071C14] border-t border-[#123D27]/60 text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 space-y-6">
          <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
            ESTABLISHED QUALITY SINCE 1989
          </p>

          <h2 className="font-display text-[36px] sm:text-[50px] lg:text-[64px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
            EXPERIENCE CERTIFIED <br />
            <span className="text-[#C4E85A]">KINATTUKARA STOCK.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-xl mx-auto">
            Visit our propagation facilities in Thrissur, inspect mother scion cultivars, and verify plant quality in person.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center space-x-3 text-sm sm:text-base font-bold text-[#F2F0E5] tracking-wider uppercase hover:text-[#C4E85A] transition-colors"
            >
              <span>CONNECT WITH OUR BOTANISTS</span>
              <span className="w-9 h-9 rounded-full border border-[#D8D9C9]/30 flex items-center justify-center group-hover:border-[#C4E85A] group-hover:translate-x-1.5 transition-all">
                <ArrowRight className="w-4 h-4 text-[#C4E85A]" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. ZOOMABLE LIGHTBOX MODAL
         ================================================== */}
      {modalOpen && modalImage && (
        <div
          onClick={() => {
            setModalOpen(false);
            setZoomLevel(1);
          }}
          className="fixed inset-0 z-50 bg-[#04110C]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[92vh] w-full bg-[#071C14] border border-[#123D27] rounded-[16px] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Modal Top Bar */}
            <div className="p-4 px-6 bg-[#0B2419] border-b border-[#123D27] flex items-center justify-between">
              <div>
                <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                  {award.title} · OFFICIAL ACCREDITATION
                </span>
                <p className="font-display text-base sm:text-lg text-[#F2F0E5] font-bold uppercase leading-tight">
                  {modalTitle || `${award.title} · Recognition Document`}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-full hover:bg-[#123D27] text-[#D8D9C9] hover:text-[#C4E85A] transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-full hover:bg-[#123D27] text-[#D8D9C9] hover:text-[#C4E85A] transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="text-xs px-2.5 py-1 rounded bg-[#123D27] text-[#C4E85A] font-mono"
                  title="Reset Zoom"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <div className="w-px h-4 bg-[#123D27] mx-1"></div>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setZoomLevel(1);
                  }}
                  className="p-1.5 rounded-full hover:bg-red-950/40 text-[#D8D9C9] hover:text-red-400 transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Zoomable Image Viewport */}
            <div className="flex-grow overflow-auto p-4 sm:p-8 flex items-center justify-center bg-[#04110C] min-h-[400px]">
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
                  className="max-h-[75vh] w-auto object-contain mx-auto shadow-2xl rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
