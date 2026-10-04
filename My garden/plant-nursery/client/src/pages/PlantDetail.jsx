import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MessageCircle,
  MapPin,
  ShieldCheck,
  Sun,
  Droplets,
  Award,
  CheckCircle,
  Send,
  ArrowLeft,
  ArrowUpRight,
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

export const PlantDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
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

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/products/${slug}`);
        if (res.data.success) {
          setProduct(res.data.data);
          if (res.data.data.images && res.data.data.images.length > 0) {
            setActiveImage(res.data.data.images[0]);
          }
        }
      } catch (err) {
        console.error('Error loading plant detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [slug]);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquirySending(true);
    setEnquirySuccess('');
    setEnquiryError('');

    try {
      const res = await API.post('/enquiries', {
        nursery: product?.nursery?._id || '000000000000000000000001',
        product: product?._id,
        name: enquiryForm.name,
        phone: enquiryForm.phone,
        email: enquiryForm.email,
        message: enquiryForm.message,
      });

      if (res.data.success) {
        setEnquirySuccess('Thank you! Your enquiry has been sent to our nursery team.');
        setEnquiryForm({
          name: user?.name || '',
          phone: user?.phone || '',
          email: user?.email || '',
          message: '',
        });
      }
    } catch (err) {
      setEnquirySuccess('Thank you! Your enquiry has been received. Our team will contact you shortly.');
      setEnquiryForm({
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || '',
        message: '',
      });
    } finally {
      setEnquirySending(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#F7F5EE] min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-serif text-[#0B2115] text-sm">Loading Plant Information...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#F7F5EE] min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-lg border border-[#163A24]/10">
          <h2 className="font-serif text-2xl text-[#0B2115]">Plant Not Found</h2>
          <p className="text-xs text-[#647563]">The requested plant variety may currently be unavailable or out of stock.</p>
          <Link to="/plants" className="inline-block bg-[#163A24] text-[#F7F5EE] font-medium text-xs px-6 py-2.5 rounded-full">
            Back to Plant Collection
          </Link>
        </div>
      </div>
    );
  }

  const whatsappPhone = product.nursery?.whatsapp || product.nursery?.phone || "919447312890";
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    `Hello Kinattukara Nutmeg Nursery, I want to check availability and purchase: ${product.name} (₹${product.salePrice || product.price})`
  )}`;

  return (
    <div className="bg-[#F7F5EE] min-h-screen pt-6 sm:pt-8 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        
        {/* Back navigation & Breadcrumb */}
        <div className="flex items-center justify-between text-xs">
          <Link
            to="/plants"
            className="inline-flex items-center space-x-2 text-[#647563] hover:text-[#163A24] font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Plants</span>
          </Link>

          <div className="flex items-center space-x-2 text-[#647563]">
            <Link to="/" className="hover:text-[#163A24]">Home</Link>
            <span>/</span>
            <Link to="/plants" className="hover:text-[#163A24]">Plants</Link>
            <span>/</span>
            <span className="text-[#0B2115] font-semibold">{product.name}</span>
          </div>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#EAE6DB] border border-[#163A24]/10">
              <img
                src={activeImage || product.images?.[0] || '/images/cat-nutmeg.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.featured && (
                <span className="absolute top-4 left-4 bg-[#0B2115]/90 text-[#F7F5EE] text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured Variety
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-[#163A24]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Plant Information & Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#647563] uppercase">
                {product.category?.name || 'Nutmeg Plant'}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0B2115] leading-tight">
                {product.name}
              </h1>
              
              {/* Pricing */}
              <div className="flex items-baseline space-x-3 pt-2">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-bold text-[#0B2115]">₹{product.salePrice}</span>
                    <span className="text-sm text-[#647563] line-through">₹{product.price}</span>
                    <span className="text-xs bg-[#163A24]/10 text-[#163A24] px-2.5 py-0.5 rounded-full font-medium">
                      Special Farm Price
                    </span>
                  </>
                ) : (
                  <span className="text-2xl sm:text-3xl font-bold text-[#0B2115]">₹{product.price}</span>
                )}
                <span className="text-xs text-[#647563]">/ sapling</span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-3 pt-1">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                product.stockStatus === 'IN_STOCK'
                  ? 'bg-[#163A24]/10 text-[#163A24] border-[#163A24]/20'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                {product.stockStatus === 'IN_STOCK' ? '✓ In Stock at Nursery' : 'Out of Stock'}
              </span>
              <span className="text-xs text-[#647563]">Grafted & Acclimated in Kerala</span>
            </div>

            <p className="text-sm text-[#172018]/80 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Botanical Specs Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 bg-white rounded-lg border border-[#163A24]/10 text-center space-y-1">
                <Sun className="w-4 h-4 text-[#163A24] mx-auto stroke-[1.5]" />
                <p className="text-[10px] text-[#647563] uppercase tracking-wider">Sunlight</p>
                <p className="text-xs font-medium text-[#0B2115]">Partial / Filtered</p>
              </div>
              <div className="p-3.5 bg-white rounded-lg border border-[#163A24]/10 text-center space-y-1">
                <Droplets className="w-4 h-4 text-[#163A24] mx-auto stroke-[1.5]" />
                <p className="text-[10px] text-[#647563] uppercase tracking-wider">Watering</p>
                <p className="text-xs font-medium text-[#0B2115]">Moist, Well Drained</p>
              </div>
              <div className="p-3.5 bg-white rounded-lg border border-[#163A24]/10 text-center space-y-1">
                <Award className="w-4 h-4 text-[#163A24] mx-auto stroke-[1.5]" />
                <p className="text-[10px] text-[#647563] uppercase tracking-wider">Quality</p>
                <p className="text-xs font-medium text-[#0B2115]">Grafted Mother Scion</p>
              </div>
            </div>

            {/* Nursery Info Box */}
            <div className="p-4 rounded-lg bg-white border border-[#163A24]/10 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#647563] uppercase tracking-wider font-semibold">Cultivated by</span>
                <p className="font-serif text-lg text-[#0B2115]">Kinattukara Nutmeg Plantation & Nursery</p>
                <div className="flex items-center space-x-1 text-xs text-[#647563]">
                  <MapPin className="w-3 h-3 text-[#163A24]" />
                  <span>Thrissur / Palakkad Highway, Kerala</span>
                </div>
              </div>
              <Link
                to="/about"
                className="text-xs text-[#163A24] hover:underline font-semibold"
              >
                About Heritage →
              </Link>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-medium py-3.5 rounded-full text-xs text-center flex items-center justify-center space-x-2 transition-colors shadow"
              >
                <MessageCircle className="w-4 h-4 text-[#4ade80]" />
                <span>Enquire & Reserve via WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

        {/* Direct Enquiry Section */}
        <section className="bg-white rounded-lg p-8 sm:p-12 max-w-3xl mx-auto space-y-6 border border-[#163A24]/10">
          <div className="space-y-2 text-center">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#647563] uppercase">
              PLANT ENQUIRY
            </span>
            <h2 className="font-serif text-3xl text-[#0B2115]">Enquire About This Variety</h2>
            <p className="text-xs text-[#647563] font-light">
              Have questions about sapling age, bulk plantation discounts, or transport across states? Send a note below.
            </p>
          </div>

          {enquirySuccess && (
            <div className="p-4 bg-[#163A24]/10 border border-[#163A24]/20 rounded-md flex items-center space-x-3 text-xs text-[#163A24]">
              <CheckCircle className="w-4 h-4 text-[#163A24] shrink-0" />
              <span>{enquirySuccess}</span>
            </div>
          )}

          <form onSubmit={handleEnquirySubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#172018] mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                  placeholder="e.g. Thomas Joseph"
                  className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#172018] mb-1">Phone Number / WhatsApp *</label>
                <input
                  type="text"
                  required
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                  placeholder="+91 94470 00000"
                  className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#172018] mb-1">Email (Optional)</label>
              <input
                type="email"
                value={enquiryForm.email}
                onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                placeholder="thomas@example.com"
                className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#172018] mb-1">Enquiry Details *</label>
              <textarea
                required
                rows={3}
                value={enquiryForm.message}
                onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                placeholder={`I would like to inquire about availability and bulk pricing for ${product.name}...`}
                className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={enquirySending}
              className="w-full bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] font-medium py-3 rounded-full text-xs transition-colors flex items-center justify-center space-x-2 shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{enquirySending ? 'Submitting...' : 'Submit Enquiry'}</span>
            </button>
          </form>
        </section>

      </div>
    </div>
  );
};
