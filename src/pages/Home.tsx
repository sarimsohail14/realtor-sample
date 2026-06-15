/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Home as HomeIcon, IndianRupee, ArrowUpRight, Lock, Compass, Award, Briefcase, Key, Handshake } from 'lucide-react';
import { PROPERTIES, TESTIMONIALS, NEIGHBORHOODS, AGENT_INFO } from '../data';
import ScrollReveal from '../components/ScrollReveal';
import { Property } from '../types';
import { TestimonialsColumn } from '../components/ui/testimonials-columns-1';
import { formatRupee } from '../utils';
import MortgageCalculator from '../components/MortgageCalculator';

interface HomeProps {
  setActivePage: (page: string) => void;
  setBuyFilters: (filters: { location: string; type: string; priceRange: string }) => void;
  onViewProperty: (property: Property) => void;
  onViewOnMap: (property: Property) => void;
}

const customTestimonialsList = [
  {
    text: "This bespoke brokerage revolutionized our acquisition pipeline, managing absolute discretion and asset authenticity. The level of transaction safety was exemplary.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Operations Manager"
  },
  {
    text: "Acquiring our fully integrated modern smart villa was flawless. Their team's technical command and contract precision made training and custom setups effortless.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "IT Manager"
  },
  {
    text: "The advisory desk is exceptional, guiding us through private off-market listings and securing beautiful historical modern lofts.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Customer Support Lead"
  },
  {
    text: "Ranchi Brothers Estate's command of off-market listings and high-consequence asset trade is unparalleled. Highly recommended for elite level transactions.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO"
  },
  {
    text: "Their systematic advisory and due-diligence transformed our real estate portfolio management, making our acquisitions incredibly efficient.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Project Manager"
  },
  {
    text: "The quiet, off-market transaction process exceeded all expectations. They streamlined every single review and secured an architectural masterpiece.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Business Analyst"
  },
  {
    text: "They delivered an exemplary placement strategy that exceeded our high expectations, perfectly aligning our asset value with high-net-worth buyers.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Marketing Director"
  },
  {
    text: "Om Prakash and his team secured off-market deals that were otherwise completely inaccessible. Absolute lock-and-key discretion throughout.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Sales Manager"
  },
  {
    text: "Using Ranchi Brothers Estate's private buyer catalog, our asset acquisition of the Alibaug beach villa was perfect. An exceptional masterclass of white-glove brokerage.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "E-commerce Manager"
  }
];

const HousesIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 20H22" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="4" y="8" width="12" height="12" stroke="#1D1D1F" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="8" y="4" width="12" height="8" stroke="#1D1D1F" strokeWidth="1.5" strokeLinejoin="round" fill="white" />
    <rect x="6" y="14" width="3" height="6" fill="#B08968" stroke="#B08968" strokeWidth="1.2" />
    <rect x="10" y="6" width="6" height="4" stroke="#1D1D1F" strokeWidth="1.2" />
    <line x1="13" y1="6" x2="13" y2="10" stroke="#1D1D1F" strokeWidth="1" />
  </svg>
);

const ApartmentsIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 22H22" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="7" y="3" width="10" height="19" stroke="#1D1D1F" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M4 7H7M4 12H7M4 17H7" stroke="#B08968" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 9H20M17 14H20" stroke="#B08968" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="6" x2="14" y2="6" stroke="#1D1D1F" strokeWidth="1.2" />
    <line x1="10" y1="11" x2="14" y2="11" stroke="#1D1D1F" strokeWidth="1.2" />
    <line x1="10" y1="16" x2="14" y2="16" stroke="#1D1D1F" strokeWidth="1.2" />
  </svg>
);

const OfficeIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 22H22" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 22V6L13 3V22" stroke="#1D1D1F" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M13 22V10L18 8V22" stroke="#1D1D1F" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 22V18H14V22" fill="#B08968" stroke="#B08968" strokeWidth="1.2" />
    <line x1="8" y1="8" x2="8" y2="22" stroke="#1D1D1F" strokeWidth="1" strokeDasharray="2 2" />
    <line x1="16" y1="12" x2="16" y2="22" stroke="#1D1D1F" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

const TownhomeIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 21H22" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 21V10L10 6L13 10V21" stroke="#1D1D1F" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M13 21V12L17 9L20 12V21" stroke="#1D1D1F" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="6" y="16" width="2.5" height="5" fill="#B08968" stroke="#B08968" strokeWidth="1.2" />
    <rect x="15" y="16" width="2.5" height="5" fill="#B08968" stroke="#B08968" strokeWidth="1.2" />
    <line x1="4" y1="10" x2="10" y2="6" stroke="#1D1D1F" strokeWidth="1.5" />
    <line x1="13" y1="12" x2="17" y2="9" stroke="#1D1D1F" strokeWidth="1.5" />
  </svg>
);

const BungalowIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 21H22" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="4" y="11" width="13" height="10" stroke="#1D1D1F" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M2 11H19" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 21V14" stroke="#B08968" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 14C19 12.5 17.5 12 17.5 12" stroke="#B08968" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 14C21 12.5 22.5 12 22.5 12" stroke="#B08968" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 14C20 12 20 11 20 11" stroke="#B08968" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="7" y="14" width="5" height="7" stroke="#1D1D1F" strokeWidth="1.2" />
    <line x1="9.5" y1="14" x2="9.5" y2="21" stroke="#1D1D1F" strokeWidth="1" />
  </svg>
);

