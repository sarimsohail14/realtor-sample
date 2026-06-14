import React from 'react';
import { motion } from 'motion/react';
import { Play, CheckCircle, Shield, Award, Clock } from 'lucide-react';
import { AGENT_INFO } from '../data';
import ScrollReveal from '../components/ScrollReveal';

interface AboutProps {
  setActivePage: (page: string) => void;
}

export default function About({ setActivePage }: AboutProps) {
  return (
    <div className="font-sans text-[#1D1D1F] bg-[#FAFAFA] pt-24 pb-12 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="min-h-[90vh] flex flex-col justify-center py-16 text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[#1D1D1F] mb-6 leading-tight">
              Crafting Spaces, <span className="text-[#A0AAB5]">Shaping Futures</span>
            </h1>
            <p className="text-[#6E6E73] max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
              Every project begins with purpose and is driven by passion. We don't just find properties — we discover lasting homes that reflect our clients' goals and values.
            </p>
            <button 
              onClick={() => {
                setActivePage('sell');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#1D1D1F] text-white hover:bg-neutral-800 px-8 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2 transition"
            >
              Our Service
            </button>
          </ScrollReveal>

          {/* Image Row */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-5xl mx-auto mt-16 md:mt-24 h-auto md:h-[350px]">
            {/* Left Image */}
            <ScrollReveal delay={0.1} className="flex-1 md:mt-10 rounded-tr-[40px] rounded-bl-[40px] overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80" alt="Estate View" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </ScrollReveal>
            {/* Center Image */}
            <ScrollReveal delay={0.2} className="flex-[1.5] rounded-tl-[40px] rounded-br-[40px] overflow-hidden shadow-lg relative group">
              <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80" alt="Luxury Living" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-xl">
                <Play className="text-[#1D1D1F] w-6 h-6 ml-1" />
              </div>
            </ScrollReveal>
            {/* Right Image */}
            <ScrollReveal delay={0.3} className="flex-1 md:mt-10 rounded-tr-[40px] rounded-bl-[40px] overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" alt="Interior Details" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. BENTO STATS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[#1D1D1F] font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#1D1D1F] rounded-full inline-block"></span>
              About Our Company
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#1D1D1F] mb-6">
              Built on Experience. Driven by Quality.
            </h2>
            <p className="text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
              With over 15 years in the industry, we bring a hands-on, client-first approach to every transaction. Our team blends discretion, innovation, and trust to deliver excellence.
            </p>
          </ScrollReveal>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Large Left Card */}
            <ScrollReveal delay={0.1} className="md:col-span-2 bg-[#F5F5F7] rounded-3xl p-8 md:p-12 relative overflow-hidden group">
              <div className="relative z-10 w-full md:w-3/5">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                  <Shield className="text-[#1D1D1F] w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#1D1D1F] mb-4">Unmatched Discretion</h3>
                <p className="text-[#6E6E73] mb-8 leading-relaxed">We protect our clients' privacy with military-grade NDAs and off-market strategies.</p>
                <div className="flex items-center gap-6">
                  <div>
                    <h4 className="font-display text-3xl font-bold text-[#1D1D1F]">100%</h4>
                    <p className="text-xs uppercase tracking-wider text-[#6E6E73] font-bold mt-1">Confidential</p>
                  </div>
                  <div className="w-px h-10 bg-neutral-200"></div>
                  <div>
                    <h4 className="font-display text-3xl font-bold text-[#1D1D1F]">24/7</h4>
                    <p className="text-xs uppercase tracking-wider text-[#6E6E73] font-bold mt-1">Availability</p>
                  </div>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?auto=format&fit=crop&q=80" alt="Interior" className="absolute right-0 top-0 bottom-0 h-full w-2/5 object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 hidden md:block rounded-l-3xl" />
            </ScrollReveal>

            {/* Small Top Right */}
            <ScrollReveal delay={0.2} className="bg-white border border-neutral-100 shadow-sm rounded-3xl p-8 flex flex-col justify-center items-center text-center group hover:shadow-md transition">
              <div className="w-14 h-14 bg-[#F5F5F7] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Award className="text-[#1D1D1F] w-6 h-6" />
              </div>
              <h4 className="font-display text-4xl font-bold text-[#1D1D1F] mb-2">15+</h4>
              <p className="text-sm text-[#6E6E73] font-medium uppercase tracking-wider">Years Active</p>
            </ScrollReveal>

            {/* Small Bottom Right */}
            <ScrollReveal delay={0.3} className="bg-[#1D1D1F] rounded-3xl p-8 flex flex-col justify-center items-center text-center group">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Clock className="text-white w-6 h-6" />
              </div>
              <h4 className="font-display text-4xl font-bold text-white mb-2">200+</h4>
              <p className="text-sm text-neutral-400 font-medium uppercase tracking-wider">Homes Sold</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. FOUNDER PROFILE SECTION */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <ScrollReveal direction="right" className="flex-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/5">
              <img src={AGENT_INFO.photo} alt={AGENT_INFO.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                <h4 className="font-display font-bold text-xl text-[#1D1D1F] mb-1">{AGENT_INFO.name}</h4>
                <p className="text-[#6E6E73] text-sm">Managing Partner</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" className="flex-1 space-y-8">
            <div>
              <span className="text-[#1D1D1F] font-semibold text-xs uppercase tracking-widest flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#1D1D1F] rounded-full inline-block"></span>
                Meet The Founder
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1D1D1F] leading-tight mb-6">
                Redefining the standard of luxury property curation.
              </h2>
              <p className="text-[#6E6E73] leading-relaxed mb-6">
                Om Prakash studied property economics and art preservation. This background helps him evaluate homes based on both their artistic design and their investment value.
              </p>
              <ul className="space-y-4">
                {['MahaRERA Certified Advisory', 'Architectural Pedigree Reviews', 'Off-Market Network Access'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#1D1D1F] font-medium">
                    <CheckCircle className="text-[#1D1D1F] w-5 h-5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. SHADCN TESTIMONIALS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[#1D1D1F] font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#1D1D1F] rounded-full inline-block"></span>
              Client Success
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#1D1D1F] mb-6">
              Don't just take our word for it.
            </h2>
          </ScrollReveal>

          <div className="flex justify-center gap-6 mt-10 h-[600px] overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
            {/* Col 1 */}
            <div className="flex flex-col gap-6 animate-[shadcn-scroll_35s_linear_infinite]">
              {[1, 2, 3, 4].map((i) => (
                <div key={`c1-${i}`} className="bg-[#FAFAFA] border border-neutral-100 p-8 rounded-3xl w-full max-w-[320px] shadow-sm">
                  <p className="text-[#1D1D1F] leading-relaxed mb-6">
                    "The level of discretion and market intelligence Om Prakash brings is unmatched. We secured our property entirely off-market."
                  </p>
                  <div className="flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" alt="Michael R." className="w-10 h-10 object-cover rounded-full shadow-sm" />
                    <div>
                      <h4 className="font-bold text-[#1D1D1F] text-sm bg-[linear-gradient(90deg,#1D1D1F,#6E6E73,#1D1D1F)] bg-[length:200%_auto] text-transparent bg-clip-text animate-[shineName_3s_linear_infinite]">Michael R.</h4>
                      <p className="text-xs text-[#6E6E73] mt-1">Private Collector</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Col 2 */}
            <div className="hidden md:flex flex-col gap-6 animate-[shadcn-scroll-down_40s_linear_infinite]">
              {[1, 2, 3, 4].map((i) => (
                <div key={`c2-${i}`} className="bg-white border border-neutral-100 p-8 rounded-3xl w-full max-w-[320px] shadow-md">
                  <p className="text-[#1D1D1F] leading-relaxed mb-6">
                    "From architectural pedigree verification to final closing, the seamless operation was impressive. A true luxury standard."
                  </p>
                  <div className="flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" alt="Sarah L." className="w-10 h-10 object-cover rounded-full shadow-sm" />
                    <div>
                      <h4 className="font-bold text-[#1D1D1F] text-sm bg-[linear-gradient(90deg,#1D1D1F,#6E6E73,#1D1D1F)] bg-[length:200%_auto] text-transparent bg-clip-text animate-[shineName_3s_linear_infinite]">Sarah L.</h4>
                      <p className="text-xs text-[#6E6E73] mt-1">Corporate Executive</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Col 3 */}
            <div className="hidden lg:flex flex-col gap-6 animate-[shadcn-scroll_38s_linear_infinite]">
              {[1, 2, 3, 4].map((i) => (
                <div key={`c3-${i}`} className="bg-[#FAFAFA] border border-neutral-100 p-8 rounded-3xl w-full max-w-[320px] shadow-sm">
                  <p className="text-[#1D1D1F] leading-relaxed mb-6">
                    "A boutique approach that prioritizes value preservation. They treated our acquisition as if it were their own portfolio."
                  </p>
                  <div className="flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150" alt="David K." className="w-10 h-10 object-cover rounded-full shadow-sm" />
                    <div>
                      <h4 className="font-bold text-[#1D1D1F] text-sm bg-[linear-gradient(90deg,#1D1D1F,#6E6E73,#1D1D1F)] bg-[length:200%_auto] text-transparent bg-clip-text animate-[shineName_3s_linear_infinite]">David K.</h4>
                      <p className="text-xs text-[#6E6E73] mt-1">Tech Founder</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section className="py-24 px-6 md:px-12">
        <ScrollReveal className="max-w-5xl mx-auto bg-[#1D1D1F] rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden">
          {/* Subtle circles */}
          <div className="absolute -top-16 -right-16 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Let's Work Together.
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-lg">
              Contact our office to arrange a private valuation, discuss real estate placement, or initiate acquisition search parameters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white text-[#1D1D1F] hover:bg-neutral-100 px-8 py-3.5 rounded-xl font-bold transition shadow-lg w-full sm:w-auto"
              >
                Initiate Consultation
              </button>
              <a href={`tel:${AGENT_INFO.phone}`} className="bg-transparent text-white border border-white/20 hover:bg-white/10 px-8 py-3.5 rounded-xl font-bold transition w-full sm:w-auto">
                Call Us Now
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
