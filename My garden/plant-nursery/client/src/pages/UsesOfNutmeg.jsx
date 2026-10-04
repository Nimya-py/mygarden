import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Utensils, Sparkles, Droplets, BookOpen, Table, Clock, Compass, ShieldCheck } from 'lucide-react';

export const UsesOfNutmeg = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('culinary');

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
          - Large bold editorial headline matching homepage
          - High resolution botanical photography showcase
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
            <span className="text-[#C4E85A]">BOTANICAL USES</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C4E85A]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  KINATTUKARA BOTANICAL MONOGRAPH
                </span>
              </div>

              <h1 className="font-display text-[42px] sm:text-[58px] lg:text-[74px] xl:text-[84px] font-extrabold text-[#F2F0E5] leading-[0.95] tracking-[-0.04em] uppercase">
                THE MANY USES <br />
                <span className="text-[#C4E85A]">OF NUTMEG.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-xl">
                Every component of the nutmeg fruit (*Myristica fragrans*) delivers exceptional culinary, therapeutic, and economic yield — from the thick succulent rind to the prized crimson mace aril, dense spice seed, and volatile essential oils.
              </p>

              {/* Editorial Index Bar */}
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D8D9C9]/50 block mb-2.5">
                  PAGE DIRECTORY:
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {[
                    { id: 'culinary', label: '01 CULINARY' },
                    { id: 'mace', label: '02 CRIMSON MACE' },
                    { id: 'oil', label: '03 ESSENTIAL OIL' },
                    { id: 'lore', label: '04 TRADITIONS' },
                    { id: 'guide', label: '05 HARVEST MATRIX' },
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
                  src="/images/nutmeg-many-uses.jpg"
                  alt="The Many Uses of Nutmeg - Traditional pickles, wine, mace, seeds, and spices"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110C]/90 via-[#04110C]/20 to-transparent p-5 sm:p-6 flex items-end">
                  <div className="space-y-1">
                    <span className="font-display text-xs font-bold tracking-wider text-[#C4E85A] uppercase block">
                      COMPLETE BOTANICAL HARVEST
                    </span>
                    <p className="text-[11px] sm:text-xs text-[#F2F0E5]/80 font-normal">
                      Zero-waste tropical agriculture: pericarp rind, mace arils, spice kernels, and volatile distillates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. ANATOMY STRIP — 4 YIELDS OF THE FRUIT
          - Editorial column layout with subtle hairline dividers
          - Eliminates boxy SaaS cards in favor of publication design
         ================================================== */}
      <section className="py-14 sm:py-18 bg-[#0B2419] border-b border-[#123D27]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          
          <div className="max-w-3xl mb-12 space-y-2">
            <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
              BOTANICAL DISSECTION
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F2F0E5] tracking-tight uppercase">
              FOUR VALUABLE COMMERCIAL PRODUCTS FROM A SINGLE TREE
            </h2>
            <p className="text-sm sm:text-base text-[#D8D9C9]/80 font-normal leading-relaxed">
              Unlike many single-yield cash crops, mature nutmeg trees produce four commercially viable harvests simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#123D27]/60 border-t border-b border-[#123D27]/60">
            
            {/* 01 Fruit Rind */}
            <div className="py-8 lg:py-6 lg:px-6 first:pl-0 space-y-3">
              <span className="font-display text-2xl font-black text-[#C4E85A] block">01</span>
              <div>
                <h3 className="font-display text-base font-bold text-[#F2F0E5] uppercase tracking-wide">
                  PERICARP (FRUIT RIND)
                </h3>
                <span className="text-[11px] font-mono text-[#D8D9C9]/60 uppercase">Malayalam: തോട് (Thodu)</span>
              </div>
              <p className="text-xs text-[#D8D9C9]/80 font-normal leading-relaxed">
                Represents 80–85% of total fresh fruit weight. Thick, crisp, and tart. Used for pickles, spiced wine, jams, and candied digestifs.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#C4E85A] uppercase tracking-wider">
                Harvest: Year-round (Peak June–Aug)
              </div>
            </div>

            {/* 02 Crimson Mace */}
            <div className="py-8 lg:py-6 lg:px-6 space-y-3">
              <span className="font-display text-2xl font-black text-[#C4E85A] block">02</span>
              <div>
                <h3 className="font-display text-base font-bold text-[#F2F0E5] uppercase tracking-wide">
                  MACE (CRIMSON ARIL)
                </h3>
                <span className="text-[11px] font-mono text-[#D8D9C9]/60 uppercase">Malayalam: ജാതിപത്രി (Jathipathri)</span>
              </div>
              <p className="text-xs text-[#D8D9C9]/80 font-normal leading-relaxed">
                The delicate scarlet netting encasing the inner seed. Hand-harvested, sun-cured, and sold as a high-value gourmet spice.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#C4E85A] uppercase tracking-wider">
                Market: Premium Spice Value
              </div>
            </div>

            {/* 03 Nutmeg Seed */}
            <div className="py-8 lg:py-6 lg:px-6 space-y-3">
              <span className="font-display text-2xl font-black text-[#C4E85A] block">03</span>
              <div>
                <h3 className="font-display text-base font-bold text-[#F2F0E5] uppercase tracking-wide">
                  SPICE SEED (KERNEL)
                </h3>
                <span className="text-[11px] font-mono text-[#D8D9C9]/60 uppercase">Malayalam: ജാതിക്ക (Jathika)</span>
              </div>
              <p className="text-xs text-[#D8D9C9]/80 font-normal leading-relaxed">
                The dense brown kernel protected inside a woody shell. Dried until loose, then ground into confectionery and culinary spice rubs.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#C4E85A] uppercase tracking-wider">
                Storage: Long Shelf Life (Years)
              </div>
            </div>

            {/* 04 Essential Oils */}
            <div className="py-8 lg:py-6 lg:px-6 last:pr-0 space-y-3">
              <span className="font-display text-2xl font-black text-[#C4E85A] block">04</span>
              <div>
                <h3 className="font-display text-base font-bold text-[#F2F0E5] uppercase tracking-wide">
                  VOLATILE ESSENTIAL OILS
                </h3>
                <span className="text-[11px] font-mono text-[#D8D9C9]/60 uppercase">Malayalam: ജാതിതൈലം (Thailam)</span>
              </div>
              <p className="text-xs text-[#D8D9C9]/80 font-normal leading-relaxed">
                Steam-distilled extracts rich in myristicin, pinene, and sabinene. Utilized worldwide in perfumery, luxury soaps, and balm formulations.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#C4E85A] uppercase tracking-wider">
                Commercial: High Global Demand
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          3. SECTION 01 — CULINARY USES (WARM CREAM EDITORIAL)
          - Background: #F2F0E5
          - Dark green typography: #071C14
          - Refined editorial points replacing generic checkmark cards
         ================================================== */}
      <section id="culinary" className="py-16 sm:py-20 lg:py-24 bg-[#F2F0E5] text-[#071C14] border-t border-[#123D27]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Visual Column (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-[#E2DFD2] border border-[#123D27]/20 shadow-xl group">
                <img
                  src="/images/nutmeg-pickle.jpg"
                  alt="Traditional Nutmeg Pickle preparation with tender green and golden nutmegs"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Archival Editorial Photo Caption */}
              <div className="border-l-2 border-[#084F09] pl-3 py-1">
                <p className="text-[11px] sm:text-xs text-[#172018]/70 leading-relaxed italic">
                  Traditional Kerala pickle cure: freshly harvested pericarp cured in unrefined rock salt, roasted fenugreek, and cold-pressed sesame oil.
                </p>
              </div>
            </div>

            {/* Editorial Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#084F09] uppercase">
                  01 — KITCHEN & TABLE
                </p>
                <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#071C14] leading-[0.98] tracking-[-0.03em] uppercase">
                  CULINARY USES & <br />
                  <span className="text-[#084F09]">TRADITIONAL PRESERVES.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#172018]/85 font-normal leading-relaxed pt-1">
                  The fleshy outer rind (pericarp) of the nutmeg fruit, which is discarded in many parts of the world, is celebrated across Kerala culinary history for its tart, aromatic astringency.
                </p>
              </div>

              {/* Numbered Editorial Points (Elevated, no SaaS checklists) */}
              <div className="space-y-4 pt-2 border-t border-[#123D27]/15">
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-3">
                    <span className="font-display text-xs font-bold text-[#084F09] uppercase tracking-wider block">
                      01 · TENDER PICKLE
                    </span>
                    <span className="text-[10px] text-[#172018]/60 font-mono">Pacha Jathika Achar</span>
                  </div>
                  <div className="sm:col-span-9">
                    <p className="text-xs sm:text-sm text-[#172018]/80 leading-relaxed">
                      Young nutmegs harvested before the shell hardens are brined whole or sliced into fragrant, crunchy oil pickles that age gracefully for months.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline pt-3 border-t border-[#123D27]/10">
                  <div className="sm:col-span-3">
                    <span className="font-display text-xs font-bold text-[#084F09] uppercase tracking-wider block">
                      02 · CANDIED RIND
                    </span>
                    <span className="text-[10px] text-[#172018]/60 font-mono">Sweet Pericarp Confit</span>
                  </div>
                  <div className="sm:col-span-9">
                    <p className="text-xs sm:text-sm text-[#172018]/80 leading-relaxed">
                      Slow-cooked in concentrated raw cane sugar syrup with cloves and cardamoms to produce chewy, translucent candies and comforting botanical drink cordials.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline pt-3 border-t border-[#123D27]/10">
                  <div className="sm:col-span-3">
                    <span className="font-display text-xs font-bold text-[#084F09] uppercase tracking-wider block">
                      03 · KERNEL SPICE
                    </span>
                    <span className="text-[10px] text-[#172018]/60 font-mono">Freshly Grated Jaifal</span>
                  </div>
                  <div className="sm:col-span-9">
                    <p className="text-xs sm:text-sm text-[#172018]/80 leading-relaxed">
                      Freshly grated over Malabar biryani, roasted spice gravies, festive holiday eggnogs, European béchamel sauces, and artisan baked pastries.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          4. SECTION 02 — MACE (DARK FOREST GREEN EDITORIAL)
          - Background: #071C14
          - Cream typography: #F2F0E5, Lime accent: #C4E85A
          - Alternating: Text on Left, Photo on Right
         ================================================== */}
      <section id="mace" className="py-16 sm:py-20 lg:py-24 bg-[#071C14] text-[#F2F0E5] border-t border-[#123D27]/40 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Editorial Content (7 cols, first on desktop) */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
              <div className="space-y-2">
                <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  02 — THE PRIZED ARIL
                </p>
                <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.03em] uppercase">
                  MACE <br />
                  <span className="text-[#C4E85A]">(JATHIPATHRI).</span>
                </h2>
                <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed pt-1">
                  Mace is the scarlet lace-like aril nestled between the fruit flesh and the dark seed casing. Recognized globally as one of the most sophisticated spices, it offers an elegant, savory-sweet profile softer than the seed kernel.
                </p>
              </div>

              {/* Numbered Editorial Specs */}
              <div className="space-y-4 pt-2 border-t border-[#123D27]/60">
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                  <div className="sm:col-span-4">
                    <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                      01 · HARVEST WINDOW
                    </span>
                    <span className="text-[10px] text-[#D8D9C9]/50 font-mono">Immediate Hand Detachment</span>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="text-xs sm:text-sm text-[#D8D9C9]/85 leading-relaxed">
                      Must be detached within hours of the ripe fruit splitting naturally on the branch to retain its rich essential oil content and prevent weather bleaching.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline pt-3 border-t border-[#123D27]/40">
                  <div className="sm:col-span-4">
                    <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                      02 · SHADE CURING
                    </span>
                    <span className="text-[10px] text-[#D8D9C9]/50 font-mono">Intact Flower Form</span>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="text-xs sm:text-sm text-[#D8D9C9]/85 leading-relaxed">
                      Cured on breathable mats in partial shade for 10–14 days. As moisture gently evaporates, the crimson turns to deep amber while keeping the "flower" intact.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline pt-3 border-t border-[#123D27]/40">
                  <div className="sm:col-span-4">
                    <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                      03 · MARKET DISTINCTION
                    </span>
                    <span className="text-[10px] text-[#D8D9C9]/50 font-mono">Unbroken Grade #1</span>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="text-xs sm:text-sm text-[#D8D9C9]/85 leading-relaxed">
                      Whole unbroken mace petals command substantially higher wholesale prices in national and international spice auctions compared to crushed grades.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Visual Column (5 cols, second on desktop) */}
            <div className="lg:col-span-5 space-y-3 order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-[#0B2419] border border-[#123D27] shadow-xl group">
                <img
                  src="/images/nutmeg-mace.jpg"
                  alt="High quality vibrant red mace aril surrounding the nutmeg seed"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Photo Caption */}
              <div className="border-l-2 border-[#C4E85A] pl-3 py-1">
                <p className="text-[11px] sm:text-xs text-[#D8D9C9]/70 leading-relaxed italic">
                  Vibrant scarlet mace freshly unclasped from the seed shell at Kinattukara Nursery trial groves.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          5. SECTION 03 — NUTMEG OIL & EXTRACTS (WARM CREAM)
          - Background: #F2F0E5
          - Dark green typography: #071C14
          - Clean editorial rows replacing boxy white containers
         ================================================== */}
      <section id="oil" className="py-16 sm:py-20 lg:py-24 bg-[#F2F0E5] text-[#071C14] border-t border-[#123D27]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Visual Column (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-[#E2DFD2] border border-[#123D27]/20 shadow-xl group">
                <img
                  src="/images/nutmeg-oil.jpg"
                  alt="Pure golden nutmeg essential oil in bottle with fresh nutmeg and mace"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="border-l-2 border-[#084F09] pl-3 py-1">
                <p className="text-[11px] sm:text-xs text-[#172018]/70 leading-relaxed italic">
                  Steam-distilled pure essential oil capturing volatile organic terpenes: myristicin, elemicin, and safrole.
                </p>
              </div>
            </div>

            {/* Editorial Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#084F09] uppercase">
                  03 — STEAM DISTILLATION
                </p>
                <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#071C14] leading-[0.98] tracking-[-0.03em] uppercase">
                  NUTMEG OIL & <br />
                  <span className="text-[#084F09]">AROMATIC EXTRACTS.</span>
                </h2>
                <p className="text-base sm:text-lg text-[#172018]/85 font-normal leading-relaxed pt-1">
                  Obtained through water-steam distillation of rejected cracked seeds, mature scion wood, and broken mace fragments, nutmeg essential oil is an essential staple in global perfumery, soaps, and pharmaceutical flavorings.
                </p>
              </div>

              {/* Minimalist Border-Top Spec Items (No nested boxes) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-[#123D27]/20">
                <div className="space-y-1.5">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-[#084F09] block">
                    PERFUMERY & COLOGNES
                  </span>
                  <p className="text-xs text-[#172018]/75 leading-relaxed">
                    Provides a spicy, warm, woody middle note in luxury oriental chypres, masculine colognes, and incense formulations.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-[#084F09] block">
                    SOAPS & AROMATHERAPY
                  </span>
                  <p className="text-xs text-[#172018]/75 leading-relaxed">
                    Widely blended into natural artisan soaps, botanical bath oils, and relaxing massage rubs for gentle topical warmth.
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 sm:pt-0">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-[#084F09] block">
                    COMMERCIAL OLEORESINS
                  </span>
                  <p className="text-xs text-[#172018]/75 leading-relaxed">
                    Solvent-extracted concentrated resins used in industrial meat seasoning, packaged curry bases, and confectionery.
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 sm:pt-0">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-[#084F09] block">
                    NUTMEG BUTTER
                  </span>
                  <p className="text-xs text-[#172018]/75 leading-relaxed">
                    A reddish-orange semi-solid fat pressed from the seed, prized as an emollient in dermatological ointments.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          6. SECTION 04 — TRADITIONAL HERITAGE & FOLKLORE
          - Dark deep green (#0B2419)
          - Respectful editorial framing of cultural wisdom
         ================================================== */}
      <section id="lore" className="py-16 sm:py-20 bg-[#0B2419] text-[#F2F0E5] border-t border-[#123D27]/40 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#C4E85A]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  04 — ANCESTRAL WISDOM
                </span>
              </div>

              <h2 className="font-display text-[32px] sm:text-[44px] lg:text-[50px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.03em] uppercase">
                TRADITIONAL FOLKLORE & <br />
                <span className="text-[#C4E85A]">CULTURAL HERITAGE.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#D8D9C9]/85 font-normal leading-relaxed">
                For centuries across Kerala households, nutmeg held an esteemed place in the domestic spice chest, trusted as both kitchen flavoring and comforting folk remedy.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-[12px] bg-[#071C14]/70 border border-[#123D27] space-y-2">
                  <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                    ANCIENT NIGHTCAP (PAALIL JATHIKA)
                  </span>
                  <p className="text-xs text-[#D8D9C9]/80 leading-relaxed">
                    A tiny pinch of freshly scraped nutmeg stirred into a cup of warm milk before bed was celebrated as a natural way to soothe restlessness and invite deep sleep.
                  </p>
                </div>

                <div className="p-5 rounded-[12px] bg-[#071C14]/70 border border-[#123D27] space-y-2">
                  <span className="font-display text-xs font-bold text-[#C4E85A] uppercase tracking-wider block">
                    LOCAL WARM COMPRESS
                  </span>
                  <p className="text-xs text-[#D8D9C9]/80 leading-relaxed">
                    Ground nutmeg paste blended with warm sesame or mustard oil was applied to joints and the forehead as a comforting traditional folk poultice.
                  </p>
                </div>
              </div>

              {/* Clear Regulatory & Cultural Disclaimer */}
              <div className="p-4 rounded-[10px] bg-[#071C14] border border-[#123D27]/80 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-[#C4E85A] shrink-0 mt-0.5" />
                <p className="text-xs text-[#D8D9C9]/70 font-normal leading-relaxed">
                  <strong className="text-[#F2F0E5] font-semibold">Botanical Heritage Note:</strong> These historical practices reflect traditional folklore and domestic heritage shared strictly for cultural education, and should not be construed as clinical diagnosis or medical advice.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          7. SECTION 05 — HARVEST & COMMERCIAL REFERENCE TABLE
          - Authoritative botanical matrix
          - Solves user depth & practical value critique
         ================================================== */}
      <section id="guide" className="py-16 sm:py-20 lg:py-24 bg-[#071C14] text-[#F2F0E5] border-t border-[#123D27]/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 space-y-8">
          
          <div className="max-w-3xl space-y-2">
            <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
              05 — AT A GLANCE
            </p>
            <h2 className="font-display text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.03em] uppercase">
              NUTMEG HARVEST & COMMERCIAL MATRIX
            </h2>
            <p className="text-sm sm:text-base text-[#D8D9C9]/80 font-normal leading-relaxed">
              A comprehensive technical summary of fruit components, harvesting indicators, and primary market outlets.
            </p>
          </div>

          {/* Responsive Editorial Table */}
          <div className="overflow-x-auto rounded-[14px] border border-[#123D27] bg-[#0B2419]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#123D27] bg-[#071C14]/80 text-[#C4E85A] font-display uppercase tracking-wider text-[11px] sm:text-xs">
                  <th className="py-4 px-5 font-bold">Plant Part</th>
                  <th className="py-4 px-5 font-bold">Botanical Form</th>
                  <th className="py-4 px-5 font-bold">Flavor / Aroma Profile</th>
                  <th className="py-4 px-5 font-bold">Curing & Processing</th>
                  <th className="py-4 px-5 font-bold">Commercial Market</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#123D27]/50 text-[#D8D9C9]/90">
                <tr className="hover:bg-[#123D27]/30 transition-colors">
                  <td className="py-4 px-5 font-bold text-[#F2F0E5]">Pericarp Rind</td>
                  <td className="py-4 px-5 text-[#D8D9C9]/70 font-mono text-xs">Fleshy outer hull (80%)</td>
                  <td className="py-4 px-5">Tart, citrusy, astringent</td>
                  <td className="py-4 px-5">Fresh brine or sugar confit</td>
                  <td className="py-4 px-5 font-medium text-[#C4E85A]">Pickles, Cordials, Jams</td>
                </tr>
                <tr className="hover:bg-[#123D27]/30 transition-colors">
                  <td className="py-4 px-5 font-bold text-[#F2F0E5]">Mace Aril</td>
                  <td className="py-4 px-5 text-[#D8D9C9]/70 font-mono text-xs">Crimson lacy envelope</td>
                  <td className="py-4 px-5">Warm, savory-sweet, floral</td>
                  <td className="py-4 px-5">Sun/shade-dried (12% moisture)</td>
                  <td className="py-4 px-5 font-medium text-[#C4E85A]">Export Spice, Spice Blends</td>
                </tr>
                <tr className="hover:bg-[#123D27]/30 transition-colors">
                  <td className="py-4 px-5 font-bold text-[#F2F0E5]">Seed Kernel</td>
                  <td className="py-4 px-5 text-[#D8D9C9]/70 font-mono text-xs">Hard inner seed</td>
                  <td className="py-4 px-5">Deep, pungent, woody</td>
                  <td className="py-4 px-5">Dried inside shell, cracked</td>
                  <td className="py-4 px-5 font-medium text-[#C4E85A]">Baking, Seasoning, Confectionery</td>
                </tr>
                <tr className="hover:bg-[#123D27]/30 transition-colors">
                  <td className="py-4 px-5 font-bold text-[#F2F0E5]">Essential Oil</td>
                  <td className="py-4 px-5 text-[#D8D9C9]/70 font-mono text-xs">Distilled volatile fraction</td>
                  <td className="py-4 px-5">Concentrated balsamic spice</td>
                  <td className="py-4 px-5">Steam distillation</td>
                  <td className="py-4 px-5 font-medium text-[#C4E85A]">Fine Perfumery, Soaps, Balms</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ==================================================
          8. BOTTOM BOTANICAL CTA — GROW YOUR OWN NUTMEG
          - Dark forest-green background (#071C14)
          - Clean arrow button linking directly to /plants/nutmeg
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#071C14] border-t border-[#123D27]/60 text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 space-y-6">
          <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
            START YOUR PLANTATION JOURNEY
          </p>

          <h2 className="font-display text-[36px] sm:text-[50px] lg:text-[64px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
            CULTIVATE QUALITY NUTMEG <br />
            <span className="text-[#C4E85A]">ON YOUR LAND.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-xl mx-auto">
            Discover verified grafted nutmeg saplings backed by 35 years of dedicated botanical research at Kinattukara Nursery.
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

    </div>
  );
};
