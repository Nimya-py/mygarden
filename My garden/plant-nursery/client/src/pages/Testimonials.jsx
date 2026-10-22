import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Plus,
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  Sprout,
  TreePine,
  MapPin,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import API from '../services/api';
import { useNursery } from '../context/NurseryContext';

export const Testimonials = () => {
  const { nursery } = useNursery();

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
    {
      _id: 'default-3',
      name: 'Mr. Joseph K. Varghese',
      place: 'Irinjalakuda',
      district: 'Thrissur District',
      cultivation: '4 acre',
      plantationAge: '7 Year orchard',
      rating: 5,
      comment:
        'We intercropped Kinattukara patch-budded nutmeg with our coconut palms. The canopy architecture and early fruit-setting within 30 months was remarkable.',
    },
    {
      _id: 'default-4',
      name: 'Mr. Suresh Kumar Nair',
      place: 'Thodupuzha',
      district: 'Idukki District',
      cultivation: '6 acre',
      plantationAge: '4 Year grove',
      rating: 5,
      comment:
        'The mace thickness and oil aroma of the Keralashree cultivar we bought from Kinattukara have fetched us premium rates in the Kochi spice market.',
    },
  ];

  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
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

    fetchTestimonials();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
      alert(err.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const rawPhone = nursery?.whatsapp || nursery?.phone || '919447312890';
  const cleanPhone = String(rawPhone).replace(/[^0-9]/g, '');

  return (
    <div className="bg-[#071C14] text-[#F2F0E5] font-sans selection:bg-[#C4E85A] selection:text-[#071C14] min-h-screen">
      
      {/* ==================================================
          1. HERO HEADER SECTION
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
            <span className="text-[#C4E85A]">GROWER EXPERIENCES</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end justify-between">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2">
                <Star className="w-4 h-4 text-[#C4E85A] fill-[#C4E85A]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  VERIFIED HARVEST TESTIMONIALS
                </span>
              </div>

              <h1 className="font-display text-[42px] sm:text-[58px] lg:text-[76px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
                COMMERCIAL PLANTER <br />
                <span className="text-[#C4E85A]">EXPERIENCES.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-2xl">
                Field reports, yields, and authentic feedback from commercial growers, estate managers, and smallholders cultivating Kinattukara grafted nutmeg across South India.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <button
                type="button"
                onClick={() => {
                  setReviewSuccess(false);
                  setReviewModalOpen(true);
                }}
                className="inline-flex items-center space-x-2 px-7 py-4 rounded-full bg-[#C4E85A] hover:bg-[#d4f570] text-[#071C14] text-xs font-display font-extrabold tracking-wider uppercase transition-all shadow-xl cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#071C14]" />
                <span>SHARE YOUR HARVEST STORY</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          2. CREDIBILITY METRICS BAR
         ================================================== */}
      <section className="py-8 bg-[#0B2419] border-b border-[#123D27]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#123D27]/60">
            
            <div className="space-y-1 sm:pr-4">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#C4E85A]">
                35+ YEARS
              </span>
              <p className="text-xs text-[#D8D9C9]/70 uppercase tracking-wider font-mono">
                Agronomic Track Record
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-6 space-y-1">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#C4E85A]">
                100+ ACRES
              </span>
              <p className="text-xs text-[#D8D9C9]/70 uppercase tracking-wider font-mono">
                Commercial Plantations
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-6 space-y-1">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#C4E85A]">
                ISO 9001:2000
              </span>
              <p className="text-xs text-[#D8D9C9]/70 uppercase tracking-wider font-mono">
                ANAB Accredited Nursery
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:pl-6 space-y-1">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#C4E85A]">
                5.0 RATING
              </span>
              <p className="text-xs text-[#D8D9C9]/70 uppercase tracking-wider font-mono">
                Verified Planter Feedback
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          3. TESTIMONIALS GRID
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#071C14]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 space-y-12">
          
          <div className="flex items-baseline justify-between border-b border-[#123D27]/40 pb-5">
            <div>
              <span className="font-display text-xs font-bold tracking-[0.2em] text-[#C4E85A] uppercase block">
                FIELD ARCHIVE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F2F0E5] uppercase tracking-tight">
                Authentic Planter Reviews
              </h2>
            </div>
            <span className="font-mono text-xs text-[#D8D9C9]/60 uppercase">
              {testimonials.length} VERIFIED ENTRIES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {testimonials.map((t, idx) => (
              <div
                key={t._id || idx}
                className="rounded-[18px] bg-[#0B2419] border border-[#123D27] hover:border-[#C4E85A]/40 transition-all duration-300 p-7 sm:p-9 space-y-6 shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Star Rating Strip */}
                  <div className="flex items-center space-x-1.5">
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
                    <span className="ml-2 font-mono text-[11px] text-[#D8D9C9]/60 font-semibold tracking-wider">
                      5.0 RATED
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-base sm:text-lg text-[#F2F0E5] font-normal leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                {/* Planter & Orchard Metadata */}
                <div className="pt-5 border-t border-[#123D27]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-display font-bold text-[#F2F0E5] text-sm uppercase tracking-wide block group-hover:text-[#C4E85A] transition-colors">
                      {t.name}
                    </span>
                    <span className="text-[#D8D9C9]/70 font-mono text-[11px]">
                      {t.place ? `${t.place}, ` : ''}{t.district || 'Kerala'}
                    </span>
                  </div>

                  {(t.cultivation || t.plantationAge) && (
                    <div className="text-right">
                      {t.cultivation && (
                        <span className="font-mono text-xs text-[#C4E85A] font-bold block uppercase">
                          {t.cultivation} GROVE
                        </span>
                      )}
                      {t.plantationAge && (
                        <span className="text-[11px] text-[#D8D9C9]/60 font-sans">
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
          4. CALL TO ACTION: VISIT NURSERY OR CALL
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#04110C] border-t border-[#123D27]/60 text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 space-y-6">
          <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
            BEGIN YOUR CULTIVATION JOURNEY
          </p>

          <h2 className="font-display text-[36px] sm:text-[50px] lg:text-[64px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
            CULTIVATE WITH <br />
            <span className="text-[#C4E85A]">KINATTUKARA CONFIDENCE.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-xl mx-auto">
            Get in touch with our horticulturists for variety recommendations, site suitability analysis, and direct sapling booking.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                'Hello Kinattukara Nursery, I was reading your customer testimonials and would like to enquire about purchasing grafted nutmeg saplings for my plantation.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 bg-[#C4E85A] hover:bg-[#d4f570] text-[#071C14] px-8 py-4 rounded-full text-xs sm:text-sm font-display font-extrabold tracking-wider uppercase transition-all shadow-xl"
            >
              <MessageCircle className="w-4 h-4 text-[#071C14]" />
              <span>CONSULT ON WHATSAPP</span>
            </a>

            <Link
              to="/plants/nutmeg"
              className="inline-flex items-center space-x-2 border border-[#123D27] hover:border-[#C4E85A] text-[#F2F0E5] hover:text-[#C4E85A] px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors"
            >
              <span>EXPLORE VARIETIES</span>
              <ArrowRight className="w-4 h-4 text-[#C4E85A]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. CUSTOMER REVIEW SUBMISSION MODAL
         ================================================== */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#04110C]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#071C14] border border-[#123D27] rounded-[20px] max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
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
                className="text-[#D8D9C9]/70 hover:text-[#C4E85A] p-1.5 rounded-full hover:bg-[#123D27] cursor-pointer"
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
                    className="px-6 py-2.5 bg-[#C4E85A] text-[#071C14] rounded-full text-xs font-bold tracking-wider uppercase hover:bg-white transition-colors cursor-pointer"
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
                    className="px-5 py-2.5 rounded-full border border-[#123D27] text-[#D8D9C9] hover:text-[#F2F0E5] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="px-6 py-2.5 bg-[#C4E85A] text-[#071C14] rounded-full font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
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
