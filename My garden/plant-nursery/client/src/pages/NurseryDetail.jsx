import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowLeft, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import API from '../services/api';

export const NurseryDetail = () => {
  const { slug } = useParams();
  const [nursery, setNursery] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNursery = async () => {
      setLoading(true);
      try {
        const nurseryRes = await API.get(`/nurseries/${slug}`);
        if (nurseryRes.data?.success) {
          const nur = nurseryRes.data.data;
          setNursery(nur);
          const prodRes = await API.get(`/products?nursery=${nur.slug}`);
          if (prodRes.data?.success) setProducts(prodRes.data.data);
          setLoading(false);
          return;
        }
      } catch (err) {
        // Fallback to default Kinattukara nursery data
      }

      setNursery({
        name: 'Kinattukara Nutmeg Plantation & Nursery',
        description:
          'Founded over 35 years ago in Thrissur, Kerala by Mr. K.T. Mathew and Mr. Arun Mathew. ISO 9001:2000 certified through ANAB for standardized agricultural procedures, authenticated scion selection, and quality nursery management.',
        address: 'Kinattukara, Thrissur / Palakkad Highway',
        city: 'Thrissur',
        state: 'Kerala',
        phone: '+91 94473 12890',
        whatsapp: '919447312890',
        openingHours: '8:00 AM – 6:30 PM (Mon – Sat)',
      });
      setLoading(false);
    };

    fetchNursery();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#071C14] min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#C4E85A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-display text-xs tracking-widest text-[#C4E85A] uppercase">
            Loading Nursery Profile...
          </p>
        </div>
      </div>
    );
  }

  const whatsappPhone = nursery.whatsapp || nursery.phone || '919447312890';
  const cleanPhone = String(whatsappPhone).replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${nursery.name}, I would like to enquire about plant availability and scheduling a nursery visit.`
  )}`;
  const mapUrl = 'https://maps.google.com/?q=Kinattukara+Nutmeg+Plantation+and+Nursery+Kerala';

  return (
    <div className="bg-[#071C14] text-[#F2F0E5] font-sans min-h-screen selection:bg-[#C4E85A] selection:text-[#071C14] py-10 sm:py-16 space-y-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-bold tracking-wider text-[#D8D9C9]/80 hover:text-[#C4E85A] uppercase transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#C4E85A]" />
          <span>BACK TO HOME</span>
        </Link>

        {/* Nursery Header Profile Card */}
        <div className="bg-[#0B2419] rounded-[20px] p-8 sm:p-12 lg:p-14 border border-[#123D27] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#C4E85A]" />
              <span className="font-display text-xs font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                ACCREDITED PLANTATION & NURSERY PROFILE
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F2F0E5] leading-[0.98] uppercase tracking-tight">
              {nursery.name}
            </h1>

            <p className="text-sm sm:text-base text-[#D8D9C9] font-normal leading-relaxed max-w-2xl">
              {nursery.description}
            </p>

            <div className="flex flex-wrap gap-5 text-xs text-[#D8D9C9]/85 pt-3 font-mono">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#C4E85A] shrink-0" />
                <span>{nursery.address}, {nursery.city}, {nursery.state}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#C4E85A] shrink-0" />
                <span>{nursery.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#C4E85A] shrink-0" />
                <span>{nursery.openingHours}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col space-y-3 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C4E85A] hover:bg-[#d4f570] text-[#071C14] py-4 px-6 rounded-full text-xs font-display font-extrabold text-center flex items-center justify-center space-x-2.5 transition-all shadow-xl uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 text-[#071C14] shrink-0" />
              <span>Contact via WhatsApp</span>
            </a>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#071C14] border border-[#123D27] hover:border-[#C4E85A] text-[#F2F0E5] hover:text-[#C4E85A] py-3.5 px-6 rounded-full text-xs font-bold text-center flex items-center justify-center space-x-2 transition-colors uppercase tracking-wider"
            >
              <span>Get Driving Directions</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C4E85A]" />
            </a>
          </div>
        </div>

        {/* Nursery Plants Collection */}
        <div className="space-y-8 pt-4">
          <div className="space-y-2">
            <span className="font-display text-xs font-bold tracking-[0.2em] text-[#C4E85A] uppercase">
              PROPAGATION SPECIMENS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F2F0E5] uppercase tracking-tight">
              Cultivated Saplings & Varieties
            </h2>
            <p className="text-xs sm:text-sm text-[#D8D9C9] font-normal">
              Acclimated mother plants grown under scientific shade-net nursery management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {(products.length > 0 ? products : [
              {
                id: '1',
                name: 'Grafted Nutmeg - Keralashree Variety',
                description: 'Selected heavy-bearing scion wood grafted on hardy rootstocks.',
                price: 350,
                image: '/images/cat-nutmeg.jpg',
                slug: 'grafted-nutmeg-keralashree',
              },
              {
                id: '2',
                name: 'Viswashree Grafted Nutmeg Sapling',
                description: 'High essential oil content with dense branching canopy.',
                price: 380,
                image: '/images/hero-nutmeg.jpg',
                slug: 'viswashree-grafted-nutmeg',
              },
              {
                id: '3',
                name: 'Skin / Patch Bud Nutmeg Plant',
                description: 'True-to-type mother scion united via precision patch budding.',
                price: 350,
                image: '/images/propagation-skin-patch-bud.jpg',
                slug: 'skin-patch-bud',
              },
              {
                id: '4',
                name: 'Approach Grafted Nutmeg Plant',
                description: 'Traditional inarch grafting ensuring maximum rootstock strength.',
                price: 380,
                image: '/images/propagation-approach-grafting.jpg',
                slug: 'approach-grafting',
              },
            ]).map((p) => (
              <Link
                key={p._id || p.id}
                to={`/plant/${p.slug || p._id || p.id}`}
                className="group block p-4 rounded-[16px] bg-[#0B2419] border border-[#123D27] hover:border-[#C4E85A]/50 transition-all duration-300 shadow-md"
              >
                <div className="aspect-[4/3] rounded-[10px] overflow-hidden bg-[#071C14] mb-3.5">
                  <img
                    src={p.images?.[0] || p.image || '/images/cat-nutmeg.jpg'}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display text-base font-bold text-[#F2F0E5] group-hover:text-[#C4E85A] transition-colors leading-snug uppercase">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#D8D9C9]/75 line-clamp-2 font-normal leading-relaxed">
                    {p.description}
                  </p>
                  <p className="text-sm font-display font-extrabold text-[#C4E85A] pt-1">
                    ₹{p.salePrice || p.price} <span className="text-[11px] font-mono text-[#D8D9C9]/60 font-normal">/ sapling</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
