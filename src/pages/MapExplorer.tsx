/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROPERTIES } from '../data';
import { Property } from '../types';
import KmlMap from '../components/KmlMap';
import { formatRupee } from '../utils';

interface MapExplorerProps {
  selectedProperty: Property | null;
  onSelectProperty: (property: Property | null) => void;
  onViewProperty: (property: Property) => void;
}

export default function MapExplorer({ 
  selectedProperty, 
  onSelectProperty, 
  onViewProperty 
}: MapExplorerProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 font-sans">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E6E73] bg-[#F5F5F7] px-3 py-1 rounded-full">
            Geospatial Portfolio Viewer
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tightest mt-2 text-[#1D1D1F]">
            Interactive Property Map
          </h1>
          <p className="text-sm text-[#6E6E73] mt-2 max-w-xl leading-relaxed">
            Explore Ranchi's finest listings mapped dynamically. Click any property house marker to view detailed previews and submit enquiries instantly.
          </p>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 border border-neutral-100 rounded-2xl overflow-hidden shadow-xs bg-white h-auto lg:h-[650px] gap-0 lg:gap-8">
        
        {/* Sidebar panel (30% width) */}
        <div className="w-full lg:col-span-4 flex flex-col h-[300px] lg:h-full border-b lg:border-b-0 lg:border-r border-neutral-100 bg-[#FAFAFC]">
          
          <div className="p-4 border-b border-neutral-100 bg-white flex-shrink-0">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#6E6E73] px-1">
              Estate Listings ({PROPERTIES.length})
            </h3>
          </div>

          {/* List content */}
          <div className="flex-grow overflow-y-auto min-h-0 p-4 space-y-2.5">
            {PROPERTIES.map((prop) => (
              <div
                key={prop.id}
                onClick={() => onSelectProperty(prop)}
                className={`flex items-start gap-3 p-3 rounded-xl border transition duration-200 cursor-pointer ${
                  selectedProperty?.id === prop.id
                    ? 'bg-white border-amber-400 shadow-sm'
                    : 'bg-white hover:bg-white/70 border-neutral-100'
                }`}
              >
                <img
                  src={prop.image}
                  alt={prop.name}
                  className="w-14 h-14 object-cover rounded-lg border border-neutral-100 flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                      {prop.type}
                    </span>
                    <span className="text-xs font-bold text-neutral-900">{formatRupee(prop.price)}</span>
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 mt-1 truncate">{prop.name}</h4>
                  <p className="text-[9px] text-[#6E6E73] mt-0.5 truncate">{prop.location} &bull; {prop.sqft} sqft</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Active selection detail footer in sidebar (Mobile/Tablet only) */}
          {selectedProperty && (
            <div className="lg:hidden p-4 border-t border-neutral-100 bg-white flex flex-col gap-3 flex-shrink-0 select-none">
              <div className="flex justify-between items-baseline min-w-0">
                <span className="text-xs font-bold text-neutral-900 truncate mr-2">{selectedProperty.name}</span>
                <span className="text-[10px] font-bold text-[#B08968] flex-shrink-0">{formatRupee(selectedProperty.price)}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onViewProperty(selectedProperty)}
                  className="flex-grow py-2.5 bg-neutral-900 text-white rounded-full text-[10px] font-extrabold uppercase tracking-wider transition hover:bg-neutral-800 cursor-pointer text-center border-none shadow-xs"
                >
                  Send Enquiry
                </button>
                <button
                  type="button"
                  onClick={() => onSelectProperty(null)}
                  className="px-5 py-2.5 border border-neutral-300 text-neutral-800 rounded-full text-[10px] font-extrabold uppercase tracking-wider hover:bg-[#F5F5F7] cursor-pointer transition shadow-xs"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
          
          {/* Sidebar panel */}
        </div>

        {/* Map Canvas (70% width) */}
        <div className="w-full lg:col-span-8 h-[350px] lg:h-[650px] relative">
          <KmlMap 
            property={selectedProperty} 
            allProperties={PROPERTIES} 
            onSelectProperty={onSelectProperty}
            onEnquiryClick={onViewProperty}
            height={typeof window !== 'undefined' && window.innerWidth >= 1024 ? '650px' : '350px'} 
          />
        </div>
      </div>
    </div>
  );
}
