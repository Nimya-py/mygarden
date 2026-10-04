import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Phone,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const PlantCare = () => {
  const whatsappNumber = "919447312890";

  const coreGuidelines = [
    {
      title: 'Elevation & Terrain',
      text: 'Thrives between 50 ft and 2,000 ft above sea level in loose, well-draining organic soil.',
    },
    {
      title: 'Pit & Planting',
      text: 'Excavate 1 × 1 × 1 ft pits enriched with aged compost, bone meal, and organic neem cake.',
    },
    {
      title: 'Growth Care',
      text: 'Provide 25% nurse shade, summer watering with organic mulch, and seasonal plant protection.',
    },
    {
      title: 'Tree Spacing',
      text: 'Plant at 28-foot spacing (~60 trees per acre) to allow full lateral canopy development.',
    },
    {
      title: 'Pollination & Yield',
      text: 'Maintain 1 male for every 15 female trees. Yields up to 3,000 nutmegs per tree by year 8.',
    },
  ];

  return (
    <div className="bg-[#F7F5EE] text-[#172018] min-h-screen">
      
      {/* ==================================================
          1. HERO SECTION: KNOWLEDGE & GUIDELINES
         ================================================== */}
      <section className="pt-8 sm:pt-12 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Title & Guidelines */}
            <div className="lg:col-span-6 space-y-6">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-[#647563] hover:text-[#084F09] uppercase transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </Link>

              <div className="space-y-3">
                <span className="inline-block text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase">
                  KINATTUKARA HORTICULTURAL KNOWLEDGE
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#053806] tracking-tight leading-tight">
                  Essential Nutmeg Planting Guidelines
                </h1>
                <p className="text-sm sm:text-base text-[#172018]/75 font-light leading-relaxed">
                  Key principles for establishing a healthy, high-yielding nutmeg grove—drawn from 35+ years of dedicated propagation and orchard management in Kerala.
                </p>
              </div>

              {/* Guidelines List */}
              <div className="pt-4 space-y-3 border-t border-[#084F09]/15">
                {coreGuidelines.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#084F09] shrink-0 mt-0.5" />
                    <p className="text-[#172018]/85 font-light leading-relaxed">
                      <strong className="font-semibold text-[#053806]">{item.title}:</strong>{' '}
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="lg:col-span-6 h-full flex flex-col justify-start lg:pt-8">
              <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden bg-[#053806] shadow-md border border-[#084F09]/10 group">
                <img
                  src="/images/nutmeg-planting-guidelines.jpg"
                  alt="Nutmeg planting journey: orchard spacing, pit preparation, planting sapling, growth care, and harvest"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. ADVISORY CARD SECTION (ELEGANT CONSTRAINED CONTAINER WITH GAP BEFORE FOOTER)
         ================================================== */}
      <section className="py-10 sm:py-14 mb-8 sm:mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#063B08] text-[#F7F5EE] rounded-2xl p-8 sm:p-12 border border-[#084F09]/30 shadow-xl overflow-hidden relative">
            {/* Glowing Accent */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#165A1A]/40 blur-3xl pointer-events-none"></div>

            <div className="space-y-8 relative z-10">
              
              {/* Card Header */}
              <div className="max-w-3xl space-y-3">
                <span className="inline-flex items-center space-x-2 text-[11px] font-semibold tracking-[0.25em] text-[#A7C2A6] uppercase bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
                  <span>KINATTUKARA NURSERY ADVISORY</span>
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F5EE] tracking-tight leading-tight">
                  Planning to Grow Nutmeg?
                </h2>

                <p className="text-sm sm:text-base text-[#F7F5EE]/90 font-light leading-relaxed">
                  Whether you are establishing a commercial plantation, intercropping an existing estate, or planting in your home garden, Kinattukara Nutmeg Nursery provides certified high-yielding saplings, budded pollinator plants, and bespoke plantation guidance backed by 35+ years of grower experience.
                </p>
              </div>

              {/* Value Props Strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-white/15">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4.5 border border-white/10 space-y-1">
                  <p className="text-xs font-semibold text-[#A7C2A6] uppercase tracking-wider">Certified Plants</p>
                  <p className="text-xs text-[#F7F5EE]/80 font-light leading-relaxed">
                    Authentic Skin/Patch, Crown, and Grafted varieties with guaranteed budded males.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4.5 border border-white/10 space-y-1">
                  <p className="text-xs font-semibold text-[#A7C2A6] uppercase tracking-wider">Field Guidance</p>
                  <p className="text-xs text-[#F7F5EE]/80 font-light leading-relaxed">
                    Expert advice on pit preparation, spacing, nurse shading, and soil suitability.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4.5 border border-white/10 space-y-1">
                  <p className="text-xs font-semibold text-[#A7C2A6] uppercase tracking-wider">Direct Farm Support</p>
                  <p className="text-xs text-[#F7F5EE]/80 font-light leading-relaxed">
                    Personalized consultation directly from seasoned Kerala cultivators.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    "Hello Kinattukara Nursery, I am planning to grow nutmeg and would like information on certified plants and plantation guidance."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2.5 bg-[#F7F5EE] hover:bg-white text-[#053806] px-8 py-3.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 text-[#084F09]" />
                  <span>WHATSAPP US</span>
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 border border-[#F7F5EE]/40 hover:bg-white/10 text-[#F7F5EE] px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider transition-colors"
                >
                  <span>CONTACT NURSERY</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="sm:ml-auto flex items-center space-x-2 text-xs text-[#F7F5EE]/80 font-light pt-2 sm:pt-0">
                  <Phone className="w-3.5 h-3.5 text-[#A7C2A6]" />
                  <span>+91 94473 12890 · Chalakudy, Thrissur</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
