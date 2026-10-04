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
          3. VERIFIED PLANTER TESTIMONIALS (DARK GREEN)
          - Background: #0B2419
          - Authentic grower testimonials with plantation details
         ================================================== */}
      <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-[#0B2419] border-t border-[#123D27]/40 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2">
                <Star className="w-4 h-4 text-[#C4E85A] fill-[#C4E85A]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  FIELD VERIFICATION
                </span>
              </div>

              <h2 className="font-display text-[34px] sm:text-[46px] lg:text-[56px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.03em] uppercase">
                COMMERCIAL PLANTER <br />
                <span className="text-[#C4E85A]">EXPERIENCES.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#D8D9C9]/80 font-normal leading-relaxed">
                Direct feedback from commercial estate owners, multi-acre farmers, and dedicated growers across South India cultivating Kinattukara grafted nutmeg.
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  setReviewSuccess(false);
                  setReviewModalOpen(true);
                }}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#123D27] hover:bg-[#C4E85A] text-[#F2F0E5] hover:text-[#071C14] text-xs font-bold tracking-wider uppercase border border-[#123D27] hover:border-[#C4E85A] transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>SHARE YOUR HARVEST STORY</span>
              </button>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={t._id || idx}
                className="rounded-[16px] bg-[#071C14] border border-[#123D27] p-7 sm:p-8 space-y-5 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Star Rating Strip */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (t.rating || 5)
                            ? 'text-[#C4E85A] fill-[#C4E85A]'
                            : 'text-[#123D27] fill-[#123D27]'
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-mono text-xs text-[#D8D9C9]/60">
                      5.0 RATING
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-sm sm:text-base text-[#F2F0E5] font-normal leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                {/* Planter & Orchard Metadata */}
                <div className="pt-4 border-t border-[#123D27]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-display font-bold text-[#F2F0E5] uppercase tracking-wide block">
                      {t.name}
                    </span>
                    <span className="text-[#D8D9C9]/70">
                      {t.place ? `${t.place}, ` : ''}{t.district || 'Kerala'}
                    </span>
                  </div>

                  {(t.cultivation || t.plantationAge) && (
                    <div className="text-right">
                      {t.cultivation && (
                        <span className="font-mono text-[#C4E85A] font-semibold block uppercase">
                          {t.cultivation} GROVE
                        </span>
                      )}
                      {t.plantationAge && (
                        <span className="text-[11px] text-[#D8D9C9]/60">
                          {t.plantationAge}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
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

      {/* ==================================================
          6. CUSTOMER REVIEW SUBMISSION MODAL
         ================================================== */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#04110C]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071C14] border border-[#123D27] rounded-[16px] max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#123D27]">
              <div>
                <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                  COMMERCIAL PLANTER FEEDBACK
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F2F0E5] uppercase">
                  Share Your Cultivation Story
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="text-[#D8D9C9]/70 hover:text-[#C4E85A] p-1 rounded-full hover:bg-[#123D27]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSuccess ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C4E85A] mx-auto" />
                <h4 className="font-display text-xl font-bold text-[#F2F0E5] uppercase">
                  Thank You for Your Feedback!
                </h4>
                <p className="text-xs sm:text-sm text-[#D8D9C9] max-w-sm mx-auto leading-relaxed">
                  Your harvest review has been submitted successfully. Once verified by the nursery team, it will be published to our community archive.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="px-6 py-2.5 bg-[#C4E85A] text-[#071C14] rounded-full text-xs font-bold tracking-wider uppercase hover:bg-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-[#D8D9C9] uppercase tracking-wider">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="e.g. Mr. K. R. George"
                    className="w-full bg-[#0B2419] border border-[#123D27] rounded-lg px-3.5 py-2.5 text-[#F2F0E5] placeholder-[#D8D9C9]/40 focus:border-[#C4E85A] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-[#D8D9C9] uppercase tracking-wider">Place / Town</label>
                    <input
                      type="text"
                      value={newReview.place}
                      onChange={(e) => setNewReview({ ...newReview, place: e.target.value })}
                      placeholder="e.g. Pala"
                      className="w-full bg-[#0B2419] border border-[#123D27] rounded-lg px-3.5 py-2.5 text-[#F2F0E5] placeholder-[#D8D9C9]/40 focus:border-[#C4E85A] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-[#D8D9C9] uppercase tracking-wider">District</label>
                    <input
                      type="text"
                      value={newReview.district}
                      onChange={(e) => setNewReview({ ...newReview, district: e.target.value })}
                      placeholder="e.g. Kottayam"
                      className="w-full bg-[#0B2419] border border-[#123D27] rounded-lg px-3.5 py-2.5 text-[#F2F0E5] placeholder-[#D8D9C9]/40 focus:border-[#C4E85A] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-[#D8D9C9] uppercase tracking-wider">Grove Acreage</label>
                    <input
                      type="text"
                      value={newReview.cultivation}
                      onChange={(e) => setNewReview({ ...newReview, cultivation: e.target.value })}
                      placeholder="e.g. 5 Acres"
                      className="w-full bg-[#0B2419] border border-[#123D27] rounded-lg px-3.5 py-2.5 text-[#F2F0E5] placeholder-[#D8D9C9]/40 focus:border-[#C4E85A] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-[#D8D9C9] uppercase tracking-wider">Orchard Age</label>
                    <input
                      type="text"
                      value={newReview.plantationAge}
                      onChange={(e) => setNewReview({ ...newReview, plantationAge: e.target.value })}
                      placeholder="e.g. 6 Year Orchard"
                      className="w-full bg-[#0B2419] border border-[#123D27] rounded-lg px-3.5 py-2.5 text-[#F2F0E5] placeholder-[#D8D9C9]/40 focus:border-[#C4E85A] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#D8D9C9] uppercase tracking-wider">Cultivation Experience & Results *</label>
                  <textarea
                    rows={4}
                    required
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Share how your grafted nutmeg saplings performed, canopy growth, fruit setting, or nursery guidance..."
                    className="w-full bg-[#0B2419] border border-[#123D27] rounded-lg p-3 text-[#F2F0E5] placeholder-[#D8D9C9]/40 focus:border-[#C4E85A] outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-[#123D27] text-[#D8D9C9] hover:text-[#F2F0E5]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="px-6 py-2.5 bg-[#C4E85A] text-[#071C14] rounded-full font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    {reviewSubmitting ? 'Submitting...' : 'Submit Story'}
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
