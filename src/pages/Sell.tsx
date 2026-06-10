import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Compass, PiggyBank, Award, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';
import { sendWebhookData } from '../components/WebhookSettings';
import ScrollReveal from '../components/ScrollReveal';

export default function Sell() {
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState('villa');
  const [approxSize, setApproxSize] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleValuationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !approxSize || !fullName || !phone || !email) {
      setErrorMsg('All mandatory listing fields must be filled.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');
    const payload = { propertyAddress: address, propertyType, approxSize, fullName, phone, email };
    const response = await sendWebhookData(payload, 'valuation');
    setIsSubmitting(false);
    if (response.success) {
      setIsSuccess(true);
      setAddress(''); setApproxSize(''); setFullName(''); setPhone(''); setEmail('');
    } else {
      setErrorMsg(response.error || 'Valuation submission failed. Please try again.');
    }
  };

  const benefits = [
    {
      title: "Expedited Placements",
      description: "Our focused broker network coordinates transactions with an average time-on-market of under 28 days.",
      icon: Calendar,
      img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Highest Price Placed",
      description: "Our direct positioning yields premium bidding wars resulting in 104% average list-price capture margins.",
      icon: PiggyBank,
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Unmatched Depth",
      description: "For over 15 years, we have represented estates within identical enclaves, knowing every street gate intimately.",
      icon: Compass,
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Ironclad Compliance",
      description: "All client files, negotiations, and contracts are shielded through secure legal structures and NDAs.",
      icon: ShieldCheck,
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="font-sans text-[#1D1D1F] bg-[#FAFAFA] pt-24 pb-12 overflow-hidden">
      
      {/* 1. HERO SECTION (Split Layout) */}
      <section className="min-h-[85vh] flex items-center py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
          <ScrollReveal className="flex-1 space-y-8">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-[#6E6E73] block">
              Listing Representation
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-[#1D1D1F] leading-tight">
              Sell Your Property <span className="text-[#A0AAB5]">With Confidence.</span>
            </h1>
            <p className="text-[#6E6E73] max-w-lg text-lg leading-relaxed">
              Entrust your architectural legacy to advisors who hold discretion, aesthetics, and high-consequence capital management as their highest principles.
            </p>
            <div className="pt-4 flex gap-4">
              <button 
                onClick={() => document.getElementById('valuation-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#1D1D1F] text-white hover:bg-neutral-800 px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition"
              >
                Request Valuation
              </button>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="left" delay={0.2} className="flex-1 w-full relative">
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-4/5 lg:aspect-square">
              <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80" alt="Luxury property exterior" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#1D1D1F]">104% Average Capture</p>
                  <p className="text-xs text-[#6E6E73]">List-to-sale price ratio</p>
                </div>
                <div className="w-12 h-12 bg-[#F5F5F7] rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-[#1D1D1F] -rotate-45" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. HOW IT WORKS (Bento Grid Overhaul) */}
      <section className="py-24 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#6E6E73]">
              Bespoke Pipeline
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#1D1D1F] mt-4 mb-6">
              The Advisory Process.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Step 1: Large Left */}
            <ScrollReveal delay={0.1} className="md:col-span-8 bg-[#F5F5F7] rounded-3xl p-8 md:p-12 relative overflow-hidden group">
              <div className="relative z-10 w-full md:w-3/5 space-y-6">
                <span className="text-6xl font-display font-bold text-neutral-300 group-hover:text-[#1D1D1F] transition-colors duration-500">01</span>
                <h3 className="font-display text-2xl font-bold text-[#1D1D1F]">Book a Free Valuation</h3>
                <p className="text-[#6E6E73] leading-relaxed">Our valuations leverage precision architectural appraisal models and comparable real-time off-market transactional logs.</p>
              </div>
              <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80" alt="Consultation" className="absolute right-0 top-0 bottom-0 h-full w-2/5 object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 hidden md:block rounded-l-3xl shadow-xl" />
            </ScrollReveal>

            {/* Step 2: Small Right */}
            <ScrollReveal delay={0.2} className="md:col-span-4 bg-[#1D1D1F] rounded-3xl p-8 md:p-12 text-white flex flex-col justify-between group">
              <span className="text-6xl font-display font-bold text-white/20 group-hover:text-white transition-colors duration-500 mb-6">02</span>
              <div>
                <h3 className="font-display text-2xl font-bold mb-4">We Market It</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">We deploy premium monochromatic print assets and custom listing websites to secure direct attention.</p>
              </div>
            </ScrollReveal>

            {/* Step 3: Full Width Bottom */}
            <ScrollReveal delay={0.3} className="md:col-span-12 bg-white border border-neutral-200 shadow-sm rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 group hover:shadow-md transition">
              <div className="flex-1 space-y-6">
                <span className="text-6xl font-display font-bold text-neutral-200 group-hover:text-[#1D1D1F] transition-colors duration-500">03</span>
                <h3 className="font-display text-3xl font-bold text-[#1D1D1F]">Close the Deal</h3>
                <p className="text-[#6E6E73] leading-relaxed">We handle client-first legal compliance and custom financial negotiations under structural confidentiality. Done swiftly and silently.</p>
              </div>
              <div className="flex-1 w-full h-48 md:h-64 rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1556156653-e5a7c69cc263?auto=format&fit=crop&q=80" alt="Handshake" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. WHY SELL WITH US (Image-rich Tiles) */}
      <section className="py-24 bg-[#FAFAFA] px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#6E6E73]">
              Value Capture
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#1D1D1F]">
              Why Sell With Us.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 0.1} direction={idx % 2 === 0 ? "right" : "left"}>
                  <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col sm:flex-row h-full group hover:shadow-lg transition duration-500">
                    <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative">
                      <img src={benefit.img} alt={benefit.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500"></div>
                    </div>
                    <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                      <div className="w-12 h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center text-[#1D1D1F] mb-6">
                        <Icon className="w-5 h-5 shrink-0" />
                      </div>
                      <h4 className="text-xl font-display font-bold text-[#1D1D1F] mb-3">{benefit.title}</h4>
                      <p className="text-sm text-[#6E6E73] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. VALUATION FORM (Split Layout) */}
      <section id="valuation-form" className="py-24 bg-white px-6 md:px-12 border-y border-neutral-200/50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Left Form Wrapper */}
          <ScrollReveal direction="right" className="flex-[1.2]">
            <div className="bg-[#F5F5F7] rounded-[32px] p-8 md:p-12 shadow-sm border border-neutral-100">
              <div className="mb-10">
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#6E6E73] block mb-2">
                  Confidential Placement
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">Request Valuation.</h3>
                <p className="text-[#6E6E73] text-sm leading-relaxed max-w-md">
                  We formulate comparative studies examining historic off-market trade, current construction supply valuations, and macro-financial variables.
                </p>
              </div>

              {isSuccess ? (
                <div className="text-center py-10 space-y-5 bg-white rounded-2xl p-8 border border-neutral-200">
                  <div className="inline-block p-4 bg-green-50 rounded-full text-green-500 mb-2">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-[#1D1D1F]">Valuation Scheduled</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    Your requested asset dossier has been scheduled. Ananya Malhotra will contact you directly to establish secure valuation logistics.
                  </p>
                  <button onClick={() => setIsSuccess(false)} className="bg-[#1D1D1F] text-white hover:bg-[#333336] px-6 py-2 rounded-full text-xs font-semibold transition mt-4">
                    Reset Form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleValuationSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#1D1D1F] uppercase tracking-wider block mb-2">Property Address *</label>
                      <input type="text" required placeholder="e.g. 1200 Ocean Ave, Santa Monica, CA" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-[#1D1D1F] transition" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-[#1D1D1F] uppercase tracking-wider block mb-2">Property Type *</label>
                        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-[#1D1D1F] transition">
                          <option value="villa">Luxury Villa / House</option>
                          <option value="apartment">Penthouse / Apartment</option>
                          <option value="plot">Coastal Plot / Land</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#1D1D1F] uppercase tracking-wider block mb-2">Approx Size (SqFt) *</label>
                        <input type="number" required placeholder="e.g. 4500" value={approxSize} onChange={(e) => setApproxSize(e.target.value)} className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-[#1D1D1F] transition" />
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-neutral-200 my-8"></div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-[#1D1D1F] uppercase tracking-wider block mb-2">Your Name *</label>
                      <input type="text" required placeholder="e.g. Adrian Finch" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-[#1D1D1F] transition" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-[#1D1D1F] uppercase tracking-wider block mb-2">Phone Number *</label>
                        <input type="tel" required placeholder="e.g. +1 (310) 555-0190" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-[#1D1D1F] transition" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#1D1D1F] uppercase tracking-wider block mb-2">Email *</label>
                        <input type="email" required placeholder="e.g. adrian@finch.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-[#1D1D1F] transition" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#1D1D1F] text-white hover:bg-neutral-800 disabled:bg-neutral-300 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition mt-6">
                    {isSubmitting ? 'Requesting...' : 'Request Valuation Dossier'}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Right Image Wrapper */}
          <ScrollReveal direction="left" className="flex-1 relative rounded-[32px] overflow-hidden min-h-[400px] shadow-lg hidden lg:block">
            <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80" alt="Valuation property" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-white" />
                <span className="font-bold tracking-wider uppercase text-xs">Response in 24h</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Non-disclosure paperwork supplied instantly upon inquiry.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 5. TESTIMONIALS FROM PAST SELLERS (Image Cards) */}
      <section className="py-24 bg-[#FAFAFA] px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-16">
          <ScrollReveal className="text-center space-y-2">
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#6E6E73]">
              Seller Portfolios
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#1D1D1F]">
              Past Seller Reviews.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <ScrollReveal delay={0.1}>
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-neutral-100 shadow-sm space-y-8 flex flex-col justify-between h-full group hover:shadow-md transition">
                <p className="text-lg text-[#1D1D1F] leading-relaxed font-light italic">
                  "Ananya represents the singular standard in India. She placed our Malabar Hill penthouse off-market within exactly three weeks under absolute confidentiality. No public listing footprint, no endless walkthroughs, and a flawless premium bidding margin."
                </p>
                <div className="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150" alt="Ketan Singhal" className="w-12 h-12 rounded-full object-cover shadow-sm group-hover:scale-110 transition" />
                  <div>
                    <h4 className="font-bold text-[#1D1D1F]">Ketan Singhal</h4>
                    <p className="text-[10px] text-[#6E6E73] font-semibold uppercase tracking-wider mt-0.5">Former Owner, Malabar Crest</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-neutral-100 shadow-sm space-y-8 flex flex-col justify-between h-full group hover:shadow-md transition">
                <p className="text-lg text-[#1D1D1F] leading-relaxed font-light italic">
                  "When we moved to liquidate our private collection of Bangalore luxury duplexes, Ananya formulated a professional dossier that spoke to strategic family offices directly. Her discrete negotiation structure was pristine."
                </p>
                <div className="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150" alt="Mohit Goel" className="w-12 h-12 rounded-full object-cover shadow-sm group-hover:scale-110 transition" />
                  <div>
                    <h4 className="font-bold text-[#1D1D1F]">Mohit Goel</h4>
                    <p className="text-[10px] text-[#6E6E73] font-semibold uppercase tracking-wider mt-0.5">Goel Portfolios & Estates</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </div>
  );
}
