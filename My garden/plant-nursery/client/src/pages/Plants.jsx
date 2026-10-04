import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams, useLocation, Link } from 'react-router-dom';
import { Search, MessageCircle, ArrowRight, X, ArrowLeft } from 'lucide-react';
import API from '../services/api';

export const Plants = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categorySlug } = useParams();
  const location = useLocation();
  const pathCategory = location.pathname.startsWith('/plants/') ? location.pathname.replace('/plants/', '') : null;
  const activeCategory = categorySlug || pathCategory || searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultPlants = [
    {
      id: 'n1',
      name: 'Grafted Nutmeg - Keralashree Variety',
      category: 'nutmeg',
      categoryName: 'Nutmeg Plants',
      description: 'High-yielding grafted sapling developed for thick crimson mace and bold aromatic nuts.',
      price: 350,
      image: '/images/cat-nutmeg.jpg',
      inStock: true,
      tag: 'Bestseller',
    },
    {
      id: 'n2',
      name: 'Viswashree Grafted Nutmeg Sapling',
      category: 'nutmeg',
      categoryName: 'Nutmeg Plants',
      description: 'Proven Kerala commercial cultivar with high essential oil content and early bearing.',
      price: 380,
      image: '/images/hero-nutmeg.jpg',
      inStock: true,
      tag: 'Premium',
    },
    {
      id: 's1',
      name: 'Panniyur-1 Black Pepper Vines',
      category: 'spices',
      categoryName: 'Spice Plants',
      description: 'Acclimated rooted cuttings with vigorous climbing habit and heavy spike fruit-setting.',
      price: 80,
      image: '/images/cat-spices.jpg',
      inStock: true,
      tag: 'Kerala Spice',
    },
    {
      id: 's2',
      name: 'Malabar Green Cardamom Seedlings',
      category: 'spices',
      categoryName: 'Spice Plants',
      description: 'Shade-loving aromatic spice plants with high capsule formation suitable for plantations.',
      price: 120,
      image: '/images/cat-spices.jpg',
      inStock: true,
      tag: 'Aromatic',
    },
    {
      id: 'f1',
      name: 'Vietnam Super Early Jackfruit (Grafted)',
      category: 'fruits',
      categoryName: 'Fruit Plants',
      description: 'Dwarf bearing grafted jackfruit yielding sweet golden flakes within 18 to 24 months.',
      price: 250,
      image: '/images/cat-fruits.jpg',
      inStock: true,
      tag: 'High Yield',
    },
    {
      id: 'f2',
      name: 'Alphonso Mango Grafted Sapling',
      category: 'fruits',
      categoryName: 'Fruit Plants',
      description: 'True-to-type mother branch grafted mango with fragrant pulp and compact garden canopy.',
      price: 220,
      image: '/images/cat-fruits.jpg',
      inStock: true,
      tag: 'Garden Favorite',
    },
    {
      id: 'o1',
      name: 'Exotic Tropical Heliconia & Cordyline',
      category: 'ornamental',
      categoryName: 'Ornamental Plants',
      description: 'Vibrant foliage and architectural blooms for luxury home landscapes and shade gardens.',
      price: 190,
      image: '/images/cat-ornamental.jpg',
      inStock: true,
      tag: 'Landscaping',
    },
    {
      id: 'n3',
      name: 'Budded Nutmeg (Kochukudy Type)',
      category: 'nutmeg',
      categoryName: 'Nutmeg Plants',
      description: 'Selected heavy-bearing scion wood grafted on hardy native rootstocks for Kerala climate.',
      price: 400,
      image: '/images/cta-nutmeg.jpg',
      inStock: true,
      tag: 'Specialist Choice',
    },
    {
      id: 'prop-skin-patch-bud',
      name: 'Skin / Patch Bud Nutmeg Plant',
      category: 'skin-patch-bud',
      parentCategory: 'nutmeg',
      categoryName: 'Skin / Patch Bud Nutmeg',
      description: 'Nutmeg plants propagated through skin or patch budding.',
      price: 350,
      image: '/images/propagation-skin-patch-bud.jpg',
      inStock: true,
      tag: 'Skin / Patch Bud',
    },
    {
      id: 'prop-crown-bud',
      name: 'Crown Bud Nutmeg Plant',
      category: 'crown-bud',
      parentCategory: 'nutmeg',
      categoryName: 'Crown Bud Nutmeg',
      description: 'Nutmeg plants produced using the crown budding method.',
      price: 350,
      image: '/images/propagation-crown-bud.jpg',
      inStock: true,
      tag: 'Crown Bud',
    },
    {
      id: 'prop-approach-grafting',
      name: 'Approach Grafted Nutmeg Plant',
      category: 'approach-grafting',
      parentCategory: 'nutmeg',
      categoryName: 'Approach Grafting Nutmeg',
      description: 'Nutmeg plants propagated through approach grafting.',
      price: 380,
      image: '/images/propagation-approach-grafting.jpg',
      inStock: true,
      tag: 'Approach Grafting',
    },
    {
      id: 'prop-appicotail-grafting',
      name: 'Appicotail Grafted Nutmeg Plant',
      category: 'appicotail-grafting',
      parentCategory: 'nutmeg',
      categoryName: 'Appicotail Grafting Nutmeg',
      description: 'Grafted nutmeg plants produced using the nursery’s appicotail grafting method.',
      price: 380,
      image: '/images/propagation-appicotail-grafting.jpg',
      inStock: true,
      tag: 'Appicotail Grafting',
    },
  ];

  const propagationMeta = {
    'skin-patch-bud': {
      title: 'Skin / Patch Bud Nutmeg Plants',
      subheading: 'Nutmeg plants propagated through skin or patch budding.',
      badge: 'PROPAGATION METHOD',
    },
    'crown-bud': {
      title: 'Crown Bud Nutmeg Plants',
      subheading: 'Nutmeg plants produced using the crown budding method.',
      badge: 'PROPAGATION METHOD',
    },
    'approach-grafting': {
      title: 'Approach Grafting Nutmeg Plants',
      subheading: 'Nutmeg plants propagated through approach grafting.',
      badge: 'PROPAGATION METHOD',
    },
    'appicotail-grafting': {
      title: 'Appicotail Grafting Nutmeg Plants',
      subheading: 'Grafted nutmeg plants produced using the nursery’s appicotail grafting method.',
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

        // Merge or fallback to defaultPlants
        let combined = [...fetchedList];
        defaultPlants.forEach(dp => {
          if (!combined.some(item => item.id === dp.id || item._id === dp.id)) {
            combined.push(dp);
          }
        });

        // Filter based on activeCategory
        let filtered = combined;
        if (activeCategory !== 'all') {
          if (isPropagationCategory) {
            filtered = filtered.filter(p => (p.category && p.category.toLowerCase() === activeCategory.toLowerCase()));
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
      } catch (err) {
        let filtered = defaultPlants;
        const isPropagationCategory = Boolean(propagationMeta[activeCategory]);
        if (activeCategory !== 'all') {
          if (isPropagationCategory) {
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

  const categories = [
    { label: 'All Plants', slug: 'all', link: '/plants' },
    { label: 'Nutmeg Plants', slug: 'nutmeg', link: '/plants/nutmeg' },
    { label: 'Spice Plants', slug: 'spices', link: '/plants/spices' },
    { label: 'Fruit Plants', slug: 'fruits', link: '/plants/fruits' },
    { label: 'Ornamental Plants', slug: 'ornamental', link: '/plants/ornamental' },
  ];

  const whatsappNumber = "919447312890";

  return (
    <div className="bg-[#F7F5EE] min-h-screen pt-6 sm:pt-8 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-[#647563] hover:text-[#163A24] uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <p className="text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase">
            {propagationMeta[activeCategory]?.badge || 'KINATTUKARA NURSERY COLLECTION'}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#0B2115] tracking-tight">
            {propagationMeta[activeCategory]?.title ||
             (activeCategory === 'nutmeg' ? 'Nutmeg Plants & Saplings' :
              activeCategory === 'spices' ? 'Kerala Spice Plants' :
              activeCategory === 'fruits' ? 'Tropical Fruit Saplings' :
              activeCategory === 'ornamental' ? 'Ornamental Garden Plants' :
              'All Plants & Nursery Saplings')}
          </h1>
          <p className="text-sm text-[#172018]/70 font-light leading-relaxed">
            {propagationMeta[activeCategory]?.subheading ||
             'Acclimated, grafted, and disease-resistant saplings nurtured with organic soil mixtures for optimal field performance.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 pb-6 border-b border-[#163A24]/10">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = (activeCategory === cat.slug) || (cat.slug === 'nutmeg' && Boolean(propagationMeta[activeCategory]));
                return (
                  <Link
                    key={cat.slug}
                    to={cat.link}
                    className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-[#163A24] text-[#F7F5EE]'
                        : 'bg-white text-[#172018]/70 hover:bg-[#163A24]/10 hover:text-[#0B2115] border border-[#163A24]/10'
                    }`}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search plants..."
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
              className="w-full bg-white text-xs text-[#0B2115] placeholder-[#647563]/60 pl-9 pr-4 py-2.5 rounded-full border border-[#163A24]/20 focus:outline-none focus:border-[#163A24]"
            />
            <Search className="w-3.5 h-3.5 text-[#647563] absolute left-3.5 top-3" />
            {currentSearch && (
              <button
                onClick={() => {
                  const p = new URLSearchParams(searchParams);
                  p.delete('search');
                  setSearchParams(p);
                }}
                className="absolute right-3 top-2.5 text-[#647563] hover:text-[#0B2115]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          </div>

          {/* Nutmeg Propagation Sub-categories */}
          {(activeCategory === 'nutmeg' || Boolean(propagationMeta[activeCategory])) && (
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none pt-1">
              <span className="text-[11px] font-semibold text-[#647563] uppercase tracking-wider shrink-0 mr-1">
                Propagation Methods:
              </span>
              {[
                { label: 'All Nutmeg', link: '/plants/nutmeg', slug: 'nutmeg' },
                { label: 'Skin / Patch Bud', link: '/plants/skin-patch-bud', slug: 'skin-patch-bud' },
                { label: 'Crown Bud', link: '/plants/crown-bud', slug: 'crown-bud' },
                { label: 'Approach Grafting', link: '/plants/approach-grafting', slug: 'approach-grafting' },
                { label: 'Appicotail Grafting', link: '/plants/appicotail-grafting', slug: 'appicotail-grafting' },
              ].map((tab) => {
                const isCurrent = activeCategory === tab.slug;
                return (
                  <Link
                    key={tab.slug}
                    to={tab.link}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all ${
                      isCurrent
                        ? 'bg-[#163A24] text-[#F7F5EE] shadow-sm font-semibold'
                        : 'bg-white text-[#172018]/80 hover:bg-[#163A24]/10 hover:text-[#0B2115] border border-[#163A24]/15'
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Plants Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-[#163A24]/5 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 space-y-4 bg-white/60 rounded-xl border border-[#163A24]/10">
            <h3 className="font-serif text-2xl text-[#0B2115]">No Plants Found</h3>
            <p className="text-xs text-[#647563]">Try adjusting your search query or switching categories.</p>
            <Link
              to="/plants"
              className="inline-block bg-[#163A24] text-[#F7F5EE] text-xs font-semibold px-6 py-2.5 rounded-full"
            >
              View All Plants
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((item) => {
              const image = item.image || (item.images && item.images[0]) || '/images/cat-nutmeg.jpg';
              const name = item.name;
              const desc = item.description;
              const price = item.salePrice || item.price;
              const waText = `Hello Kinattukara, I would like to inquire about purchasing: ${name} (₹${price}). Is this in stock for nursery pickup or delivery?`;
              const itemWaUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waText)}`;

              return (
                <div
                  key={item._id || item.id}
                  className="group flex flex-col justify-between space-y-4"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#EAE6DB]">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {item.tag && (
                      <span className="absolute top-3 left-3 bg-[#0B2115]/85 text-[#F7F5EE] text-[10px] font-medium tracking-wider px-2.5 py-0.5 rounded-full uppercase">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-2 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl text-[#0B2115] leading-snug group-hover:text-[#163A24] transition-colors">
                        {name}
                      </h3>
                      <p className="text-xs text-[#647563] font-light leading-relaxed mt-1 line-clamp-2">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#163A24]/10 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#0B2115]">
                        ₹{price} <span className="text-[11px] font-normal text-[#647563]">/ sapling</span>
                      </span>

                      <a
                        href={itemWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#163A24] hover:text-[#0B2115] bg-white px-3 py-1.5 rounded-full border border-[#163A24]/20 transition-all hover:border-[#163A24]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#4ade80]" />
                        <span>Enquire</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
