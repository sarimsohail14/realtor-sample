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
  onSelectProperty?: (property: Property | null) => void;
  onEnquiryClick?: (property: Property) => void;
  height?: string;
  showAmenities?: boolean;
  activeAmenityTypes?: string[];
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

const DEFAULT_PROPERTIES: Property[] = [];
const DEFAULT_AMENITY_TYPES: string[] = [];

export default function KmlMap({
  property,
  allProperties = DEFAULT_PROPERTIES,
  onSelectProperty,
  onEnquiryClick,
  height = '400px',
  showAmenities = true,
  activeAmenityTypes = DEFAULT_AMENITY_TYPES,
}: KmlMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const leafletReady = useLeaflet();
  const [mapMode, setMapMode] = useState<'standard' | 'satellite'>('standard');

  // Cycle active amenity details one by one
  const [activeAmenityId, setActiveAmenityId] = useState<string | null>(null);
  const [isPropertyPopupOpen, setIsPropertyPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!property || !property.amenities || property.amenities.length === 0 || !showAmenities || isPropertyPopupOpen) {
      setActiveAmenityId(null);
      return;
    }

    const filteredAmenities = property.amenities.filter(
      a => activeAmenityTypes.length === 0 || activeAmenityTypes.includes(a.type)
    );

    if (filteredAmenities.length === 0) {
      setActiveAmenityId(null);
      return;
    }

    setActiveAmenityId(filteredAmenities[0].id);

    const interval = setInterval(() => {
      setActiveAmenityId((prevId) => {
        const index = filteredAmenities.findIndex(a => a.id === prevId);
        const nextIndex = (index + 1) % filteredAmenities.length;
        return filteredAmenities[nextIndex].id;
      });
    }, 3200); // Cycle every 3.2 seconds

    return () => clearInterval(interval);
  }, [property, showAmenities, activeAmenityTypes, isPropertyPopupOpen]);

  // Imperatively open active amenity tooltip and pan map
  useEffect(() => {
    if (!leafletReady || !mapRef.current) return;

    if (!activeAmenityId) {
      markersRef.current.forEach((marker) => {
        if ((marker as any).amenityId) {
          marker.closeTooltip();
        }
      });
      return;
    }

    markersRef.current.forEach((marker) => {
      if ((marker as any).amenityId) {
        if ((marker as any).amenityId === activeAmenityId) {
          // Open tooltip
          marker.openTooltip();
          // Pan map slightly to center the active marker
          mapRef.current.panTo(marker.getLatLng(), { animate: true, duration: 0.6 });
        } else {
          // Close tooltip
          marker.closeTooltip();
        }
      }
    });
  }, [activeAmenityId, leafletReady]);

  // Cycle active property details one by one on global map
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null);

  useEffect(() => {
    if (property || allProperties.length === 0 || isPropertyPopupOpen) {
      // Pause automatic cycling when a popup is open or if single property mode
      return;
    }

    // Initialize activePropertyId if not set
    if (!activePropertyId) {
      setActivePropertyId(allProperties[0].id);
    }

    const interval = setInterval(() => {
      setActivePropertyId((prevId) => {
        const index = allProperties.findIndex(p => p.id === prevId);
        const nextIndex = (index + 1) % allProperties.length;
        return allProperties[nextIndex].id;
      });
    }, 3500); // Cycle every 3.5 seconds

    return () => clearInterval(interval);
  }, [property, allProperties, isPropertyPopupOpen]);

  // Imperatively open active property tooltip and pan map on global map
  useEffect(() => {
    if (!leafletReady || !mapRef.current || !activePropertyId || property) return;

    markersRef.current.forEach((marker) => {
      if ((marker as any).propertyId) {
        if ((marker as any).propertyId === activePropertyId) {
          marker.openTooltip();
          mapRef.current.panTo(marker.getLatLng(), { animate: true, duration: 0.6 });
        } else {
          marker.closeTooltip();
        }
      }
    });
  }, [activePropertyId, leafletReady, property]);

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
      zoom = 15; // Zoomed in to show amenities clearly
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

    // Add Premium Tile Layer based on mapMode
    if (mapMode === 'satellite') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxNativeZoom: 17,
        maxZoom: 20
      }).addTo(map);
    } else {
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);
    }

    // Clear marker tracking
    markersRef.current = [];

    // Intercept popup events to bind React click handler to Send Enquiry and Close buttons
    map.on('popupopen', (e: any) => {
      const marker = e.popup._source || e.source;
      if (marker && (marker as any).isPropertyMarker) {
        setIsPropertyPopupOpen(true);
      }
      if (marker && typeof marker.getTooltip === 'function' && marker.getTooltip()) {
        marker.getTooltip().setOpacity(0);
      }

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

    map.on('popupclose', (e: any) => {
      const marker = e.popup._source || e.source;
      if (marker && (marker as any).isPropertyMarker) {
        setIsPropertyPopupOpen(false);
      }
      if (marker && typeof marker.getTooltip === 'function' && marker.getTooltip()) {
        marker.getTooltip().setOpacity(1);
      }
    });

    // Helper to plot amenities for a given property
    const plotAmenities = (targetProperty: Property) => {
      if (!showAmenities || !targetProperty.amenities) return;
      targetProperty.amenities.forEach((amenity) => {
        // Filter by active types if specified
        if (activeAmenityTypes.length > 0 && !activeAmenityTypes.includes(amenity.type)) {
          return;
        }

        let amenityColorClass = '';
        let iconSvg = '';

        switch (amenity.type) {
          case 'school':
            amenityColorClass = 'bg-[#4361EE]';
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5"></path></svg>`;
            break;
          case 'park':
            amenityColorClass = 'bg-[#10B981]';
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M12 22v-5M17 14c0-2-1.5-4-3-5V5a2 2 0 0 0-4 0v4c-1.5 1-3 3-3 5a5 5 0 0 0 10 0z"></path></svg>`;
            break;
          case 'mall':
            amenityColorClass = 'bg-[#7209B7]';
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`;
            break;
          case 'fuel':
            amenityColorClass = 'bg-[#F59E0B]';
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M3 22h12M4 22V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v18M19 22V11a2 2 0 0 0-2-2h-2M9 6h2M6 10h6"></path><path d="M19 15a2.5 2.5 0 0 1 0-5h2M21 15v3a2 2 0 0 1-2 2h-1"></path></svg>`;
            break;
          case 'hospital':
            amenityColorClass = 'bg-[#EF4444]';
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`;
            break;
          case 'restaurant':
            amenityColorClass = 'bg-[#06B6D4]';
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>`;
            break;
          default:
            amenityColorClass = 'bg-neutral-500';
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><circle cx="12" cy="12" r="10"></circle></svg>`;
        }

        const amenityHtml = `
          <div class="flex items-center justify-center w-8 h-8 rounded-full ${amenityColorClass} border border-white text-white shadow-md transform hover:scale-110 transition duration-200 cursor-pointer">
            ${iconSvg}
          </div>
        `;

        const amenityIcon = L.divIcon({
          html: amenityHtml,
          className: 'custom-leaflet-amenity-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const amenityMarker = L.marker(amenity.coordinates, { icon: amenityIcon })
          .addTo(map)
          .on('click', () => {
            map.panTo(amenity.coordinates);
          });

        (amenityMarker as any).amenityId = amenity.id;

        const tooltipHtml = `
          <div class="amenity-tooltip-inner flex items-center gap-1.5 bg-[#1D1D1F]/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-lg border border-white/10 shadow-lg pointer-events-none">
            <span class="w-1.5 h-1.5 rounded-full ${amenityColorClass}"></span>
            <span>${amenity.name} &bull; ${amenity.distance}</span>
          </div>
        `;

        amenityMarker.bindTooltip(tooltipHtml, {
          direction: 'top',
          className: 'amenity-leaflet-tooltip',
          permanent: false,
          opacity: 1,
          offset: [0, -10]
        });

        markersRef.current.push(amenityMarker);
      });
    };

    // Determine Mode
    const isGlobalExplorer = allProperties.length > 0;

    if (isGlobalExplorer) {
      // 1. PLOT ALL PROPERTIES (Global Map Explorer Mode)
      allProperties.forEach((prop) => {
        if (!prop.coordinates) return;

        const isCurrentActive = property && property.id === prop.id;

        const propertyHtml = `
          <div class="flex items-center justify-center w-10.5 h-10.5 rounded-full bg-[#FAF9F6] border-2 ${
            isCurrentActive 
              ? 'border-[#B08968] text-[#B08968] scale-110 shadow-[0_4px_12px_rgba(176,137,104,0.4)]' 
              : 'border-neutral-200 text-neutral-600 shadow-sm'
          } transform hover:scale-105 transition duration-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
        `;

        const propertyIcon = L.divIcon({
          html: propertyHtml,
          className: 'custom-leaflet-icon',
          iconSize: [42, 42],
          iconAnchor: [21, 21],
        });

        const propMarker = L.marker(prop.coordinates, { icon: propertyIcon })
          .addTo(map)
          .on('click', () => {
            map.panTo(prop.coordinates);
            if (onSelectProperty) {
              onSelectProperty(prop);
            }
          });

        (propMarker as any).propertyId = prop.id;
        (propMarker as any).isPropertyMarker = true;

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

        // If this marker is selected, do NOT show tooltip permanently on MapExplorer
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

      // Plot selected property's proximity circles and amenities
      if (property && property.coordinates) {
        L.circle(property.coordinates, {
          color: '#fbbf24',
          fillColor: '#fbbf24',
          fillOpacity: 0.04,
          radius: 500,
          weight: 1.5,
          dashArray: '4, 6'
        }).addTo(map);

        L.circle(property.coordinates, {
          color: '#a1a1a6',
          fillColor: '#a1a1a6',
          fillOpacity: 0.01,
          radius: 1000,
          weight: 1.2,
          dashArray: '3, 8'
        }).addTo(map);

        plotAmenities(property);
      }
    } else {
      // 2. PLOT SINGLE PROPERTY (Modal View Mode or Detail View Mode)
      if (property && property.coordinates) {
        // Draw circles indicating walking/driving zones (500m & 1km)
        L.circle(property.coordinates, {
          color: '#fbbf24',
          fillColor: '#fbbf24',
          fillOpacity: 0.04,
          radius: 500,
          weight: 1.5,
          dashArray: '4, 6'
        }).addTo(map);

        L.circle(property.coordinates, {
          color: '#a1a1a6',
          fillColor: '#a1a1a6',
          fillOpacity: 0.01,
          radius: 1000,
          weight: 1.2,
          dashArray: '3, 8'
        }).addTo(map);

        const propertyHtml = `
          <div class="flex items-center justify-center w-11 h-11 rounded-full bg-[#FAF9F6] border-2 border-[#B08968] text-[#B08968] shadow-[0_4px_15px_rgba(176,137,104,0.35)] hover:scale-105 transition duration-300 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5.5 h-5.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
        `;

        const propertyIcon = L.divIcon({
          html: propertyHtml,
          className: 'custom-leaflet-icon',
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        });

        const propMarker = L.marker(property.coordinates, { icon: propertyIcon })
          .addTo(map)
          .on('click', () => {
            map.panTo(property.coordinates);
          });

        (propMarker as any).isPropertyMarker = true;



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

        markersRef.current.push(propMarker);

        // Plot nearby amenities if requested
        plotAmenities(property);
      }
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
  }, [leafletReady, property, allProperties, showAmenities, activeAmenityTypes, mapMode]);

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
    <div className="relative w-full rounded-xl overflow-hidden border border-neutral-100 shadow-xs bg-white" style={{ height }}>
      {/* Map Canvas */}
      <div 
        ref={mapContainerRef} 
        style={{ height }}
        className="w-full z-10"
      />
      
      {/* Floating Selection Details Header */}
      {property && allProperties && allProperties.length > 0 && (
        <div className="hidden lg:flex absolute top-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-xs border border-neutral-200 shadow-md rounded-2xl p-4 items-center justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-neutral-900 truncate">{property.name}</h4>
            <p className="text-[10px] font-bold text-[#B08968] mt-0.5">{formatRupee(property.price)}</p>
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => onEnquiryClick && onEnquiryClick(property)}
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-full border-none cursor-pointer transition duration-200 shadow-xs animate-none"
            >
              Send Enquiry
            </button>
            {onSelectProperty && (
              <button
                type="button"
                onClick={() => onSelectProperty(null)}
                className="px-5 py-2.5 bg-white hover:bg-[#F5F5F7] border border-neutral-300 text-neutral-800 text-[10px] font-extrabold uppercase tracking-wider rounded-full cursor-pointer transition duration-200 shadow-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Toggle Mode — bottom-left corner */}
      <button
        type="button"
        onClick={() => setMapMode(prev => prev === 'standard' ? 'satellite' : 'standard')}
        className="absolute bottom-4 left-4 z-20 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-xs border border-neutral-200 shadow-sm text-[10px] font-bold text-neutral-800 hover:text-neutral-950 hover:bg-white flex items-center gap-1.5 cursor-pointer transition select-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-neutral-600">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
        <span>{mapMode === 'standard' ? 'Satellite View' : 'Standard Map'}</span>
      </button>
    </div>
  );
}
