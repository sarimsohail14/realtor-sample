/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Check, Radio, Copy, Server, AlertCircle } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'ranchibrothers_n8n_webhook_url';
const LOCAL_LOGS_KEY = 'ranchibrothers_webhook_logs';

export function getWebhookUrl(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(LOCAL_STORAGE_KEY) || '';
}

export function setWebhookUrl(url: string): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, url);
}

export interface WebhookLog {
  id: string;
  type: string;
  timestamp: string;
  payload: any;
  status: 'pending' | 'success' | 'error';
  errorMsg?: string;
}

export async function sendWebhookData(data: any, type: 'enquiry' | 'valuation' | 'contact'): Promise<{ success: boolean; error?: string }> {
  const url = getWebhookUrl();
  const logId = Math.random().toString(36).substr(2, 9);
  
  const newLog: WebhookLog = {
    id: logId,
    type,
    timestamp: new Date().toLocaleTimeString(),
    payload: data,
    status: 'pending'
  };

  // Add to local logs
  const existingLogStr = localStorage.getItem(LOCAL_LOGS_KEY) || '[]';
  const logs: WebhookLog[] = JSON.parse(existingLogStr);
  logs.unshift(newLog);
  localStorage.setItem(LOCAL_LOGS_KEY, JSON.stringify(logs.slice(0, 15)));

  // Trigger custom event to notify WebhookSettings visual component
  window.dispatchEvent(new Event('webhook_logs_updated'));

  if (!url) {
    // If no URL is set, we still simulate success locally to let them see the payload
    // and explain that they can set a URL.
    updateLogStatus(logId, 'error', 'No Webhook URL configured. Simulated local receipt.');
    return { success: true, error: "Local simulation: Setup a webhook URL to send real data." };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        form_type: type,
        submitted_at: new Date().toISOString(),
        site_source: "Ranchi Brothers Estate Portal"
      }),
    });

    if (response.ok) {
      updateLogStatus(logId, 'success');
      return { success: true };
    } else {
      updateLogStatus(logId, 'error', `HTTP ${response.status}: ${response.statusText}`);
      return { success: false, error: `Server responded with status ${response.status}` };
    }
  } catch (error: any) {
    updateLogStatus(logId, 'error', error.message || 'Network error');
    return { success: false, error: error.message || 'Failed to submit form data.' };
  }
}

function updateLogStatus(id: string, status: 'success' | 'error', errorMsg?: string) {
  try {
    const existingLogStr = localStorage.getItem(LOCAL_LOGS_KEY) || '[]';
    const logs: WebhookLog[] = JSON.parse(existingLogStr);
    const updated = logs.map(log => {
      if (log.id === id) {
        return { ...log, status, errorMsg };
      }
      return log;
    });
    localStorage.setItem(LOCAL_LOGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('webhook_logs_updated'));
  } catch (e) {
    console.error('Error updating webhook logs', e);
  }
}

export default function WebhookSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [logs, setLogs] = useState<WebhookLog[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setUrl(getWebhookUrl());
    loadLogs();

    const handleUpdate = () => loadLogs();
    window.addEventListener('webhook_logs_updated', handleUpdate);
    return () => window.removeEventListener('webhook_logs_updated', handleUpdate);
  }, []);

  const loadLogs = () => {
    try {
      const logsStr = localStorage.getItem(LOCAL_LOGS_KEY) || '[]';
      setLogs(JSON.parse(logsStr));
    } catch {
      setLogs([]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setWebhookUrl(url);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clearLogs = () => {
    localStorage.removeItem(LOCAL_LOGS_KEY);
    setLogs([]);
  };

  const copyPayload = (log: WebhookLog) => {
    navigator.clipboard.writeText(JSON.stringify(log.payload, null, 2));
    setCopiedId(log.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div id="webhook-settings" className="fixed bottom-6 left-6 z-40 font-sans">
      {/* Floating Settings Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#1D1D1F] text-white hover:bg-[#333336] px-4 py-2.5 rounded-full shadow-lg border border-neutral-800 transition duration-300 text-xs font-medium"
      >
        <Settings className={`w-3.5 h-3.5 ${isOpen ? 'animate-spin' : ''}`} />
        <span>n8n Webhook {url ? '(Active)' : '(Setup)'}</span>
      </button>

      {/* Settings Modal Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/10 backdrop-blur-xs z-30" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Minimal card */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-20 left-6 z-40 bg-white border border-[rgba(0,0,0,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.08)] rounded-2xl w-96 overflow-hidden max-h-[80vh] flex flex-col"
            >
              <div className="p-5 border-b border-[#D2D2D7] bg-[#F5F5F7] flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#1D1D1F]">n8n Automation Settings</h3>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">Configure your webhook receiver</p>
                </div>
                <Radio className={`w-3.5 h-3.5 ${url ? 'text-green-500 fill-green-500' : 'text-neutral-300'}`} />
              </div>

              <div className="p-5 flex-1 overflow-y-auto space-y-4">
                <form onSubmit={handleSave} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                      Webhook Production/Test URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://primary-n8n.yourdomain.com/webhook/..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-[#D2D2D7] rounded-lg focus:outline-none focus:border-[#1D1D1F] transition bg-white text-[#1D1D1F]"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#1D1D1F] text-white hover:bg-neutral-800 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1.5"
                  >
                    {saved ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400 font-bold" />
                        <span>Saved Config!</span>
                      </>
                    ) : (
                      <>
                        <Server className="w-3.5 h-3.5" />
                        <span>Connect Automation</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-medium text-[#1D1D1F] uppercase tracking-wider">
                      Recent Trigger History
                    </span>
                    {logs.length > 0 && (
                      <button 
                        onClick={clearLogs}
                        className="text-[10px] text-[#6E6E73] hover:text-[#1D1D1F] underline transition"
                      >
                        Clear logs
                      </button>
                    )}
                  </div>
                  
                  {logs.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#D2D2D7] p-6 text-center">
                      <AlertCircle className="w-5 h-5 text-[#6E6E73] mx-auto opacity-60 mb-1.5" />
                      <p className="text-[11px] text-[#6E6E73]">
                        No triggers captured yet. Try submitting an enquiry or valuation form!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {logs.map((log) => (
                        <div 
                          key={log.id} 
                          className="text-xs p-2.5 rounded-lg border border-[rgba(0,0,0,0.06)] bg-[#F5F5F7] space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold uppercase text-[10px] text-[#1D1D1F] bg-[#D2D2D7]/40 px-1.5 py-0.5 rounded text-center">
                              {log.type}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] text-[#6E6E73]">{log.timestamp}</span>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                log.status === 'success' ? 'bg-green-500' : 
                                log.status === 'error' ? 'bg-red-400' : 'bg-amber-400'
                              }`} />
                            </div>
                          </div>
                          
                          {log.errorMsg && (
                            <p className="text-[9px] text-red-500 font-mono italic leading-tight bg-red-50/50 p-1 rounded">
                              {log.errorMsg}
                            </p>
                          )}

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] text-[#6E6E73] font-medium truncate max-w-[150px]">
                              {log.payload.fullName || log.payload.propertyAddress || "Anonymous"}
                            </span>
                            <button
                              onClick={() => copyPayload(log)}
                              className="text-[9px] text-[#1D1D1F] hover:bg-[#D2D2D7]/50 p-1 px-1.5 rounded transition flex items-center gap-1"
                              title="Copy raw JSON payload"
                            >
                              {copiedId === log.id ? (
                                <Check className="w-2.5 h-2.5 text-green-500" />
                              ) : (
                                <Copy className="w-2.5 h-2.5" />
                              )}
                              <span>Copy JSON</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
