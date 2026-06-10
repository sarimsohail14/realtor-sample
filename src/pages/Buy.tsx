/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, MapPin, Building, IndianRupee, BedDouble, RefreshCw } from 'lucide-react';
import { PROPERTIES } from '../data';
import { Property } from '../types';
import ScrollReveal from '../components/ScrollReveal';
import MortgageCalculator from '../components/MortgageCalculator';
import { formatRupee } from '../utils';

interface BuyProps {
  filters: {
    location: string;
    type: string;
    priceRange: string;
  };
  setFilters: (filters: { location: string; type: string; priceRange: string }) => void;
  onEnquiryClick: (property: Property) => void;
  onViewProperty: (property: Property) => void;
}

export default function Buy({ filters, setFilters, onEnquiryClick, onViewProperty }: BuyProps) {
  const [selectedBeds, setSelectedBeds] = useState<string>('all');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(PROPERTIES);

  // Sync internal search calculations
  useEffect(() => {
    let result = PROPERTIES;

    // Filter by location
    if (filters.location) {
      result = result.filter(
        (p) => p.location.toLowerCase() === filters.location.toLowerCase()
      );
    }

    // Filter by property type
    if (filters.type) {
      result = result.filter(
        (p) => p.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      const [minStr, maxStr] = filters.priceRange.split('-');
      const min = parseInt(minStr) || 0;
      const max = parseInt(maxStr) || Infinity;
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // Filter by bedrooms
    if (selectedBeds !== 'all') {
      const bedsNum = parseInt(selectedBeds);
      if (bedsNum === 5) {
        result = result.filter((p) => p.beds >= 5);
      } else {
        result = result.filter((p) => p.beds === bedsNum);
      }
    }

    setFilteredProperties(result);
  }, [filters, selectedBeds]);

  const handleClearFilters = () => {
    setFilters({ location: '', type: '', priceRange: '' });
    setSelectedBeds('all');
  };

  return (
    <div className="font-sans text-[#1D1D1F] bg-white pt-24 min-h-screen">
      
      {/* PAGE HERO */}
      <section className="bg-white py-16 md:py-24 border-b border-[#D2D2D7]/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-[#6E6E73] block">
            Exclusive Catalogues
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tightest leading-tight text-[#1D1D1F]">
            Browse Available Properties.
          </h1>
          <p className="text-sm text-[#6E6E73] max-w-xl mx-auto leading-relaxed font-light">
            Each listing has been vetted to meet uncompromising parameters of architectural pedigree, site geography, and financial carry structure.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-[61px] z-20 bg-white border-b border-[#D2D2D7] py-4 shadow-xs px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 text-[#1D1D1F]">
            <SlidersHorizontal className="w-4 h-4 text-[#1D1D1F]" />
            <span className="text-xs font-bold uppercase tracking-wider">Configure Filter Specs</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1 lg:max-w-4xl text-[11px]">
            {/* Location Selector */}
            <div className="relative border border-[#D2D2D7] hover:border-neutral-800 rounded-lg bg-white overflow-hidden transition">
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full pl-3 pr-8 py-2 bg-transparent text-[#1D1D1F] focus:outline-none appearance-none font-medium cursor-pointer"
              >
                <option value="">All Locations</option>
                <option value="Malabar Hill">Malabar Hill</option>
                <option value="Koramangala">Koramangala</option>
                <option value="Lutyens' Delhi">Lutyens' Delhi</option>
                <option value="Worli Sea Face">Worli Sea Face</option>
                <option value="Jubilee Hills">Jubilee Hills</option>
                <option value="ECR Beachfront">ECR Beachfront</option>
              </select>
              <MapPin className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-[#6E6E73] pointer-events-none" />
            </div>

            {/* Property Type Selector */}
            <div className="relative border border-[#D2D2D7] hover:border-neutral-800 rounded-lg bg-white overflow-hidden transition">
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full pl-3 pr-8 py-2 bg-transparent text-[#1D1D1F] focus:outline-none appearance-none font-medium cursor-pointer"
              >
                <option value="">All Property Types</option>
                <option value="villa">Villas</option>
                <option value="apartment">Penthouse/Apartment</option>
                <option value="plot">Approved Plots</option>
              </select>
              <Building className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-[#6E6E73] pointer-events-none" />
            </div>

            {/* Price Selector */}
            <div className="relative border border-[#D2D2D7] hover:border-neutral-800 rounded-lg bg-white overflow-hidden transition">
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full pl-3 pr-8 py-2 bg-transparent text-[#1D1D1F] focus:outline-none appearance-none font-medium cursor-pointer"
              >
                <option value="">All Price Limits</option>
                <option value="0-150000000">Below ₹15 Cr</option>
                <option value="150000000-500000000">₹15 Cr - ₹50 Cr</option>
                <option value="500000000-10000000000">₹50 Cr+</option>
              </select>
              <IndianRupee className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-[#6E6E73] pointer-events-none" />
            </div>

            {/* Bedroom Selector */}
            <div className="relative border border-[#D2D2D7] hover:border-neutral-800 rounded-lg bg-white overflow-hidden transition">
              <select
                value={selectedBeds}
                onChange={(e) => setSelectedBeds(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-transparent text-[#1D1D1F] focus:outline-none appearance-none font-medium cursor-pointer"
              >
                <option value="all">Any Bedrooms</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
              <BedDouble className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-[#6E6E73] pointer-events-none" />
            </div>
          </div>

          {/* Reset Filters Option */}
          {(filters.location || filters.type || filters.priceRange || selectedBeds !== 'all') && (
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 border border-[#1D1D1F] hover:bg-neutral-50 text-[#1D1D1F] rounded-lg transition duration-200 flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}

        </div>
      </section>

      {/* PROPERTIES LISTING GRID */}
      <section className="py-20 bg-[#F5F5F7] px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-100 p-16 text-center shadow-xs">
              <h4 className="text-xl font-bold text-[#1D1D1F] tracking-tight">No Matching Architectural Assets</h4>
              <p className="text-xs text-[#6E6E73] max-w-sm mx-auto mt-2 leading-relaxed">
                We currently do not hold listings matching those precise specifications. Try widening your criteria parameters or resetting standard filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-6 bg-[#1D1D1F] text-white hover:bg-neutral-800 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition"
              >
                Show All Available Listings
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6E6E73] font-medium">
                  Showing {filteredProperties.length} architectural estates
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property, idx) => (
                  <ScrollReveal key={property.id} delay={idx % 3 * 0.1}>
                    <div className="group bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-xl transition-all duration-300">
                      
                      {/* Image Frame */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={property.image}
                          alt={property.name}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-black text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">
                          {property.type}
                        </div>
                      </div>

                      {/* Content Frame */}
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
                          {/* Details Button */}
                          <button
                            onClick={() => onViewProperty(property)}
                            className="bg-white hover:bg-neutral-50 border border-[#1D1D1F] text-[#1D1D1F] text-center py-2.5 rounded-full text-xs font-bold uppercase transition cursor-pointer"
                          >
                            View Details
                          </button>
                          
                          {/* Send Enquiry Button */}
                          <button
                            onClick={() => onEnquiryClick(property)}
                            className="bg-[#1D1D1F] hover:bg-neutral-800 text-white text-center py-2.5 rounded-full text-xs font-bold tracking-tight uppercase transition cursor-pointer"
                          >
                            Send Enquiry
                          </button>
                        </div>
                      </div>

                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </>
          )}

        </div>
      </section>

      {/* MORTGAGE CALCULATOR MODULE */}
      <section className="py-24 md:py-32 bg-white px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#6E6E73]">
              Acquisition Finance
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tightest leading-tight text-[#1D1D1F]">
              Mortgage Economics.
            </h2>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              Plan acquisition pricing models against real-time interest configurations.
            </p>
          </div>

          <ScrollReveal>
            <MortgageCalculator initialPrice={filteredProperties[0]?.price || 485000000} />
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
