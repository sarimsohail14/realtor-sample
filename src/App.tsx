/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Property } from './types';
import { AGENT_INFO } from './data';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Modal from './components/Modal';

import Home from './pages/Home';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import About from './pages/About';
import Contact from './pages/Contact';
import ChatWidget from './components/ChatWidget';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Buy filters shared state to connect search queries on Home page
  const [buyFilters, setBuyFilters] = useState({
    location: '',
    type: '',
    priceRange: '',
  });

  // Clean format for WhatsApp link
  // Convert standard formatted phone to number digits for wa.me
  const whatsAppPhoneNumber = AGENT_INFO.phone.replace(/[^0-9]/g, "");
  const whatsAppLink = `https://wa.me/${whatsAppPhoneNumber}?text=Hi%20Ananya,%20I'm%20exploring%20your%20luxury%20real%20estate%20portfolio.%20I'd%20love%20to%20coordinate%20some%20time%20to%20connect.`;

  // Trigger modal for details / send enquiry
  const handleOpenEnquiryModal = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home
            setActivePage={setActivePage}
            setBuyFilters={setBuyFilters}
            onViewProperty={handleOpenEnquiryModal}
          />
        );
      case 'buy':
        return (
          <Buy
            filters={buyFilters}
            setFilters={setBuyFilters}
            onEnquiryClick={handleOpenEnquiryModal}
            onViewProperty={handleOpenEnquiryModal}
          />
        );
      case 'sell':
        return <Sell />;
      case 'about':
        return <About setActivePage={setActivePage} />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <Home
            setActivePage={setActivePage}
            setBuyFilters={setBuyFilters}
            onViewProperty={handleOpenEnquiryModal}
          />
        );
    }
  };

  return (
    <div className="font-sans antialiased text-[#1D1D1F] bg-white min-h-screen flex flex-col justify-between selection:bg-[#1D1D1F] selection:text-white">
      
      {/* 2. HEADER/NAVBAR BAR */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* MAIN VIEWPORT BODY */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* 3. MULTI-PAGE GLOBAL FOOTER */}
      <Footer setActivePage={setActivePage} />

      {/* REUSABLE PREMIUM DETAILS / ENQUIRY MODAL POPUP */}
      <Modal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* PREMIUM CHAT WIDGET INTEGRATION (DIRECT WEBHOOK COMPLIANT) */}
      <ChatWidget />



    </div>
  );
}
