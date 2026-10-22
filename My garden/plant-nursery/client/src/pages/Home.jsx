import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles, Tag, Package, Check } from 'lucide-react';
import { useNursery } from '../context/NurseryContext';
import API from '../services/api';

export const Home = () => {
  const { nursery } = useNursery();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await API.get('/products?featured=true');
        if (res.data?.success && res.data?.data) {
          if (res.data.data.length > 0) {
            setFeaturedProducts(res.data.data.slice(0, 8));
          } else {
            // Fallback to top products if none marked featured yet
            const allRes = await API.get('/products');
            if (allRes.data?.success) {
              setFeaturedProducts(allRes.data.data.slice(0, 8));
            }
          }
        }
      } catch (err) {
        console.warn('Could not load featured products for homepage:', err);
      } finally {
        setLoadingFeatured(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="bg-[#071C14] text-[#F2F0E5] font-sans overflow-x-hidden selection:bg-[#C4E85A] selection:text-[#071C14]">
      
      {/* ==================================================
          1. HERO SECTION
          - Heading:
            "KINATTUKARA.
            A LEGACY OF
            NUTMEG."
          - "KINATTUKARA." → cream/off-white (#F2F0E5)
          - "A LEGACY OF" → lime/leaf green accent (#C4E85A)
          - "NUTMEG." → cream/off-white (#F2F0E5)
          - Right: Nutmeg hero image with smooth dark green gradient blend (customizable from backend)
         ================================================== */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center bg-[#071C14] overflow-hidden">
        
        {/* Ambient Dark Forest Lighting */}
        <div className="absolute inset-0 z-0 bg-radial from-[#123D27]/30 via-[#071C14] to-[#04110C] pointer-events-none" />

        {/* Right Side Botanical Hero Image (Dynamically from Backend Nursery Cover Image) */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] xl:w-[56%] z-0 pointer-events-none overflow-hidden flex items-center justify-end">
          <img
            src={nursery?.coverImage || "/images/hero-nutmeg.jpg"}
            alt={nursery?.name || "Kinattukara mature nutmeg fruit on branch with crimson mace"}
            className="w-full h-full object-cover object-center lg:object-right transform scale-100 lg:scale-[1.02] transition-transform duration-700"
            style={{
              filter: 'brightness(1.04) contrast(1.05) saturate(1.08)',
            }}
          />

          {/* Smooth Dark Green Gradient Blend from text toward image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071C14] via-[#071C14]/75 via-25% to-transparent to-55%" />

          {/* Soft bottom edge blend */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#071C14] to-transparent" />

          {/* Mobile top/ambient vignette for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#071C14]/85 via-[#071C14]/40 to-[#071C14]/90 lg:hidden" />
        </div>

        {/* Hero Left Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 w-full py-20 lg:py-28">
          <div className="max-w-2xl lg:max-w-xl space-y-6 lg:space-y-7">
            
            {/* Eyebrow Label */}
            <div className="inline-flex items-center space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-[#C4E85A]" />
              <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                KERALA'S TRUSTED NUTMEG NURSERY
              </p>
            </div>

            {/* Giant Modern Sans-serif Headline */}
            <h1 className="font-display text-[44px] sm:text-[64px] lg:text-[80px] xl:text-[92px] font-extrabold leading-[0.95] tracking-[-0.04em] uppercase">
              <span className="text-[#F2F0E5] block">KINATTUKARA</span>
              <span className="text-[#C4E85A] block">A LEGACY OF</span>
              <span className="text-[#F2F0E5] block">NUTMEG</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-[#D8D9C9] font-normal leading-relaxed max-w-lg">
              Quality nutmeg plants, nurtured with experience and care in Kerala.
            </p>

          </div>
        </div>

      </section>

      {/* ==================================================
          2. HOMEPAGE BRAND STORY AFTER HERO
          - Heading:
            "ROOTED IN KERALA.
            REFINED THROUGH
            EXPERIENCE."
          - "REFINED THROUGH" highlighted in lime accent
          - Clean editorial narrative with generous whitespace
          - Simple text link: "OUR STORY →" linking to /about
         ================================================== */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#071C14] border-t border-[#123D27]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase block">
                THE KINATTUKARA STORY
              </span>

              <h2 className="font-display text-[38px] sm:text-[50px] lg:text-[62px] xl:text-[68px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.035em] uppercase">
                ROOTED IN KERALA. <br />
                <span className="text-[#C4E85A]">REFINED THROUGH</span> <br />
                <span>EXPERIENCE.</span>
              </h2>

              <div className="space-y-4 pt-1">
                <p className="text-[#F2F0E5] text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
                  At Kinattukara, the cultivation of nutmeg is shaped by generations of knowledge, careful selection and an enduring respect for the land.
                </p>

                <p className="text-sm sm:text-base text-[#D8D9C9]/85 font-normal leading-relaxed">
                  From plantation to nursery, we nurture quality planting material with the care and expertise needed to help growers cultivate with confidence.
                </p>
              </div>

              <div className="pt-3">
                <Link
                  to="/about"
                  className="group inline-flex items-center space-x-2 text-xs sm:text-sm font-bold tracking-wider text-[#C4E85A] hover:text-[#F2F0E5] uppercase transition-colors"
                >
                  <span>OUR STORY</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Photo Column (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden shadow-2xl border border-[#123D27] group bg-[#0B2419]">
                <img
                  src="/images/about-nursery.jpg"
                  alt="Kinattukara shade net nursery rows and grafted saplings in Kerala"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110C]/85 via-transparent to-transparent p-5 flex items-end">
                  <span className="font-display text-[11px] font-bold tracking-wider text-[#C4E85A] uppercase">
                    KINATTUKARA NURSERY · KERALA
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          3. BRAND CREDIBILITY SECTION
          - 4 Minimal Items:
            "QUALITY PLANTING MATERIAL"
            "ACCREDITED NURSERY"
            "NUTMEG SPECIALISTS"
            "KERALA ROOTED"
          - Clean editorial dividers, zero fake claims
         ================================================== */}
      <section className="py-14 sm:py-16 bg-[#0B2419] border-t border-b border-[#123D27]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#123D27]/60">
            
            {/* 01 Quality Planting Material */}
            <div className="py-6 sm:py-4 lg:px-6 first:pl-0 space-y-2">
              <span className="font-mono text-xs font-bold text-[#C4E85A] tracking-wider uppercase block">
                01
              </span>
              <h3 className="font-display text-sm sm:text-base font-bold text-[#F2F0E5] uppercase tracking-wide">
                QUALITY PLANTING MATERIAL
              </h3>
              <p className="text-xs text-[#D8D9C9]/75 font-normal leading-relaxed">
                Grafted saplings selected from verified high-yielding mother branches.
              </p>
            </div>

            {/* 02 Accredited Nursery */}
            <div className="py-6 sm:py-4 lg:px-6 space-y-2">
              <span className="font-mono text-xs font-bold text-[#C4E85A] tracking-wider uppercase block">
                02
              </span>
              <h3 className="font-display text-sm sm:text-base font-bold text-[#F2F0E5] uppercase tracking-wide">
                ACCREDITED NURSERY
              </h3>
              <p className="text-xs text-[#D8D9C9]/75 font-normal leading-relaxed">
                ISO 9001:2000 quality management certification through ANAB.
              </p>
            </div>

            {/* 03 Nutmeg Specialists */}
            <div className="py-6 sm:py-4 lg:px-6 space-y-2">
              <span className="font-mono text-xs font-bold text-[#C4E85A] tracking-wider uppercase block">
                03
              </span>
              <h3 className="font-display text-sm sm:text-base font-bold text-[#F2F0E5] uppercase tracking-wide">
                NUTMEG SPECIALISTS
              </h3>
              <p className="text-xs text-[#D8D9C9]/75 font-normal leading-relaxed">
                Over 35 years of focused cultivar observation and grafting research.
              </p>
            </div>

            {/* 04 Kerala Rooted */}
            <div className="py-6 sm:py-4 lg:px-6 last:pr-0 space-y-2">
              <span className="font-mono text-xs font-bold text-[#C4E85A] tracking-wider uppercase block">
                04
              </span>
              <h3 className="font-display text-sm sm:text-base font-bold text-[#F2F0E5] uppercase tracking-wide">
                KERALA ROOTED
              </h3>
              <p className="text-xs text-[#D8D9C9]/75 font-normal leading-relaxed">
                Cultivated and acclimatized in the heart of Kerala's spice belt.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          3.5. DYNAMIC FEATURED SPECIMENS SECTION (Live from Backend)
          - Renders plants marked "featured: true" in Admin Catalog
          - Live updates when admin creates, edits, or uploads photos
         ================================================== */}
      <section className="py-20 sm:py-24 lg:py-28 bg-[#04110C] border-t border-[#123D27]/40 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#123D27]/50 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C4E85A] animate-pulse" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  LIVE NURSERY SPECIMENS
                </span>
              </div>
              <h2 className="font-display text-[34px] sm:text-[46px] lg:text-[54px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.035em] uppercase">
                FEATURED CULTIVARS & <br />
                <span className="text-[#C4E85A]">GRAFTED SAPLINGS.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#D8D9C9]/80 font-normal leading-relaxed">
                Handpicked mother-branch saplings acclimated and propagated at Kinattukara.
              </p>
            </div>

            <Link
              to="/plants"
              className="group inline-flex items-center space-x-2 text-xs sm:text-sm font-bold tracking-wider text-[#C4E85A] hover:text-[#F2F0E5] uppercase transition-colors shrink-0"
            >
              <span>EXPLORE ALL PLANTS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* Grid of Dynamic Featured Plants */}
          {loadingFeatured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="bg-[#0B2419]/60 border border-[#123D27] rounded-[16px] p-4 space-y-3 animate-pulse"
                >
                  <div className="aspect-[4/3] bg-[#123D27]/40 rounded-xl" />
                  <div className="h-4 bg-[#123D27]/50 rounded-sm w-3/4" />
                  <div className="h-3 bg-[#123D27]/30 rounded-sm w-1/2" />
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((prod) => {
                const imageSrc =
                  prod.images && prod.images.length > 0 && prod.images[0]
                    ? prod.images[0]
                    : '/images/hero-nutmeg.jpg';

                const categoryName =
                  typeof prod.category === 'object'
                    ? prod.category?.name
                    : 'Nutmeg Sapling';

                return (
                  <Link
                    key={prod._id || prod.slug}
                    to={`/plant/${prod.slug}`}
                    className="group bg-[#0B2419] hover:bg-[#0D2D1F] border border-[#123D27] hover:border-[#C4E85A]/50 rounded-[16px] overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview with Floating Badges */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#071C14]">
                        <img
                          src={imageSrc}
                          alt={prod.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = '/images/hero-nutmeg.jpg';
                          }}
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#C4E85A] bg-[#071C14]/85 px-2.5 py-1 rounded-full backdrop-blur-xs border border-[#123D27]">
                            {categoryName}
                          </span>
                          {prod.stockStatus === 'IN_STOCK' && (
                            <span className="text-[10px] font-mono text-[#D8D9C9] bg-[#071C14]/85 px-2 py-0.5 rounded-full backdrop-blur-xs border border-[#123D27]">
                              In Stock
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 space-y-2">
                        <h3 className="font-display text-base sm:text-lg font-bold text-[#F2F0E5] group-hover:text-[#C4E85A] transition-colors uppercase leading-tight line-clamp-1">
                          {prod.name}
                        </h3>

                        {prod.description && (
                          <p className="text-xs text-[#D8D9C9]/70 line-clamp-2 leading-relaxed">
                            {prod.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price and Action Footer */}
                    <div className="p-4 sm:p-5 pt-0 border-t border-[#123D27]/60 flex items-center justify-between">
                      <div className="flex items-baseline space-x-2">
                        {prod.salePrice ? (
                          <>
                            <span className="font-bold text-[#C4E85A] text-base">
                              ₹{prod.salePrice}
                            </span>
                            <span className="line-through text-[#8E9B8D] text-xs">
                              ₹{prod.price}
                            </span>
                          </>
                        ) : (
                          <span className="font-bold text-[#F2F0E5] text-base">
                            ₹{prod.price}
                          </span>
                        )}
                      </div>

                      <span className="inline-flex items-center space-x-1 text-xs font-bold text-[#C4E85A] group-hover:translate-x-0.5 transition-transform">
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-[#123D27] rounded-2xl bg-[#0B2419]/30">
              <Package className="w-8 h-8 text-[#C4E85A] mx-auto mb-2 opacity-70" />
              <p className="text-sm text-[#D8D9C9]">No specimens marked as featured yet.</p>
              <Link
                to="/plants"
                className="text-xs font-bold text-[#C4E85A] hover:underline mt-2 inline-block"
              >
                Browse catalog →
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* ==================================================
          4. NUTMEG FEATURE SECTION: "THE WORLD OF NUTMEG."
          - Heading: "THE WORLD OF NUTMEG."
          - Supporting copy: "Explore the varieties, planting material,
            cultivation knowledge and many uses of one of Kerala's
            most valuable spice crops."
          - 3 Clean Visual Links:
            1. NUTMEG VARIETIES → /plants/nutmeg
            2. USES OF NUTMEG → /uses-of-nutmeg
            3. PLANTING TIPS → /planting-tips
         ================================================== */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#071C14]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 space-y-12 sm:space-y-16">
          
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase block">
              PRIMARY COLLECTION
            </span>

            <h2 className="font-display text-[38px] sm:text-[54px] lg:text-[68px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
              THE WORLD OF NUTMEG.
            </h2>

            <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed">
              Explore the varieties, planting material, cultivation knowledge and many uses of one of Kerala's most valuable spice crops.
            </p>
          </div>

          {/* 3 Clean Visual Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            
            {/* Visual Link 1: NUTMEG VARIETIES */}
            <Link
              to="/plants/nutmeg"
              className="group space-y-4 block cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-[#0B2419] border border-[#123D27] shadow-xl">
                <img
                  src="/images/cat-nutmeg.jpg"
                  alt="Nutmeg varieties and grafted saplings at Kinattukara"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110C]/90 via-[#04110C]/20 to-transparent p-5 flex items-end">
                  <span className="font-mono text-xs font-bold text-[#C4E85A] uppercase tracking-wider">
                    CATALOGUE
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#F2F0E5] uppercase tracking-tight group-hover:text-[#C4E85A] transition-colors flex items-center justify-between">
                  <span>NUTMEG VARIETIES</span>
                  <ArrowRight className="w-4 h-4 text-[#C4E85A] group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs sm:text-sm text-[#D8D9C9]/80 font-normal leading-relaxed">
                  Explore the nutmeg varieties available through Kinattukara.
                </p>
              </div>
            </Link>

            {/* Visual Link 2: USES OF NUTMEG */}
            <Link
              to="/uses-of-nutmeg"
              className="group space-y-4 block cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-[#0B2419] border border-[#123D27] shadow-xl">
                <img
                  src="/images/nutmeg-many-uses.jpg"
                  alt="Many uses of nutmeg: mace arils, seed kernels, and essential oils"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110C]/90 via-[#04110C]/20 to-transparent p-5 flex items-end">
                  <span className="font-mono text-xs font-bold text-[#C4E85A] uppercase tracking-wider">
                    BOTANICAL YIELDS
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#F2F0E5] uppercase tracking-tight group-hover:text-[#C4E85A] transition-colors flex items-center justify-between">
                  <span>USES OF NUTMEG</span>
                  <ArrowRight className="w-4 h-4 text-[#C4E85A] group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs sm:text-sm text-[#D8D9C9]/80 font-normal leading-relaxed">
                  Discover the many applications of nutmeg and mace.
                </p>
              </div>
            </Link>

            {/* Visual Link 3: PLANTING TIPS */}
            <Link
              to="/planting-tips"
              className="group space-y-4 block cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-[#0B2419] border border-[#123D27] shadow-xl">
                <img
                  src="/images/nutmeg-planting-guidelines.jpg"
                  alt="Essential nutmeg planting guidelines and orchard care"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110C]/90 via-[#04110C]/20 to-transparent p-5 flex items-end">
                  <span className="font-mono text-xs font-bold text-[#C4E85A] uppercase tracking-wider">
                    CULTIVATION GUIDE
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#F2F0E5] uppercase tracking-tight group-hover:text-[#C4E85A] transition-colors flex items-center justify-between">
                  <span>PLANTING TIPS</span>
                  <ArrowRight className="w-4 h-4 text-[#C4E85A] group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs sm:text-sm text-[#D8D9C9]/80 font-normal leading-relaxed">
                  Learn the fundamentals of growing healthy nutmeg plants.
                </p>
              </div>
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
};
