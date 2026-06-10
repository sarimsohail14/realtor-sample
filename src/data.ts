/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Testimonial, Neighborhood, TeamMember } from './types';

export const AGENT_INFO = {
  name: "Ananya Malhotra",
  title: "Principal Partner & Luxury Broker",
  email: "ananya@sterlingandson.in",
  phone: "+91 98200 12345",
  address: "12, Altamount Road, Cumballa Hill, Mumbai, MH 400026",
  bio: "With over 15 years representing gravity-defying architecture and legacy estates across Mumbai, Delhi NCR, and Bangalore, Ananya has masterfully elevated client standards of discretion, market insight, and flawless execution. Her approach mirrors the structures she represents: minimalist, robust, and beautifully aligned with intent.",
  photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
};

export const PROPERTIES: Property[] = [
  {
    id: "prop-1",
    name: "The Glass Pavilion",
    price: 485000000, // ₹48.5 Cr
    location: "Malabar Hill",
    address: "12 Altamount Road, Malabar Hill, Mumbai, MH 400026",
    type: "villa",
    beds: 5,
    baths: 6.5,
    sqft: 6800,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
    description: "Suspended in light, The Glass Pavilion merges raw steel channels with floor-to-ceiling glass paneling to cultivate limitless visual volume. Designed by award-winning architect Nils Holger, this estate redefines modern Indian indoor-outdoor flow.",
    featured: true
  },
  {
    id: "prop-2",
    name: "The Timberline Loft",
    price: 125000000, // ₹12.5 Cr
    location: "Koramangala",
    address: "742 Canopy Lane, Koramangala, Bangalore, KA 560034",
    type: "apartment",
    beds: 2,
    baths: 2,
    sqft: 1850,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    description: "An exceptional duplex penthouse emphasizing rich teak frameworks, custom terrazzo floors, and double-height panoramic openings capturing Bangalore's magnificent canopy landscapes.",
    featured: true
  },
  {
    id: "prop-3",
    name: "The Crestview Estate",
    price: 890000000, // ₹89 Cr
    location: "Lutyens' Delhi",
    address: "24 Prithviraj Road, Lutyens' Delhi, DL 110011",
    type: "villa",
    beds: 6,
    baths: 8,
    sqft: 9400,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    description: "A private contemporary fortress of scale and proportion. Monolithic concrete volumes rise seamlessly within the strictly preserved Lutyens' Bungalow Zone, incorporating a private subterranean art gallery and automated glass walls.",
    featured: true
  },
  {
    id: "prop-4",
    name: "The Obsidian Penthouse",
    price: 315000000, // ₹31.5 Cr
    location: "Worli Sea Face",
    address: "Worli Sea Face, Worli, Mumbai, MH 400030",
    type: "apartment",
    beds: 3,
    baths: 3.5,
    sqft: 3100,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    description: "Adorned with sandblasted black basalt tiles, hand-brushed steel fixtures, and wide-plank floors, this masterclass in luxury apartment design claims absolute visual authority over the Arabian Sea.",
    featured: false
  },
  {
    id: "prop-5",
    name: "Sunset Ridge Manor",
    price: 640000000, // ₹64 Cr
    location: "Jubilee Hills",
    address: "88 Jubilee Hills, Road No. 36, Hyderabad, TS 500033",
    type: "villa",
    beds: 4,
    baths: 5,
    sqft: 5200,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
    description: "Perched dramatically above Jubilee Hills, this residence presents an incomparable canvas of the Hyderabad city basin. Clean cubic architectural structures are perfectly tempered by soft interior limestone details.",
    featured: false
  },
  {
    id: "prop-6",
    name: "The Zenith Beachfront Plot",
    price: 75000000, // ₹7.5 Cr
    location: "ECR Beachfront",
    address: "East Coast Road Beachfront, Chennai, TN 600115",
    type: "plot",
    beds: 0,
    baths: 0,
    sqft: 43560, // 1 Acre
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    description: "A spectacular beachfront plot representing one of the final remaining buildable coastal parcels along Chennai's highly coveted East Coast Road. Includes approved blueprints for a passive solar pavilion.",
    featured: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Aarav & Riya Somani",
    role: "Acquired The Glass Pavilion",
    quote: "Ananya operates with an extraordinary degree of precision. There was no noise, no unnecessary persuasion—only a flawless alignment between what we sought and the architectural legacy she secured for us.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "test-2",
    name: "Vikram Sen",
    role: "Sold Malabar Hill Penthouse",
    quote: "Her aesthetic command of listing presentation was unprecedented. In an era of visual clutter, Ananya's ultra-minimal, high-intent presentation targeted exact buyers. We completed our transaction private, swift, and record-high.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "test-3",
    name: "Dr. Rohan Kapur",
    role: "Acquired Koramangala Duplex",
    quote: "The experience of buying through Ananya felt like walking into an Apple store: absolute simplicity, design clarity, and technical perfection. Her negotiation skills and discretion were completely superb.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop"
  }
];

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: "neigh-1",
    name: "Malabar Hill",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600&auto=format&fit=crop",
    description: "The historic standard of Mumbai luxury. Manicured greens, unmatched civic discretion, and architectural legacies spanning traditional family estates to ultra-modern sea-facing penthouse towers.",
    avgPrice: "₹45 Cr"
  },
  {
    id: "neigh-2",
    name: "ECR Beachfront",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    description: "An infinite dialogue between architectural concrete and the Bay of Bengal. Home to pristine private beaches and dramatic, modern coastal villas optimized for natural ventilation.",
    avgPrice: "₹12 Cr"
  },
  {
    id: "neigh-3",
    name: "Lutyens' Delhi",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
    description: "An enclave of pure architectural isolation and political heritage. Hidden behind grand secure boundary walls, Lutyens' hosts majestic colonial bungalows and monumental residential properties.",
    avgPrice: "₹85 Cr"
  },
  {
    id: "neigh-4",
    name: "Koramangala",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
    description: "Where tree-lined boulevards host the leaders of India's digital economy. A sophisticated, highly connected neighborhood prioritizing pristine modern architecture and sleek tech-integrated design.",
    avgPrice: "₹25 Cr"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "Ananya Malhotra",
    role: "Founder & Principal Land Broker",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    bio: "Ananya orchestrates the firm representing clients across high-consequence asset trade. She specializes in discreet off-market transactions."
  },
  {
    id: "team-2",
    name: "Devendra Mehta",
    role: "Partner & Architectural Relations",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    bio: "With a background in modern design history, Devendra analyzes spatial mechanics, structural pedigree, and architectural authenticity for listing assets."
  },
  {
    id: "team-3",
    name: "Priyah Sen",
    role: "Director of Acquisitions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    bio: "Priyah coordinates complex valuations and due diligence across multi-crore portfolios, guaranteeing ironclad security for high-profile portfolios."
  }
];
