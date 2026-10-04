import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const galleryItems = [
    {
      title: 'Ripe Kerala Nutmeg on Branch',
      category: 'NUTMEG',
      image: '/images/hero-nutmeg.jpg',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Shade-Net Nursery Rows & Grafted Saplings',
      category: 'NURSERY',
      image: '/images/about-nursery.jpg',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Healthy Grafted Nutmeg Saplings',
      category: 'NUTMEG',
      image: '/images/cat-nutmeg.jpg',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Kerala Black Pepper & Cardamom Cultivation',
      category: 'SPICES',
      image: '/images/cat-spices.jpg',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'All-Season Fruit Plant Saplings',
      category: 'FRUITS',
      image: '/images/cat-fruits.jpg',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Tropical Ornamental Garden Foliage',
      category: 'ORNAMENTAL',
      image: '/images/cat-ornamental.jpg',
      aspect: 'aspect-[4/3]',
    },
    {
      title: 'Harvested Nutmeg with Crimson Mace',
      category: 'NUTMEG',
      image: '/images/cta-nutmeg.jpg',
      aspect: 'aspect-[16/9]',
    },
  ];

  const filteredItems = selectedCategory === 'ALL'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-[#F7F5EE] min-h-screen pt-6 sm:pt-8 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        
        {/* Header (2-Column Grid Filling Right-Side Void) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#084F09]/10 pb-8">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-3">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-[#647563] hover:text-[#084F09] uppercase transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <p className="text-xs font-semibold tracking-[0.25em] text-[#647563] uppercase">
              VISUAL CHRONICLES
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#053806] tracking-tight">
              Plantation & Nursery Gallery
            </h1>
            <p className="text-sm text-[#172018]/75 font-light leading-relaxed max-w-xl">
              A glimpse into the daily life, shade-net nurseries, mature nutmeg trees, and vibrant agricultural heritage at Kinattukara.
            </p>
          </div>

          {/* Right Column: Visual Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#084F09]/15 shadow-sm space-y-2">
              <span className="text-xs font-semibold tracking-wider text-[#084F09] uppercase block">
                🌱 KINATTUKARA NURSERY HIGHLIGHTS
              </span>
              <p className="text-xs text-[#172018]/80 font-light leading-relaxed">
                High-resolution photography showcasing grafted nutmeg saplings, shade-net propagation rows, pepper vines, and tropical plant collections.
              </p>
            </div>
          </div>

        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-b border-[#163A24]/10 pb-6">
          {['ALL', 'NUTMEG', 'NURSERY', 'SPICES', 'FRUITS', 'ORNAMENTAL'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-[#163A24] text-[#F7F5EE]'
                  : 'bg-[#FFFFFF] text-[#172018]/70 hover:bg-[#163A24]/10 hover:text-[#0B2115] border border-[#163A24]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-lg bg-[#EAE6DB] border border-[#163A24]/10 space-y-3"
            >
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 pt-1">
                <span className="text-[10px] font-semibold tracking-widest text-[#647563] uppercase">
                  {item.category}
                </span>
                <p className="font-serif text-lg text-[#0B2115] mt-0.5">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
