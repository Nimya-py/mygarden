import React from 'react';
import { Link } from 'react-router-dom';
import { Microscope, Sprout, BookOpen, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';

export const About = () => {
  const mapUrl = "https://maps.google.com/?q=Kinattukara+Nutmeg+Plantation+and+Nursery+Kerala";

  const keyHighlights = [
    {
      title: 'RESEARCH & CULTIVATION',
      description: 'Experience in nutmeg cultivation and plant development.',
      icon: <Microscope className="w-5 h-5 text-[#163A24]" />,
    },
    {
      title: 'NUTMEG PLANTS',
      description: 'Different propagation methods are available.',
      icon: <Sprout className="w-5 h-5 text-[#163A24]" />,
    },
    {
      title: 'PLANTING GUIDANCE',
      description: 'Practical planting information for customers.',
      icon: <BookOpen className="w-5 h-5 text-[#163A24]" />,
    },
    {
      title: 'VISIT OUR NURSERY',
      description: 'Interested customers can visit the nursery.',
      icon: <MapPin className="w-5 h-5 text-[#163A24]" />,
    },
  ];

  return (
    <div className="bg-[#F7F5EE] text-[#172018] pt-6 sm:pt-8 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12 sm:space-y-14">
        
        {/* ==================================================
            1. HERO / INTRO SECTION (Compact 50/50 two-column layout)
           ================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Intro */}
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase">
              ABOUT KINATTUKARA
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-normal text-[#0B2115] leading-[1.15] tracking-tight">
              Rooted in Nature. <br />
              <span className="italic font-light text-[#163A24]">Growing with Experience.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#172018]/80 font-light leading-relaxed max-w-xl pt-1">
              Kinattukara Nutmeg Plantation & Nursery is a trusted ancestral enterprise in Kerala, dedicated to producing superior grafted nutmeg saplings and providing lifelong horticultural guidance to farmers, gardeners, and commercial growers.
            </p>
          </div>

          {/* Right Column: High Quality Nursery Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DB] shadow-sm">
              <img
                src="/images/about-nursery.jpg"
                alt="Kinattukara Nutmeg Nursery with rows of healthy grafted saplings"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* ==================================================
            2. OUR STORY (Directly below intro, compact & readable)
           ================================================== */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-[#163A24]/10 shadow-sm space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase">
              35 YEARS OF PASSION & DEDICATION
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#0B2115]">
              OUR STORY
            </h2>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm text-[#172018]/85 font-light leading-relaxed max-w-4xl">
            <p>
              Kinattukara Nutmeg Nursery is an ancestral business started 35 years ago, owned and operated by Mr. K.T. Mathew and his son Mr. Arun Mathew. Driven by a deep love for plants and passion for agriculture, Mr. K.T. Mathew undertook extensive horticultural research to identify species with the greatest agronomic value for Kerala.
            </p>
            <p>
              Through systematic cultivation, he studied 55 distinct breeds grown from seeds over decades. His observations revealed that nutmeg offered extraordinary potential for multi-tier agroforestry, long-term yield consistency, and high commercial value for farming families.
            </p>
          </div>
        </section>

        {/* ==================================================
            3. KINATTUKARA NUTMEG (Distinctive breed selection: IMAGE | TEXT)
           ================================================== */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-[#163A24]/10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Image (Left) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden bg-[#EAE6DB] shadow-sm max-h-[420px]">
                <img
                  src="/images/kinattukara-nutmeg-breed.jpg"
                  alt="Authentic Kinattukara Nutmeg held in hands showing crimson mace inside"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Text (Right) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase">
                  PROPRIETARY BREED SELECTION
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#0B2115]">
                  KINATTUKARA NUTMEG
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#172018]/85 font-light leading-relaxed">
                <p>
                  During his extensive research across 55 seed breeds, Mr. K.T. Mathew discovered a unique nutmeg cultivar where one single mace contains up to <strong className="font-semibold text-[#0B2115]">60% Oleoresins</strong>. He established this specific high-yielding species across the farm as parent mother trees for scion propagation.
                </p>
                <p>
                  In 2008, Kinattukara Nutmeg Nursery won the prestigious <strong className="font-semibold text-[#0B2115]">ISO 9001:2000 certification</strong> from the American National Accreditation Board (ANAB). Today, farmers and plantation owners from different states in India visit our nursery to inspect the mother trees firsthand and source certified grafted saplings.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/plants/nutmeg"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#163A24] hover:text-[#0B2115] transition-colors"
                >
                  <span>Explore our propagation methods</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================
            4. KEY HIGHLIGHTS (Compact horizontal row of 4 items)
           ================================================== */}
        <section className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase">
              AT A GLANCE
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#0B2115]">
              KEY HIGHLIGHTS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {keyHighlights.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 sm:p-6 border border-[#163A24]/10 shadow-sm space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#163A24]/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#0B2115]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#647563] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================
            5. COMPACT VISIT / CTA BANNER
           ================================================== */}
        <section className="bg-[#163A24] text-[#F7F5EE] rounded-2xl p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-[#A7C2A6] uppercase">
            VISIT OUR PLANTATION & NURSERY
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F7F5EE]">
            Experience Our Collection in Person
          </h2>
          <p className="text-xs sm:text-sm text-[#F7F5EE]/80 max-w-xl mx-auto font-light leading-relaxed">
            Interested customers and farmers are warmly invited to visit our nursery at any time to inspect mother trees and receive personalized planting advice.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-[#F7F5EE] hover:bg-white text-[#0B2115] px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition-all shadow"
            >
              <span>Get Directions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-1.5 border border-[#F7F5EE]/30 hover:bg-[#F7F5EE]/10 text-[#F7F5EE] px-6 py-3 rounded-full text-xs font-medium tracking-wider transition-colors"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
