import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNursery } from '../context/NurseryContext';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Droplets,
  Sun,
  Sprout,
  ShieldCheck,
  TreePine,
  Layers,
  MessageCircle,
  Phone,
  CheckCircle2,
} from 'lucide-react';

export const PlantCare = () => {
  const { nursery } = useNursery();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('site');

  const rawPhone = nursery?.whatsapp || nursery?.phone || "919447312890";
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const displayPhone = nursery?.phone || '+91 94473 12890';
  const nurseryName = nursery?.name || 'Kinattukara Nutmeg Plantation & Nursery';
  const displayAddress = nursery?.address
    ? `${nursery.address}, ${nursery.city ? `${nursery.city}, ` : ''}${nursery.state || 'Kerala'}`
    : 'Kinattukara, Thrissur / Palakkad Highway, Kerala';

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setActiveSection(id);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="bg-[#071C14] text-[#F2F0E5] selection:bg-[#C4E85A] selection:text-[#071C14]">

      {/* ==================================================
          1. HERO HEADER SECTION
          - Dark forest-green background (#071C14)
          - Bold editorial display typography
          - Botanical monoculture & intercropping showcase
         ================================================== */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-18 pb-12 sm:pb-16 lg:pb-20 border-b border-[#123D27]/40">
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
            <Link
              to="/plants/nutmeg"
              className="text-[#D8D9C9]/70 hover:text-[#C4E85A] transition-colors"
            >
              NUTMEG
            </Link>
            <span className="text-[#D8D9C9]/30">/</span>
            <span className="text-[#C4E85A]">PLANTING TIPS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C4E85A]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  KINATTUKARA AGRONOMIC PROTOCOL
                </span>
              </div>

              <h1 className="font-display text-[42px] sm:text-[58px] lg:text-[74px] xl:text-[84px] font-extrabold text-[#F2F0E5] leading-[0.95] tracking-[-0.04em] uppercase">
                HOW TO GROW <br />
                <span className="text-[#C4E85A]">HIGH-YIELD NUTMEG.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-xl">
                Key principles for establishing an enduring, disease-resilient nutmeg grove — drawn from 35+ years of systematic research, seedling observation, and orchard stewardship in Kerala.
              </p>

              {/* Editorial Index Bar */}
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D8D9C9]/50 block mb-2.5">
                  GUIDELINE DIRECTORY:
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {[
                    { id: 'site', label: '01 SITE & SOIL' },
                    { id: 'pit', label: '02 PIT PREP' },
                    { id: 'spacing', label: '03 SPACING' },
                    { id: 'shade', label: '04 WATER & SHADE' },
                    { id: 'pollination', label: '05 POLLINATION' },
                  ].map((tab) => (
                    <a
                      key={tab.id}
                      href={`#${tab.id}`}
                      onClick={() => setActiveSection(tab.id)}
                      className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                        activeSection === tab.id
                          ? 'bg-[#C4E85A] text-[#071C14]'
                          : 'bg-[#123D27]/50 hover:bg-[#123D27] text-[#D8D9C9] border border-[#123D27]'
                      }`}
                    >
                      {tab.label}
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Photo Showcase (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] rounded-[16px] overflow-hidden border border-[#123D27] group shadow-2xl bg-[#0B2419]">
                <img
                  src="/images/nutmeg-planting-guidelines.jpg"
                  alt="Nutmeg planting journey: orchard spacing, pit preparation, planting sapling, growth care, and harvest"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110C]/90 via-[#04110C]/20 to-transparent p-5 sm:p-6 flex items-end">
                  <div className="space-y-1">
                    <span className="font-display text-xs font-bold tracking-wider text-[#C4E85A] uppercase block">
                      35+ YEARS AGRONOMIC EXPERTISE
                    </span>
                    <p className="text-[11px] sm:text-xs text-[#F2F0E5]/80 font-normal">
                      Verified plantation techniques adapted to South Indian monsoon and soil conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. CORE PRINCIPLES STRIP — 5 CULTIVATION PILLARS
          - Publication column layout with hairline dividers
         ================================================== */}
      <section className="py-14 sm:py-18 bg-[#0B2419] border-b border-[#123D27]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          
          <div className="max-w-3xl mb-12 space-y-2">
            <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
              THE ESSENTIAL FOUNDATION
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F2F0E5] tracking-tight uppercase">
              FIVE CULTIVATION PILLARS FOR 30+ YEARS OF HARVEST
            </h2>
            <p className="text-sm sm:text-base text-[#D8D9C9]/80 font-normal leading-relaxed">
              Nutmeg trees can bear yield for 60 to 80 years. Proper establishment during the first 36 months determines lifetime orchard profitability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-x divide-[#123D27]/60 border-t border-b border-[#123D27]/60">
            
            {/* 01 Elevation */}
            <div className="py-8 lg:py-6 lg:px-5 first:pl-0 space-y-3">
              <span className="font-display text-2xl font-black text-[#C4E85A] block">01</span>
              <div>
                <h3 className="font-display text-sm font-bold text-[#F2F0E5] uppercase tracking-wide">
                  ELEVATION & SOIL
                </h3>
                <span className="text-[11px] font-mono text-[#D8D9C9]/60 uppercase">50 – 2,000 Ft MSL</span>
              </div>
              <p className="text-xs text-[#D8D9C9]/80 font-normal leading-relaxed">
                Loose, well-draining loamy red laterite soil enriched with organic humus. Never stagnant water.
              </p>
            </div>

            {/* 02 Pit Dimension */}
            <div className="py-8 lg:py-6 lg:px-5 space-y-3">
              <span className="font-display text-2xl font-black text-[#C4E85A] block">02</span>
              <div>
                <h3 className="font-display text-sm font-bold text-[#F2F0E5] uppercase tracking-wide">
                  PIT PREPARATION
                </h3>
                <span className="text-[11px] font-mono text-[#D8D9C9]/60 uppercase">1 × 1 × 1 Meter</span>
              </div>
              <p className="text-xs text-[#D8D9C9]/80 font-normal leading-relaxed">
                Enriched with aged farmyard manure, bone meal, and neem cake 3 weeks before monsoon planting.
              </p>
            </div>

            {/* 03 Spacing */}
            <div className="py-8 lg:py-6 lg:px-5 space-y-3">
              <span className="font-display text-2xl font-black text-[#C4E85A] block">03</span>
              <div>
                <h3 className="font-display text-sm font-bold text-[#F2F0E5] uppercase tracking-wide">
                  ORCHARD SPACING
                </h3>
                <span className="text-[11px] font-mono text-[#D8D9C9]/60 uppercase">28 × 28 Feet</span>
              </div>
              <p className="text-xs text-[#D8D9C9]/80 font-normal leading-relaxed">
                ~55–60 trees per acre allows full lateral branch spread and maximum light penetration.
              </p>
            </div>

            {/* 04 Shade */}
            <div className="py-8 lg:py-6 lg:px-5 space-y-3">
              <span className="font-display text-2xl font-black text-[#C4E85A] block">04</span>
              <div>
                <h3 className="font-display text-sm font-bold text-[#F2F0E5] uppercase tracking-wide">
                  NURSE SHADE
                </h3>
                <span className="text-[11px] font-mono text-[#D8D9C9]/60 uppercase">25% Filtered Sun</span>
              </div>
              <p className="text-xs text-[#D8D9C9]/80 font-normal leading-relaxed">
                Intercrop with banana or gliricidia during years 1–3 to shield young leaves from harsh summer rays.
              </p>
            </div>

            {/* 05 Pollination */}
            <div className="py-8 lg:py-6 lg:px-5 last:pr-0 space-y-3">
              <span className="font-display text-2xl font-black text-[#C4E85A] block">05</span>
              <div>
                <h3 className="font-display text-sm font-bold text-[#F2F0E5] uppercase tracking-wide">
                  POLLINATION
                </h3>
                <span className="text-[11px] font-mono text-[#D8D9C9]/60 uppercase">1 Male : 15 Females</span>
              </div>
              <p className="text-xs text-[#D8D9C9]/80 font-normal leading-relaxed">
                Guaranteed budded male plants dispersed evenly throughout the grove ensure high fruit setting.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          3. SECTION 01 — SITE & SOIL (WARM CREAM EDITORIAL)
          - Background: #F2F0E5
          - Dark green typography: #071C14
          - Photography + Deep Agronomic Context
         ================================================== */}
      <section id="site" className="py-16 sm:py-20 lg:py-24 bg-[#F2F0E5] text-[#071C14] border-t border-[#123D27]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Visual Column (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-[#E2DFD2] border border-[#123D27]/20 shadow-xl group">
                <img
                  src="/images/nutmeg-planting-sapling.jpg"
                  alt="Young grafted nutmeg sapling establishing vigorous tap and lateral roots in rich Kerala soil"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="border-l-2 border-[#084F09] pl-3 py-1">
                <p className="text-[11px] sm:text-xs text-[#172018]/70 leading-relaxed italic">
                  Acclimatized grafted sapling planted on a gentle mound with protective organic mulch.
                </p>
              </div>
            </div>

            {/* Editorial Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#084F09] uppercase">
                  01 — SITE & TERRAIN SELECTION
                </p>
                <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#071C14] leading-[0.98] tracking-[-0.03em] uppercase">
                  ELEVATION, SOIL & <br />
                  <span className="text-[#084F09]">DRAINAGE ARCHITECTURE.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#172018]/85 font-normal leading-relaxed pt-1">
                  Nutmeg (*Myristica fragrans*) demands a warm, humid tropical climate with a reliable annual rainfall of 1,500 mm to 3,000 mm. The tree is exceptionally sensitive to waterlogging; establishing natural gradient drainage is mandatory.
                </p>
              </div>

              {/* Numbered Field Guidelines */}
              <div className="space-y-4 pt-2 border-t border-[#123D27]/15">
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-4">
                    <span className="font-display text-xs font-bold text-[#084F09] uppercase tracking-wider block">
                      OPTIMAL SOIL TYPE
                    </span>
                    <span className="text-[10px] text-[#172018]/60 font-mono">Loamy Laterite / Clay Loam</span>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="text-xs sm:text-sm text-[#172018]/80 leading-relaxed">
                      Deep friable red laterite soils with substantial organic matter content and a pH between 5.5 and 6.8 produce optimal vegetative vigor.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline pt-3 border-t border-[#123D27]/10">
                  <div className="sm:col-span-4">
                    <span className="font-display text-xs font-bold text-[#084F09] uppercase tracking-wider block">
                      SLOPE & WATER TABLE
                    </span>
                    <span className="text-[10px] text-[#172018]/60 font-mono">Terraced Slopes / Lowlands</span>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="text-xs sm:text-sm text-[#172018]/80 leading-relaxed">
                      If planting in flat low-lying paddy borders or valley basins, raise planting mounds 1.5 feet above ground level to safeguard taproots from seasonal flooding.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline pt-3 border-t border-[#123D27]/10">
                  <div className="sm:col-span-4">
                    <span className="font-display text-xs font-bold text-[#084F09] uppercase tracking-wider block">
                      ALTITUDE WINDOW
                    </span>
                    <span className="text-[10px] text-[#172018]/60 font-mono">Coastal to Mid-Highlands</span>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="text-xs sm:text-sm text-[#172018]/80 leading-relaxed">
                      Commercial orchards perform best from sea-level plains up to 600 meters (2,000 ft). High mountain frosts or arid winds will scorch apical foliage.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          4. SECTION 02 — PIT PREPARATION & PLANTING (DARK FOREST GREEN)
          - Background: #071C14
          - Cream typography: #F2F0E5, Lime accent: #C4E85A
          - Alternating: Text on Left, Photo on Right
         ================================================== */}
      <section id="pit" className="py-16 sm:py-20 lg:py-24 bg-[#071C14] text-[#F2F0E5] border-t border-[#123D27]/40 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Editorial Content (7 cols, first on desktop) */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
              <div className="space-y-2">
                <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  02 — PIT PREPARATION & MONSOON TIMING
                </p>
                <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.03em] uppercase">
                  EXCAVATION, COMPOST & <br />
                  <span className="text-[#C4E85A]">TRANSPLANTING TECHNIQUE.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed pt-1">
                  At Kinattukara, we prepare pits well in advance of the South-West monsoon. Excavating pits in April–May allows the tropical sun to sterilize the soil profile before organic refilling.
                </p>
              </div>

              {/* Numbered Field Guidelines */}
              <div className="space-y-4 pt-2 border-t border-[#123D27]/60">
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-4">
                    <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                      PIT DIMENSIONS
                    </span>
                    <span className="text-[10px] text-[#D8D9C9]/50 font-mono">1m × 1m × 1m</span>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="text-xs sm:text-sm text-[#D8D9C9]/85 leading-relaxed">
                      Dig pits measuring 90 cm to 1 meter in width, length, and depth. Keep topsoil separated from subsoil during excavation.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline pt-3 border-t border-[#123D27]/40">
                  <div className="sm:col-span-4">
                    <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                      ORGANIC MIXTURE
                    </span>
                    <span className="text-[10px] text-[#D8D9C9]/50 font-mono">Topsoil + Cow Dung + Neem</span>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="text-xs sm:text-sm text-[#D8D9C9]/85 leading-relaxed">
                      Refill pit with topsoil blended with 25 kg aged compost or dried cow manure, 1 kg rock phosphate (bone meal), and 1 kg powdered neem cake to deter root grubs and termites.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline pt-3 border-t border-[#123D27]/40">
                  <div className="sm:col-span-4">
                    <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                      PLANTING THE GRAFT
                    </span>
                    <span className="text-[10px] text-[#D8D9C9]/50 font-mono">Preserve Graft Union</span>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="text-xs sm:text-sm text-[#D8D9C9]/85 leading-relaxed">
                      Cut polybag carefully without disturbing the root ball. Keep the graft or bud union strictly 3 inches ABOVE soil level. Firm the soil gently and stake with bamboo.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Visual Column (5 cols, second on desktop) */}
            <div className="lg:col-span-5 space-y-3 order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-[#0B2419] border border-[#123D27] shadow-xl group">
                <img
                  src="/images/about-nursery.jpg"
                  alt="Kinattukara Nursery shade houses with hardened grafted nutmeg plants ready for field dispatch"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="border-l-2 border-[#C4E85A] pl-3 py-1">
                <p className="text-[11px] sm:text-xs text-[#D8D9C9]/70 leading-relaxed italic">
                  Hardened grafted saplings in nursery shade tunnels awaiting field dispatch across Kerala and Tamil Nadu.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          5. SECTION 03 — SPACING & INTERCROPPING (WARM CREAM)
          - Background: #F2F0E5
          - Dark green typography: #071C14
          - Intercropping architecture with Arecanut, Coconut, Coffee
         ================================================== */}
      <section id="spacing" className="py-16 sm:py-20 lg:py-24 bg-[#F2F0E5] text-[#071C14] border-t border-[#123D27]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Visual Column (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-[#E2DFD2] border border-[#123D27]/20 shadow-xl group">
                <img
                  src="/images/nutmeg-growth-harvest.jpg"
                  alt="Mature healthy nutmeg trees flourishing with full lateral branch spread in Kerala orchard"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="border-l-2 border-[#084F09] pl-3 py-1">
                <p className="text-[11px] sm:text-xs text-[#172018]/70 leading-relaxed italic">
                  Mature canopy at year 12 demonstrating the extensive lateral spread nurtured by wide 28-foot orchard spacing.
                </p>
              </div>
            </div>

            {/* Editorial Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#084F09] uppercase">
                  03 — ORCHARD ARCHITECTURE
                </p>
                <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#071C14] leading-[0.98] tracking-[-0.03em] uppercase">
                  SPACING GEOMETRY & <br />
                  <span className="text-[#084F09]">MULTI-TIER INTERCROPPING.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#172018]/85 font-normal leading-relaxed pt-1">
                  Nutmeg naturally spreads its lateral tiers horizontally. Planting too closely severely suppresses lower fruiting branches, forcing trees into vertical elongation and drastically reducing yield.
                </p>
              </div>

              {/* Intercropping Matrix Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-[#123D27]/20">
                <div className="space-y-1.5">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-[#084F09] block">
                    MONOCULTURE PLANTATIONS
                  </span>
                  <p className="text-xs text-[#172018]/75 leading-relaxed">
                    Plant at <strong className="text-[#071C14] font-semibold">28 × 28 feet (8.5 × 8.5 m)</strong> or 26 × 26 ft in square grid. Yields ~55 to 60 trees per acre with zero canopy crowding.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-[#084F09] block">
                    ARECANUT / COCONUT ESTATES
                  </span>
                  <p className="text-xs text-[#172018]/75 leading-relaxed">
                    Ideal mid-tier crop in existing palm groves. Plant one nutmeg between every 4 arecanut palms (every second row) at 18–20 ft spacing.
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 sm:pt-0">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-[#084F09] block">
                    NURSE INTERCROPS (YEARS 1–3)
                  </span>
                  <p className="text-xs text-[#172018]/75 leading-relaxed">
                    Plant bananas 6 feet away to provide immediate microclimate shade, wind protection, and supplementary farm revenue during early development.
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 sm:pt-0">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-[#084F09] block">
                    ROOT SYSTEM BEHAVIOR
                  </span>
                  <p className="text-xs text-[#172018]/75 leading-relaxed">
                    Nutmeg feeder roots reside in the upper 30–45 cm of topsoil. Deep tillage near the drip line must be avoided; shallow hand-weeding is recommended.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          6. SECTION 04 — WATER & SHADE MANAGEMENT (DARK GREEN)
          - Background: #0B2419
          - Practical summer survival tactics
         ================================================== */}
      <section id="shade" className="py-16 sm:py-20 bg-[#0B2419] text-[#F2F0E5] border-t border-[#123D27]/40 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center space-x-2">
                <Sun className="w-4 h-4 text-[#C4E85A]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  04 — WATER & SUN CARE
                </span>
              </div>

              <h2 className="font-display text-[32px] sm:text-[44px] lg:text-[50px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.03em] uppercase">
                SUMMER MULCHING & <br />
                <span className="text-[#C4E85A]">IRRIGATION PROTOCOL.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#D8D9C9]/85 font-normal leading-relaxed">
                While mature trees thrive in open sun, young saplings up to 3 years old require 25–40% nurse shade and regular moisture during dry tropical summers (December to May).
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-[12px] bg-[#071C14]/70 border border-[#123D27] space-y-2">
                  <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                    DRIP & MICRO-SPRINKLER
                  </span>
                  <p className="text-xs text-[#D8D9C9]/80 leading-relaxed">
                    Provide 20–30 liters of water every 3–4 days during peak summer for young trees; 50–70 liters twice weekly for bearing adults during flowering and fruit sizing.
                  </p>
                </div>

                <div className="p-5 rounded-[12px] bg-[#071C14]/70 border border-[#123D27] space-y-2">
                  <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                    COCONUT HUSK MULCH
                  </span>
                  <p className="text-xs text-[#D8D9C9]/80 leading-relaxed">
                    Mulch a 4-foot ring around the tree basin with dried leaves and inverted coconut husks to conserve soil moisture, keeping mulch 10 cm clear of the main trunk.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-[10px] bg-[#071C14] border border-[#123D27]/80 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-[#C4E85A] shrink-0 mt-0.5" />
                <p className="text-xs text-[#D8D9C9]/70 font-normal leading-relaxed">
                  <strong className="text-[#F2F0E5] font-semibold">Seasonal Pest Guard:</strong> Monitor for leaf-eating caterpillars and die-back during early monsoon breaks. Apply organic Bordeaux mixture (1%) paste on lower stems to shield against fungal foot-rot.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          7. SECTION 05 — POLLINATION & HARVEST TIMELINE (DARK FOREST GREEN)
          - Background: #071C14
          - Yield expectations across Years 1 to 10
         ================================================== */}
      <section id="pollination" className="py-16 sm:py-20 lg:py-24 bg-[#071C14] text-[#F2F0E5] border-t border-[#123D27]/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 space-y-10">
          
          <div className="max-w-3xl space-y-2">
            <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
              05 — LIFECYCLE & YIELD EXPECTATIONS
            </p>
            <h2 className="font-display text-[32px] sm:text-[44px] lg:text-[54px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.03em] uppercase">
              POLLINATION BALANCE & ANNUAL YIELD CURVE
            </h2>
            <p className="text-sm sm:text-base text-[#D8D9C9]/80 font-normal leading-relaxed">
              Unlike wild seed-grown trees which take 8 to 10 years to reveal sex (often 50% unproductive males), Kinattukara certified grafted plants guarantee verified high-yielding females paired with designated male pollinators.
            </p>
          </div>

          {/* Lifecycle Timeline Table */}
          <div className="overflow-x-auto rounded-[14px] border border-[#123D27] bg-[#0B2419]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#123D27] bg-[#071C14]/80 text-[#C4E85A] font-display uppercase tracking-wider text-[11px] sm:text-xs">
                  <th className="py-4 px-5 font-bold">Orchard Phase</th>
                  <th className="py-4 px-5 font-bold">Tree Stage</th>
                  <th className="py-4 px-5 font-bold">Agronomic Care Required</th>
                  <th className="py-4 px-5 font-bold">Average Fruits / Tree</th>
                  <th className="py-4 px-5 font-bold">Commercial Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#123D27]/50 text-[#D8D9C9]/90">
                <tr className="hover:bg-[#123D27]/30 transition-colors">
                  <td className="py-4 px-5 font-bold text-[#F2F0E5]">Year 1 – 2</td>
                  <td className="py-4 px-5 font-mono text-xs">Establishment</td>
                  <td className="py-4 px-5">Nurse shade, bamboo staking, summer watering</td>
                  <td className="py-4 px-5">0 (Remove early flowers)</td>
                  <td className="py-4 px-5 text-[#D8D9C9]/60">Vegetative Growth</td>
                </tr>
                <tr className="hover:bg-[#123D27]/30 transition-colors">
                  <td className="py-4 px-5 font-bold text-[#F2F0E5]">Year 3 – 4</td>
                  <td className="py-4 px-5 font-mono text-xs">First Bearing</td>
                  <td className="py-4 px-5">Ring composting, annual pruning of water suckers</td>
                  <td className="py-4 px-5 font-medium text-[#C4E85A]">100 – 300 fruits</td>
                  <td className="py-4 px-5 text-[#C4E85A]">Initial Harvest</td>
                </tr>
                <tr className="hover:bg-[#123D27]/30 transition-colors">
                  <td className="py-4 px-5 font-bold text-[#F2F0E5]">Year 5 – 7</td>
                  <td className="py-4 px-5 font-mono text-xs">Commercial Crop</td>
                  <td className="py-4 px-5">Bi-annual organic feeding, canopy airiness</td>
                  <td className="py-4 px-5 font-medium text-[#C4E85A]">800 – 1,500 fruits</td>
                  <td className="py-4 px-5 text-[#C4E85A]">Profitable Commercial</td>
                </tr>
                <tr className="hover:bg-[#123D27]/30 transition-colors">
                  <td className="py-4 px-5 font-bold text-[#F2F0E5]">Year 8 – 20+</td>
                  <td className="py-4 px-5 font-mono text-xs">Peak Maturity</td>
                  <td className="py-4 px-5">Full solar exposure, regular harvest rounds</td>
                  <td className="py-4 px-5 font-bold text-[#C4E85A]">2,000 – 3,500+ fruits</td>
                  <td className="py-4 px-5 font-bold text-[#C4E85A]">Maximum Annual Yield</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ==================================================
          8. GROWER ADVISORY & CONSULTATION BANNER
          - Directly connects growers with Kinattukara experts
         ================================================== */}
      <section className="py-14 sm:py-18 bg-[#0B2419] border-t border-[#123D27]/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="rounded-[16px] bg-[#071C14] border border-[#123D27] p-8 sm:p-12 lg:p-14 space-y-8 relative overflow-hidden shadow-2xl">
            
            <div className="space-y-3 max-w-3xl">
              <span className="inline-flex items-center space-x-2 text-[11px] font-semibold tracking-[0.25em] text-[#C4E85A] uppercase">
                <Compass className="w-3.5 h-3.5 text-[#C4E85A]" />
                <span>DIRECT NURSERY CONSULTATION</span>
              </span>

              <h2 className="font-display text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.03em] uppercase">
                PLANNING A NEW PLANTATION?
              </h2>

              <p className="text-sm sm:text-base text-[#D8D9C9] font-normal leading-relaxed">
                Whether you are setting up a commercial acreage, intercropping an existing arecanut/coconut estate, or planting in your private orchard, Kinattukara Nursery offers bespoke cultivar selection and field advisory based on your specific location.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Hello ${nurseryName}, I am planning to plant nutmeg and would like technical plantation advice on spacing, soil suitability, and certified grafted saplings.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-[#C4E85A] hover:bg-[#d4f570] text-[#071C14] px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-4 h-4 text-[#071C14]" />
                <span>CHAT ON WHATSAPP</span>
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 border border-[#F2F0E5]/30 hover:border-[#C4E85A] hover:text-[#C4E85A] text-[#F2F0E5] px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors"
              >
                <span>CONTACT NURSERY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="sm:ml-auto flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 text-xs text-[#D8D9C9]/85 pt-2 sm:pt-0">
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center space-x-1.5 font-mono text-[#F2F0E5] hover:text-[#C4E85A] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C4E85A] shrink-0" />
                  <span>{displayPhone}</span>
                </a>
                <span className="hidden sm:inline text-[#D8D9C9]/40">·</span>
                <span className="text-[#D8D9C9]/80 font-sans">{displayAddress}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          9. BOTTOM BOTANICAL CTA — EXPLORE GRAFTED SAPLINGS
          - Dark forest-green background (#071C14)
          - Arrow button linking directly to /plants/nutmeg
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#071C14] border-t border-[#123D27]/60 text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 space-y-6">
          <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
            KINATTUKARA CERTIFIED COLLECTION
          </p>

          <h2 className="font-display text-[36px] sm:text-[50px] lg:text-[64px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
            START WITH VERIFIED, <br />
            <span className="text-[#C4E85A]">HIGH-YIELDING SAPLINGS.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-xl mx-auto">
            Choose from Skin-Patch Budded, Crown Budded, and Approach Grafted cultivars proven over 35 years at Kinattukara.
          </p>

          <div className="pt-4 flex justify-center">
            <Link
              to="/plants/nutmeg"
              className="group inline-flex items-center space-x-3 text-sm sm:text-base font-bold text-[#F2F0E5] tracking-wider uppercase hover:text-[#C4E85A] transition-colors"
            >
              <span>EXPLORE NUTMEG PLANTS & SAPLINGS</span>
              <span className="w-9 h-9 rounded-full border border-[#D8D9C9]/30 flex items-center justify-center group-hover:border-[#C4E85A] group-hover:translate-x-1.5 transition-all">
                <ArrowRight className="w-4 h-4 text-[#C4E85A]" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Quick Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071C14]/95 backdrop-blur-md border-t border-[#123D27] px-4 py-3 shadow-2xl flex items-center gap-3">
        <a
          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
            `Hello ${nurseryName}, I am reading the planting guide and would like expert advice on spacing and sapling orders.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center space-x-2 bg-[#C4E85A] hover:bg-[#d4f570] text-[#071C14] py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow cursor-pointer transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-[#071C14] shrink-0" />
          <span>WhatsApp Advice</span>
        </a>
        <a
          href={`tel:${cleanPhone}`}
          className="inline-flex items-center justify-center space-x-1.5 border border-[#123D27] bg-[#0B2419] text-[#F2F0E5] px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:border-[#C4E85A] transition-colors cursor-pointer"
          aria-label="Call Nursery"
        >
          <Phone className="w-4 h-4 text-[#C4E85A]" />
          <span>Call</span>
        </a>
      </div>

    </div>
  );
};
