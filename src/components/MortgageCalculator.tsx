/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { IndianRupee, Calendar, Percent, Landmark } from 'lucide-react';
import { formatRupee } from '../utils';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

export default function MortgageCalculator({ initialPrice = 485000000 }: MortgageCalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(20);
  const [interestRatePercent, setInterestRatePercent] = useState<number>(8.5);

  const [monthlyEMI, setMonthlyEMI] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [principalAmount, setPrincipalAmount] = useState<number>(0);
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(0);

  useEffect(() => {
    // Synchronize pricing limits on initial price load
    if (initialPrice && propertyPrice !== initialPrice && propertyPrice === 4850000) {
      setPropertyPrice(initialPrice);
    }
  }, [initialPrice]);

  useEffect(() => {
    const downAmount = propertyPrice * (downPaymentPercent / 100);
    const p = propertyPrice - downAmount;
    
    const r = (interestRatePercent / 12) / 100; // Monthly Rate
    const n = loanTenureYears * 12; // Monthly periods

    setDownPaymentAmount(downAmount);
    setPrincipalAmount(p);

    if (p <= 0) {
      setMonthlyEMI(0);
      setTotalInterest(0);
      setTotalAmount(0);
      return;
    }

    if (interestRatePercent === 0) {
      const emi = p / n;
      setMonthlyEMI(emi);
      setTotalAmount(p);
      setTotalInterest(0);
    } else {
      const emiFormula = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const emi = isNaN(emiFormula) || !isFinite(emiFormula) ? 0 : emiFormula;
      const totalPayable = emi * n;
      const totalInt = totalPayable - p;

      setMonthlyEMI(emi);
      setTotalAmount(totalPayable);
      setTotalInterest(totalInt);
    }
  }, [propertyPrice, downPaymentPercent, loanTenureYears, interestRatePercent]);

  return (
    <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-6 md:p-10 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Side: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-display font-bold text-[#1D1D1F] tracking-tightest">Mortgage/Home Loan Estimator.</h3>
            <p className="text-xs text-[#6E6E73]">
              Configure financing economics to evaluate carry costs for high-value properties in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Property Price */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-semibold text-[#1D1D1F] uppercase tracking-wider block">
                  Property Price (₹)
                </label>
                <span className="text-xs font-bold text-neutral-800 bg-[#F5F5F7] px-2 py-0.5 rounded">
                  {formatRupee(propertyPrice)}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-[#6E6E73] text-xs font-semibold">₹</span>
                </div>
                <input
                  type="number"
                  min="1000000"
                  step="100000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-xs pl-8 pr-4 py-2.5 border border-[#D2D2D7] rounded-lg focus:outline-none focus:border-[#1D1D1F] bg-white text-[#1D1D1F]"
                />
              </div>
              <input
                type="range"
                min="5000000"
                max="1000000000"
                step="5000000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(parseInt(e.target.value))}
                className="w-full accent-[#1D1D1F] cursor-pointer h-1 bg-[#F5F5F7] rounded-lg mt-1"
              />
            </div>

            {/* Down Payment Percent */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#1D1D1F] uppercase tracking-wider block">
                Down Payment (%)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Percent className="w-3.5 h-3.5 text-[#6E6E73]" />
                </div>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Math.min(99, Math.max(0, parseFloat(e.target.value) || 0)))}
                  className="w-full text-xs pl-8 pr-4 py-2.5 border border-[#D2D2D7] rounded-lg focus:outline-none focus:border-[#1D1D1F] bg-white text-[#1D1D1F]"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#6E6E73] mt-1">
                <span className="truncate">Value: {formatRupee(downPaymentAmount)}</span>
                <span>{downPaymentPercent}%</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#1D1D1F] uppercase tracking-wider block">
                Annual Interest Rate (%)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Percent className="w-3.5 h-3.5 text-[#6E6E73]" />
                </div>
                <input
                  type="number"
                  min="5"
                  max="20"
                  step="0.05"
                  value={interestRatePercent}
                  onChange={(e) => setInterestRatePercent(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-full text-xs pl-8 pr-4 py-2.5 border border-[#D2D2D7] rounded-lg focus:outline-none focus:border-[#1D1D1F] bg-white text-[#1D1D1F]"
                />
              </div>
              <input
                type="range"
                min="6"
                max="15"
                step="0.1"
                value={interestRatePercent}
                onChange={(e) => setInterestRatePercent(parseFloat(e.target.value))}
                className="w-full accent-[#1D1D1F] cursor-pointer h-1 bg-[#F5F5F7] rounded-lg mt-1"
              />
            </div>

            {/* Loan Tenure */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#1D1D1F] uppercase tracking-wider block">
                Loan Tenure (Years)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="w-3.5 h-3.5 text-[#6E6E73]" />
                </div>
                <select
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(parseInt(e.target.value))}
                  className="w-full text-xs pl-8 pr-4 py-2.5 border border-[#D2D2D7] rounded-lg focus:outline-none focus:border-[#1D1D1F] bg-white text-[#1D1D1F] appearance-none"
                >
                  <option value={10}>10 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={25}>25 Years</option>
                </select>
              </div>
              <p className="text-[10px] text-[#6E6E73] mt-1">
                Typical timeline is 20 years for Indian high-value real estate.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Outputs / Breakdown Output */}
        <div className="lg:col-span-5 bg-[#F5F5F7] rounded-xl p-6 md:p-8 flex flex-col justify-between border border-[rgba(0,0,0,0.04)]">
          <div className="space-y-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E6E73]">
              EMI Cost Breakdown
            </span>
            
            <div className="space-y-1">
              <span className="text-xs text-[#6E6E73] block">Estimated Monthly EMI</span>
              <h4 className="text-2xl md:text-3xl font-display font-bold text-[#1D1D1F] tracking-tightest">
                ₹{Math.round(monthlyEMI).toLocaleString('en-IN')}
                <span className="text-sm font-normal text-[#6E6E73]">/mo</span>
              </h4>
            </div>

            <div className="h-[1px] bg-[#D2D2D7]" />

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6E6E73]">Principal Amount (Loan)</span>
                <span className="font-semibold text-[#1D1D1F]">₹{Math.round(principalAmount).toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6E6E73]">Down Payment</span>
                <span className="font-semibold text-[#1D1D1F]">₹{Math.round(downPaymentAmount).toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6E6E73]">Total Interest Payable</span>
                <span className="font-semibold text-[#1D1D1F]">₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#D2D2D7]/50">
                <span className="text-[#1D1D1F] font-medium">Total Payable (Principal + Int)</span>
                <span className="font-bold text-[#1D1D1F]">₹{Math.round(totalAmount).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="bg-white rounded-lg p-3 border border-[rgba(0,0,0,0.06)] flex items-start gap-2.5">
              <Landmark className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
              <p className="text-[10px] text-[#6E6E73] leading-relaxed">
                Estimated values only. Registration fees, stamp duty (~5-7% in most Indian states) or GST are not included. Rate of {interestRatePercent}% assumed constant.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
