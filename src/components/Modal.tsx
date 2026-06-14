/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { sendWebhookData } from './WebhookSettings';
import { Property } from '../types';
import { formatRupee } from '../utils';
import KmlMap from './KmlMap';

interface ModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ property, isOpen, onClose }: ModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'enquiry' | 'map'>('enquiry');

  useEffect(() => {
    if (property) {
      setMessage(`Hi Om Prakash, I am checking in regarding "${property.name}" in ${property.location}. I would love to orchestrate a private viewing.`);
      setIsSuccess(false);
      setErrorMsg('');
      setActiveTab('enquiry');
    }
  }, [property]);

  if (!property) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setErrorMsg('All mandatory contact fields must be provided.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const payload = {
      propertyId: property.id,
      propertyName: property.name,
      propertyLocation: property.location,
      propertyPrice: property.price,
      fullName,
      phone,
      email,
      message,
    };

    const response = await sendWebhookData(payload, 'enquiry');
    setIsSubmitting(false);

    if (response.success) {
      setIsSuccess(true);
      // Reset form fields
      setFullName('');
      setPhone('');
      setEmail('');
    } else {
      setErrorMsg(response.error || 'Submission failed. Please check connection and retry.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="modal-container" className="fixed inset-0 z-50 flex items-center justify-center font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/45 backdrop-blur-xs"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white border border-[rgba(0,0,0,0.08)] shadow-[0_24px_50px_rgba(0,0,0,0.15)] rounded-2xl w-full max-w-xl mx-4 overflow-hidden z-20"
          >
            {/* Header */}
            <div className="absolute top-4 right-4 z-30">
              <button
                onClick={onClose}
                className="p-2 text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full transition duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <CheckCircle className="w-16 h-16 text-neutral-900 stroke-[1.25]" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-display font-bold tracking-tightest text-[#1D1D1F]">
                    Enquiry Received.
                  </h3>
                  <p className="text-sm text-[#6E6E73] max-w-sm mx-auto leading-relaxed">
                    Your enquiry has been sent! We'll contact you shortly. Our team is already packaging a private dossier for <span className="font-semibold text-neutral-900">"{property.name}"</span>.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-[#1D1D1F] text-white hover:bg-[#333336] px-8 py-3 rounded-full text-xs font-medium transition duration-300 shadow-sm"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="flex flex-col h-full max-h-[90vh]">
                {/* Visual Preview */}
                <div className="relative h-40 overflow-hidden flex-shrink-0">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent flex items-end p-6">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-neutral-300 tracking-widest">
                        Private Portfolio
                      </span>
                      <h4 className="text-lg font-display font-bold text-white tracking-tightest">{property.name}</h4>
                      <p className="text-xs text-neutral-300 mt-1">
                        {property.location} &bull; {formatRupee(property.price)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tab Switches */}
                <div className="flex border-b border-[#D2D2D7] bg-[#F5F5F7] px-6 py-2.5 gap-6 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('enquiry')}
                    className={`text-xs font-bold py-1.5 transition relative cursor-pointer focus:outline-none ${
                      activeTab === 'enquiry' ? 'text-[#1D1D1F]' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    Private Enquiry
                    {activeTab === 'enquiry' && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#1D1D1F]" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('map')}
                    className={`text-xs font-bold py-1.5 transition relative cursor-pointer focus:outline-none ${
                      activeTab === 'map' ? 'text-[#1D1D1F]' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    Interactive Property Map
                    {activeTab === 'map' && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#1D1D1F]" />
                    )}
                  </button>
                </div>

                {/* Tab Body */}
                <div className="flex-grow overflow-y-auto min-h-0">
                  {activeTab === 'enquiry' ? (
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                      {errorMsg && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs leading-relaxed flex items-start gap-2">
                          <span className="font-bold">Error:</span>
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[11px] font-medium text-[#1D1D1F] uppercase tracking-wider">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 w-4 h-4 text-[#6E6E73]" />
                            <input
                              type="text"
                              required
                              placeholder="Ketan Singhal"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="w-full text-xs pl-10 pr-4 py-2.5 border border-[#D2D2D7] rounded-lg focus:outline-none focus:border-[#1D1D1F] bg-white text-[#1D1D1F] transition"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[11px] font-medium text-[#1D1D1F] uppercase tracking-wider">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 w-4 h-4 text-[#6E6E73]" />
                            <input
                              type="tel"
                              required
                              placeholder="+1 (310) 555-0190"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full text-xs pl-10 pr-4 py-2.5 border border-[#D2D2D7] rounded-lg focus:outline-none focus:border-[#1D1D1F] bg-white text-[#1D1D1F] transition"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-[#1D1D1F] uppercase tracking-wider">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-[#6E6E73]" />
                          <input
                            type="email"
                            required
                            placeholder="client@prestige.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-xs pl-10 pr-4 py-2.5 border border-[#D2D2D7] rounded-lg focus:outline-none focus:border-[#1D1D1F] bg-white text-[#1D1D1F] transition"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-[#1D1D1F] uppercase tracking-wider">
                          Personal Message
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#6E6E73]" />
                          <textarea
                            rows={3}
                            placeholder="Write your request details here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full text-xs pl-10 pr-4 py-2.5 border border-[#D2D2D7] rounded-lg focus:outline-none focus:border-[#1D1D1F] bg-white text-[#1D1D1F] transition h-24 resize-none leading-relaxed"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#1D1D1F] text-white hover:bg-neutral-800 disabled:bg-neutral-300 py-3 rounded-full text-xs font-semibold transition tracking-wider uppercase cursor-pointer"
                        >
                          {isSubmitting ? 'Dispatching Enquiry...' : 'Record Private Enquiry'}
                        </button>
                        <p className="text-[10px] text-center text-[#6E6E73] mt-2 leading-relaxed">
                          All transaction discussions are held under strict non-disclosure compliance.
                        </p>
                      </div>
                    </form>
                  ) : (
                    <div className="p-6">
                      <div className="h-[320px] w-full rounded-xl overflow-hidden border border-neutral-100 shadow-inner">
                        <KmlMap 
                          property={property} 
                          onEnquiryClick={() => setActiveTab('enquiry')} 
                          height="320px" 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
