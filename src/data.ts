/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Testimonial, Neighborhood, TeamMember } from './types';

export const AGENT_INFO = {
  name: "Om Prakash",
  title: "Principal Partner & Luxury Broker",
  email: "contact@ranchibrothersestate.com",
  phone: "+91 84603 76373",
  address: "1st Floor, Shristi Complex, Opposite Santevita Hospital, Old H.B Road, Firayalal Chowk, Ranchi-834001, Jharkhand",
  bio: "Om Prakash has over 15 years of experience helping clients buy and sell luxury homes in Ranchi and other big cities. He is known for his honest advice, deep market knowledge, and excellent service. He makes the process simple, safe, and stress-free for everyone.",
  photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
};

export const PROPERTIES: Property[] = [
  {
    id: "prop-1",
    name: "The Glass Pavilion",
    price: 35000000, // ₹3.5 Cr
    location: "Kanke",
    address: "Kanke Road, Opposite Kanke Dam, Ranchi, Jharkhand 834006",
    type: "villa",
    beds: 5,
    baths: 6.5,
    sqft: 6800,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
    description: "The Glass Pavilion is a beautiful modern home with huge glass windows and a strong steel design. It lets in lots of natural light and has a smooth flow between the indoor rooms and the outdoor garden.",
    featured: true,
    coordinates: [23.3941, 85.3195],
    amenities: [
      { id: "p1-a1", name: "Kanke Dam Park", type: "park", coordinates: [23.3955, 85.3210], distance: "0.3 km" },
      { id: "p1-a2", name: "DAV Public School Kanke", type: "school", coordinates: [23.3925, 85.3165], distance: "0.5 km" },
      { id: "p1-a3", name: "Ranchi Rock Garden", type: "park", coordinates: [23.3970, 85.3235], distance: "0.6 km" },
      { id: "p1-a4", name: "HP Petrol Pump", type: "fuel", coordinates: [23.3910, 85.3180], distance: "0.4 km" },
      { id: "p1-a5", name: "Kanke Resort Restaurant", type: "restaurant", coordinates: [23.3985, 85.3150], distance: "0.7 km" }
    ]
  },
  {
    id: "prop-2",
    name: "The Timberline Loft",
    price: 12500000, // ₹1.25 Cr
    location: "Bariatu",
    address: "742 Bariatu Road, Near RIMS, Ranchi, Jharkhand 834009",
    type: "apartment",
    beds: 2,
    baths: 2,
    sqft: 1850,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    description: "This premium double-story penthouse features beautiful wooden frames, high-quality floors, and large windows that offer amazing views of Ranchi's green tree tops.",
    featured: true,
    coordinates: [23.3892, 85.3596],
    amenities: [
      { id: "p2-a1", name: "RIMS Hospital", type: "hospital", coordinates: [23.3865, 85.3570], distance: "0.5 km" },
      { id: "p2-a2", name: "Surendranath Centenary School", type: "school", coordinates: [23.3920, 85.3620], distance: "0.6 km" },
      { id: "p2-a3", name: "Bariatu Park", type: "park", coordinates: [23.3875, 85.3615], distance: "0.3 km" },
      { id: "p2-a4", name: "Indian Oil Petrol Pump", type: "fuel", coordinates: [23.3905, 85.3580], distance: "0.2 km" },
      { id: "p2-a5", name: "Oxygen Park", type: "park", coordinates: [23.3810, 85.3510], distance: "1.2 km" }
    ]
  },
  {
    id: "prop-3",
    name: "The Crestview Estate",
    price: 45000000, // ₹4.5 Cr
    location: "Morabadi",
    address: "24 Morabadi Ground Marg, Ranchi, Jharkhand 834008",
    type: "villa",
    beds: 6,
    baths: 8,
    sqft: 9400,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    description: "A large, modern home located in a secure VIP area of Morabadi. It features high concrete walls, sliding glass doors, and a private basement room for art displays.",
    featured: true,
    coordinates: [23.3881, 85.3347],
    amenities: [
      { id: "p3-a1", name: "Morabadi Ground & Park", type: "park", coordinates: [23.3860, 85.3325], distance: "0.4 km" },
      { id: "p3-a2", name: "Dr. Shyama Prasad Mukherjee University", type: "school", coordinates: [23.3850, 85.3370], distance: "0.5 km" },
      { id: "p3-a3", name: "Nucleus Mall", type: "mall", coordinates: [23.3765, 85.3315], distance: "1.4 km" },
      { id: "p3-a4", name: "Morabadi Walkers Park", type: "park", coordinates: [23.3900, 85.3330], distance: "0.3 km" },
      { id: "p3-a5", name: "Hotwar State Museum Restaurant", type: "restaurant", coordinates: [23.3925, 85.3395], distance: "0.7 km" }
    ]
  },
  {
    id: "prop-4",
    name: "The Obsidian Penthouse",
    price: 21500000, // ₹2.15 Cr
    location: "Lalpur",
    address: "Circular Road, Lalpur, Ranchi, Jharkhand 834001",
    type: "apartment",
    beds: 3,
    baths: 3.5,
    sqft: 3100,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    description: "A beautiful luxury apartment featuring high-quality black tiles, steel fittings, and wooden floors. It offers great views over the center of Ranchi.",
    featured: false,
    coordinates: [23.3719, 85.3402],
    amenities: [
      { id: "p4-a1", name: "Firayalal Mall", type: "mall", coordinates: [23.3698, 85.3310], distance: "1.1 km" },
      { id: "p4-a2", name: "St. Xavier's College", type: "school", coordinates: [23.3685, 85.3385], distance: "0.4 km" },
      { id: "p4-a3", name: "Lalpur Central Market", type: "mall", coordinates: [23.3730, 85.3415], distance: "0.2 km" },
      { id: "p4-a4", name: "Bharat Petroleum Pump", type: "fuel", coordinates: [23.3710, 85.3425], distance: "0.3 km" },
      { id: "p4-a5", name: "Santevita Hospital", type: "hospital", coordinates: [23.3725, 85.3360], distance: "0.5 km" }
    ]
  },
  {
    id: "prop-5",
    name: "Sunset Ridge Manor",
    price: 28000000, // ₹2.8 Cr
    location: "Argora",
    address: "88 Argora Bypass, Ranchi, Jharkhand 834002",
    type: "villa",
    beds: 4,
    baths: 5,
    sqft: 5200,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
    description: "A spacious modern home in Argora with beautiful views of Ranchi. It features a clean box-like design with soft limestone details inside.",
    featured: false,
    coordinates: [23.3533, 85.3021],
    amenities: [
      { id: "p5-a1", name: "Argora Housing Colony Park", type: "park", coordinates: [23.3515, 85.3045], distance: "0.3 km" },
      { id: "p5-a2", name: "Springdale Public School", type: "school", coordinates: [23.3565, 85.2985], distance: "0.6 km" },
      { id: "p5-a3", name: "Shell Fuel Station", type: "fuel", coordinates: [23.3550, 85.3050], distance: "0.4 km" },
      { id: "p5-a4", name: "Argora Railway Station Market", type: "mall", coordinates: [23.3485, 85.2995], distance: "0.7 km" },
      { id: "p5-a5", name: "Urban Pind Restaurant", type: "restaurant", coordinates: [23.3520, 85.2970], distance: "0.6 km" }
    ]
  },
  {
    id: "prop-6",
    name: "The Zenith Damview Plot",
    price: 9500000, // ₹95 Lakhs
    location: "Kanke",
    address: "Kanke Dam Ring Road, Kanke, Ranchi, Jharkhand 834006",
    type: "plot",
    beds: 0,
    baths: 0,
    sqft: 10890, // 1/4 Acre
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    description: "A beautiful plot of land located right next to the Kanke Dam road. It is ready for building and comes with pre-approved design plans for a modern home.",
    featured: false,
    coordinates: [23.3980, 85.3180],
    amenities: [
      { id: "p6-a1", name: "Kanke Dam Reservoir Park", type: "park", coordinates: [23.3941, 85.3195], distance: "0.4 km" },
      { id: "p6-a2", name: "Birsa Agricultural University", type: "school", coordinates: [23.4020, 85.3110], distance: "0.9 km" },
      { id: "p6-a3", name: "Kanke Road Shopping Complex", type: "mall", coordinates: [23.3950, 85.3190], distance: "0.3 km" },
      { id: "p6-a4", name: "HP Petrol Pump", type: "fuel", coordinates: [23.3910, 85.3180], distance: "0.8 km" },
      { id: "p6-a5", name: "Sambo River Retreat Resort", type: "restaurant", coordinates: [23.4045, 85.3210], distance: "0.9 km" }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Aarav & Riya Somani",
    role: "Acquired The Glass Pavilion",
    quote: "Om Prakash works very professionally and carefully. He listened to exactly what we wanted and helped us find the perfect home without any pressure.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "test-2",
    name: "Vikram Sen",
    role: "Sold Kanke Dam Penthouse",
    quote: "His presentation of our property was clean and beautiful. He found the right buyers quickly, and we sold our penthouse fast and at a great price.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "test-3",
    name: "Dr. Rohan Kapur",
    role: "Acquired Bariatu Duplex",
    quote: "Buying our home through Om Prakash was very simple, clear, and easy. He is a great negotiator and kept everything private and professional.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop"
  }
];

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: "neigh-1",
    name: "Bariatu",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop",
    description: "A popular residential area in Ranchi with modern apartment buildings, easy transport links, good schools, and top hospitals nearby.",
    avgPrice: "₹1.2 Cr"
  },
  {
    id: "neigh-2",
    name: "Argora",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=600&auto=format&fit=crop",
    description: "A well-planned area in the center of Ranchi. It is a quiet, family-friendly neighborhood with clean parks and good roads.",
    avgPrice: "₹95 Lakhs"
  },
  {
    id: "neigh-3",
    name: "Kanke",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop",
    description: "A beautiful, green area near Kanke Dam. It is one of Ranchi's best locations for building private villas close to nature.",
    avgPrice: "₹1.8 Cr"
  },
  {
    id: "neigh-4",
    name: "Morabadi",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
    description: "A famous and premium residential area in Ranchi, known for its open green grounds, walking paths, and beautiful private houses.",
    avgPrice: "₹2.2 Cr"
  },
  {
    id: "neigh-5",
    name: "Lalpur",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=600&auto=format&fit=crop",
    description: "A lively area in the center of Ranchi with many markets and shops. It is popular for professionals who want to live in modern apartments close to everything.",
    avgPrice: "₹1.1 Cr"
  },
  {
    id: "neigh-6",
    name: "Harmu",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
    description: "A well-established neighborhood with tree-lined streets, shopping malls, modern flats, and great public facilities.",
    avgPrice: "₹1.4 Cr"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "Om Prakash",
    role: "Founder & Principal Land Broker",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    bio: "Om Prakash leads the firm and helps clients buy and sell properties. He specializes in private and confidential deals."
  },
  {
    id: "team-2",
    name: "Devendra Mehta",
    role: "Partner & Architectural Relations",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    bio: "Devendra has a deep knowledge of design history. He carefully checks the quality, layout, and style of every property we sell."
  },
  {
    id: "team-3",
    name: "Priyah Sen",
    role: "Director of Acquisitions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    bio: "Priyah manages property valuations and legal checks to make sure every purchase is safe and secure for our clients."
  }
];
