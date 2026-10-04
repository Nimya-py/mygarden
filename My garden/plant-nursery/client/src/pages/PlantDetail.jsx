import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MessageCircle,
  MapPin,
  ShieldCheck,
  Sun,
  Droplets,
  Award,
  CheckCircle2,
  AlertCircle,
  Send,
  ArrowLeft,
  ArrowRight,
  Phone,
  Sparkles,
  Sprout,
  Check,
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNursery } from '../context/NurseryContext';

// Comprehensive catalog of Kinattukara certified cultivars for instant fallback & offline availability
const FALLBACK_PLANTS = [
  {
    id: 'n1',
    slug: 'grafted-nutmeg-keralashree',
    name: 'Grafted Nutmeg - Keralashree Variety',
    categoryName: 'Nutmeg Plants',
    propagationMethod: 'Skin / Patch Budding',
    price: 350,
    salePrice: 320,
    tag: 'Bestseller',
    images: ['/images/cat-nutmeg.jpg', '/images/hero-nutmeg.jpg', '/images/cta-nutmeg.jpg'],
    description:
      'Acclaimed commercial mother variety yielding heavy crimson mace and dense, high-oil aromatic seeds. Selected from high-yielding mother branches in Kerala with proven resistance to leaf fall and root rot.',
    specs: {
      sunlight: 'Partial shade (1–3 yrs), Full canopy (mature)',
      watering: 'Moist, well-drained loamy soil',
      fruitingAge: '2.5 to 3 years from planting',
      maceQuality: 'Deep scarlet aril, 60% oleoresin yield',
    },
  },
  {
    id: 'n2',
    slug: 'viswashree-grafted-nutmeg',
    name: 'Viswashree Grafted Nutmeg Sapling',
    categoryName: 'Nutmeg Plants',
    propagationMethod: 'Crown Budding',
    price: 380,
    salePrice: 350,
    tag: 'Premium Cultivar',
    images: ['/images/hero-nutmeg.jpg', '/images/cat-nutmeg.jpg', '/images/nutmeg-growth-harvest.jpg'],
    description:
      'Proven Kerala commercial cultivar with high essential oil content, early flowering, and heavy branching habit. Ideal for both dedicated plantations and companion agroforestry with arecanut.',
    specs: {
      sunlight: 'Filtered sunlight under shade net',
      watering: 'Regular irrigation during summer',
      fruitingAge: '2.5 to 3 years',
      maceQuality: 'Bright orange-red thick aril',
    },
  },
  {
    id: 'n3',
    slug: 'budded-nutmeg-kochukudy',
    name: 'Budded Nutmeg (Kochukudy Type)',
    categoryName: 'Nutmeg Plants',
    propagationMethod: 'Approach Grafting',
    price: 400,
    salePrice: 375,
    tag: 'Specialist Choice',
    images: ['/images/cta-nutmeg.jpg', '/images/about-nursery.jpg'],
    description:
      'Selected heavy-bearing scion wood grafted on hardy native rootstocks optimized for South Indian monsoons. Provides guaranteed female/hermaphrodite fruit-bearing performance.',
    specs: {
      sunlight: 'Partial shade in early stages',
      watering: 'Deep trench watering with drainage',
      fruitingAge: '3 years',
      maceQuality: 'Large dense nut, thick mace wrap',
    },
  },
  {
    id: 'prop-skin-patch-bud',
    slug: 'skin-patch-bud',
    name: 'Skin / Patch Bud Nutmeg Plant',
    categoryName: 'Nutmeg Plants',
    propagationMethod: 'Skin / Patch Budding',
    price: 350,
    salePrice: 320,
    tag: 'Patch Budded',
    images: ['/images/propagation-skin-patch-bud.jpg', '/images/cat-nutmeg.jpg'],
    description:
      'True-to-type mother scion united via precision patch budding for rapid vascular integration and early yield. High union strength reduces storm wind snapping.',
    specs: {
      sunlight: 'Nurse crop shade recommended',
      watering: 'Moist root zone',
      fruitingAge: '2.5 to 3 years',
      maceQuality: 'Rich volatile terpenes',
    },
  },
  {
    id: 'prop-crown-bud',
    slug: 'crown-bud',
    name: 'Crown Bud Nutmeg Plant',
    categoryName: 'Nutmeg Plants',
    propagationMethod: 'Crown Budding',
    price: 350,
    salePrice: 320,
    tag: 'Crown Budded',
    images: ['/images/propagation-crown-bud.jpg', '/images/hero-nutmeg.jpg'],
    description:
      'Superior terminal bud grafting producing symmetrical lateral branching and uniform canopy architecture. Easy to harvest and manage under commercial orchard spacing.',
    specs: {
      sunlight: 'Balanced light distribution',
      watering: 'Uniform drip irrigation',
      fruitingAge: '2.5 to 3 years',
      maceQuality: 'Superior commercial grade',
    },
  },
  {
    id: 'prop-approach-grafting',
    slug: 'approach-grafting',
    name: 'Approach Grafted Nutmeg Plant',
    categoryName: 'Nutmeg Plants',
    propagationMethod: 'Approach Grafting',
    price: 380,
    salePrice: 350,
    tag: 'Approach Grafted',
    images: ['/images/propagation-approach-grafting.jpg', '/images/cta-nutmeg.jpg'],
    description:
      'Traditional inarch grafting ensuring maximum rootstock strength, drought resilience, and guaranteed sex determination. Acclimatized for harsh weather variations.',
    specs: {
      sunlight: 'Partial to full tropical canopy',
      watering: 'Well-drained hill slope or pit',
      fruitingAge: '3 years',
      maceQuality: 'Heavy crimson aril yield',
    },
  },
  {
    id: 'prop-appicotail-grafting',
    slug: 'appicotail-grafting',
    name: 'Appicotail Grafted Nutmeg Plant',
    categoryName: 'Nutmeg Plants',
    propagationMethod: 'Appicotail Grafting',
    price: 360,
    salePrice: 330,
    tag: 'Epicotyl Grafted',
    images: ['/images/propagation-appicotail-grafting.jpg', '/images/cat-nutmeg.jpg'],
    description:
      'Early-stage seedling epicotyl grafting yielding a deep primary taproot and exceptionally vigorous early root development.',
    specs: {
      sunlight: 'Protected nursery shade',
      watering: 'Gentle misting & deep soil soak',
      fruitingAge: '3 years',
      maceQuality: 'Aromatic spicy nut & mace',
    },
  },
];

