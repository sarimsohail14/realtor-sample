import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Check } from 'lucide-react';
import { sendWebhookData } from './WebhookSettings';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: string[];
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  
  const [leadData, setLeadData] = useState({
    name: '',
    phone: '',
    intent: '',
    category: '',
    location: '',
    budget: '',
    bhk: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: 'Hi! Welcome to Ranchi Brothers Estate. Is there anything I can assist you with?',
          options: ['Yes', 'Not now']
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendWebhook = async (finalData: typeof leadData) => {
    setIsSubmitting(true);
    
    // Format the message string exactly as requested
    const formattedMessage = `Intent: ${finalData.intent} | Type: ${finalData.category} | Budget/Price: ${finalData.budget} | BHK: ${finalData.bhk} | Loc: ${finalData.location}`;
    
    const payload = {
      fullName: finalData.name,
      phone: finalData.phone,
      message: formattedMessage,
      agentAssigned: 'Chatbot Lead',
      timestamp: new Date().toISOString(),
    };

    const response = await sendWebhookData(payload, 'contact');
    setIsSubmitting(false);
    
    if (response.success) {
      setIsSuccess(true);
    } else {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: 'Oops! Something went wrong while saving your request. Please try again later.' }]);
    }
  };

  const processUserInput = (text: string) => {
    // Add user message to chat
    setMessages(prev => {
      const newMessages = [...prev];
      // remove options from previous bot message if they exist
      const lastMsgIndex = newMessages.length - 1;
      if (lastMsgIndex >= 0 && newMessages[lastMsgIndex].sender === 'bot') {
        const updatedMsg = { ...newMessages[lastMsgIndex] };
        delete updatedMsg.options;
        newMessages[lastMsgIndex] = updatedMsg;
      }
      return [...newMessages, { id: Date.now().toString(), sender: 'user', text }];
    });

    // Determine next bot step
    let nextStep = step;
    const newLeadData = { ...leadData };

    setTimeout(() => {
      let botText = '';
      let botOptions: string[] | undefined = undefined;

      switch (step) {
        case 0:
          if (text === 'Not now') {
            botText = 'No problem! Feel free to reach out whenever you are ready.';
            nextStep = 99; // End chat
          } else {
            botText = 'Please enter your name.';
            nextStep = 1;
          }
          break;
        case 1:
          newLeadData.name = text;
          botText = "Thanks! What's your phone number?";
          nextStep = 2;
          break;
        case 2:
          newLeadData.phone = text;
          botText = 'Do you want to Buy, Sell, Rent, or Invest?';
          botOptions = ['Buy', 'Sell', 'Rent', 'Invest'];
          nextStep = 3;
          break;
        case 3:
          newLeadData.intent = text;
          botText = 'Which property category?';
          botOptions = ['House / Flat', 'Land / Plot', 'Commercial', 'Warehouse'];
          nextStep = 4;
          break;
        case 4:
          newLeadData.category = text;
          botText = 'Which location are you looking in?';
          nextStep = 5;
          break;
        case 5:
          newLeadData.location = text;
          botText = 'What is your budget? (e.g. 50L - 1 Cr)';
          nextStep = 6;
          break;
        case 6:
          newLeadData.budget = text;
          botText = 'How many bedrooms (BHK)? (e.g. 2 BHK)';
          nextStep = 7;
          break;
        case 7:
          newLeadData.bhk = text;
          botText = 'Thank you! We have received your inquiry. An agent will contact you shortly.';
          nextStep = 8;
          handleSendWebhook(newLeadData);
          break;
        default:
          botText = 'If you need more help, please refresh the page.';
          break;
      }

      setLeadData(newLeadData);
      setStep(nextStep);
      
      if (nextStep !== 8 || isSubmitting) {
         setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: botText, options: botOptions }]);
      }
      
    }, 500); // simulate typing delay
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText.trim();
    setInputText('');
    processUserInput(text);
  };

  const handleOptionClick = (option: string) => {
    processUserInput(option);
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
            className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] xs:w-[320px] sm:w-[360px] h-[500px] max-h-[calc(100vh-100px)] bg-[#F3F4F6] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50 text-left border border-black/5"
          >
            {/* Header: Dark background */}
            <div className="bg-[#1D1D1F] p-4 flex items-center justify-between text-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center p-1 border border-white/20">
                  <span className="font-display font-bold text-lg text-white tracking-widest">RBE</span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold tracking-tight text-white leading-none">
                    Ranchi Brothers Support
                  </h4>
                  <p className="text-[10px] text-white/80 font-medium">
                    Typically replies in seconds
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-[#E5E5EA] text-[#1D1D1F] rounded-2xl rounded-tr-sm' 
                        : 'bg-white text-[#1D1D1F] rounded-2xl rounded-tl-sm border border-black/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Render Options if any */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 max-w-[90%]">
                      {msg.options.map((opt, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => handleOptionClick(opt)}
                          className="border border-[#1D1D1F] text-[#1D1D1F] bg-white hover:bg-[#F5F5F7] px-4 py-1.5 rounded-full text-[13px] transition font-medium cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isSubmitting && (
                <div className="flex items-start">
                  <div className="bg-white px-4 py-3 text-[13px] rounded-2xl rounded-tl-sm border border-black/5 shadow-sm">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce delay-200"></span>
                    </span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            {isSuccess ? (
              <div className="p-4 bg-white text-center border-t border-black/5 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#1D1D1F] font-bold">Inquiry Sent Successfully</p>
                <p className="text-[10px] text-gray-500 mt-1">Our team will reach out soon.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="p-3 bg-white border-t border-black/5 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={step === 8 || step === 99 || isSubmitting}
                  className="flex-1 bg-[#F3F4F6] text-[#1D1D1F] px-4 py-3 rounded-full text-[13px] focus:outline-none placeholder:text-gray-500"
                />
                <button 
                  type="submit" 
                  disabled={!inputText.trim() || step === 8 || step === 99 || isSubmitting}
                  className="text-[#1D1D1F] p-2 hover:bg-[#F3F4F6] rounded-full disabled:opacity-50 transition cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#1D1D1F] hover:bg-neutral-800 text-white p-4 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer z-50 relative"
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
