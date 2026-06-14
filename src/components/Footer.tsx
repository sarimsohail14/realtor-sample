/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Instagram, Linkedin, Twitter, ArrowUp, Mail, ShieldAlert } from 'lucide-react';
import { AGENT_INFO } from '../data';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const handleItemClick = (id: string) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#1D1D1F] text-white py-20 px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Column 1: Logo & Statement */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => handleItemClick('home')}
              className="text-sm font-display font-bold tracking-[0.25em] text-white uppercase text-left group"
            >
              Ranchi Brothers
            </button>
            <p className="text-xs text-[#86868B] max-w-sm leading-relaxed">
              Ranchi Brothers Estate helps clients buy and sell luxury homes. We offer careful planning, complete privacy, and a trusted service.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-[11px] font-display font-bold text-neutral-300 uppercase tracking-widest">
              Sections
            </h5>
            <ul className="space-y-2 text-xs text-[#86868B]">
              {[
                { label: 'Home Catalog', id: 'home' },
                { label: 'Buy Catalog', id: 'buy' },
                { label: 'Sell Catalog', id: 'sell' },
                { label: 'Interactive Property Map', id: 'map-explorer' },
                { label: 'About Catalog', id: 'about' },
                { label: 'Contact Catalog', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className="hover:text-white transition duration-200 cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-[11px] font-display font-bold text-neutral-300 uppercase tracking-widest">
              Direct Contact
            </h5>
            <ul className="space-y-2 text-xs text-[#86868B] leading-relaxed">
              <li>
                <span className="text-neutral-400">Office:</span> {AGENT_INFO.address}
              </li>
              <li>
                <span className="text-neutral-400">Email:</span>{' '}
                <a href={`mailto:${AGENT_INFO.email}`} className="hover:text-white underline transition">
                  {AGENT_INFO.email}
                </a>
              </li>
              <li>
                <span className="text-neutral-400">Broker Direct:</span>{' '}
                <a href={`tel:${AGENT_INFO.phone}`} className="hover:text-white transition">
                  {AGENT_INFO.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[1px] bg-neutral-800" />

        {/* Bottom copyright block */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-[#86868B] text-[11px]">
          <div className="space-y-1 text-center sm:text-left">
            <p>&copy; {currentYear} Ranchi Brothers Estate. All rights reserved.</p>
            <p className="opacity-80">
              Licensing credentials: RERA Registered &bull; Subject to non-disclosure compliance requirements.
            </p>
          </div>

          {/* Socials & Scroll top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition duration-200" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition duration-200" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition duration-200" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={handleScrollTop}
              className="p-2 border border-neutral-800 hover:border-neutral-500 hover:text-white rounded-full transition duration-300 group"
              title="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
