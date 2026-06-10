import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, ChevronDown, Shield } from 'lucide-react';
import { AGENT_INFO } from '../data';
import { sendWebhookData } from '../components/WebhookSettings';
import ScrollReveal from '../components/ScrollReveal';

export default function Contact() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState<'Buy' | 'Sell' | 'General Inquiry'>('General Inquiry');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "How do I request a private showing?", a: "Private showings for off-market properties are arranged following a preliminary qualification call. Please submit your request via the secure form below." },
    { q: "Do you handle international acquisitions?", a: "Yes. Our team frequently facilitates cross-border acquisitions, working directly with family offices and international counsel." },
    { q: "What is your valuation process?", a: "We conduct a comprehensive pedrigree review alongside our proprietary market pricing model to ensure your property is listed precisely." },
    { q: "Is my inquiry completely confidential?", a: "Absolutely. Every inquiry is handled under strict NDA protocols and is only reviewed by senior partners." }
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email || !message) {
      setErrorMsg('Please complete all fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const payload = { fullName, phone, email, inquiryType, message };
    const response = await sendWebhookData(payload, 'contact');
    setIsSubmitting(false);

    if (response.success) {
      setIsSuccess(true);
      setFullName(''); setPhone(''); setEmail(''); setMessage('');
    } else {
      setErrorMsg(response.error || 'Submission failed. Please try again.');
    }
  };

  return (
    <div className="font-sans text-[#1D1D1F] bg-[#FAFAFA] pt-24 pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="py-20 md:py-28 text-center px-6">
        <ScrollReveal>
          <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-[#6E6E73] block mb-4">
            Client Desk
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-[#1D1D1F] mb-6">
            Contact Our <span className="text-[#A0AAB5]">Advisors.</span>
          </h1>
          <p className="text-[#6E6E73] max-w-2xl mx-auto text-lg leading-relaxed">
            Discuss premium asset acquisitions, schedule home valuation listings, or establish non-disclosure representation agreements.
          </p>
        </ScrollReveal>
      </section>

      {/* 2. QUICK INFO STRIP */}
      <section className="pb-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScrollReveal delay={0.1} className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center mb-6">
              <MapPin className="text-[#1D1D1F] w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-[#1D1D1F] mb-2 text-lg">Headquarters</h4>
            <p className="text-[#6E6E73] text-sm leading-relaxed">Altamount Road, Cumballa Hill<br/>Mumbai, 400026</p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center mb-6">
              <Phone className="text-[#1D1D1F] w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-[#1D1D1F] mb-2 text-lg">Direct Line</h4>
            <a href={`tel:${AGENT_INFO.phone}`} className="text-[#6E6E73] text-sm leading-relaxed hover:text-[#1D1D1F] font-medium">{AGENT_INFO.phone}</a>
            <p className="text-[#6E6E73] text-xs mt-1">24/7 Availability</p>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center mb-6">
              <Mail className="text-[#1D1D1F] w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-[#1D1D1F] mb-2 text-lg">Email Us</h4>
            <a href={`mailto:${AGENT_INFO.email}`} className="text-[#6E6E73] text-sm leading-relaxed hover:text-[#1D1D1F] font-medium block truncate">{AGENT_INFO.email}</a>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 bg-[#F5F5F7] rounded-xl flex items-center justify-center mb-6">
              <CheckCircle className="text-[#1D1D1F] w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-[#1D1D1F] mb-2 text-lg">Licensed</h4>
            <p className="text-[#6E6E73] text-sm leading-relaxed">MahaRERA Reg<br/>#A51900000021</p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. CONTACT FORM SPLIT */}
      <section className="py-16 px-6 md:px-12 bg-white border-y border-neutral-200/50">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Left Image */}
          <ScrollReveal direction="right" className="flex-1 relative rounded-[40px] overflow-hidden min-h-[500px] shadow-lg hidden lg:block">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" alt="Office View" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1D1D1F] rounded-full flex items-center justify-center text-white shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display font-bold text-[#1D1D1F] text-lg leading-tight">100% Secure</p>
                <p className="text-xs text-[#6E6E73]">Your information is private.</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Form */}
          <ScrollReveal direction="left" className="flex-1">
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100">
              <div className="mb-10">
                <h3 className="font-display text-3xl font-bold text-[#1D1D1F] mb-3">Send a Message</h3>
                <p className="text-[#6E6E73] text-sm">Our lead luxury coordinator will confirm receipt within one hour.</p>
              </div>

              {isSuccess ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-500 w-10 h-10" />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-[#1D1D1F] mb-2">Message Sent</h4>
                  <p className="text-[#6E6E73] mb-8">We have securely received your inquiry.</p>
                  <button onClick={() => setIsSuccess(false)} className="bg-[#1D1D1F] text-white hover:bg-neutral-800 px-8 py-3 rounded-xl font-semibold transition">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                      {errorMsg}
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-2">Full Name *</label>
                    <input 
                      type="text" required placeholder="Clara Finch"
                      value={fullName} onChange={e => setFullName(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-[#1D1D1F] transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-2">Phone *</label>
                      <input 
                        type="tel" required placeholder="+1 (310) 555-0190"
                        value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-[#1D1D1F] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-2">Email *</label>
                      <input 
                        type="email" required placeholder="clara@example.com"
                        value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-[#1D1D1F] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-2">Inquiry Type</label>
                    <div className="relative">
                      <select 
                        value={inquiryType} onChange={e => setInquiryType(e.target.value as any)}
                        className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-[#1D1D1F] transition"
                      >
                        <option value="Buy">Request Representation to Buy</option>
                        <option value="Sell">Request Listing Appraisal</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6E73] pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-2">Message *</label>
                    <textarea 
                      required rows={4} placeholder="How can we assist you?"
                      value={message} onChange={e => setMessage(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-neutral-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#1D1D1F] focus:ring-1 focus:ring-[#1D1D1F] transition"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" disabled={isSubmitting}
                    className="w-full bg-[#1D1D1F] text-white hover:bg-neutral-800 disabled:bg-neutral-300 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="py-24 bg-[#FAFAFA] px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">Frequently Asked Questions</h2>
          </ScrollReveal>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <div 
                    className={`bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${isOpen ? 'border-[#1D1D1F] shadow-md' : 'border-neutral-100 shadow-sm hover:border-neutral-200'}`}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <div className="flex items-center justify-between p-6">
                      <h4 className="font-display font-bold text-[#1D1D1F] pr-4">{faq.q}</h4>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-[#1D1D1F] text-white' : 'bg-[#FAFAFA] text-[#1D1D1F]'}`}>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    <div className={`px-6 text-[#6E6E73] text-sm leading-relaxed transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {faq.a}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section className="py-12 px-6 md:px-12 mb-12">
        <ScrollReveal className="max-w-5xl mx-auto bg-[#1D1D1F] rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Establish Representation.
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-lg">
              Our firm is ready to guide you through your next major acquisition or disposal with unparalleled market insight.
            </p>
            <a href={`tel:${AGENT_INFO.phone}`} className="inline-flex bg-white text-[#1D1D1F] hover:bg-neutral-100 px-8 py-3.5 rounded-xl font-bold transition shadow-lg w-full sm:w-auto justify-center">
              Call {AGENT_INFO.phone}
            </a>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
