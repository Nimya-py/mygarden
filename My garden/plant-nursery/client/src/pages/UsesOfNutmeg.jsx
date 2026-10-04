import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Utensils, Sparkles, Droplets, BookOpen } from 'lucide-react';

export const UsesOfNutmeg = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  return (
    <div className="bg-[#F7F5EE] text-[#172018] min-h-screen pt-6 sm:pt-8 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
        
        {/* Header / Intro with Showcase Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-[#647563] hover:text-[#163A24] uppercase transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <p className="text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase">
              KINATTUKARA BOTANICAL HERITAGE
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0B2115] tracking-tight">
              THE MANY USES OF NUTMEG
            </h1>

            <p className="text-sm sm:text-base text-[#172018]/75 font-light leading-relaxed">
              Every part of the nutmeg fruit yields immense culinary, medicinal, and commercial value — from the succulent fruit rind used in pickles and wine, to the prized crimson mace aril, aromatic seed kernels, and distilled essential oils.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DB] shadow-md border border-[#163A24]/10 group">
              <img
                src="/images/nutmeg-many-uses.jpg"
                alt="The Many Uses of Nutmeg - Traditional pickles, wine, mace, seeds, and spices"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* ==================================================
            SECTION 01 — CULINARY USES
           ================================================== */}
        <section id="culinary" className="bg-white rounded-2xl p-8 sm:p-12 border border-[#163A24]/10 shadow-sm scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Image (Left) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EAE6DB] shadow-sm">
                <img
                  src="/images/nutmeg-pickle.jpg"
                  alt="Traditional Nutmeg Pickle preparation with green and yellow nutmegs"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Text Content (Right) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#163A24] tracking-wider uppercase">
                <Utensils className="w-4 h-4" />
                <span>Section 01 · Kitchen & Table</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#0B2115] tracking-tight">
                CULINARY USES
              </h2>

              <p className="text-sm sm:text-base text-[#172018]/80 font-light leading-relaxed">
                Young nutmeg with the seed is traditionally used in preparations such as pickles. Fully grown nutmeg can be used in preparations including pickles, chutneys and beverages.
              </p>

              <div className="pt-2 border-t border-[#163A24]/10">
                <p className="text-xs text-[#647563] font-light leading-relaxed">
                  The fleshy outer rind (pericarp) lends a distinct aromatic tartness prized in Kerala culinary recipes, seasoned with native spices and natural preservation techniques.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================
            SECTION 02 — MACE
           ================================================== */}
        <section id="mace" className="bg-white rounded-2xl p-8 sm:p-12 border border-[#163A24]/10 shadow-sm scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Text Content (Left on Desktop - Alternating) */}
            <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#163A24] tracking-wider uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Section 02 · Spice Aril</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#0B2115] tracking-tight">
                MACE
              </h2>

              <p className="text-sm sm:text-base text-[#172018]/80 font-light leading-relaxed">
                Mace is the bright red aril surrounding the nutmeg seed. It is valued as a spice and flavouring ingredient in culinary preparations.
              </p>

              <div className="pt-2 border-t border-[#163A24]/10">
                <p className="text-xs text-[#647563] font-light leading-relaxed">
                  Known locally as Jathipathri, mace carries a delicate, warm, savory-sweet profile. When gently sun-dried to a deep crimson or amber hue, it commands high market demand for fine spice blends, savory dishes, and baking.
                </p>
              </div>
            </div>

            {/* Image (Right on Desktop - Alternating) */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EAE6DB] shadow-sm">
                <img
                  src="/images/nutmeg-mace.jpg"
                  alt="High quality vibrant red mace aril surrounding the nutmeg seed"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================
            SECTION 03 — NUTMEG OIL
           ================================================== */}
        <section id="oil" className="bg-white rounded-2xl p-8 sm:p-12 border border-[#163A24]/10 shadow-sm scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Image (Left) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EAE6DB] shadow-sm">
                <img
                  src="/images/nutmeg-oil.jpg"
                  alt="Realistic glass bottle of pure golden nutmeg oil with fresh nutmeg and mace"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Text Content (Right) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#163A24] tracking-wider uppercase">
                <Droplets className="w-4 h-4" />
                <span>Section 03 · Oleoresins & Fragrance</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#0B2115] tracking-tight">
                NUTMEG OIL
              </h2>

              <p className="text-sm sm:text-base text-[#172018]/80 font-light leading-relaxed">
                Nutmeg oil is used in applications including oleoresins, perfumes and fragrances.
              </p>

              <div className="pt-2 border-t border-[#163A24]/10">
                <p className="text-xs text-[#647563] font-light leading-relaxed">
                  Extracted through steam distillation of aromatic scion-wood harvests, nutmeg essential oil and oleoresins provide key aromatics in modern cosmetic formulating, scented luxury soaps, and commercial flavorings.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================
            SECTION 04 — TRADITIONAL USES
            Clearly labeled historical/cultural folklore information
           ================================================== */}
        <section className="bg-white/80 rounded-2xl p-8 sm:p-10 border border-[#163A24]/10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#647563] uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#163A24]" />
            <span>Historical & Cultural Context</span>
          </div>
          <h3 className="font-serif text-2xl text-[#0B2115]">
            TRADITIONAL USES
          </h3>
          <p className="text-xs sm:text-sm text-[#172018]/75 font-light leading-relaxed">
            In regional folklore and ancestral wellness traditions, nutmeg and nutmeg oil were historically used in home remedies for soothing digestive discomfort and local warm compresses. These applications reflect historical cultural practices and are shared for cultural and educational heritage purposes rather than established medical treatment.
          </p>
        </section>

        {/* ==================================================
            PAGE CTA: EXPLORE OUR NUTMEG PLANTS
           ================================================== */}
        <div className="bg-[#163A24] text-[#F7F5EE] rounded-2xl p-10 sm:p-14 text-center space-y-6 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#A7C2A6] uppercase">
            KINATTUKARA NURSERY COLLECTION
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F7F5EE]">
            EXPLORE OUR NUTMEG PLANTS
          </h2>

          <p className="text-xs sm:text-sm text-[#F7F5EE]/80 max-w-xl mx-auto font-light leading-relaxed">
            Discover the different propagation methods available at Kinattukara Nursery.
          </p>

          <div className="pt-2">
            <Link
              to="/plants/nutmeg"
              className="inline-flex items-center space-x-2 bg-[#F7F5EE] hover:bg-white text-[#0B2115] px-8 py-4 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 shadow hover:shadow-md"
            >
              <span>EXPLORE NUTMEG PLANTS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
