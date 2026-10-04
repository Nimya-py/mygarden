import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Sprout,
  ArrowUpRight,
  Star,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';
import API from '../services/api';

export const Home = () => {
  const mapUrl = "https://maps.google.com/?q=Kinattukara+Nutmeg+Plantation+and+Nursery+Kerala";

  const defaultTestimonials = [
    {
      _id: 'default-1',
      name: 'Mr. Anto Nadumadam',
      place: 'Chemmalamattam',
      district: 'Kottayam District',
      phone: '94478619110',
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
        'Outstanding vigor and heavy mace yield across our 10-acre estate. Their guidance and sapling quality have exceeded our expectations.',
    },
  ];

  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await API.get('/testimonials');
        if (res.data?.success && res.data?.data?.length > 0) {
          setTestimonials(res.data.data.slice(0, 2));
        }
      } catch (err) {}
    };
    fetchTestimonials();
  }, []);

  // Nutmeg Plant Propagation Categories - 4 cards based on Kinattukara Nursery's propagation methods
  const nutmegPropagationMethods = [
    {
      name: 'SKIN / PATCH BUD',
      description: 'Nutmeg plants propagated through skin or patch budding.',
      image: '/images/propagation-skin-patch-bud.jpg',
      link: '/plants/skin-patch-bud',
    },
    {
      name: 'CROWN BUD',
      description: 'Nutmeg plants produced using the crown budding method.',
      image: '/images/propagation-crown-bud.jpg',
      link: '/plants/crown-bud',
    },
    {
      name: 'APPROACH GRAFTING',
      description: 'Nutmeg plants propagated through approach grafting.',
      image: '/images/propagation-approach-grafting.jpg',
      link: '/plants/approach-grafting',
    },
    {
      name: 'APPICOTAIL GRAFTING',
      description: 'Grafted nutmeg plants produced using the nursery’s appicotail grafting method.',
      image: '/images/propagation-appicotail-grafting.jpg',
      link: '/plants/appicotail-grafting',
    },
  ];

  return (
    <div className="bg-[#F7F5EE] text-[#172018]">
      
      {/* ==================================================
          2. HERO SECTION
          Large high-quality nutmeg banner with dark gradient overlay,
          compact and premium editorial typography.
         ================================================== */}
      <section className="relative min-h-[65vh] lg:min-h-[72vh] flex items-center overflow-hidden">
        {/* Background Image: User's Uploaded Banner */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-nutmeg.jpg"
            alt="Kinattukara Nutmeg on tree with red mace"
            className="w-full h-full object-cover object-center"
          />
          {/* Directional gradient: Deep dark tone on the left for text contrast, fading out completely on the right so the nutmeg fruit and mace stay naturally vivid and visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2115]/92 via-[#0B2115]/60 via-45% to-transparent to-70%"></div>
          {/* Subtle mobile top gradient for small-screen title readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B2115]/60 via-transparent to-transparent sm:hidden"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20 w-full">
          <div className="max-w-2xl space-y-4 sm:space-y-5">
            
            {/* Small Eyebrow */}
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#A7C2A6] uppercase">
              KERALA'S TRUSTED NUTMEG NURSERY
            </p>

            {/* Main Heading */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#F7F5EE] leading-[1.14] tracking-tight">
              A Tradition of Growing. <br />
              <span className="italic font-light text-[#E5DFD1]">A Legacy of Nutmeg.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-[#F7F5EE]/85 font-light leading-relaxed max-w-xl">
              Quality nutmeg plants, nurtured with experience and care.
            </p>

            {/* Primary Button */}
            <div className="pt-2">
              <Link
                to="/plants/nutmeg"
                className="inline-flex items-center space-x-3 bg-[#F7F5EE] text-[#0B2115] hover:bg-[#FFFFFF] px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-md"
              >
                <span>Explore Nutmeg Plants</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. ABOUT KINATTUKARA NURSERY SECTION (Directly below Hero)
          Split layout:
          Left: Heritage narrative and 4 small minimal trust points.
          Right: Large professional photograph of nursery rows.
         ================================================== */}
      <section className="py-12 sm:py-16 bg-[#F7F5EE] border-b border-[#163A24]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Container: Text and Trust Points */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <div className="space-y-2.5">
                <p className="text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase">
                  ABOUT KINATTUKARA
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0B2115] leading-[1.18] tracking-tight">
                  A Legacy in <br />
                  Nutmeg Cultivation
                </h2>
                <p className="text-sm sm:text-base text-[#172018]/80 font-light leading-relaxed pt-1">
                  Kinattukara Nutmeg Nursery is an ancestral agricultural business founded 35 years ago by Mr. K.T. Mathew and his son Mr. Arun Mathew. Known for proprietary research across 55 seed breeds and our ISO 9001:2000 accredited nursery, we provide elite high-oleoresin nutmeg saplings and lifelong guidance to farmers.
                </p>
              </div>

              {/* 4 Trust Points with Simple Line Icons */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-5 pt-3 border-t border-[#163A24]/10">
                <div className="flex items-center space-x-2.5">
                  <Award className="w-4 h-4 text-[#163A24] stroke-[1.5] shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-[#0B2115]">
                    35+ Years Experience
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Users className="w-4 h-4 text-[#163A24] stroke-[1.5] shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-[#0B2115]">
                    55 Breeds Researched
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#163A24] stroke-[1.5] shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-[#0B2115]">
                    ISO 9001:2000 Certified
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Sprout className="w-4 h-4 text-[#163A24] stroke-[1.5] shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-[#0B2115]">
                    All-India & Global Reach
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2.5 bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow"
                >
                  <span>LEARN MORE ABOUT OUR HERITAGE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Container: Professional Photograph */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-[#163A24]/10">
                <img
                  src="/images/about-nursery.jpg"
                  alt="Kinattukara Nutmeg Nursery Rows with healthy saplings in Kerala"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          3. USES OF NUTMEG PREVIEW
          "THE MANY USES OF NUTMEG"
          3 editorial visual cards + CTA to /uses-of-nutmeg
         ================================================== */}
      <section className="py-12 sm:py-16 bg-[#FFFFFF]/70 border-b border-[#163A24]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8 sm:space-y-10">
          
          {/* Section Header */}
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase">
              APPLICATIONS & HERITAGE
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0B2115] tracking-tight">
              THE MANY USES OF NUTMEG
            </h2>
            <p className="text-sm sm:text-base text-[#647563] font-light leading-relaxed">
              Discover the different ways nutmeg is valued, from culinary preparations to aromatic applications.
            </p>
          </div>

          {/* 3 Premium Visual Cards: 3 cols desktop, 2 cols tablet, 1 col mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Culinary Uses */}
            <Link
              to="/uses-of-nutmeg#culinary"
              className="group block space-y-3"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#EAE6DB] shadow-sm">
                <img
                  src="/images/nutmeg-pickle.jpg"
                  alt="Culinary Uses - Young nutmeg pickle in traditional Kerala jar"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>

              <div className="space-y-2 pt-1">
                <h3 className="font-serif text-xl sm:text-2xl text-[#0B2115] group-hover:text-[#163A24] transition-colors leading-snug">
                  CULINARY USES
                </h3>
                <p className="text-xs text-[#647563] font-light leading-relaxed line-clamp-2 h-9 sm:h-10">
                  Young and mature nutmeg fruit is traditionally crafted into pickles, beverages, and seasonal chutneys.
                </p>
                <div className="pt-0.5 flex items-center text-xs font-semibold text-[#163A24] group-hover:text-[#0B2115] transition-colors">
                  <span className="underline underline-offset-4 decoration-[#163A24]/30 group-hover:decoration-[#163A24]">Click More</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Card 2: Mace */}
            <Link
              to="/uses-of-nutmeg#mace"
              className="group block space-y-3"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#EAE6DB] shadow-sm">
                <img
                  src="/images/nutmeg-mace.jpg"
                  alt="Mace - Bright crimson aril surrounding the nutmeg seed"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>

              <div className="space-y-2 pt-1">
                <h3 className="font-serif text-xl sm:text-2xl text-[#0B2115] group-hover:text-[#163A24] transition-colors leading-snug">
                  MACE
                </h3>
                <p className="text-xs text-[#647563] font-light leading-relaxed line-clamp-2 h-9 sm:h-10">
                  Prized crimson aril surrounding the seed, valued worldwide as a premium spice and flavoring.
                </p>
                <div className="pt-0.5 flex items-center text-xs font-semibold text-[#163A24] group-hover:text-[#0B2115] transition-colors">
                  <span className="underline underline-offset-4 decoration-[#163A24]/30 group-hover:decoration-[#163A24]">Click More</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Card 3: Nutmeg Oil */}
            <Link
              to="/uses-of-nutmeg#oil"
              className="group block space-y-3 sm:col-span-2 lg:col-span-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#EAE6DB] shadow-sm">
                <img
                  src="/images/nutmeg-oil.jpg"
                  alt="Nutmeg Oil - Realistic glass bottle with cork and whole nutmegs"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>

              <div className="space-y-2 pt-1">
                <h3 className="font-serif text-xl sm:text-2xl text-[#0B2115] group-hover:text-[#163A24] transition-colors leading-snug">
                  NUTMEG OIL
                </h3>
                <p className="text-xs text-[#647563] font-light leading-relaxed line-clamp-2 h-9 sm:h-10">
                  Pure aromatic oil extracted from seed and mace, widely used in oleoresins, perfumes, and cosmetics.
                </p>
                <div className="pt-0.5 flex items-center text-xs font-semibold text-[#163A24] group-hover:text-[#0B2115] transition-colors">
                  <span className="underline underline-offset-4 decoration-[#163A24]/30 group-hover:decoration-[#163A24]">Click More</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom CTA Button */}
          <div className="pt-2 sm:pt-3 text-center">
            <Link
              to="/uses-of-nutmeg"
              className="inline-flex items-center space-x-2 bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 shadow hover:shadow-md"
            >
              <span>EXPLORE ALL USES</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </section>

      {/* ==================================================
          4. NUTMEG PROPAGATION CATEGORIES
          Clean, spacious 4-card showcase based on Kinattukara Nursery's
          actual propagation methods.
         ================================================== */}
      <section className="pt-10 sm:pt-14 pb-8 sm:pb-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mb-6 sm:mb-8 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0B2115] tracking-tight">
            EXPLORE OUR NUTMEG PLANTS
          </h2>
          <p className="text-sm sm:text-base text-[#647563] font-light leading-relaxed max-w-2xl">
            Different propagation methods for healthy nutmeg plants
          </p>
        </div>

        {/* 4 Clean Cards: 4 cols on desktop, 2 cols on tablet, 1 col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {nutmegPropagationMethods.map((method) => (
            <div
              key={method.name}
              className="space-y-3"
            >
              {/* Large Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#EAE6DB] shadow-sm">
                <img
                  src={method.image}
                  alt={method.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Information: title -> short description */}
              <div className="space-y-1.5 pt-1">
                <h3 className="font-serif text-lg sm:text-xl text-[#0B2115] leading-snug">
                  {method.name}
                </h3>
                <p className="text-xs text-[#647563] font-light leading-relaxed">
                  {method.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          PLANTING TIPS COMPACT PREVIEW
         ================================================== */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-8 sm:pb-10">
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#163A24]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4 sm:space-x-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#EAE6DB] shrink-0 border border-[#163A24]/10 shadow-sm">
              <img
                src="/images/nutmeg-planting-sapling.jpg"
                alt="Grower holding nutmeg sapling and harvest"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#647563] uppercase">
                PLANTING TIPS & CULTIVATION GUIDE
              </p>
              <h3 className="font-serif text-xl sm:text-2xl text-[#0B2115]">
                Planting Tips & Guidelines
              </h3>
              <p className="text-xs sm:text-sm text-[#647563] font-light leading-relaxed">
                Quick guidelines on pit preparation, 28 ft spacing, seasonal care, and harvest yield.
              </p>
            </div>
          </div>

          <Link
            to="/planting-tips"
            className="inline-flex items-center space-x-2 bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 shadow shrink-0 self-start md:self-center"
          >
            <span>VIEW ALL PLANTING TIPS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ==================================================
          6. GROWER STORIES SECTION
          Real cultivation experiences from farmers growing Kinattukara nutmeg plants
         ================================================== */}
      <section className="pt-2 pb-12 sm:pb-16 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs sm:text-[13px] font-semibold tracking-[0.22em] text-[#647563] uppercase">
              GROWER EXPERIENCES & SUCCESS STORIES
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#0B2115] tracking-tight leading-tight">
              Grower Stories
            </h2>
            <p className="text-sm sm:text-base text-[#647563] font-light leading-relaxed max-w-2xl">
              Real cultivation experiences from farmers growing Kinattukara nutmeg plants.
            </p>
          </div>

          <Link
            to="/awards#testimonials"
            className="inline-flex items-center space-x-2 bg-transparent hover:bg-[#163A24]/5 text-[#163A24] border border-[#163A24]/20 hover:border-[#163A24] px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all shrink-0 self-start sm:self-end group"
          >
            <span>View All Grower Stories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 2 Grower Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.slice(0, 2).map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#163A24]/10 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3.5">
                {/* Subtle Grower Story Label */}
                <div className="flex items-center">
                  <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#163A24] bg-[#F7F5EE] px-3 py-1 rounded-full border border-[#163A24]/10">
                    Grower Story
                  </span>
                </div>

                {/* Grower Name & Location */}
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#0B2115] leading-snug">
                    {t.name}
                  </h3>
                  {[t.place, t.district?.replace(/\s*District/i, '').trim()].filter(Boolean).length > 0 && (
                    <p className="text-xs sm:text-sm text-[#647563] font-light flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#163A24] shrink-0" />
                      <span>{[t.place, t.district?.replace(/\s*District/i, '').trim()].filter(Boolean).join(', ')}</span>
                    </p>
                  )}
                </div>

                {/* Cultivation Metadata Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs">
                  {t.cultivation && (
                    <span className="inline-flex items-center space-x-1.5 bg-[#F7F5EE] text-[#163A24] px-3 py-1 rounded-md text-xs font-normal border border-[#163A24]/5">
                      <span>🌱</span>
                      <span>{t.cultivation}</span>
                    </span>
                  )}
                  {t.plantationAge && (
                    <span className="inline-flex items-center space-x-1.5 bg-[#F7F5EE] text-[#163A24] px-3 py-1 rounded-md text-xs font-normal border border-[#163A24]/5">
                      <span>📅</span>
                      <span>{t.plantationAge}</span>
                    </span>
                  )}
                </div>

                {/* Story Excerpt */}
                {t.comment && (
                  <p className="text-sm sm:text-[15px] text-[#172018]/85 font-light leading-relaxed pt-2 border-t border-[#163A24]/10 italic">
                    "{t.comment}"
                  </p>
                )}
              </div>

              {/* Card Action Link */}
              <div className="pt-1">
                <Link
                  to="/awards#testimonials"
                  className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-[#163A24] hover:text-[#0B2115] transition-colors group/link"
                >
                  <span className="underline underline-offset-4 decoration-[#163A24]/30 group-hover/link:decoration-[#163A24]">
                    Read Full Story
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
</div>
          ))}
        </div>
      </section>

      {/* ==================================================
          6. VISIT OUR NURSERY CTA CARD (Bounded container with clean spacing before footer)
         ================================================== */}
      <section className="py-10 sm:py-14 mb-8 sm:mb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="relative bg-[#063B08] text-[#F7F5EE] rounded-2xl p-8 sm:p-12 lg:p-14 border border-[#084F09]/30 shadow-xl overflow-hidden text-center">
            {/* Background Texture & Glow */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/cta-nutmeg.jpg"
                alt="Close-up Kerala nutmeg in dark forest atmosphere"
                className="w-full h-full object-cover object-center opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#063B08]/90 via-[#063B08]/95 to-[#052C06]"></div>
            </div>

            {/* Glowing Radial Accent */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#165A1A]/40 blur-3xl pointer-events-none"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-5">
              <p className="text-xs font-semibold tracking-[0.25em] text-[#A7C2A6] uppercase">
                VISIT OUR NURSERY
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F7F5EE] tracking-tight leading-tight">
                See Our Collection in Person
              </h2>

              <p className="text-sm sm:text-base text-[#F7F5EE]/85 font-light max-w-xl mx-auto leading-relaxed">
                Explore our plantation and nursery, discover our plant collection, and get personalized guidance on nutmeg cultivation.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-[#F7F5EE] hover:bg-white text-[#053806] px-8 py-3.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 border border-[#F7F5EE]/40 hover:bg-white/10 text-[#F7F5EE] px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider transition-colors"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
