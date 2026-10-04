import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams, useLocation, Link } from 'react-router-dom';
import { Search, MessageCircle, ArrowRight, X, ArrowLeft, Eye, Sparkles, Sprout, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';
import API from '../services/api';
import { useNursery } from '../context/NurseryContext';

export const Plants = () => {
  const { nursery } = useNursery();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categorySlug } = useParams();
  const location = useLocation();
  const pathCategory = location.pathname.startsWith('/plants/') ? location.pathname.replace('/plants/', '') : null;
  const activeCategory = categorySlug || pathCategory || searchParams.get('category') || 'nutmeg';
  const currentSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultPlants = [
    {
      id: 'n1',
      slug: 'grafted-nutmeg-keralashree',
      name: 'Grafted Nutmeg - Keralashree Variety',
      category: 'nutmeg',
      categoryName: 'Nutmeg Plants',
      description: 'Acclaimed commercial mother variety yielding heavy crimson mace and dense, high-oil aromatic seeds.',
      price: 350,
      image: '/images/cat-nutmeg.jpg',
      inStock: true,
      tag: 'Bestseller',
      propagationMethod: 'Skin / Patch Budding',
    },
    {
      id: 'n2',
      slug: 'viswashree-grafted-nutmeg',
      name: 'Viswashree Grafted Nutmeg Sapling',
      category: 'nutmeg',
      categoryName: 'Nutmeg Plants',
      description: 'Proven Kerala commercial cultivar with high essential oil content, early flowering, and disease resistance.',
      price: 380,
      image: '/images/hero-nutmeg.jpg',
      inStock: true,
      tag: 'Premium Cultivar',
      propagationMethod: 'Crown Budding',
    },
    {
      id: 'n3',
      slug: 'budded-nutmeg-kochukudy',
      name: 'Budded Nutmeg (Kochukudy Type)',
      category: 'nutmeg',
      categoryName: 'Nutmeg Plants',
      description: 'Selected heavy-bearing scion wood grafted on hardy native rootstocks optimized for South Indian monsoons.',
      price: 400,
      image: '/images/cta-nutmeg.jpg',
      inStock: true,
      tag: 'Specialist Choice',
      propagationMethod: 'Approach Grafting',
    },
    {
      id: 'prop-skin-patch-bud',
      slug: 'skin-patch-bud',
      name: 'Skin / Patch Bud Nutmeg Plant',
      category: 'skin-patch-bud',
      parentCategory: 'nutmeg',
      categoryName: 'Skin / Patch Bud Nutmeg',
      description: 'True-to-type mother scion united via precision patch budding for rapid vascular integration and early yield.',
      price: 350,
      image: '/images/propagation-skin-patch-bud.jpg',
      inStock: true,
      tag: 'Patch Budded',
      propagationMethod: 'Patch Budding',
    },
    {
      id: 'prop-crown-bud',
      slug: 'crown-bud',
      name: 'Crown Bud Nutmeg Plant',
      category: 'crown-bud',
      parentCategory: 'nutmeg',
      categoryName: 'Crown Bud Nutmeg',
      description: 'Superior terminal bud grafting producing symmetrical lateral branching and uniform canopy architecture.',
      price: 350,
      image: '/images/propagation-crown-bud.jpg',
      inStock: true,
      tag: 'Crown Budded',
      propagationMethod: 'Crown Budding',
    },
    {
      id: 'prop-approach-grafting',
      slug: 'approach-grafting',
      name: 'Approach Grafted Nutmeg Plant',
      category: 'approach-grafting',
      parentCategory: 'nutmeg',
      categoryName: 'Approach Grafting Nutmeg',
      description: 'Traditional inarch grafting ensuring maximum rootstock strength, drought resilience, and guaranteed sex determination.',
      price: 380,
      image: '/images/propagation-approach-grafting.jpg',
      inStock: true,
      tag: 'Approach Grafted',
      propagationMethod: 'Approach Grafting',
    },
    {
      id: 'prop-appicotail-grafting',
      slug: 'appicotail-grafting',
      name: 'Appicotail Grafted Nutmeg Plant',
      category: 'appicotail-grafting',
      parentCategory: 'nutmeg',
      categoryName: 'Appicotail Grafting Nutmeg',
      description: 'Specialized juvenile epicotyl grafting producing deeply rooted plants with robust taproot anchors.',
      price: 380,
      image: '/images/propagation-appicotail-grafting.jpg',
      inStock: true,
      tag: 'Epicotyl Grafted',
      propagationMethod: 'Epicotyl Grafting',
    },
    {
      id: 's1',
      name: 'Panniyur-1 Black Pepper Vines',
      category: 'spices',
      categoryName: 'Companion Spices',
      description: 'Acclimatized companion crop rooted for intercropping alongside nutmeg trunks and shade trees.',
      price: 80,
      image: '/images/cat-spices.jpg',
      inStock: true,
      tag: 'Companion Crop',
      propagationMethod: 'Rooted Cuttings',
    },
    {
      id: 's2',
      name: 'Malabar Green Cardamom Seedlings',
      category: 'spices',
      categoryName: 'Companion Spices',
      description: 'Shade-loving companion plants ideal for multi-tier microclimates beneath nutmeg canopies.',
      price: 120,
      image: '/images/cat-spices.jpg',
      inStock: true,
      tag: 'Shade Crop',
      propagationMethod: 'Rhizome Seedling',
    },
    {
      id: 'f1',
      name: 'Super Early Jackfruit (Grafted)',
      category: 'fruits',
      categoryName: 'Orchard Fruits',
      description: 'Compact orchard companion tree providing nurse shade and early auxiliary estate yield.',
      price: 250,
      image: '/images/cat-fruits.jpg',
      inStock: true,
      tag: 'Orchard Companion',
      propagationMethod: 'Grafted Sapling',
    },
  ];

  const propagationMeta = {
    'nutmeg': {
      title: 'Nutmeg Plants & Saplings',
      subheading: 'Certified high-yielding mother cultivars grafted from verified 35-year mother trees in Thrissur, Kerala.',
      badge: 'KINATTUKARA NUTMEG COLLECTION',
    },
    'skin-patch-bud': {
      title: 'Skin / Patch Bud Nutmeg Plants',
      subheading: 'High graft-take saplings propagated through precision skin and patch budding for robust vascular fusion.',
      badge: 'PROPAGATION METHOD',
    },
    'crown-bud': {
      title: 'Crown Bud Nutmeg Plants',
      subheading: 'Terminal crown-budded saplings designed for balanced lateral branch symmetry and accelerated canopy formation.',
      badge: 'PROPAGATION METHOD',
    },
    'approach-grafting': {
      title: 'Approach Grafted Nutmeg Plants',
      subheading: 'Time-tested inarch approach grafting delivering exceptional shock resistance and lifetime orchard stability.',
      badge: 'PROPAGATION METHOD',
    },
    'appicotail-grafting': {
      title: 'Appicotail (Epicotyl) Grafted Nutmeg',
      subheading: 'Juvenile epicotyl grafting producing taproot-strong saplings optimized for deep tropical soils.',
      badge: 'PROPAGATION METHOD',
    },
  };

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const isPropagationCategory = Boolean(propagationMeta[activeCategory]);
        const queryParts = [];
        if (currentSearch) queryParts.push(`search=${encodeURIComponent(currentSearch)}`);
        const catFilter = activeCategory !== 'all' ? (isPropagationCategory ? 'nutmeg' : activeCategory) : '';
        if (catFilter) queryParts.push(`category=${encodeURIComponent(catFilter)}`);

        const queryString = queryParts.length ? `?${queryParts.join('&')}` : '';
        const res = await API.get(`/products${queryString}`);
        
        let fetchedList = [];
        if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          fetchedList = res.data.data;
        }

        let combined = [...fetchedList];
        defaultPlants.forEach(dp => {
          if (!combined.some(item => item.id === dp.id || item._id === dp.id)) {
            combined.push(dp);
          }
        });

        let filtered = combined;
        if (activeCategory !== 'all') {
          if (isPropagationCategory && activeCategory !== 'nutmeg') {
            filtered = filtered.filter(p => (p.category && p.category.toLowerCase() === activeCategory.toLowerCase()));
          } else if (activeCategory.toLowerCase() === 'nutmeg') {
            filtered = filtered.filter(p => (p.category && p.category.toLowerCase() === 'nutmeg') || p.parentCategory === 'nutmeg' || !p.category);
          } else {
            filtered = filtered.filter(p => p.category && p.category.toLowerCase() === activeCategory.toLowerCase());
          }
        }

        if (currentSearch) {
          filtered = filtered.filter(p => 
            (p.name && p.name.toLowerCase().includes(currentSearch.toLowerCase())) ||
            (p.description && p.description.toLowerCase().includes(currentSearch.toLowerCase()))
          );
        }
        setProducts(filtered);
      } catch (err) {
        let filtered = defaultPlants;
        const isPropagationCategory = Boolean(propagationMeta[activeCategory]);
        if (activeCategory !== 'all') {
          if (isPropagationCategory && activeCategory !== 'nutmeg') {
            filtered = filtered.filter(p => p.category && p.category.toLowerCase() === activeCategory.toLowerCase());
          } else if (activeCategory.toLowerCase() === 'nutmeg') {
            filtered = filtered.filter(p => (p.category && p.category.toLowerCase() === 'nutmeg') || p.parentCategory === 'nutmeg');
          } else {
            filtered = filtered.filter(p => p.category && p.category.toLowerCase() === activeCategory.toLowerCase());
          }
        }
        if (currentSearch) {
          filtered = filtered.filter(p => 
            (p.name && p.name.toLowerCase().includes(currentSearch.toLowerCase())) ||
            (p.description && p.description.toLowerCase().includes(currentSearch.toLowerCase()))
          );
        }
        setProducts(filtered);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [currentSearch, activeCategory]);

  const rawPhone = nursery?.whatsapp || nursery?.phone || "919447312890";
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');

  const propagationTabs = [
    { label: 'All Nutmeg', link: '/plants/nutmeg', slug: 'nutmeg' },
    { label: 'Skin / Patch Bud', link: '/plants/skin-patch-bud', slug: 'skin-patch-bud' },
    { label: 'Crown Bud', link: '/plants/crown-bud', slug: 'crown-bud' },
    { label: 'Approach Grafting', link: '/plants/approach-grafting', slug: 'approach-grafting' },
    { label: 'Appicotail Grafting', link: '/plants/appicotail-grafting', slug: 'appicotail-grafting' },
  ];

  return (
    <div className="bg-[#071C14] text-[#F2F0E5] selection:bg-[#C4E85A] selection:text-[#071C14] min-h-screen">

      {/* ==================================================
          1. HERO HEADER SECTION
          - Dark forest-green background (#071C14)
          - Large bold typography matching homepage
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
            <span className="text-[#C4E85A]">NUTMEG CATALOGUE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end justify-between">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C4E85A]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  {propagationMeta[activeCategory]?.badge || 'KINATTUKARA BOTANICAL NURSERY'}
                </span>
              </div>

              <h1 className="font-display text-[40px] sm:text-[56px] lg:text-[72px] xl:text-[80px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
                {propagationMeta[activeCategory]?.title ? (
                  <>
                    {propagationMeta[activeCategory].title.toUpperCase()}
                  </>
                ) : (
                  <>
                    NUTMEG PLANTS & <br />
                    <span className="text-[#C4E85A]">GRAFTED SAPLINGS.</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-2xl">
                {propagationMeta[activeCategory]?.subheading ||
                  'Certified, true-to-type mother branch grafted saplings developed from 35 years of dedicated horticultural selection in Kerala.'}
              </p>
            </div>

            {/* Quick Search Box */}
            <div className="lg:col-span-4 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search nutmeg varieties..."
                  value={currentSearch}
                  onChange={(e) => {
                    const p = new URLSearchParams(searchParams);
                    if (e.target.value) {
                      p.set('search', e.target.value);
                    } else {
                      p.delete('search');
                    }
                    setSearchParams(p);
                  }}
                  className="w-full bg-[#0B2419] text-xs text-[#F2F0E5] placeholder-[#D8D9C9]/40 pl-10 pr-10 py-3.5 rounded-full border border-[#123D27] focus:outline-none focus:border-[#C4E85A] transition-colors"
                />
                <Search className="w-4 h-4 text-[#C4E85A] absolute left-3.5 top-3.5" />
                {currentSearch && (
                  <button
                    type="button"
                    onClick={() => {
                      const p = new URLSearchParams(searchParams);
                      p.delete('search');
                      setSearchParams(p);
                    }}
                    className="absolute right-3.5 top-3.5 text-[#D8D9C9]/60 hover:text-[#C4E85A]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          2. STICKY PROPAGATION TABS BAR
          - Dark botanical pill navigation
         ================================================== */}
      <section className="py-4 sm:py-5 bg-[#0B2419] border-b border-[#123D27]/40 sticky top-16 z-30 backdrop-blur-md bg-[#0B2419]/90">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 flex items-center justify-between overflow-x-auto gap-3 py-1 scrollbar-none">
          
          <div className="flex items-center space-x-2 shrink-0">
            <span className="font-mono text-xs text-[#D8D9C9]/50 uppercase tracking-widest mr-1 hidden sm:inline">
              METHOD:
            </span>
            {propagationTabs.map((tab) => {
              const isSelected = activeCategory === tab.slug;
              return (
                <Link
                  key={tab.slug}
                  to={tab.link}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#C4E85A] text-[#071C14] shadow-md'
                      : 'bg-[#123D27]/50 hover:bg-[#123D27] text-[#D8D9C9] border border-[#123D27]'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          <span className="text-[11px] font-mono text-[#D8D9C9]/60 uppercase hidden lg:inline tracking-wider shrink-0">
            {products.length} VARIETIES IN STOCK
          </span>

        </div>
      </section>

      {/* ==================================================
          3. PLANT CATALOGUE GRID (WARM CREAM EDITORIAL)
          - Background: #F2F0E5
          - Dark green typography: #071C14
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F2F0E5] text-[#071C14] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 space-y-12">
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-96 bg-[#071C14]/5 animate-pulse rounded-[16px]"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 space-y-5 bg-white/70 rounded-[16px] border border-[#123D27]/15 max-w-xl mx-auto p-8 shadow-sm">
              <Sprout className="w-12 h-12 text-[#084F09] mx-auto stroke-[1.5]" />
              <h3 className="font-display text-2xl font-bold text-[#071C14] uppercase">
                No Nutmeg Varieties Found
              </h3>
              <p className="text-xs sm:text-sm text-[#172018]/70 leading-relaxed">
                We couldn't find matches for your search. Try resetting your filter or explore our full nutmeg nursery collection.
              </p>
              <div className="pt-2">
                <Link
                  to="/plants/nutmeg"
                  onClick={() => setSearchParams({})}
                  className="inline-block px-7 py-3 rounded-full bg-[#071C14] text-[#F2F0E5] text-xs font-bold uppercase tracking-wider hover:bg-[#084F09] transition-colors"
                >
                  View All Nutmeg Plants
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 lg:gap-8">
              {products.map((item) => {
                const image = item.image || (item.images && item.images[0]) || '/images/cat-nutmeg.jpg';
                const name = item.name;
                const desc = item.description;
                const price = item.salePrice || item.price;
                const itemSlug = item.slug || item.id || `plant-${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`;
                const waText = `Hello Kinattukara Nursery, I would like to inquire about purchasing: ${name} (₹${price}). Is this in stock for plantation dispatch or nursery pickup?`;
                const itemWaUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`;

                return (
                  <div
                    key={item._id || item.id}
                    className="group flex flex-col justify-between rounded-[16px] overflow-hidden bg-white border border-[#123D27]/15 shadow-sm hover:shadow-xl hover:border-[#084F09]/40 transition-all duration-300"
                  >
                    {/* Plant Photo */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#E2DFD2]">
                      <Link to={`/plant/${itemSlug}`} className="block w-full h-full">
                        <img
                          src={image}
                          alt={name}
                          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </Link>

                      {/* Tag Badge */}
                      {item.tag && (
                        <div className="absolute top-3 left-3 bg-[#071C14]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                          <span className="font-display text-[10px] font-bold tracking-widest text-[#C4E85A] uppercase">
                            {item.tag}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {item.propagationMethod && (
                          <span className="font-mono text-[10px] font-semibold text-[#084F09] uppercase tracking-wider block">
                            {item.propagationMethod}
                          </span>
                        )}
                        <Link to={`/plant/${itemSlug}`} className="block">
                          <h3 className="font-display text-lg font-bold text-[#071C14] leading-snug uppercase group-hover:text-[#084F09] transition-colors">
                            {name}
                          </h3>
                        </Link>
                        <p className="text-xs text-[#172018]/75 font-normal leading-relaxed line-clamp-2">
                          {desc}
                        </p>
                      </div>

                      {/* Pricing & Actions */}
                      <div className="pt-3 border-t border-[#123D27]/10 space-y-3">
                        <div className="flex items-baseline justify-between">
                          <span className="font-display text-xl font-extrabold text-[#071C14]">
                            ₹{price}
                            <span className="text-[11px] font-normal text-[#172018]/60 font-sans ml-1">/ sapling</span>
                          </span>
                          <span className="text-[11px] font-mono text-[#084F09] font-bold uppercase">
                            VERIFIED GRAFT
                          </span>
                        </div>

                        {/* Dual Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <a
                            href={itemWaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-full bg-[#084F09] hover:bg-[#053806] text-[#F2F0E5] text-[11px] font-bold uppercase tracking-wider transition-colors shadow-sm"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-[#C4E85A]" />
                            <span>INQUIRE</span>
                          </a>

                          <Link
                            to={`/plant/${itemSlug}`}
                            className="inline-flex items-center justify-center space-x-1 py-2.5 px-3 rounded-full border border-[#123D27]/30 hover:border-[#071C14] text-[#071C14] hover:bg-[#071C14] hover:text-[#F2F0E5] text-[11px] font-bold uppercase tracking-wider transition-colors"
                          >
                            <span>DETAILS</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ==================================================
          4. BOTANICAL RESEARCH & CULTIVAR STANDARDS
          - Dark deep green (#0B2419)
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#0B2419] border-t border-[#123D27]/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase block">
                35 YEARS OF MOTHER SCION SELECTION
              </span>
              <h2 className="font-display text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.03em] uppercase">
                WHY KINATTUKARA <br />
                <span className="text-[#C4E85A]">GRAFTS EXCEL.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#D8D9C9] font-normal leading-relaxed">
                Seed-propagated nutmeg trees present a 50% risk of wild unproductive males and erratic fruit characteristics. Kinattukara nursery eliminates this uncertainty by grafting exclusively from observed, high-yielding mother branches with verified mace thickness and oil concentration.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#071C14] border border-[#123D27] space-y-1">
                  <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                    100% SEX ASSURANCE
                  </span>
                  <p className="text-xs text-[#D8D9C9]/75 leading-relaxed">
                    Every bearing graft is guaranteed female, paired systematically with budded pollinator males.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#071C14] border border-[#123D27] space-y-1">
                  <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                    EARLY COMMENCEMENT
                  </span>
                  <p className="text-xs text-[#D8D9C9]/75 leading-relaxed">
                    Initial flowering occurs within 30 to 36 months, reaching commercial maturity by year 5.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden bg-[#071C14] border border-[#123D27] shadow-2xl">
                <img
                  src="/images/kinattukara-nutmeg-breed.jpg"
                  alt="Nutmeg cultivar observations recorded over 35 years at Kinattukara"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110C]/90 via-transparent to-transparent p-6 flex items-end">
                  <div>
                    <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                      HERITAGE BREED SELECTION
                    </span>
                    <p className="text-xs text-[#F2F0E5]/80 font-normal">
                      Over 55 seedling breeds evaluated to identify top performers for South Indian tropical soils.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          5. BOTTOM BOTANICAL CTA
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#071C14] border-t border-[#123D27]/60 text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 space-y-6">
          <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
            ESTATE PLANNING & BULK DISPATCH
          </p>

          <h2 className="font-display text-[36px] sm:text-[50px] lg:text-[64px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
            PLAN YOUR GROVE WITH <br />
            <span className="text-[#C4E85A]">KINATTUKARA EXPERTS.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-xl mx-auto">
            Get personalized advice on the best propagation method, spacing, and certified sapling volume for your land.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                'Hello Kinattukara Nursery, I would like to consult with your team on selecting the best nutmeg grafted varieties for our estate.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-3 bg-[#C4E85A] hover:bg-[#d4f570] text-[#071C14] px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-4 h-4 text-[#071C14]" />
              <span>CONSULT ON WHATSAPP</span>
            </a>

            <Link
              to="/planting-tips"
              className="inline-flex items-center justify-center space-x-2 border border-[#F2F0E5]/30 hover:border-[#C4E85A] hover:text-[#C4E85A] text-[#F2F0E5] px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors"
            >
              <span>VIEW PLANTING TIPS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
