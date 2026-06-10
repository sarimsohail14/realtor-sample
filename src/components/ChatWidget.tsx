/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Check } from 'lucide-react';
import { AGENT_INFO } from '../data';
import { sendWebhookData } from './WebhookSettings';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setErrorMsg('Please agree to the communication terms.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const payload = {
      fullName,
      phone,
      message,
      agreedToSms: agreed,
      agentAssigned: AGENT_INFO.name,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await sendWebhookData(payload, 'contact');
      setIsSubmitting(false);
      if (response.success) {
        setIsSuccess(true);
        // Clear fields
        setFullName('');
        setPhone('');
        setMessage('');
        setAgreed(false);
      } else {
        setErrorMsg(response.error || 'Failed to submit message.');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 font-sans">
      
      {/* CHAT WIDGET WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-16 sm:bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] xs:w-[305px] sm:w-[315px] max-h-[calc(100vh-90px)] sm:max-h-[460px] bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[rgba(0,0,0,0.06)] overflow-hidden flex flex-col z-50 text-left"
          >
            {/* Header: compact-black background, agent info, close button */}
            <div className="bg-[#1D1D1F] p-3 flex items-center justify-between text-white border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <img
                  src={AGENT_INFO.photo}
                  alt={AGENT_INFO.name}
                  className="w-8 h-8 rounded-full object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-0.5">
                  <h4 className="text-[12px] font-bold tracking-tight text-white leading-none">
                    Let us know if you have any questions!
                  </h4>
                  <p className="text-[9px] text-zinc-400 font-medium">
                    Typically replies within minutes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
                aria-label="Close message window"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Widget Body */}
            <div className="p-3 bg-white flex-1 flex flex-col space-y-3 max-h-[300px] xs:max-h-[340px] sm:max-h-[380px] overflow-y-auto">
              
              {/* Agent Welcome Bubble Row */}
              <div className="flex gap-2 items-start">
                <img
                  src={AGENT_INFO.photo}
                  alt={AGENT_INFO.name}
                  className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-[#F5F5F7] text-[#1D1D1F] p-2.5 rounded-xl rounded-tl-none text-[11px] leading-relaxed max-w-[85%]">
                  This text goes straight to my personal phone. I will make sure to get back to you the second I'm free!
                </div>
              </div>

              {/* Form container / success state */}
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="border border-[#D2D2D7]/40 rounded-xl p-4 text-center space-y-2 bg-zinc-50/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center mx-auto">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div className="space-y-0.5">
                      <h5 className="text-[11px] font-bold text-[#1D1D1F]">Message Dispatched</h5>
                      <p className="text-[10px] text-[#6E6E73] leading-relaxed">
                        Your message has been safely routed to {AGENT_INFO.name}'s secure inbox. Expect a private correspondence shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-[10px] text-[#1D1D1F] font-bold underline hover:no-underline transition mt-1 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border border-[#D2D2D7]/50 rounded-xl p-3 space-y-2.5 bg-white"
                  >
                    {errorMsg && (
                      <div className="text-[9px] p-1.5 bg-red-50 text-red-600 rounded-lg leading-relaxed">
                        {errorMsg}
                      </div>
                    )}

                    <div className="space-y-2">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full text-[11px] px-2.5 py-2 bg-[#F5F5F7] border-0 rounded-lg text-[#1D1D1F] focus:outline-none focus:bg-zinc-100 transition placeholder:text-zinc-400"
                        />
                      </div>

                      <div>
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full text-[11px] px-2.5 py-2 bg-[#F5F5F7] border-0 rounded-lg text-[#1D1D1F] focus:outline-none focus:bg-zinc-100 transition placeholder:text-zinc-400"
                        />
                      </div>

                      <div>
                        <textarea
                          required
                          rows={2}
                          placeholder="Message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full text-[11px] px-2.5 py-2 bg-[#F5F5F7] border-0 rounded-lg text-[#1D1D1F] focus:outline-none focus:bg-zinc-100 transition placeholder:text-zinc-400 h-14 resize-none leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Checkbox Opt-In Row */}
                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="sms-opt-in"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 rounded border-[#D2D2D7] text-[#1D1D1F] focus:ring-[#1D1D1F] cursor-pointer h-3 w-3 accent-[#1D1D1F]"
                      />
                      <label htmlFor="sms-opt-in" className="text-[9px] text-[#6E6E73] leading-relaxed font-light cursor-pointer select-none">
                        By submitting you agree to receive SMS or emails for the provided channel. Rates may be applied.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#1D1D1F] hover:bg-neutral-800 disabled:bg-neutral-400 text-white rounded-lg py-2 text-[11px] font-semibold tracking-wide transition flex items-center justify-center gap-1 cursor-pointer mt-1"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send :)'}</span>
                      <Send className="w-2.5 h-2.5 rotate-45 transform" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Powered by tag footer */}
            <div className="bg-[#F5F5F7] py-2 text-center border-t border-neutral-100">
              <span className="text-[7.5px] uppercase tracking-wider font-semibold text-[#6E6E73]">
                POWERED BY <strong className="font-bold text-neutral-800">MY HELPING HANDS</strong>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING TRIGGER BUTTON (Circular badge matching Apple styling) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] p-4 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-[rgba(0,0,0,0.08)] transition duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer z-50 relative"
        title="Toggle support chat"
        aria-label="Direct helpdesk form"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare className="w-6 h-6 stroke-[1.5]" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

    </div>
  );
}
