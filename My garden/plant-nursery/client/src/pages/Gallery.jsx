import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, ZoomIn, Compass, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeLightbox, setActiveLightbox] = useState(null);

  const galleryItems = [
    {
      title: 'Ripe Kerala Nutmeg on Branch',
      category: 'NUTMEG',
      image: '/images/hero-nutmeg.jpg',
      caption: 'Naturally split golden pericarp exposing fresh crimson mace in our mother orchard.',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Shade-Net Propagation Nursery',
      category: 'NURSERY',
      image: '/images/about-nursery.jpg',
      caption: 'Acclimatized grafted saplings nurtured under controlled 25% nurse shade houses.',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Healthy Grafted Saplings',
      category: 'NUTMEG',
      image: '/images/cat-nutmeg.jpg',
      caption: 'Certified grafted nutmeg plants with strong lateral branching ready for orchard planting.',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Kerala Black Pepper & Intercropping',
      category: 'SPICES',
      image: '/images/cat-spices.jpg',
      caption: 'Multi-tier agroforestry with Malabar black pepper thriving on companion plantation trees.',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Traditional Pickles & Value-Added Harvest',
      category: 'HARVEST',
      image: '/images/nutmeg-pickle.jpg',
      caption: 'Tender whole green and golden nutmeg pericarp cured in traditional sea-salt and sesame oil brine.',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Pure Crimson Mace (Jathipathri)',
      category: 'HARVEST',
      image: '/images/nutmeg-mace.jpg',
      caption: 'Hand-harvested scarlet arils sun-curing on breathable mats to retain essential volatile oils.',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Golden Nutmeg Distillates & Oils',
      category: 'HARVEST',
      image: '/images/nutmeg-oil.jpg',
      caption: 'Pure steam-distilled essential oil captures the fragrant volatile terpenes of harvested spice kernels.',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Planting & Field Establishment',
      category: 'NURSERY',
      image: '/images/nutmeg-planting-sapling.jpg',
      caption: 'Establishing certified grafted sapling in enriched 1m³ pit with organic compost and neem cake.',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Mature Orchard Canopy & Fruit Set',
      category: 'NUTMEG',
      image: '/images/nutmeg-growth-harvest.jpg',
      caption: 'Extensive lateral spread of a 12-year-old high-yielding mother tree in Thrissur groves.',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Nutmeg Varieties & Cultivar Research',
      category: 'NUTMEG',
      image: '/images/kinattukara-nutmeg-breed.jpg',
      caption: 'Distinct cultivars observed and recorded over 35 years of dedicated botanical research.',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Harvested Nutmeg Fruits with Mace',
      category: 'HARVEST',
      image: '/images/cta-nutmeg.jpg',
      caption: 'Freshly gathered harvest displaying thick flesh, lustrous scarlet aril, and inner woody seed.',
      aspect: 'aspect-[16/9]',
    },
  ];

  const categories = ['ALL', 'NUTMEG', 'NURSERY', 'HARVEST', 'SPICES'];

  const filteredItems = selectedCategory === 'ALL'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const activeIndex = activeLightbox
    ? filteredItems.findIndex((item) => item.title === activeLightbox.title)
    : -1;

  const handlePrevImage = () => {
    if (activeIndex > 0) {
      setActiveLightbox(filteredItems[activeIndex - 1]);
    } else if (filteredItems.length > 0) {
      setActiveLightbox(filteredItems[filteredItems.length - 1]);
    }
  };

  const handleNextImage = () => {
    if (activeIndex !== -1 && activeIndex < filteredItems.length - 1) {
      setActiveLightbox(filteredItems[activeIndex + 1]);
    } else if (filteredItems.length > 0) {
      setActiveLightbox(filteredItems[0]);
    }
  };

  useEffect(() => {
    if (!activeLightbox) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveLightbox(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightbox, activeIndex, filteredItems]);

  return (
    <div className="bg-[#071C14] text-[#F2F0E5] selection:bg-[#C4E85A] selection:text-[#071C14] min-h-screen">

      {/* ==================================================
          1. HERO HEADER SECTION
          - Dark forest-green background (#071C14)
          - Bold editorial headline matching homepage
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
            <span className="text-[#C4E85A]">VISUAL ARCHIVE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end justify-between">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C4E85A]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  KINATTUKARA VISUAL CHRONICLES
                </span>
              </div>

              <h1 className="font-display text-[42px] sm:text-[58px] lg:text-[76px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
                PLANTATION & <br />
                <span className="text-[#C4E85A]">NURSERY GALLERY.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-2xl">
                A visual journey through 35 years of horticultural heritage in Kerala — from shade-net propagation tunnels to mature nutmeg canopies, crimson mace curing, and traditional harvest traditions.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D8D9C9]/50 block">
                CURATED BOTANICAL ARCHIVE
              </span>
              <span className="font-display text-2xl font-bold text-[#C4E85A]">
                {galleryItems.length} ARCHIVAL PHOTOGRAPHS
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          2. FILTER BAR
          - Dark botanical pill navigation
         ================================================== */}
      <section className="py-6 bg-[#0B2419] border-b border-[#123D27]/40 sticky top-16 z-30 backdrop-blur-md bg-[#0B2419]/90">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 flex items-center justify-between overflow-x-auto gap-3 py-1">
          <div className="flex items-center gap-2 sm:gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#C4E85A] text-[#071C14] shadow-md'
                    : 'bg-[#123D27]/50 hover:bg-[#123D27] text-[#D8D9C9] border border-[#123D27]'
                }`}
              >
                {cat === 'ALL' ? 'ALL ARCHIVE' : cat}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono text-[#D8D9C9]/50 uppercase hidden md:inline tracking-wider">
            SHOWING {filteredItems.length} OF {galleryItems.length} IMAGES
          </span>
        </div>
      </section>

      {/* ==================================================
          3. GALLERY GRID
          - Editorial photo cards with refined hairline borders
          - Hover zoom + subtle dark vignette caption
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveLightbox(item)}
                className="group relative rounded-[14px] overflow-hidden bg-[#0B2419] border border-[#123D27] shadow-xl hover:border-[#C4E85A]/50 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Photo Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#04110C]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Subtle Top Category Stamp */}
                  <div className="absolute top-3 left-3 bg-[#071C14]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#123D27]/80">
                    <span className="font-display text-[10px] font-bold tracking-widest text-[#C4E85A] uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04110C]/90 via-[#04110C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-[#C4E85A] text-[#071C14] px-4 py-2 rounded-full font-display text-xs font-bold tracking-wider uppercase inline-flex items-center space-x-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-3.5 h-3.5" />
                      <span>VIEW FULL IMAGE</span>
                    </span>
                  </div>
                </div>

                {/* Editorial Caption Bar */}
                <div className="p-5 space-y-1.5 bg-[#0B2419] border-t border-[#123D27]/60 flex-1 flex flex-col justify-between">
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#F2F0E5] tracking-tight uppercase group-hover:text-[#C4E85A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#D8D9C9]/75 font-normal leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          4. BOTANICAL CTA — VISIT OUR ORCHARD & NURSERY
          - Dark forest-green background (#071C14)
          - Editorial button linking to /contact or /plants/nutmeg
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#0B2419] border-t border-[#123D27]/60 text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 space-y-6">
          <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
            EXPERIENCE KINATTUKARA IN PERSON
          </p>

          <h2 className="font-display text-[36px] sm:text-[50px] lg:text-[64px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
            SEE OUR NURSERY <br />
            <span className="text-[#C4E85A]">& ORCHARDS FIRSTHAND.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-xl mx-auto">
            Visitors, planters, and spice buyers are welcome to walk through our shade tunnels, inspect grafted cultivars, and consult directly on grove management.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center space-x-3 text-sm sm:text-base font-bold text-[#F2F0E5] tracking-wider uppercase hover:text-[#C4E85A] transition-colors"
            >
              <span>PLAN A NURSERY VISIT</span>
              <span className="w-9 h-9 rounded-full border border-[#D8D9C9]/30 flex items-center justify-center group-hover:border-[#C4E85A] group-hover:translate-x-1.5 transition-all">
                <ArrowRight className="w-4 h-4 text-[#C4E85A]" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. LIGHTBOX MODAL
          - Clean dark botanical modal
         ================================================== */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 bg-[#04110C]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fadeIn"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#071C14] border border-[#123D27] rounded-[16px] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#123D27] flex items-center justify-between bg-[#0B2419]">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-display text-[11px] font-bold tracking-widest text-[#C4E85A] uppercase block">
                    {activeLightbox.category} ARCHIVE
                  </span>
                  {activeIndex !== -1 && (
                    <span className="text-[10px] font-mono text-[#D8D9C9]/50">
                      [{activeIndex + 1} / {filteredItems.length}]
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#F2F0E5] tracking-tight uppercase">
                  {activeLightbox.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="hidden sm:inline-block text-[10px] font-mono text-[#D8D9C9]/40 tracking-wider">
                  USE ← → OR ESC
                </span>
                <button
                  type="button"
                  onClick={() => setActiveLightbox(null)}
                  className="p-2 rounded-full text-[#D8D9C9]/70 hover:text-[#C4E85A] hover:bg-[#123D27]/60 transition-colors cursor-pointer"
                  aria-label="Close image modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Image with Prev/Next Controls */}
            <div className="relative flex-1 overflow-auto bg-[#04110C] flex items-center justify-center p-2 sm:p-4 group/stage">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-2xl"
              />

              {/* Prev Button */}
              {filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#071C14]/80 hover:bg-[#123D27] text-[#F2F0E5] hover:text-[#C4E85A] border border-[#123D27] shadow-xl transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#071C14]/80 hover:bg-[#123D27] text-[#F2F0E5] hover:text-[#C4E85A] border border-[#123D27] shadow-xl transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#123D27] bg-[#0B2419] flex items-center justify-between">
              <p className="text-xs sm:text-sm text-[#D8D9C9] font-normal leading-relaxed">
                {activeLightbox.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
