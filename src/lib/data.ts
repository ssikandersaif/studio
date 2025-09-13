import {
  CropPrice,
  AgriculturalOfficer,
  GovernmentScheme,
  User,
} from './types';
import { format } from 'date-fns';

export const mockUsers: User[] = [
    { id: '1', name: 'Farmer1', email: 'farmer1@example.com', avatarUrl: 'https://picsum.photos/seed/user1/100/100' },
    { id: '2', name: 'Farmer2', email: 'farmer2@example.com', avatarUrl: 'https://picsum.photos/seed/user2/100/100' },
    { id: '3', name: 'Farmer3', email: 'farmer3@example.com', avatarUrl: 'https://picsum.photos/seed/user3/100/100' },
];

export const mockUserPasswords: { [key: string]: string } = {
    '1': 'password123',
    '2': 'password123',
    '3': 'password123',
};


export const mockCropPrices: CropPrice[] = [
  {
    id: '1',
    name: 'Paddy',
    variety: 'Basmati',
    mandi: 'Karnal, Haryana',
    minPrice: 3200,
    maxPrice: 3500,
    modalPrice: 3350,
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: '2',
    name: 'Wheat',
    variety: 'Lokwan',
    mandi: 'Indore, Madhya Pradesh',
    minPrice: 2000,
    maxPrice: 2200,
    modalPrice: 2100,
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: '3',
    name: 'Tomato',
    variety: 'Hybrid',
    mandi: 'Nashik, Maharashtra',
    minPrice: 800,
    maxPrice: 1200,
    modalPrice: 1000,
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: '4',
    name: 'Onion',
    variety: 'Red',
    mandi: 'Lasalgaon, Maharashtra',
    minPrice: 1500,
    maxPrice: 1800,
    modalPrice: 1650,
    date: format(new Date(), 'yyyy-MM-dd'),
  },
    {
    id: '5',
    name: 'Potato',
    variety: 'Jyoti',
    mandi: 'Agra, Uttar Pradesh',
    minPrice: 900,
    maxPrice: 1100,
    modalPrice: 1000,
    date: format(new Date(), 'yyyy-MM-dd'),
  },
];

export const mockOfficers: AgriculturalOfficer[] = [
  {
    id: '1',
    name: 'Dr. Ramesh Kumar',
    title: 'Chief Agricultural Officer',
    district: 'Thrissur, Kerala',
    phone: '+91-9876543210',
    email: 'ramesh.kumar@gov.in',
    avatarUrl: 'https://picsum.photos/seed/officer1/100/100',
  },
  {
    id: '2',
    name: 'Sunita Sharma',
    title: 'Horticulture Specialist',
    district: 'Pune, Maharashtra',
    phone: '+91-9876543211',
    email: 'sunita.sharma@gov.in',
    avatarUrl: 'https://picsum.photos/seed/officer2/100/100',
  },
  {
    id: '3',
    name: 'Anil Singh',
    title: 'Soil Health Expert',
    district: 'Ludhiana, Punjab',
    phone: '+91-9876543212',
    email: 'anil.singh@gov.in',
    avatarUrl: 'https://picsum.photos/seed/officer3/100/100',
  },
    {
    id: '4',
    name: 'Priya Patel',
    title: 'Pest Management Officer',
    district: 'Anand, Gujarat',
    phone: '+91-9876543213',
    email: 'priya.patel@gov.in',
    avatarUrl: 'https://picsum.photos/seed/officer4/100/100',
  },
];

export const mockSchemes: GovernmentScheme[] = [
  {
    id: '1',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    description:
      'An income support scheme for all landholding farmer families.',
    eligibility: {
      crops: ['All'],
      states: ['All'],
    },
    link: 'https://pmkisan.gov.in/',
  },
  {
    id: '2',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'A crop insurance scheme to provide financial support to farmers suffering crop loss/damage.',
    eligibility: {
      crops: ['All'],
      states: ['All'],
    },
    link: 'https://pmfby.gov.in/',
  },
  {
    id: '3',
    name: 'National Mission for Sustainable Agriculture (NMSA)',
    description: 'Aims to make agriculture more productive, sustainable, and climate-resilient.',
    eligibility: {
      crops: ['All'],
      states: ['All'],
    },
    link: 'https://nmsa.dac.gov.in/',
  },
    {
    id: '4',
    name: 'Kerala Paddy Procurement Scheme',
    description: 'A state-specific scheme for procuring paddy at a minimum support price.',
    eligibility: {
      crops: ['Paddy'],
      states: ['Kerala'],
    },
    link: 'http://www.supplycokerala.com/paddy-procurement',
  },
];
