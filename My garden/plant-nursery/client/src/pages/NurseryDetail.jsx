import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowLeft, ArrowUpRight } from 'lucide-react';
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
        if (nurseryRes.data.success) {
          const nur = nurseryRes.data.data;
          setNursery(nur);
          const prodRes = await API.get(`/products?nursery=${nur.slug}`);
          if (prodRes.data.success) setProducts(prodRes.data.data);
        }
      } catch (err) {
        console.error('Error fetching nursery details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNursery();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#F7F5EE] min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-serif text-[#0B2115] text-sm">Loading Nursery Information...</p>
        </div>
      </div>
    );
  }

  if (!nursery) {
    return (
      <div className="bg-[#F7F5EE] min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-lg border border-[#163A24]/10">
          <h2 className="font-serif text-2xl text-[#0B2115]">Nursery Profile Not Found</h2>
          <p className="text-xs text-[#647563]">The requested nursery profile could not be located.</p>
          <Link to="/" className="inline-block bg-[#163A24] text-[#F7F5EE] text-xs font-semibold px-6 py-2.5 rounded-full">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const whatsappPhone = nursery.whatsapp || nursery.phone || "919447312890";
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    `Hello ${nursery.name}, I would like to enquire about plant availability and nursery visits.`
  )}`;
  const mapUrl = "https://maps.google.com/?q=Kinattukara+Nutmeg+Plantation+and+Nursery+Kerala";

  return (
    <div className="bg-[#F7F5EE] min-h-screen py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        
        {/* Navigation */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-[#647563] hover:text-[#163A24] uppercase transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Nursery Header Profile */}
        <div className="bg-white rounded-lg p-8 sm:p-12 border border-[#163A24]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase">
              PLANTATION & NURSERY PROFILE
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#0B2115]">
              {nursery.name}
            </h1>
            <p className="text-sm text-[#172018]/80 font-light leading-relaxed max-w-2xl">
              {nursery.description}
            </p>

            <div className="flex flex-wrap gap-5 text-xs text-[#647563] pt-2">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-[#163A24]" />
                <span>{nursery.address}, {nursery.city}, {nursery.state}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Phone className="w-4 h-4 text-[#163A24]" />
                <span>{nursery.phone}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-[#163A24]" />
                <span>{nursery.openingHours}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col space-y-3 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] py-3 px-6 rounded-full text-xs font-medium text-center flex items-center justify-center space-x-2 transition-colors shadow"
            >
              <MessageCircle className="w-4 h-4 text-[#4ade80]" />
              <span>Contact via WhatsApp</span>
            </a>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#163A24]/20 hover:border-[#163A24] text-[#163A24] py-3 px-6 rounded-full text-xs font-medium text-center flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>Get Directions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Nursery Plants Collection */}
        <div className="space-y-8">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#0B2115]">
              Saplings & Varieties Cultivated Here
            </h2>
            <p className="text-xs text-[#647563]">
              Acclimated plants grown under scientific shade-net nursery management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p._id} className="group space-y-3">
                <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#EAE6DB] border border-[#163A24]/10">
                  <img
                    src={p.images?.[0] || '/images/cat-nutmeg.jpg'}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-[#0B2115] group-hover:text-[#163A24] transition-colors leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#647563] line-clamp-2 font-light">
                    {p.description}
                  </p>
                  <p className="text-sm font-semibold text-[#0B2115] pt-1">
                    ₹{p.salePrice || p.price} <span className="text-[11px] font-normal text-[#647563]">/ sapling</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