export default function Home({ setActivePage, setBuyFilters, onViewProperty, onViewOnMap }: HomeProps) {
  // Search state
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const featuredProperties = PROPERTIES.slice(0, 3);
  
  const firstColumn = customTestimonialsList.slice(0, 3);
  const secondColumn = customTestimonialsList.slice(3, 6);
  const thirdColumn = customTestimonialsList.slice(6, 9);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBuyFilters({
      location: searchLocation,
      type: searchType,
      priceRange: searchPrice
    });
    setActivePage('buy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTypeClick = (type: string) => {
    setBuyFilters({
      location: '',
      type: type,
      priceRange: ''
    });
    setActivePage('buy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-[#1D1D1F] bg-white pt-16">
      
      {/* FULL SCREEN HERO SECTION WITH HERO BACKGROUND */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
            alt="Minimalist Architecture Luxury Estate"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-neutral-950/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <span className="text-[11px] uppercase tracking-[0.4em] font-semibold text-neutral-300">
              Discretion &bull; Pedigree &bull; Legacy
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tightest leading-[1.05] max-w-4xl">
              Find Your Perfect Home
            </h1>
            <p className="text-sm sm:text-base text-neutral-200 font-light max-w-2xl mx-auto leading-relaxed">
              Experience Ranchi and India's finest private collection of architectural masterworks, custom estates, and off-market parcels.
            </p>
          </motion.div>

          {/* Search Form Card (Prinstine Bold Minimalist Light Card) */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSearchSubmit}
            className="w-full max-w-4xl bg-white/95 backdrop-blur-md border border-[#D2D2D7]/50 p-3 rounded-2xl md:rounded-full grid grid-cols-1 md:grid-cols-4 gap-3 items-center shadow-[0_8px_32px_rgba(0,0,0,0.12)] text-[#1D1D1F]"
          >
            {/* Location Filter */}
            <div className="flex items-center gap-2.5 px-5 border-b md:border-b-0 md:border-r border-[#D2D2D7]/60 pb-3 md:pb-0">
              <MapPin className="w-4 h-4 text-[#6E6E73] shrink-0" />
              <div className="w-full text-left">
                <label className="block text-[9px] uppercase tracking-widest font-bold text-[#6E6E73] mb-0.5">
                  Location
                </label>
                <select
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#1D1D1F] focus:outline-none appearance-none font-bold cursor-pointer"
                >
                  <option className="text-[#1D1D1F]" value="">All Areas</option>
                  <option className="text-[#1D1D1F]" value="Kanke">Kanke</option>
                  <option className="text-[#1D1D1F]" value="Bariatu">Bariatu</option>
                  <option className="text-[#1D1D1F]" value="Morabadi">Morabadi</option>
                  <option className="text-[#1D1D1F]" value="Lalpur">Lalpur</option>
                  <option className="text-[#1D1D1F]" value="Argora">Argora</option>
                  <option className="text-[#1D1D1F]" value="Harmu">Harmu</option>
                </select>
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2.5 px-5 border-b md:border-b-0 md:border-r border-[#D2D2D7]/60 pb-3 md:pb-0">
              <HomeIcon className="w-4 h-4 text-[#6E6E73] shrink-0" />
              <div className="w-full text-left">
                <label className="block text-[9px] uppercase tracking-widest font-bold text-[#6E6E73] mb-0.5">
                  Property Type
                </label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#1D1D1F] focus:outline-none appearance-none font-bold cursor-pointer"
                >
                  <option className="text-[#1D1D1F]" value="">All Types</option>
                  <option className="text-[#1D1D1F]" value="villa">Villas</option>
                  <option className="text-[#1D1D1F]" value="apartment">Apartments</option>
                  <option className="text-[#1D1D1F]" value="plot">Land Plots</option>
                </select>
              </div>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-2.5 px-5 border-b md:border-b-0 pb-3 md:pb-0">
              <IndianRupee className="w-4 h-4 text-[#6E6E73] shrink-0" />
              <div className="w-full text-left">
                <label className="block text-[9px] uppercase tracking-widest font-bold text-[#6E6E73] mb-0.5">
                  Price Limit
                </label>
                <select
                  value={searchPrice}
                  onChange={(e) => setSearchPrice(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#1D1D1F] focus:outline-none appearance-none font-bold cursor-pointer"
                >
                  <option className="text-[#1D1D1F]" value="">Any Range</option>
                  <option className="text-[#1D1D1F]" value="0-150000000">Below ₹15 Cr</option>
                  <option className="text-[#1D1D1F]" value="150000000-500000000">₹15 Cr - ₹50 Cr</option>
                  <option className="text-[#1D1D1F]" value="500000000-10000000000">₹50 Cr+</option>
                </select>
              </div>
            </div>

            {/* Action Submit */}
            <button
              type="submit"
              className="w-full bg-[#1D1D1F] hover:bg-neutral-800 text-white font-bold text-xs py-3.5 rounded-full md:rounded-full transition duration-300 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Portfolio</span>
            </button>
          </motion.form>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white border-y border-[#D2D2D7] py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center text-[#1D1D1F]">
          <div className="space-y-1">
            <p className="text-3xl font-display font-bold tracking-tightest">200+</p>
            <p className="text-[10px] uppercase tracking-widest text-[#6E6E73] font-bold">Homes Sold</p>
          </div>
          <div className="w-px h-8 bg-[#D2D2D7] hidden md:block" />
          <div className="space-y-1">
            <p className="text-3xl font-display font-bold tracking-tightest">15 Yrs</p>
            <p className="text-[10px] uppercase tracking-widest text-[#6E6E73] font-bold">Experience</p>
          </div>
          <div className="w-px h-8 bg-[#D2D2D7] hidden md:block" />
          <div className="space-y-1">
            <p className="text-3xl font-display font-bold tracking-tightest">98%</p>
            <p className="text-[10px] uppercase tracking-widest text-[#6E6E73] font-bold">Satisfaction</p>
          </div>
          <div className="w-px h-8 bg-[#D2D2D7] hidden md:block" />
          <div className="space-y-1">
            <p className="text-3xl font-display font-bold tracking-tightest">₹9,500 Cr</p>
            <p className="text-[10px] uppercase tracking-widest text-[#6E6E73] font-bold">Total Volume</p>
          </div>
        </div>
      </section>

      {/* PROPERTY TYPES SECTION - Elegant Premium Cards with subtle, sophisticated color accents */}
      <section className="py-20 bg-linear-to-b from-[#F5F5F7]/30 to-white px-6 md:px-12 border-b border-[#D2D2D7]/20 text-center">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#6E6E73] flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D1D1F]/40" />
              Property Types
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D1D1F]/40" />
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tightest text-[#1D1D1F]">
              Explore Property Types
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            
            {/* Houses */}
            <ScrollReveal delay={0.05}>
              <button
                onClick={() => handleTypeClick('villa')}
                className="w-full bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-[#1D1D1F]/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-full bg-[#FAF9F6] border border-[#D2D2D7]/30 flex items-center justify-center transition-all duration-300 group-hover:bg-[#B08968]/10 group-hover:border-[#B08968]/30 group-hover:scale-105 shadow-[0_4px_12px_rgba(29,29,31,0.02)] group-hover:shadow-[0_4px_16px_rgba(176,137,104,0.15)]">
                  <HousesIcon />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="font-display font-bold text-sm text-[#1D1D1F] tracking-tight">
                    Houses
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-[#6E6E73] font-semibold">
                    22 Properties
                  </p>
                </div>
              </button>
            </ScrollReveal>

            {/* Apartments */}
            <ScrollReveal delay={0.1}>
              <button
                onClick={() => handleTypeClick('apartment')}
                className="w-full bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-[#1D1D1F]/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-full bg-[#FAF9F6] border border-[#D2D2D7]/30 flex items-center justify-center transition-all duration-300 group-hover:bg-[#B08968]/10 group-hover:border-[#B08968]/30 group-hover:scale-105 shadow-[0_4px_12px_rgba(29,29,31,0.02)] group-hover:shadow-[0_4px_16px_rgba(176,137,104,0.15)]">
                  <ApartmentsIcon />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="font-display font-bold text-sm text-[#1D1D1F] tracking-tight">
                    Apartments
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-[#6E6E73] font-semibold">
                    32 Properties
                  </p>
                </div>
              </button>
            </ScrollReveal>

            {/* Office */}
            <ScrollReveal delay={0.15}>
              <button
                onClick={() => handleTypeClick('apartment')}
                className="w-full bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-[#1D1D1F]/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-full bg-[#FAF9F6] border border-[#D2D2D7]/30 flex items-center justify-center transition-all duration-300 group-hover:bg-[#B08968]/10 group-hover:border-[#B08968]/30 group-hover:scale-105 shadow-[0_4px_12px_rgba(29,29,31,0.02)] group-hover:shadow-[0_4px_16px_rgba(176,137,104,0.15)]">
                  <OfficeIcon />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="font-display font-bold text-sm text-[#1D1D1F] tracking-tight">
                    Office
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-[#6E6E73] font-semibold">
                    42 Properties
                  </p>
                </div>
              </button>
            </ScrollReveal>

            {/* Townhome */}
            <ScrollReveal delay={0.2}>
              <button
                onClick={() => handleTypeClick('villa')}
                className="w-full bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-[#1D1D1F]/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-full bg-[#FAF9F6] border border-[#D2D2D7]/30 flex items-center justify-center transition-all duration-300 group-hover:bg-[#B08968]/10 group-hover:border-[#B08968]/30 group-hover:scale-105 shadow-[0_4px_12px_rgba(29,29,31,0.02)] group-hover:shadow-[0_4px_16px_rgba(176,137,104,0.15)]">
                  <TownhomeIcon />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="font-display font-bold text-sm text-[#1D1D1F] tracking-tight">
                    Townhome
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-[#6E6E73] font-semibold">
                    16 Properties
                  </p>
                </div>
              </button>
            </ScrollReveal>

            {/* Bungalow */}
            <ScrollReveal delay={0.25}>
              <button
                onClick={() => handleTypeClick('plot')}
                className="w-full bg-white border border-[#D2D2D7]/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-[#1D1D1F]/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group col-span-2 lg:col-span-1"
              >
                <div className="w-14 h-14 rounded-full bg-[#FAF9F6] border border-[#D2D2D7]/30 flex items-center justify-center transition-all duration-300 group-hover:bg-[#B08968]/10 group-hover:border-[#B08968]/30 group-hover:scale-105 shadow-[0_4px_12px_rgba(29,29,31,0.02)] group-hover:shadow-[0_4px_16px_rgba(176,137,104,0.15)]">
                  <BungalowIcon />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="font-display font-bold text-sm text-[#1D1D1F] tracking-tight">
                    Bungalow
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-[#6E6E73] font-semibold">
                    40 Properties
                  </p>
                </div>
              </button>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* FEATURED LISTINGS SECTION (pure white bg, large padding) */}
      <section className="py-24 md:py-32 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#6E6E73]">
                Exceptional Assets
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tightest leading-tight text-[#1D1D1F]">
                Featured Residences.
              </h2>
            </div>
            <button
              onClick={() => {
                setBuyFilters({ location: '', type: '', priceRange: '' });
                setActivePage('buy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-semibold hover:underline flex items-center gap-1 text-[#1D1D1F] focus:outline-none cursor-pointer"
            >
              <span>Explore full listing catalogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {featuredProperties.map((property, idx) => (
              <ScrollReveal key={property.id} delay={idx * 0.15}>
                <div className="group bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-black text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">
                      {property.type}
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-1.5">
                      <h3 className="font-display font-bold text-lg leading-tight text-[#1D1D1F] truncate pr-2">
                        {property.name}
                      </h3>
                      <span className="text-lg font-bold text-[#1D1D1F] shrink-0">
                        {formatRupee(property.price)}
                      </span>
                    </div>
                    <p className="text-sm text-[#6E6E73] mb-4">
                      {property.location}
                    </p>

                    <p className="text-xs text-[#6E6E73] line-clamp-2 leading-relaxed mb-4">
                      {property.description}
                    </p>

                    <div className="flex gap-3.5 text-xs font-bold text-[#1D1D1F] border-t border-[#D2D2D7]/50 pt-4 mb-5">
                      {property.beds > 0 && (
                        <>
                          <span>{property.beds} Beds</span>
                          <span className="text-[#D2D2D7]">|</span>
                        </>
                      )}
                      {property.baths > 0 && (
                        <>
                          <span>{property.baths} Baths</span>
                          <span className="text-[#D2D2D7]">|</span>
                        </>
                      )}
                      <span>{property.sqft.toLocaleString()} SqFt</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        onClick={() => onViewOnMap(property)}
                        className="bg-[#1D1D1F] text-white hover:bg-neutral-800 text-center py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition duration-300 cursor-pointer shadow-sm border-none"
                      >
                        View on Map
                      </button>
                      <button
                        onClick={() => onViewProperty(property)}
                        className="bg-white hover:bg-neutral-50 border border-[#1D1D1F] text-[#1D1D1F] text-center py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition duration-300 cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUR SERVICES SECTION */}
      <section className="py-24 bg-[#F5F5F7]/30 px-6 md:px-12 border-t border-[#D2D2D7]/20 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Side: Services Info and Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            <div className="space-y-4">
              <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#B08968] block">
                / Our Services
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tightest leading-[1.1] text-[#1D1D1F] max-w-xl">
                We Make Real Estate Simple & Stress-Free.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Service 1 */}
              <ScrollReveal delay={0.05}>
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#D2D2D7]/30 shadow-xs hover:shadow-md transition-all duration-300 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-650 flex items-center justify-center">
                    <HomeIcon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-base text-[#1D1D1F]">
                      Buy a Home
                    </h3>
                    <p className="text-xs text-[#6E6E73] leading-relaxed font-light">
                      Find the perfect home for you.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Service 2 */}
              <ScrollReveal delay={0.1}>
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#D2D2D7]/30 shadow-xs hover:shadow-md transition-all duration-300 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-650 flex items-center justify-center">
                    <Handshake className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-base text-[#1D1D1F]">
                      Sell a Property
                    </h3>
                    <p className="text-xs text-[#6E6E73] leading-relaxed font-light">
                      Get the best price for your property.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Service 3 */}
              <ScrollReveal delay={0.15}>
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#D2D2D7]/30 shadow-xs hover:shadow-md transition-all duration-300 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-650 flex items-center justify-center">
                    <Key className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-base text-[#1D1D1F]">
                      Rent a Home
                    </h3>
                    <p className="text-xs text-[#6E6E73] leading-relaxed font-light">
                      Discover rental homes that fit your needs.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Service 4 */}
              <ScrollReveal delay={0.2}>
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#D2D2D7]/30 shadow-xs hover:shadow-md transition-all duration-300 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-650 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-base text-[#1D1D1F]">
                      Property Management
                    </h3>
                    <p className="text-xs text-[#6E6E73] leading-relaxed font-light">
                      We take care of your property, stress-free.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              
            </div>
          </div>

          {/* Right Side: Showcase image & bottom overlay */}
          <div className="lg:col-span-5 flex">
            <ScrollReveal className="w-full" direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-xs h-full min-h-[400px] lg:min-h-[500px] flex flex-col justify-end">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop"
                  alt="Luxury Interior Living Room"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900/60 to-transparent" />
                
                {/* Deep Green Banner overlay inspired by the design */}
                <div className="relative z-10 m-4 sm:m-6 p-6 bg-[#0B251C] text-white rounded-xl shadow-md border border-white/5">
                  <h3 className="text-lg md:text-xl font-display font-bold tracking-tight mb-2">
                    Your Dream Home is Just a Step Away.
                  </h3>
                  <p className="text-[11px] text-zinc-300/90 font-light leading-relaxed">
                    Curating architectural masterpieces under maximum privacy.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="py-24 bg-[#F5F5F7] px-6 md:px-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-xl mx-auto text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="border border-[#D2D2D7]/60 bg-white/60 py-1 px-4 rounded-full text-[10px] uppercase tracking-widest font-bold text-[#6E6E73]">
                Testimonials
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tightest leading-tight text-[#1D1D1F]">
              What our users say.
            </h2>
            <p className="text-center mt-3 text-xs md:text-sm text-[#6E6E73] leading-relaxed font-light">
              See what our customers have to say about our discreet white-glove advisory and off-market cataloging.
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[640px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US - ELITE ADVANTAGES (Premium Modern Split Section) */}
      <section className="py-24 md:py-32 bg-[#FAF9F6] px-6 md:px-12 border-t border-[#D2D2D7]/40 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Sticky Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#B08968] block">
                / The Ranchi Brothers Standard
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tightest leading-[1.1] text-[#1D1D1F] max-w-md">
                Why Clients Choose Us.
              </h2>
              <div className="w-12 h-[1px] bg-[#B08968]" />
              <p className="text-sm text-[#6E6E73] leading-relaxed font-light max-w-sm">
                We help you buy and sell homes without any stress. We keep your details private, give you access to the best properties, and guide you at every step.
              </p>
              
              <div className="hidden lg:block pt-8">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#1D1D1F] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B08968] animate-pulse" />
                  Support Team Available
                </div>
              </div>
            </div>

            {/* Right List Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Feature Row 1 */}
              <ScrollReveal delay={0.05}>
                <div className="group relative bg-white border border-[#D2D2D7]/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:border-[#1D1D1F]/20 transition-all duration-300">
                  <div className="flex items-start justify-between sm:justify-start gap-4">
                    <span className="font-serif text-3xl font-bold text-[#B08968]/30 group-hover:text-[#B08968] transition-colors duration-300">
                      01
                    </span>
                    <div className="w-12 h-12 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Lock className="w-5 h-5 stroke-[1.5]" />
                    </div>
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-display font-bold text-[18px] tracking-tight text-[#1D1D1F] group-hover:text-[#B08968] transition-colors duration-300">
                      Your Privacy is Protected
                    </h3>
                    <p className="text-[13px] text-[#6E6E73] leading-relaxed font-light">
                      We keep all your information completely private and safe. Whether you are looking at a property or closing a deal, your details are never shared with anyone.
                    </p>
                    <div className="inline-flex items-center gap-1.5 pt-2 text-[10px] uppercase font-bold tracking-wider text-[#1D1D1F]">
                      <span>100% Safe & Confidential</span>
                      <ArrowUpRight className="w-3 h-3 text-[#B08968]" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Feature Row 2 */}
              <ScrollReveal delay={0.1}>
                <div className="group relative bg-white border border-[#D2D2D7]/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:border-[#1D1D1F]/20 transition-all duration-300">
                  <div className="flex items-start justify-between sm:justify-start gap-4">
                    <span className="font-serif text-3xl font-bold text-[#B08968]/30 group-hover:text-[#B08968] transition-colors duration-300">
                      02
                    </span>
                    <div className="w-12 h-12 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Compass className="w-5 h-5 stroke-[1.5]" />
                    </div>
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-display font-bold text-[18px] tracking-tight text-[#1D1D1F] group-hover:text-[#B08968] transition-colors duration-300">
                      Hand-Picked Properties for You
                    </h3>
                    <p className="text-[13px] text-[#6E6E73] leading-relaxed font-light">
                      We carefully select the best homes and properties just for you. Many of our listings are not shown to the public, so you get access to options others cannot find on their own.
                    </p>
                    <div className="inline-flex items-center gap-1.5 pt-2 text-[10px] uppercase font-bold tracking-wider text-[#1D1D1F]">
                      <span>Properties Others Don't See</span>
                      <ArrowUpRight className="w-3 h-3 text-[#B08968]" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Feature Row 3 */}
              <ScrollReveal delay={0.15}>
                <div className="group relative bg-white border border-[#D2D2D7]/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] hover:border-[#1D1D1F]/20 transition-all duration-300">
                  <div className="flex items-start justify-between sm:justify-start gap-4">
                    <span className="font-serif text-3xl font-bold text-[#B08968]/30 group-hover:text-[#B08968] transition-colors duration-300">
                      03
                    </span>
                    <div className="w-12 h-12 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Award className="w-5 h-5 stroke-[1.5]" />
                    </div>
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-display font-bold text-[18px] tracking-tight text-[#1D1D1F] group-hover:text-[#B08968] transition-colors duration-300">
                      We Help You at Every Step
                    </h3>
                    <p className="text-[13px] text-[#6E6E73] leading-relaxed font-light">
                      From your first visit to the final paperwork, we are with you the whole way. We handle all the legal and technical work so you don't have to worry about a thing.
                    </p>
                    <div className="inline-flex items-center gap-1.5 pt-2 text-[10px] uppercase font-bold tracking-wider text-[#1D1D1F]">
                      <span>Complete Support, Start to Finish</span>
                      <ArrowUpRight className="w-3 h-3 text-[#B08968]" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>

            </div>

          </div>
        </div>
      </section>

      {/* ABOUT AGENT SNIPPET (light grey bg) */}
      <section className="py-24 md:py-32 bg-[#F5F5F7] px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            
            {/* Left Col: Agent Photo */}
            <div className="md:col-span-5">
              <ScrollReveal direction="right">
                <div className="relative rounded-2xl overflow-hidden aspect-3/4 max-w-sm mx-auto shadow-xl">
                  <img
                    src={AGENT_INFO.photo}
                    alt={AGENT_INFO.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-6 md:p-8">
                    <div>
                      <h4 className="text-xl font-bold text-white">{AGENT_INFO.name}</h4>
                      <p className="text-xs text-neutral-300 font-medium">{AGENT_INFO.title}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Col: Short Bio Snippet */}
            <div className="md:col-span-7 space-y-6">
              <ScrollReveal direction="left">
                <div className="space-y-4">
                  <span className="text-[11px] uppercase tracking-widest font-bold text-[#6E6E73] block">
                    Meet the Broker
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tightest leading-tight text-[#1D1D1F]">
                    An Unwavering Trust.
                  </h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed font-light">
                    {AGENT_INFO.bio}
                  </p>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    "I believe luxury is not defined by volume or excessive decoration, but by the silence of bespoke solutions. My passion lies in capturing precise outcomes for our clients under total anonymity."
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setActivePage('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-[#1D1D1F] text-white hover:bg-neutral-800 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition duration-300 cursor-pointer"
                  >
                    Meet {AGENT_INFO.name}
                  </button>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* AREAS WE SERVE - NEIGHBORHOODS GRAPH */}
      <section className="py-24 md:py-32 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-block bg-[#FFF0EE] text-[#FF5A5F] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
              Top Locations
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tightest text-[#1D1D1F]">
              Popular Localities in Ranchi
            </h2>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              Discover the most sought-after neighborhoods for your next home
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEIGHBORHOODS.map((area, idx) => (
              <ScrollReveal key={area.id} delay={idx * 0.1}>
                <div className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-lg transition-all duration-500">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 filter brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5 md:p-6 space-y-2 text-white">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-300">
                      Average Entry {area.avgPrice}
                    </span>
                    <h4 className="text-lg font-bold tracking-tight">{area.name}</h4>
                    <p className="text-[10px] text-neutral-200 line-clamp-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {area.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCING & MORTGAGE PLANNING */}
      <section className="py-24 md:py-32 bg-white px-6 md:px-12 border-t border-[#D2D2D7]/40 text-left">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#6E6E73]">
              Financial Planning
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tightest text-[#1D1D1F]">
              Mortgage Calculator.
            </h2>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              Estimate your monthly payments and customize interest rates, down payments, and loan terms.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <MortgageCalculator />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* KNOWLEDGE HUB - FAQ SECTION */}
      <section className="py-24 bg-white px-6 md:px-12 border-t border-[#D2D2D7]/40 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Side: FAQs List */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            <div className="space-y-4">
              <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#B08968] block">
                / Knowledge Hub
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tightest leading-[1.1] text-[#1D1D1F]">
                Everything You Need to Know
              </h2>
            </div>

            <div className="space-y-1.5 max-w-2xl">
              {[
                {
                  q: "How do I buy a property?",
                  a: "Just browse our listings, pick a property you like, and call or message us to book a visit. We will take care of all the paperwork and negotiations so the process is smooth and easy for you."
                },
                {
                  q: "How do I sell my property?",
                  a: "Contact us and we will come to see your property and give you a fair price estimate. We will then find the right buyers and handle the entire selling process on your behalf."
                },
                {
                  q: "What documents are required?",
                  a: "You will typically need your ID proof, address proof, and ownership papers for the property. Our team will guide you on exactly what is needed based on your situation."
                },
                {
                  q: "How is property value calculated?",
                  a: "We look at the location, size, age, condition, and nearby facilities of the property, as well as current market prices in the area, to give you a fair and accurate value."
                },
                {
                  q: "Do you help with home loans?",
                  a: "Yes, we do. We work with several banks and lenders who can offer you good home loan options. We will help you compare rates and choose the one that fits your budget."
                }
              ].map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="border-b border-neutral-100 py-3 sm:py-4">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex justify-between items-center text-left py-1 text-sm font-semibold tracking-tight text-[#1D1D1F] hover:text-[#B08968] transition cursor-pointer select-none"
                    >
                      <span>{faq.q}</span>
                      <span className="text-lg text-[#B08968] pl-4">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-[#6E6E73] leading-relaxed font-light pt-2 pb-1 pr-6">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Showcase Kitchen layout + Dark Green block */}
          <div className="lg:col-span-5 flex">
            <ScrollReveal className="w-full" direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-xs h-full min-h-[400px] lg:min-h-[500px] flex flex-col justify-end">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
                  alt="Modern Luxury Real Estate"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900/60 to-transparent" />
                
                {/* Deep Teal/Green Contact card matching layout precisely */}
                <div className="relative z-10 m-4 sm:m-6 p-6 bg-[#0E2F24] text-white rounded-xl shadow-md border border-white/5 space-y-4 text-left">
                  <div className="space-y-1">
                    <h3 className="text-xl font-display font-bold tracking-tight">
                      Need Help?
                    </h3>
                    <p className="text-xs text-zinc-350 font-light leading-relaxed">
                      Our experts are here to assist you with any questions.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setActivePage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-[#B08968] hover:bg-[#9C7554] text-white text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all cursor-pointer shadow-xs"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="bg-[#1D1D1F] text-white py-24 md:py-32 px-6 text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto space-y-8 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-neutral-400">
              Begin Your Journey
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tightest leading-tight text-white max-w-2xl">
              Ready to Buy or Sell? Let's Talk.
            </h2>
            <p className="text-xs sm:text-sm text-[#86868B] font-light max-w-md mx-auto leading-relaxed">
              Arrange a private briefing, list an architectural asset, or request off-market catalogues under complete confidentiality.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white text-[#1D1D1F] hover:bg-neutral-100 px-10 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition duration-300 cursor-pointer shadow-md"
              >
                Arrange Consult
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