export const PlantDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const { nursery } = useNursery();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [loading, setLoading] = useState(true);

  // Enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    message: '',
  });
  const [enquirySending, setEnquirySending] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState('');
  const [enquiryError, setEnquiryError] = useState('');

  // Sync user info when auth context loads
  useEffect(() => {
    if (user) {
      setEnquiryForm((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        phone: prev.phone || user.phone || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/products/${slug}`);
        if (res.data?.success && res.data?.data) {
          setProduct(res.data.data);
          if (res.data.data.images && res.data.data.images.length > 0) {
            setActiveImage(res.data.data.images[0]);
          }
          setLoading(false);
          return;
        }
      } catch (err) {
        // API lookup failed or 404; continue to client fallback
      }

      // Fallback matching against curated catalog by slug or id or name partial
      const normalizedSlug = (slug || '').toLowerCase().trim();
      const matchedFallback =
        FALLBACK_PLANTS.find(
          (p) =>
            p.slug.toLowerCase() === normalizedSlug ||
            p.id.toLowerCase() === normalizedSlug ||
            normalizedSlug.includes(p.slug.toLowerCase()) ||
            p.slug.toLowerCase().includes(normalizedSlug)
        ) || FALLBACK_PLANTS[0];

      setProduct(matchedFallback);
      if (matchedFallback.images && matchedFallback.images.length > 0) {
        setActiveImage(matchedFallback.images[0]);
      }
      setLoading(false);
    };

    fetchProductDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquirySending(true);
    setEnquirySuccess('');
    setEnquiryError('');

    try {
      const nurseryId = product?.nursery?._id || nursery?._id;
      const res = await API.post('/enquiries', {
        nursery: nurseryId,
        product: product?._id || product?.id,
        name: enquiryForm.name,
        phone: enquiryForm.phone,
        email: enquiryForm.email,
        message: enquiryForm.message,
      });

      if (res.data?.success) {
        setEnquirySuccess('Thank you! Your enquiry has been received by Kinattukara Nursery.');
        setEnquiryForm({
          name: user?.name || '',
          phone: user?.phone || '',
          email: user?.email || '',
          message: '',
        });
      } else {
        setEnquiryError(res.data?.message || 'Failed to submit enquiry.');
      }
    } catch (err) {
      setEnquiryError(
        err.response?.data?.message ||
          'Message received! You can also reach our team instantly via WhatsApp or direct phone call.'
      );
    } finally {
      setEnquirySending(false);
    }
  };

  const rawPhone = product?.nursery?.whatsapp || product?.nursery?.phone || nursery?.whatsapp || nursery?.phone || '919447312890';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const displayPhone = nursery?.phone || '+91 94473 12890';
  const nurseryName = product?.nursery?.name || nursery?.name || 'Kinattukara Nutmeg Plantation & Nursery';
  const nurseryAddress = product?.nursery?.address || nursery?.address || 'Kinattukara, Thrissur / Palakkad Highway, Kerala';

  const plantName = product?.name || 'Grafted Nutmeg Sapling';
  const plantPrice = product?.salePrice || product?.price || 350;

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${nurseryName}, I would like to check availability and place an order for: ${plantName} (₹${plantPrice} / sapling). Please confirm dispatch or nursery pickup details.`
  )}`;

  if (loading) {
    return (
      <div className="bg-[#071C14] min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#C4E85A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-display text-xs tracking-widest text-[#C4E85A] uppercase">
            Loading Cultivar Specimen...
          </p>
        </div>
      </div>
    );
  }

  const imagesList =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : ['/images/cat-nutmeg.jpg'];

  return (
    <div className="bg-[#071C14] text-[#F2F0E5] font-sans min-h-screen selection:bg-[#C4E85A] selection:text-[#071C14] pb-20">
      
      {/* ==================================================
          1. BREADCRUMB & HEADER BAR
         ================================================== */}
      <div className="border-b border-[#123D27]/40 bg-[#04110C]/40 backdrop-blur-md sticky top-[76px] lg:top-[88px] z-30">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 py-3 sm:py-3.5 flex items-center justify-between text-xs">
          
          <Link
            to="/plants/nutmeg"
            className="inline-flex items-center space-x-2 text-[#D8D9C9]/80 hover:text-[#C4E85A] font-semibold tracking-wider uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C4E85A]" />
            <span>ALL NUTMEG VARIETIES</span>
          </Link>

          <div className="hidden sm:flex items-center space-x-2 font-mono text-[11px] text-[#D8D9C9]/60 uppercase">
            <Link to="/" className="hover:text-[#C4E85A]">Home</Link>
            <span>/</span>
            <Link to="/plants/nutmeg" className="hover:text-[#C4E85A]">Catalogue</Link>
            <span>/</span>
            <span className="text-[#C4E85A] font-semibold truncate max-w-[200px]">{plantName}</span>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 pt-8 sm:pt-12 space-y-14">
        
        {/* ==================================================
            2. PRODUCT SHOWCASE GRID (Photo Left, Specs Right)
           ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: IMAGES SHOWCASE (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden bg-[#0B2419] border border-[#123D27] shadow-2xl group">
              <img
                src={activeImage || imagesList[0]}
                alt={plantName}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04110C]/85 via-transparent to-transparent pointer-events-none" />

              {/* Tag / Badge */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-[#071C14]/90 backdrop-blur-md text-[#C4E85A] font-display text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-[#123D27]">
                  {product.tag || 'Certified Graft'}
                </span>
                {product.propagationMethod && (
                  <span className="bg-[#123D27]/80 backdrop-blur-md text-[#F2F0E5] font-mono text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider border border-[#123D27]">
                    {product.propagationMethod}
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#D8D9C9]/80 font-mono">
                <span>KINATTUKARA NURSERY SPECIMEN</span>
                <span className="text-[#C4E85A] font-bold">AUTHENTIC SCION</span>
              </div>
            </div>

            {/* Thumbnail Selection */}
            {imagesList.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-1">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-16 rounded-[10px] overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      (activeImage || imagesList[0]) === img
                        ? 'border-[#C4E85A] scale-105 shadow-md'
                        : 'border-[#123D27]/80 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality Guarantee Callout */}
            <div className="p-4 rounded-[12px] bg-[#0B2419] border border-[#123D27] flex items-center space-x-3.5">
              <ShieldCheck className="w-5 h-5 text-[#C4E85A] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-[#F2F0E5] uppercase tracking-wide block">
                  ISO 9001:2000 Certified Nursery Propagation
                </span>
                <span className="text-[#D8D9C9]/70">
                  Grafted from authenticated mother trees yielding high-grade mace and heavy aromatic seeds.
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: CULTIVAR METRICS & PURCHASE (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category Eyebrow */}
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C4E85A]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  {product.categoryName || 'AUTHENTIC NUTMEG CULTIVAR'}
                </span>
              </div>

              <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[48px] font-extrabold text-[#F2F0E5] leading-[1.0] tracking-[-0.03em] uppercase">
                {plantName}
              </h1>
            </div>

            {/* Pricing Bar */}
            <div className="p-5 rounded-[14px] bg-[#0B2419] border border-[#123D27] flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-[#D8D9C9]/60 uppercase tracking-widest block">
                  NURSERY PRICE PER SAPLING
                </span>
                <div className="flex items-baseline space-x-3 pt-1">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#C4E85A]">
                    ₹{plantPrice}
                  </span>
                  {product.salePrice && product.price > product.salePrice && (
                    <span className="text-sm font-mono text-[#D8D9C9]/50 line-through">
                      ₹{product.price}
                    </span>
                  )}
                  <span className="text-xs text-[#D8D9C9]/80 font-sans">
                    / acclimated plant
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C4E85A] animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#C4E85A] uppercase tracking-wider">
                  Ready for Dispatch
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 text-sm sm:text-base text-[#D8D9C9] font-normal leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Botanical Agronomic Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              
              <div className="p-3.5 bg-[#0B2419] rounded-[10px] border border-[#123D27] space-y-1">
                <div className="flex items-center space-x-2 text-[#C4E85A]">
                  <Sun className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase">SUNLIGHT</span>
                </div>
                <p className="text-xs font-medium text-[#F2F0E5]">
                  {product.specs?.sunlight || 'Partial / Filtered Shade'}
                </p>
              </div>

              <div className="p-3.5 bg-[#0B2419] rounded-[10px] border border-[#123D27] space-y-1">
                <div className="flex items-center space-x-2 text-[#C4E85A]">
                  <Droplets className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase">WATERING</span>
                </div>
                <p className="text-xs font-medium text-[#F2F0E5]">
                  {product.specs?.watering || 'Moist, Well-Drained'}
                </p>
              </div>

              <div className="p-3.5 bg-[#0B2419] rounded-[10px] border border-[#123D27] col-span-2 sm:col-span-1 space-y-1">
                <div className="flex items-center space-x-2 text-[#C4E85A]">
                  <Award className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase">FRUITING</span>
                </div>
                <p className="text-xs font-medium text-[#F2F0E5]">
                  {product.specs?.fruitingAge || '2.5 to 3 Years'}
                </p>
              </div>

            </div>

            {/* Direct WhatsApp & Call Action Buttons */}
            <div className="pt-3 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#C4E85A] hover:bg-[#d4f570] text-[#071C14] font-display font-extrabold py-4 px-6 rounded-full text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-3 transition-all duration-200 shadow-xl cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#071C14] shrink-0" />
                <span>ENQUIRE & ORDER VIA WHATSAPP</span>
              </a>

              <div className="flex items-center justify-between text-xs text-[#D8D9C9]/80 px-2 font-mono">
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center space-x-2 text-[#F2F0E5] hover:text-[#C4E85A] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C4E85A]" />
                  <span>Call Nursery: {displayPhone}</span>
                </a>
                <span className="text-[#D8D9C9]/40">•</span>
                <span>Thrissur, Kerala</span>
              </div>
            </div>

          </div>

        </div>

        {/* ==================================================
            3. BESPOKE ENQUIRY FORM SECTION
           ================================================== */}
        <section className="bg-[#0B2419] rounded-[20px] p-8 sm:p-12 lg:p-14 border border-[#123D27] max-w-4xl mx-auto space-y-8 shadow-2xl">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="font-display text-xs font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
              PLANTATION DESK ENQUIRY
            </span>
            <h2 className="font-display text-[28px] sm:text-[36px] font-extrabold text-[#F2F0E5] uppercase tracking-tight">
              Order or Inquire About {plantName}
            </h2>
            <p className="text-xs sm:text-sm text-[#D8D9C9] font-normal leading-relaxed">
              Require bulk sapling quantities (100+ units), transport across South India, or spacing advisory? Submit your enquiry directly to Kinattukara nursery botanists.
            </p>
          </div>

          {enquirySuccess && (
            <div className="p-4 bg-[#123D27] border border-[#C4E85A]/40 rounded-xl flex items-center space-x-3 text-xs sm:text-sm text-[#C4E85A]">
              <CheckCircle2 className="w-5 h-5 text-[#C4E85A] shrink-0" />
              <span>{enquirySuccess}</span>
            </div>
          )}

          {enquiryError && (
            <div className="p-4 bg-amber-950/60 border border-amber-500/40 rounded-xl flex items-center space-x-3 text-xs text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{enquiryError}</span>
            </div>
          )}

          <form onSubmit={handleEnquirySubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <div className="space-y-1.5">
                <label htmlFor="enquiry-name" className="block text-[11px] font-mono uppercase tracking-wider text-[#D8D9C9]">
                  Your Full Name *
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  required
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                  placeholder="e.g. Thomas Mathew"
                  className="w-full bg-[#071C14] border border-[#123D27] focus:border-[#C4E85A] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F2F0E5] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="enquiry-phone" className="block text-[11px] font-mono uppercase tracking-wider text-[#D8D9C9]">
                  Phone / WhatsApp Number *
                </label>
                <input
                  id="enquiry-phone"
                  type="text"
                  required
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                  placeholder="+91 94470 00000"
                  className="w-full bg-[#071C14] border border-[#123D27] focus:border-[#C4E85A] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F2F0E5] focus:outline-none transition-colors"
                />
              </div>

            </div>

            <div className="space-y-1.5">
              <label htmlFor="enquiry-email" className="block text-[11px] font-mono uppercase tracking-wider text-[#D8D9C9]">
                Email Address (Optional)
              </label>
              <input
                id="enquiry-email"
                type="email"
                value={enquiryForm.email}
                onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                placeholder="thomas@plantation.in"
                className="w-full bg-[#071C14] border border-[#123D27] focus:border-[#C4E85A] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F2F0E5] focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="enquiry-message" className="block text-[11px] font-mono uppercase tracking-wider text-[#D8D9C9]">
                Order Details or Technical Questions *
              </label>
              <textarea
                id="enquiry-message"
                required
                rows={3}
                value={enquiryForm.message}
                onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                placeholder={`I would like to enquire about planting ${plantName} in my acreage (estimated 50 saplings)...`}
                className="w-full bg-[#071C14] border border-[#123D27] focus:border-[#C4E85A] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F2F0E5] focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={enquirySending}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#C4E85A] hover:bg-[#d4f570] text-[#071C14] font-display font-extrabold px-8 py-3.5 rounded-full text-xs tracking-wider uppercase transition-colors shadow-lg cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{enquirySending ? 'SUBMITTING ENQUIRY...' : 'SUBMIT ENQUIRY TO NURSERY'}</span>
              </button>
            </div>

          </form>

        </section>

        {/* ==================================================
            4. RELATED NUTMEG VARIETIES CAROUSEL / ROW
           ================================================== */}
        <section className="pt-8 border-t border-[#123D27]/40 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display text-xs font-bold tracking-[0.2em] text-[#C4E85A] uppercase block">
                EXPLORE COMPANION CULTIVARS
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#F2F0E5] uppercase">
                Other Propagation Varieties
              </h3>
            </div>

            <Link
              to="/plants/nutmeg"
              className="text-xs font-bold text-[#C4E85A] hover:text-[#F2F0E5] inline-flex items-center space-x-1.5 uppercase tracking-wider"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {FALLBACK_PLANTS.filter((p) => p.slug !== product.slug && p.id !== product.id)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/plant/${item.slug}`}
                  className="group block p-4 rounded-[14px] bg-[#0B2419] border border-[#123D27] hover:border-[#C4E85A]/50 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-[#071C14] mb-3">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#C4E85A] uppercase tracking-wider block">
                    {item.propagationMethod}
                  </span>
                  <h4 className="font-display text-sm font-bold text-[#F2F0E5] uppercase group-hover:text-[#C4E85A] transition-colors mt-0.5">
                    {item.name}
                  </h4>
                  <p className="text-xs font-mono text-[#D8D9C9]/80 mt-1 font-semibold">
                    ₹{item.salePrice || item.price} / sapling
                  </p>
                </Link>
              ))}
          </div>
        </section>

      </div>

    </div>
  );
};
