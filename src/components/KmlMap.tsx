/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Property } from '../types';
import { formatRupee } from '../utils';

interface KmlMapProps {
  property?: Property | null; // If provided, shows individual property mode (centers on it)
  allProperties?: Property[]; // For global overview mode (shows all listings)
  onSelectProperty?: (property: Property) => void;
  onEnquiryClick?: (property: Property) => void;
  height?: string;
}

// Custom hook to load Leaflet from CDN
function useLeaflet() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check if Leaflet is already loaded globally
    if ((window as any).L) {
      setReady(true);
      return;
    }

    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => setReady(true);
    document.body.appendChild(script);

    return () => {
      // Keep style & script loaded globally for subsequent mounts
    };
  }, []);

  return ready;
}

export default function KmlMap({
  property,
  allProperties = [],
  onSelectProperty,
  onEnquiryClick,
  height = '400px',
}: KmlMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const leafletReady = useLeaflet();

  // Initialize and update the map
  useEffect(() => {
    if (!leafletReady || !mapContainerRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Clear existing map instance if any
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Determine initial center and zoom
    let center: [number, number] = [23.3901, 85.3584]; // Ranchi center
    let zoom = 13;

    if (property && property.coordinates) {
      center = property.coordinates;
      zoom = 14;
    } else if (allProperties.length > 0 && allProperties[0].coordinates) {
      center = allProperties[0].coordinates;
      zoom = 13;
    }

    // Create Leaflet Map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false, // Custom positioned zoom control
      scrollWheelZoom: true,
    }).setView(center, zoom);

    mapRef.current = map;

    // Add custom zoom control to bottom right
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    // Add Premium Tile Layer (CartoDB Voyager)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Clear marker tracking
    markersRef.current = [];

    // Intercept popup events to bind React click handler to Send Enquiry and Close buttons
    map.on('popupopen', (e: any) => {
      const popupNode = e.popup.getElement();
      if (!popupNode) return;

      // Enquiry Button Click
      const enquiryBtn = popupNode.querySelector('.popup-enquiry-btn');
      if (enquiryBtn) {
        // Clear any previous listeners
        const newBtn = enquiryBtn.cloneNode(true);
        enquiryBtn.parentNode.replaceChild(newBtn, enquiryBtn);
        
        newBtn.addEventListener('click', (ev: any) => {
          ev.preventDefault();
          const propId = newBtn.getAttribute('data-property-id');
          const prop = allProperties.find(p => p.id === propId) || (property?.id === propId ? property : null);
          if (prop && onEnquiryClick) {
            onEnquiryClick(prop);
          }
        });
      }

      // Close Button Click
      const closeBtn = popupNode.querySelector('.popup-close-btn');
      if (closeBtn) {
        // Clear any previous listeners
        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

        newCloseBtn.addEventListener('click', (ev: any) => {
          ev.preventDefault();
          map.closePopup();
        });
      }
    });

    // 1. PLOT SINGLE PROPERTY (Modal View Mode)
    if (property && property.coordinates) {
      const propertyHtml = `
        <div class="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 border-2 border-amber-400 text-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)] scale-110 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        </div>
      `;

      const propertyIcon = L.divIcon({
        html: propertyHtml,
        className: 'custom-leaflet-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const propMarker = L.marker(property.coordinates, { icon: propertyIcon })
        .addTo(map)
        .on('click', () => {
          map.panTo(property.coordinates);
        });

      // Bind dynamic hover preview tooltip matching the user screenshot
      const tooltipHtml = `
        <div class="flex items-center gap-3.5 bg-white p-3 rounded-2xl border-2 border-amber-400 shadow-[0_4px_20px_rgba(0,0,0,0.08)] min-w-[290px] text-left pointer-events-none">
          <img src="${property.image}" alt="${property.name}" class="w-14 h-14 object-cover rounded-xl border border-neutral-100 flex-shrink-0" referrerpolicy="no-referrer" />
          <div class="flex-grow min-w-0">
            <div class="flex items-center justify-between">
              <span class="text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                ${property.type}
              </span>
              <span class="text-xs font-bold text-neutral-900">${formatRupee(property.price)}</span>
            </div>
            <h4 class="text-xs font-bold text-neutral-900 mt-1 truncate">${property.name}</h4>
            <p class="text-[9px] text-[#6E6E73] mt-0.5 truncate">${property.location} &bull; ${property.sqft} sqft</p>
          </div>
        </div>
      `;

      propMarker.bindTooltip(tooltipHtml, {
        direction: 'top',
        className: 'property-leaflet-tooltip',
        permanent: false,
        opacity: 1,
        offset: [0, -15]
      });

      // Bind dynamic click details popup matching user request
      const popupHtml = `
        <div class="flex flex-col bg-white border-2 border-amber-400 shadow-2xl rounded-2xl overflow-hidden w-[280px] relative">
          <div class="relative h-28 w-full bg-neutral-100 flex-shrink-0">
            <img src="${property.image}" alt="${property.name}" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
            
            <!-- Close Button -->
            <button type="button" class="popup-close-btn absolute top-2 right-2 p-1 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition flex items-center justify-center cursor-pointer border-none z-30" aria-label="Close popup">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-3.5 h-3.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div class="absolute bottom-2 left-2 px-2 py-0.5 bg-neutral-900/90 text-white text-[10px] font-bold rounded-md">${formatRupee(property.price)}</div>
            <div class="absolute top-2 left-2 px-1.5 py-0.5 bg-amber-500 text-white text-[7px] font-bold uppercase tracking-wider rounded-md">${property.type}</div>
          </div>
          <div class="p-3 space-y-2 text-left">
            <div>
              <h5 class="text-xs font-bold text-neutral-900 leading-tight m-0">${property.name}</h5>
              <p class="text-[9px] text-[#6E6E73] mt-0.5 truncate m-0">${property.address}</p>
            </div>
            <div class="flex items-center gap-3 text-[9px] text-neutral-600 border-y border-neutral-100 py-1 m-0">
              ${property.beds > 0 ? `<div class="flex items-center gap-0.5"><span class="font-bold text-neutral-800">${property.beds}</span> Beds</div>` : ''}
              ${property.baths > 0 ? `<div class="flex items-center gap-0.5"><span class="font-bold text-neutral-800">${property.baths}</span> Baths</div>` : ''}
              <div class="flex items-center gap-0.5"><span class="font-bold text-neutral-800">${property.sqft}</span> Sqft</div>
            </div>
            <p class="text-[9px] text-[#6E6E73] leading-relaxed line-clamp-2 m-0">${property.description}</p>
            <div class="pt-0.5">
              <button type="button" class="popup-enquiry-btn w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-[9px] font-bold transition cursor-pointer border-none shadow-xs" data-property-id="${property.id}">
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      `;

      propMarker.bindPopup(popupHtml, {
        className: 'property-leaflet-popup',
        maxWidth: 280,
        minWidth: 280,
        offset: [0, -10],
        closeButton: false
      });

      // Programmatically open the details popup immediately for single property view
      setTimeout(() => {
        propMarker.openPopup();
      }, 200);

      markersRef.current.push(propMarker);
    }

    // 2. PLOT ALL PROPERTIES (Global Map Explorer Mode)
    if (allProperties.length > 0) {
      allProperties.forEach((prop) => {
        if (!prop.coordinates) return;

        const isCurrentActive = property && property.id === prop.id;

        const propertyHtml = `
          <div class="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-900 border-2 ${
            isCurrentActive 
              ? 'border-amber-400 text-amber-400 scale-110 shadow-xl shadow-[0_0_12px_rgba(251,191,36,0.8)]' 
              : 'border-white text-white shadow-md'
          } transform hover:scale-110 transition duration-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4.5 h-4.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          </div>
        `;

        const propertyIcon = L.divIcon({
          html: propertyHtml,
          className: 'custom-leaflet-icon',
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        const propMarker = L.marker(prop.coordinates, { icon: propertyIcon })
          .addTo(map)
          .on('click', () => {
            map.panTo(prop.coordinates);
            if (onSelectProperty) {
              onSelectProperty(prop);
            }
          });

        // Bind dynamic hover preview tooltip matching the user screenshot
        const tooltipHtml = `
          <div class="flex items-center gap-3.5 bg-white p-3 rounded-2xl border-2 border-amber-400 shadow-[0_4px_20px_rgba(0,0,0,0.08)] min-w-[290px] text-left pointer-events-none">
            <img src="${prop.image}" alt="${prop.name}" class="w-14 h-14 object-cover rounded-xl border border-neutral-100 flex-shrink-0" referrerpolicy="no-referrer" />
            <div class="flex-grow min-w-0">
              <div class="flex items-center justify-between">
                <span class="text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                  ${prop.type}
                </span>
                <span class="text-xs font-bold text-neutral-900">${formatRupee(prop.price)}</span>
              </div>
              <h4 class="text-xs font-bold text-neutral-900 mt-1 truncate">${prop.name}</h4>
              <p class="text-[9px] text-[#6E6E73] mt-0.5 truncate">${prop.location} &bull; ${prop.sqft} sqft</p>
            </div>
          </div>
        `;

        propMarker.bindTooltip(tooltipHtml, {
          direction: 'top',
          className: 'property-leaflet-tooltip',
          permanent: false,
          opacity: 1,
          offset: [0, -12]
        });

        // Bind dynamic click details popup matching user request
        const popupHtml = `
          <div class="flex flex-col bg-white border-2 border-amber-400 shadow-2xl rounded-2xl overflow-hidden w-[280px] relative">
            <div class="relative h-28 w-full bg-neutral-100 flex-shrink-0">
              <img src="${prop.image}" alt="${prop.name}" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
              
              <!-- Close Button -->
              <button type="button" class="popup-close-btn absolute top-2 right-2 p-1 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition flex items-center justify-center cursor-pointer border-none z-30" aria-label="Close popup">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-3.5 h-3.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <div class="absolute bottom-2 left-2 px-2 py-0.5 bg-neutral-900/90 text-white text-[10px] font-bold rounded-md">${formatRupee(prop.price)}</div>
              <div class="absolute top-2 left-2 px-1.5 py-0.5 bg-amber-500 text-white text-[7px] font-bold uppercase tracking-wider rounded-md">${prop.type}</div>
            </div>
            <div class="p-3 space-y-2 text-left">
              <div>
                <h5 class="text-xs font-bold text-neutral-900 leading-tight m-0">${prop.name}</h5>
                <p class="text-[9px] text-[#6E6E73] mt-0.5 truncate m-0">${prop.address}</p>
              </div>
              <div class="flex items-center gap-3 text-[9px] text-neutral-600 border-y border-neutral-100 py-1 m-0">
                ${prop.beds > 0 ? `<div class="flex items-center gap-0.5"><span class="font-bold text-neutral-800">${prop.beds}</span> Beds</div>` : ''}
                ${prop.baths > 0 ? `<div class="flex items-center gap-0.5"><span class="font-bold text-neutral-800">${prop.baths}</span> Baths</div>` : ''}
                <div class="flex items-center gap-0.5"><span class="font-bold text-neutral-800">${prop.sqft}</span> Sqft</div>
              </div>
              <p class="text-[9px] text-[#6E6E73] leading-relaxed line-clamp-2 m-0">${prop.description}</p>
              <div class="pt-0.5">
                <button type="button" class="popup-enquiry-btn w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-[9px] font-bold transition cursor-pointer border-none shadow-xs" data-property-id="${prop.id}">
                  Send Enquiry
                </button>
              </div>
            </div>
          </div>
        `;

        propMarker.bindPopup(popupHtml, {
          className: 'property-leaflet-popup',
          maxWidth: 280,
          minWidth: 280,
          offset: [0, -10],
          closeButton: false
        });

        markersRef.current.push(propMarker);
      });
    }

    // Adjust boundaries to fit all markers if in Global Mode and not a single property
    if (allProperties.length > 0 && !property && markersRef.current.length > 0) {
      const group = new L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.15));
    }

    return () => {
      // Clean up map instance on unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [leafletReady, property, allProperties]);

  if (!leafletReady) {
    return (
      <div 
        style={{ height }}
        className="w-full bg-[#F5F5F7] rounded-xl flex items-center justify-center text-xs font-semibold text-[#6E6E73] animate-pulse"
      >
        Mapping engines igniting...
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full w-full rounded-xl overflow-hidden border border-neutral-100 shadow-xs bg-white">
      {/* Map Canvas */}
      <div 
        ref={mapContainerRef} 
        style={{ height }} 
        className="w-full flex-grow z-10"
      />
    </div>
  );
}
