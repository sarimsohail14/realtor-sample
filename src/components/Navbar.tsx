/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { AGENT_INFO } from '../data';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Buy', id: 'buy' },
    { label: 'Sell', id: 'sell' },
    { label: 'Interactive Property Map', id: 'map-explorer' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-[rgba(0,0,0,0.06)] py-4'
          : 'bg-white/95 border-b border-[rgba(0,0,0,0.03)] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-baseline gap-2 focus:outline-none cursor-pointer group"
        >
          <span className="text-xl font-display font-bold tracking-tighter text-[#1D1D1F] uppercase transition group-hover:opacity-75">
            Homes for All
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-[14px] font-bold tracking-tight">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition relative cursor-pointer py-1 ${
                activePage === item.id
                  ? 'text-[#1D1D1F]'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {item.label}
              {activePage === item.id && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#1D1D1F]" />
              )}
            </button>
          ))}
        </div>

        {/* Call Now Action button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${AGENT_INFO.phone}`}
            className="bg-[#1D1D1F] hover:bg-neutral-800 text-white px-5 py-2 rounded-full text-[13px] font-bold tracking-tight transition duration-300 flex items-center gap-1.5 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Now</span>
          </a>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#1D1D1F] hover:bg-[#F5F5F7] p-2 rounded-full transition focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#D2D2D7] px-8 py-8 space-y-6 absolute top-full inset-x-0 shadow-lg animate-fade-in font-sans">
          <div className="flex flex-col space-y-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm font-semibold tracking-wide py-1.5 border-b border-neutral-100 ${
                  activePage === item.id ? 'text-[#1D1D1F]' : 'text-[#6E6E73]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <a
              href={`tel:${AGENT_INFO.phone}`}
              className="bg-[#1D1D1F] text-white hover:bg-neutral-800 text-center py-3 rounded-full text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Professional: {AGENT_INFO.phone}</span>
            </a>
            <p className="text-[10px] text-center text-[#6E6E73] uppercase tracking-widest pt-2">
              Ranchi &bull; Hinoo &bull; Jharkhand
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
