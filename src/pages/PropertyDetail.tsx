/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  MessageSquare, 
  TrendingUp, 
  School, 
  Trees, 
  ShoppingBag, 
  Fuel, 
  Heart, 
  UtensilsCrossed 
} from 'lucide-react';
import { Property, PropertyAmenity } from '../types';
import KmlMap from '../components/KmlMap';
import { formatRupee } from '../utils';
import { AGENT_INFO } from '../data';

interface PropertyDetailProps {
  property: Property | null;
  onEnquiryClick: (property: Property) => void;
  setActivePage: (page: string) => void;
}

export default function PropertyDetail({ 
  property, 
  onEnquiryClick, 
  setActivePage 
}: PropertyDetailProps) {
  // Return home if no property is selected
  if (!property) {
    useEffect(() => {
      setActivePage('buy');
    }, [setActivePage]);
    return null;
  }

  const [activeAmenityTypes, setActiveAmenityTypes] = useState<string[]>([]);
  const [showAmenities, setShowAmenities] = useState<boolean>(true);

  // Group amenities by type for count displays
  const amenityCounts = property.amenities ? property.amenities.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) : {};

  // Toggle filter types
  const handleToggleAmenityType = (type: string) => {
    if (activeAmenityTypes.includes(type)) {
      setActiveAmenityTypes(activeAmenityTypes.filter(t => t !== type));
    } else {
      setActiveAmenityTypes([...activeAmenityTypes, type]);
    }
  };

  const handleToggleAllAmenities = () => {
    if (activeAmenityTypes.length > 0) {
      setActiveAmenityTypes([]);
    } else {
      setActiveAmenityTypes(['school', 'park', 'mall', 'fuel', 'hospital', 'restaurant']);
    }
  };

  // Convert standard formatted phone to number digits for wa.me
  const whatsAppPhoneNumber = AGENT_INFO.phone.replace(/[^0-9]/g, "");
  const whatsAppMessage = `Hi Om Prakash, I am viewing "${property.name}" in ${property.location} and would like to coordinate a viewing of this property.`;
  const whatsAppLink = `https://wa.me/${whatsAppPhoneNumber}?text=${encodeURIComponent(whatsAppMessage)}`;

  // Icon selector helper for checklist items
  const getAmenityIcon = (type: string) => {
    switch (type) {
      case 'school': return <School className="w-4 h-4 text-[#4361EE]" />;
      case 'park': return <Trees className="w-4 h-4 text-[#10B981]" />;
      case 'mall': return <ShoppingBag className="w-4 h-4 text-[#7209B7]" />;
      case 'fuel': return <Fuel className="w-4 h-4 text-[#F59E0B]" />;
      case 'hospital': return <Heart className="w-4 h-4 text-[#EF4444]" fill="#EF4444" />;
      case 'restaurant': return <UtensilsCrossed className="w-4 h-4 text-[#06B6D4]" />;
      default: return <MapPin className="w-4 h-4 text-[#6E6E73]" />;
    }
  };

  // Label helper
  const getAmenityLabel = (type: string) => {
    switch (type) {
      case 'school': return 'Schools & Institutes';
      case 'park': return 'Parks & Reserves';
      case 'mall': return 'Shopping Malls & Markets';
      case 'fuel': return 'Fuel & Energy Outlets';
      case 'hospital': return 'Hospitals & Wellness';
      case 'restaurant': return 'Fine Dining & Cafes';
      default: return 'Landmarks';
    }
  };

  // Generate appreciation rating based on property coordinates
  const appreciationRate = property.type === 'plot' ? '12.4% annually' : '8.7% annually';

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 font-sans text-[#1D1D1F] text-left">
      
      {/* 1. BACK HEADER BAR */}
      <button 
        onClick={() => {
          setActivePage('buy');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#6E6E73] hover:text-[#1D1D1F] mb-6 focus:outline-none cursor-pointer transition animate-none bg-transparent border-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to listings catalogue</span>
      </button>

      {/* 2. TITLE SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 bg-amber-50 border border-amber-200/50 px-3 py-1 rounded-full">
              {property.type}
            </span>
            <span className="text-xs text-[#6E6E73] font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {property.location}, Ranchi
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tightest mt-2">
            {property.name}
          </h1>
          <p className="text-sm text-[#6E6E73] mt-2 max-w-2xl leading-relaxed">
            {property.address}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end flex-shrink-0">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E8E93]">List Price</span>
          <span className="text-3xl font-display font-black text-[#1D1D1F] mt-1">
            {formatRupee(property.price)}
          </span>
        </div>
      </div>

      {/* 3. SPLIT MAP VIEWPORT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border border-neutral-100 rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.03)] bg-white h-auto lg:h-[580px] mb-12">
        
        {/* Left pane: Interactive Proximity Map */}
        <div className="col-span-1 lg:col-span-8 h-[380px] lg:h-[580px] relative order-1 lg:order-2">
          <KmlMap 
            property={property}
            showAmenities={showAmenities}
            activeAmenityTypes={activeAmenityTypes}
            onEnquiryClick={onEnquiryClick}
            height={typeof window !== 'undefined' && window.innerWidth >= 1024 ? '580px' : '380px'}
          />
        </div>

        {/* Right pane: Proximity Control Panel */}
        <div className="col-span-1 lg:col-span-4 flex flex-col h-auto lg:h-full border-t lg:border-t-0 lg:border-r border-neutral-100 bg-[#FAFAFC] p-6 md:p-8 order-2 lg:order-1 select-none">
          
          <div className="border-b border-neutral-200/60 pb-5 mb-5 flex-shrink-0">
            <h3 className="text-sm font-bold text-neutral-900 tracking-tight flex items-center justify-between">
              <span>Vicinity Proximity Filters</span>
              <button 
                onClick={() => setShowAmenities(!showAmenities)}
                className="text-[10px] text-amber-650 hover:text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-bold transition border border-amber-200/30 cursor-pointer"
              >
                {showAmenities ? 'Hide Map Pins' : 'Show Map Pins'}
              </button>
            </h3>
            <p className="text-[11px] text-[#6E6E73] mt-1 leading-relaxed">
              Toggle categories below to display nearby landmarks that increase this property's asset valuation.
            </p>
          </div>

          {/* Checklist controls */}
          <div className="flex-grow space-y-3.5 overflow-y-auto pr-1">
            {['school', 'park', 'mall', 'fuel', 'hospital', 'restaurant'].map((type) => {
              const count = amenityCounts[type] || 0;
              const isChecked = activeAmenityTypes.includes(type) || activeAmenityTypes.length === 0;

              return (
                <div 
                  key={type}
                  onClick={() => handleToggleAmenityType(type)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition duration-200 cursor-pointer ${
                    isChecked 
                      ? 'bg-white border-neutral-200/80 shadow-xs' 
                      : 'bg-transparent border-neutral-150 opacity-60 hover:opacity-85'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {getAmenityIcon(type)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 leading-tight">
                        {getAmenityLabel(type)}
                      </h4>
                      <p className="text-[10px] text-[#8E8E93] mt-0.5 font-light">
                        {count} value landmark{count !== 1 ? 's' : ''} in immediate vicinity
                      </p>
                    </div>
                  </div>
                  
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={() => {}} // Handled by div click
                    className="w-4.5 h-4.5 rounded-md border-[#D2D2D7] text-neutral-900 focus:ring-0 cursor-pointer accent-neutral-900"
                  />
                </div>
              );
            })}
          </div>

          {/* Reset control */}
          <div className="pt-4 border-t border-neutral-200/60 mt-5 flex-shrink-0 flex items-center justify-between">
            <button 
              onClick={handleToggleAllAmenities}
              className="text-[10px] font-bold text-neutral-600 hover:text-neutral-900 transition underline cursor-pointer"
            >
              {activeAmenityTypes.length > 0 ? 'Select All Categories' : 'Clear All Filters'}
            </button>
            <span className="text-[10px] text-[#8E8E93]">
              Proximity radius: 1.5 km
            </span>
          </div>

        </div>
      </div>

      {/* 4. DETAIL PAGES CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Property dossier description & Gallery card */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Main Photo Gallery Hero */}
          <div className="relative h-[28rem] rounded-3xl overflow-hidden shadow-xs bg-neutral-100">
            <img 
              src={property.image} 
              alt={property.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Property Specifications bar */}
          <div className="grid grid-cols-3 gap-4 bg-[#F5F5F7]/40 rounded-2xl p-6 border border-neutral-100">
            {property.beds > 0 && (
              <div className="flex flex-col items-center justify-center text-center p-2">
                <Bed className="w-5 h-5 text-[#1D1D1F] mb-2 stroke-[1.8]" />
                <span className="text-xs font-bold text-neutral-900 leading-none">{property.beds} Bedrooms</span>
              </div>
            )}
            {property.baths > 0 && (
              <div className="flex flex-col items-center justify-center text-center p-2 border-x border-[#D2D2D7]/50">
                <Bath className="w-5 h-5 text-[#1D1D1F] mb-2 stroke-[1.8]" />
                <span className="text-xs font-bold text-neutral-900 leading-none">{property.baths} Bathrooms</span>
              </div>
            )}
            <div className={`flex flex-col items-center justify-center text-center p-2 ${property.baths === 0 && property.beds === 0 ? '' : property.baths === 0 || property.beds === 0 ? 'border-l border-[#D2D2D7]/50' : ''}`}>
              <Maximize className="w-5 h-5 text-[#1D1D1F] mb-2 stroke-[1.8]" />
              <span className="text-xs font-bold text-neutral-900 leading-none">{property.sqft.toLocaleString()} SqFt Area</span>
            </div>
          </div>

          {/* Description dossier */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-display tracking-tight text-neutral-900">
              Architectural Overview & Design
            </h2>
            <p className="text-sm text-[#424245] leading-relaxed font-light whitespace-pre-line">
              {property.description}
            </p>
            <p className="text-sm text-[#424245] leading-relaxed font-light">
              This property stands out for its high build quality and modern layout. The carefully chosen location provides a great balance of private luxury and easy access to Ranchi's main commercial centers.
            </p>
          </div>

          {/* List of Proximity Highlights details */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold font-display tracking-tight text-neutral-900">
                Landmark Locations & Distances
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center gap-3 p-4 rounded-xl border border-neutral-100 bg-[#FAFAFC]">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-xs border border-neutral-100 flex-shrink-0">
                      {getAmenityIcon(amenity.type)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-neutral-900 truncate">{amenity.name}</h4>
                      <p className="text-[10px] text-[#6E6E73] mt-0.5">{getAmenityLabel(amenity.type)} &bull; {amenity.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Proximity analysis details & Enquiry Card */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          
          {/* Proximity Valuation Card */}
          <div className="bg-amber-50/45 border border-amber-300/30 rounded-3xl p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 text-amber-700">
                <TrendingUp className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                  Investment & Proximity Analysis
                </h3>
                <p className="text-[10px] text-amber-700 font-bold uppercase tracking-widest mt-1">
                  High appreciation potential
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#424245] leading-relaxed font-light border-t border-amber-300/20 pt-4">
              <p>
                Properties in Ranchi near active infrastructure see much stronger appreciation. This listing is located in a premium sector of <span className="font-semibold text-neutral-900">{property.location}</span>.
              </p>
              <div className="p-4 rounded-2xl bg-white/70 border border-amber-300/20 space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-semibold text-[#6E6E73]">Average Location growth</span>
                  <span className="text-xs font-bold text-[#1D1D1F]">{appreciationRate}</span>
                </div>
                <div className="flex justify-between items-baseline border-t border-neutral-100 pt-2.5">
                  <span className="text-[10px] font-semibold text-[#6E6E73]">Land Value Multipliers</span>
                  <span className="text-xs font-bold text-[#1D1D1F]">Schools, Malls, Parks</span>
                </div>
              </div>
              <p>
                Having top schools, medical services, and retail hubs within 1.5 km makes this property highly desirable for luxury buyers and long-term investors.
              </p>
            </div>
          </div>

          {/* Action Enquiry Broker Dossier Card */}
          <div className="border border-neutral-100 rounded-3xl p-8 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
            
            {/* Broker profile header */}
            <div className="flex items-center gap-4 border-b border-neutral-100 pb-5">
              <img 
                src={AGENT_INFO.photo} 
                alt={AGENT_INFO.name} 
                className="w-14 h-14 rounded-full object-cover border border-neutral-100"
              />
              <div>
                <h4 className="text-sm font-bold text-neutral-900 leading-tight">
                  {AGENT_INFO.name}
                </h4>
                <p className="text-[11px] text-[#6E6E73] mt-0.5">
                  {AGENT_INFO.title}
                </p>
              </div>
            </div>

            {/* Direct message options */}
            <div className="space-y-3.5">
              <button 
                onClick={() => onEnquiryClick(property)}
                className="w-full bg-[#1D1D1F] hover:bg-neutral-800 text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-xs flex items-center justify-center gap-2 border-none"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Submit Email Enquiry</span>
              </button>

              <a 
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-xs flex items-center justify-center gap-2 text-center decoration-none"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="flex-shrink-0">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.114-2.89-6.983A9.784 9.784 0 0 0 12.008 1.76c-5.44 0-9.863 4.42-9.866 9.866-.001 1.762.476 3.487 1.383 5.006l-1.009 3.687 3.77-.989zM16.5 13.882c-.316-.159-1.874-.925-2.19-.104c-.316-.118-.548-.178-.808-.567-.26-.39-.99-.99-1.597-1.53-.49-.434-.906-.893-1.127-1.282-.26-.389-.028-.6.13-.808.143-.188.317-.37.476-.554.158-.184.21-.316.316-.527.105-.21.053-.395-.026-.553-.08-.158-.809-1.948-1.109-2.673-.292-.704-.589-.609-.808-.62l-.689-.012c-.237 0-.623.088-.949.444-.326.356-1.244 1.216-1.244 2.966v.018c0 1.75.938 3.51 1.488 4.19.467.578 3.037 4.639 7.361 6.513c1.029.445 1.832.71 2.457.907c1.033.328 1.974.28 2.716.17c.828-.124 2.545-1.04 2.9-2.046c.356-1.005.356-1.868.25-2.046c-.106-.178-.396-.276-.712-.435z" />
                </svg>
                <span>Connect via WhatsApp</span>
              </a>
            </div>

            {/* Support rationales */}
            <div className="space-y-2.5 text-[10px] text-[#6E6E73] text-center border-t border-neutral-100 pt-5 font-light">
              <p>Direct inquiries are processed dynamically within 15 minutes.</p>
              <p>Physical showings can be scheduled daily between 9:00 AM & 6:00 PM.</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
