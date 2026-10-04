import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export const About = () => {
  const mapUrl = "https://maps.google.com/?q=Kinattukara+Nutmeg+Plantation+and+Nursery+Kerala";

  return (
    <div className="bg-[#071C14] text-[#F2F0E5] selection:bg-[#C4E85A] selection:text-[#071C14]">

      {/* ==================================================
          1. ABOUT HERO SECTION
          - Dark forest-green background (#071C14)
          - Bold editorial headline matching homepage
          - Large authentic nursery photography on the right
         ================================================== */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#123D27]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C4E85A]" />
                <span className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  THE KINATTUKARA STORY
                </span>
              </div>

              <h1 className="font-display text-[42px] sm:text-[60px] lg:text-[76px] xl:text-[88px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
                ROOTED IN KERALA. <br />
                <span className="text-[#C4E85A]">GROWING WITH EXPERIENCE.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-xl">
                Kinattukara Nutmeg Plantation & Nursery is a family-rooted agricultural enterprise dedicated to quality nutmeg cultivation, grafted plants, and practical horticultural knowledge.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6">
                <a
                  href="#story"
                  className="group inline-flex items-center space-x-2.5 text-xs sm:text-sm font-bold tracking-wider text-[#C4E85A] hover:text-[#F2F0E5] uppercase transition-colors"
                >
                  <span>READ OUR STORY</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </a>

                <span className="text-xs text-[#D8D9C9]/40 tracking-wider font-mono uppercase">
                  EST. 1989 • THRISSUR, KERALA
                </span>
              </div>
            </div>

            {/* Right Photo (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] rounded-xl overflow-hidden border border-[#123D27] group shadow-2xl">
                <img
                  src="/images/about-nursery.jpg"
                  alt="Kinattukara Nutmeg Nursery with rows of healthy grafted saplings"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110C]/85 via-transparent to-transparent p-5 sm:p-6 flex items-end">
                  <div>
                    <span className="font-display text-xs font-bold tracking-wider text-[#C4E85A] uppercase block">
                      KINATTUKARA NURSERY
                    </span>
                    <p className="text-[11px] sm:text-xs text-[#F2F0E5]/80 font-normal">
                      Acclimatized grafted saplings in Thrissur shade nets
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. 01 — OUR STORY (MAIN EDITORIAL CONTENT)
          - Warm cream background (#F2F0E5)
          - Left: Large bold typography
          - Right: 2-3 open editorial paragraphs (No white cards!)
         ================================================== */}
      <section id="story" className="py-16 sm:py-20 lg:py-24 bg-[#F2F0E5] text-[#071C14]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Headline (5 cols) */}
            <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-28">
              <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#123D27] uppercase">
                01 — OUR STORY
              </p>
              <h2 className="font-display text-[38px] sm:text-[52px] lg:text-[64px] font-extrabold text-[#071C14] leading-[0.98] tracking-[-0.04em] uppercase">
                FROM A FAMILY <br />
                <span className="text-[#084F09]">ROOTED IN AGRICULTURE.</span>
              </h2>
              <div className="pt-2">
                <span className="font-mono text-xs font-bold tracking-wider text-[#123D27]/60 uppercase">
                  35 YEARS OF HORTICULTURAL HERITAGE
                </span>
              </div>
            </div>

            {/* Right Editorial Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-[#172018]/85 text-base sm:text-lg font-normal leading-relaxed">
              <p>
                Kinattukara Nutmeg Nursery is an ancestral agricultural business started 35 years ago in Kerala, founded by <strong className="font-bold text-[#071C14]">Mr. K.T. Mathew</strong> and actively stewarded together with his son <strong className="font-bold text-[#071C14]">Mr. Arun Mathew</strong>.
              </p>
              <p>
                Driven by a deep love for botany and practical agronomy, Mr. K.T. Mathew undertook decades of systematic horticultural research to identify and develop species with the highest agronomic value for Kerala's tropical soil and monsoon conditions.
              </p>
              <p>
                Through rigorous trials, he cultivated and observed <strong className="font-bold text-[#071C14]">55 distinct breeds grown from seeds over decades</strong>. His practical observations revealed that nutmeg offered extraordinary stability for multi-tier intercropping, enduring yield consistency, and high long-term financial security for farming families across South India.
              </p>
              <p>
                Today, the nursery translates this ancestral dedication into reliable grafted saplings, supplying verified varieties to progressive farmers, commercial plantation owners, and dedicated home growers.
              </p>

              {/* Minimal 3-Point Heritage Facts Strip */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#123D27]/15">
                <div>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#071C14] block">
                    35+
                  </span>
                  <span className="font-sans text-xs font-semibold text-[#123D27]/70 uppercase tracking-wide">
                    Years Dedicated Experience
                  </span>
                </div>
                <div>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#071C14] block">
                    2 GEN
                  </span>
                  <span className="font-sans text-xs font-semibold text-[#123D27]/70 uppercase tracking-wide">
                    K.T. Mathew & Arun Mathew
                  </span>
                </div>
                <div>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#071C14] block">
                    1989
                  </span>
                  <span className="font-sans text-xs font-semibold text-[#123D27]/70 uppercase tracking-wide">
                    Founded in Kerala
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          3. 02 — THE NUTMEG JOURNEY (HORIZONTAL PROGRESSION)
          - Dark deep green background (#0B2419)
          - Simple horizontal progression: 01 SELECTION -> 02 PROPAGATION -> 03 NURSERY -> 04 PLANTING
          - Zero fake processes, strictly verified Kinattukara methods
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#0B2419] border-t border-[#123D27]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 space-y-12">
          
          <div className="max-w-2xl space-y-3">
            <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
              02 — THE NUTMEG JOURNEY
            </p>
            <h2 className="font-display text-[38px] sm:text-[50px] lg:text-[64px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.04em] uppercase">
              FROM SELECTION <br />
              <span className="text-[#C4E85A]">TO SAPLING.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#D8D9C9] font-normal leading-relaxed">
              Every sapling leaves our nursery through a disciplined 4-stage horticultural process rooted in verified mother tree genetics.
            </p>
          </div>

          {/* 4-Stage Horizontal Progression */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-xl border border-[#123D27] bg-[#071C14]/70 space-y-3">
              <span className="font-display text-3xl font-black text-[#C4E85A] block leading-none">
                01
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold text-[#F2F0E5] uppercase tracking-wide">
                SEED SELECTION
              </h3>
              <p className="text-xs sm:text-sm text-[#D8D9C9]/80 font-normal leading-relaxed">
                Careful screening of parent mother trees developed from decades of research to guarantee heavy mace yield and disease resistance.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#123D27] bg-[#071C14]/70 space-y-3">
              <span className="font-display text-3xl font-black text-[#C4E85A] block leading-none">
                02
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold text-[#F2F0E5] uppercase tracking-wide">
                PROPAGATION
              </h3>
              <p className="text-xs sm:text-sm text-[#D8D9C9]/80 font-normal leading-relaxed">
                Precision approach grafting and epicotyl techniques using mature scion wood from proven female mother trees.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#123D27] bg-[#071C14]/70 space-y-3">
              <span className="font-display text-3xl font-black text-[#C4E85A] block leading-none">
                03
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold text-[#F2F0E5] uppercase tracking-wide">
                NURSERY CARE
              </h3>
              <p className="text-xs sm:text-sm text-[#D8D9C9]/80 font-normal leading-relaxed">
                Protected development under calibrated 50% shade nets with balanced irrigation and organic bio-fertilizer root conditioning.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#123D27] bg-[#071C14]/70 space-y-3">
              <span className="font-display text-3xl font-black text-[#C4E85A] block leading-none">
                04
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold text-[#F2F0E5] uppercase tracking-wide">
                FIELD PLANTING
              </h3>
              <p className="text-xs sm:text-sm text-[#D8D9C9]/80 font-normal leading-relaxed">
                Acclimatized saplings ready for farm transplanting with recommended 28-foot spacing for lifelong canopy development.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          4. 03 — RESEARCH & SELECTION (PROPRIETARY BREED / NUTMEG RESEARCH)
          - Warm cream background (#F2F0E5)
          - Two-column editorial layout
          - Left: Large nutmeg fruit/mace photo
          - Right: Verified research info with large numbers (55 SEED BREEDS, 60% OLEORESIN)
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F2F0E5] text-[#071C14] border-t border-[#123D27]/15">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Photo: Authentic Nutmeg Held in Hands (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden border border-[#123D27]/20 group shadow-xl bg-[#EAE6DB]">
                <img
                  src="/images/kinattukara-nutmeg-breed.jpg"
                  alt="Authentic Kinattukara Nutmeg held in hands showing crimson mace inside"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110C]/85 via-transparent to-transparent p-5 flex items-end">
                  <span className="text-xs font-bold tracking-wider text-[#F2F0E5] uppercase">
                    Kinattukara Mother Tree Specimen with Crimson Mace
                  </span>
                </div>
              </div>
            </div>

            {/* Right Editorial Research & Big Stats (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#123D27] uppercase">
                  03 — RESEARCH & SELECTION
                </p>
                <h2 className="font-display text-[38px] sm:text-[50px] lg:text-[62px] font-extrabold text-[#071C14] leading-[0.98] tracking-[-0.04em] uppercase">
                  A DEEPER LOOK <br />
                  <span className="text-[#084F09]">AT NUTMEG.</span>
                </h2>
                <p className="font-sans text-xs font-bold tracking-widest text-[#123D27]/70 uppercase pt-1">
                  KINATTUKARA NUTMEG CULTIVAR RESEARCH
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#172018]/85 font-normal leading-relaxed">
                <p>
                  During his extensive research across 55 seed breeds, Mr. K.T. Mathew discovered a unique nutmeg cultivar where one single mace contains up to <strong className="font-bold text-[#071C14]">60% Oleoresins</strong>.
                </p>
                <p>
                  Recognizing the commercial and therapeutic superiority of this plant, he established this specific high-yielding variety across the plantation as designated parent mother trees for scion propagation.
                </p>
                <p>
                  Today, farmers and plantation owners from different states in India visit our nursery to inspect the mother trees firsthand and source certified grafted saplings that mature early and yield dense aromatic mace.
                </p>
              </div>

              {/* Visually Large Stats (55 SEED BREEDS & 60% OLEORESIN) */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#123D27]/15">
                <div className="space-y-1">
                  <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#071C14] block leading-none">
                    55
                  </span>
                  <span className="font-display text-xs sm:text-sm font-bold tracking-wider text-[#123D27] uppercase block">
                    SEED BREEDS RESEARCHED
                  </span>
                  <p className="text-xs text-[#172018]/70 font-normal leading-relaxed">
                    Decades of observational field research to identify Kerala's top genetic performer.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#084F09] block leading-none">
                    60%
                  </span>
                  <span className="font-display text-xs sm:text-sm font-bold tracking-wider text-[#123D27] uppercase block">
                    OLEORESIN CONTENT
                  </span>
                  <p className="text-xs text-[#172018]/70 font-normal leading-relaxed">
                    Exceptional essential oil and oleoresin concentration inside one single mace.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/plants/nutmeg"
                  className="group inline-flex items-center space-x-2 text-xs sm:text-sm font-bold tracking-wider text-[#084F09] hover:text-[#053806] uppercase transition-colors"
                >
                  <span>EXPLORE OUR NUTMEG VARIETIES</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          5. 04 — EXPERIENCE & EXPERTISE
          - Dark forest-green background (#071C14)
          - Concise copy on cultivation, nursery practices & guidance
          - Large photography
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#071C14] border-t border-[#123D27]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Content (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                  04 — EXPERIENCE
                </p>
                <h2 className="font-display text-[38px] sm:text-[52px] lg:text-[66px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.04em] uppercase">
                  KNOWLEDGE <br />
                  <span className="text-[#C4E85A]">GROWN OVER TIME.</span>
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#D8D9C9] font-normal leading-relaxed">
                Successful nutmeg farming requires more than just saplings — it requires an understanding of soil preparation, moisture balance, spacing, and long-term care.
              </p>

              {/* Editorial Breakdown of Expertise (No generic icon boxes) */}
              <div className="space-y-4 pt-2 border-t border-[#123D27]/60">
                <div className="border-b border-[#123D27]/40 pb-3.5">
                  <h3 className="font-display text-sm sm:text-base font-bold text-[#F2F0E5] uppercase tracking-wide">
                    CULTIVATION EXPERIENCE
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D8D9C9]/75 font-normal leading-relaxed mt-1">
                    Over 35 years observing soil moisture, monsoon transitions, and micro-climates across Kerala farm holdings.
                  </p>
                </div>

                <div className="border-b border-[#123D27]/40 pb-3.5">
                  <h3 className="font-display text-sm sm:text-base font-bold text-[#F2F0E5] uppercase tracking-wide">
                    AUTHENTIC GRAFTED SAPLINGS
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D8D9C9]/75 font-normal leading-relaxed mt-1">
                    True-to-type scions taken only from high-bearing mother trees, avoiding unpredictable seedling variations.
                  </p>
                </div>

                <div className="pb-1">
                  <h3 className="font-display text-sm sm:text-base font-bold text-[#F2F0E5] uppercase tracking-wide">
                    LIFELONG HORTICULTURAL GUIDANCE
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D8D9C9]/75 font-normal leading-relaxed mt-1">
                    Continuous advisory for farmers on pit sizing, organic manures, summer nurse shade, and harvesting timings.
                  </p>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  to="/planting-tips"
                  className="group inline-flex items-center space-x-2 text-xs sm:text-sm font-bold tracking-wider text-[#C4E85A] hover:text-[#F2F0E5] uppercase transition-colors"
                >
                  <span>READ OUR PLANTING GUIDE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Photo: Close-up of Nutmeg (6 cols) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden border border-[#123D27] group shadow-2xl">
                <img
                  src="/images/cta-nutmeg.jpg"
                  alt="Nutmeg fruit split open showing bright red mace inside"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110C]/80 via-transparent to-transparent p-5 sm:p-6 flex items-end">
                  <span className="font-display text-xs font-bold tracking-wider text-[#F2F0E5] uppercase">
                    High Oleoresin Crimson Mace Cultivar
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          6. 05 — RECOGNITION (ISO 9001:2000 & ANAB)
          - Deep dark green background (#0B2419)
          - Large typography for ISO 9001:2000 and ANAB
          - No generic icon cards, clean editorial credibility
         ================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#0B2419] border-t border-[#123D27]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                05 — RECOGNITION
              </p>
              <h2 className="font-display text-[38px] sm:text-[50px] lg:text-[64px] font-extrabold text-[#F2F0E5] leading-[0.98] tracking-[-0.04em] uppercase">
                STANDARDS THAT <br />
                <span className="text-[#C4E85A]">STAND APART.</span>
              </h2>
            </div>
            <div>
              <Link
                to="/awards"
                className="group inline-flex items-center space-x-2 text-xs sm:text-sm font-bold tracking-wider text-[#C4E85A] hover:text-[#F2F0E5] uppercase transition-colors"
              >
                <span>VIEW ALL AWARDS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Clean Editorial Recognition Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4 border-t border-[#123D27]/40">
            
            <div className="space-y-2">
              <span className="font-display text-3xl sm:text-4xl font-black text-[#F2F0E5] block leading-none">
                ISO 9001:2000
              </span>
              <span className="font-display text-xs sm:text-sm font-bold tracking-wider text-[#C4E85A] uppercase block">
                QUALITY MANAGEMENT CERTIFICATION
              </span>
              <p className="text-xs sm:text-sm text-[#D8D9C9]/75 font-normal leading-relaxed">
                Awarded in 2008 for quality nursery propagation methods and standardized customer fulfillment.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-display text-3xl sm:text-4xl font-black text-[#F2F0E5] block leading-none">
                ANAB
              </span>
              <span className="font-display text-xs sm:text-sm font-bold tracking-wider text-[#C4E85A] uppercase block">
                ACCREDITED STANDARDS
              </span>
              <p className="text-xs sm:text-sm text-[#D8D9C9]/75 font-normal leading-relaxed">
                Accredited under the American National Accreditation Board management frameworks.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-display text-3xl sm:text-4xl font-black text-[#F2F0E5] block leading-none">
                55 BREEDS
              </span>
              <span className="font-display text-xs sm:text-sm font-bold tracking-wider text-[#C4E85A] uppercase block">
                GENETIC SELECTION
              </span>
              <p className="text-xs sm:text-sm text-[#D8D9C9]/75 font-normal leading-relaxed">
                Rigorous field research across decades isolating the highest oil and mace yielding mother trees.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          7. VISIT KINATTUKARA CTA (MOVED TO END)
          - Darkest green background (#04110C)
          - Clear statement: SEE WHERE THE STORY GROWS.
          - Verified text & Petamar-style CTA buttons
         ================================================== */}
      <section className="pt-[100px] sm:pt-[110px] lg:pt-[125px] pb-[100px] sm:pb-[105px] lg:pb-[115px] bg-[#04110C] border-t border-[#123D27]/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Headline and text */}
            <div className="lg:col-span-8 space-y-4">
              <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#C4E85A] uppercase">
                VISIT KINATTUKARA
              </p>

              <h2 className="font-display text-[42px] sm:text-[60px] lg:text-[76px] font-extrabold text-[#F2F0E5] leading-[0.96] tracking-[-0.04em] uppercase">
                SEE WHERE <br />
                <span className="text-[#C4E85A]">THE STORY GROWS.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#D8D9C9] font-normal leading-relaxed max-w-xl">
                Interested customers and farmers are welcome to visit our nursery and plantation to explore the mother trees, inspect grafted saplings, and receive direct horticultural guidance.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center space-x-2.5 bg-[#C4E85A] hover:bg-[#d6f777] text-[#071C14] px-7 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>GET DIRECTIONS</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <Link
                to="/contact"
                className="group inline-flex items-center justify-center space-x-2.5 border border-[#123D27] hover:border-[#C4E85A] bg-[#071C14] hover:bg-[#0B2419] text-[#F2F0E5] px-7 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300"
              >
                <span>CONTACT US</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
