/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Property {
  id: string;
  name: string;
  price: number;
  location: string;
  type: 'apartment' | 'villa' | 'plot';
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  description: string;
  address: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  image: string;
  description: string;
  avgPrice: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface EnquirySubmission {
  id: string;
  propertyName?: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}

export interface ValuationSubmission {
  id: string;
  propertyAddress: string;
  propertyType: string;
  approxSize: string;
  fullName: string;
  email: string;
  phone: string;
  timestamp: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  inquiryType: 'Buy' | 'Sell' | 'General Inquiry';
  timestamp: string;
}
