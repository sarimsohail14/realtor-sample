/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Formats a number into Indian style currency representation (Crores/Lakhs).
 * If the value is 1 Crore (10,000,000) or more, formats as 'Cr'.
 * If the value is 1 Lakh (100,000) or more, formats as 'Lakh'.
 * Otherwise, formats as standard Rupee amount in en-IN style.
 */
export function formatRupee(amount: number): string {
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    return `₹${crores % 1 === 0 ? crores : crores.toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(2)} Lakh`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Formats a number to en-IN short scale for raw listing counts or stats
 */
export function formatIndianNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}
