
import { DiaryEntry } from './types';

export const mockDiaryEntries: DiaryEntry[] = [
  {
    id: '1',
    date: new Date('2024-07-15'),
    activity: 'Planting',
    crop: 'Tomato',
    details: 'Planted 200 saplings of Arka Rakshak variety.',
    quantity: 200,
    unit: 'saplings'
  },
  {
    id: '2',
    date: new Date('2024-07-20'),
    activity: 'Spraying',
    crop: 'Tomato',
    details: 'Sprayed Neem oil solution (5ml/liter) as a preventive measure against pests.',
    quantity: 50,
    unit: 'liters'
  },
  {
    id: '3',
    date: new Date('2024-07-01'),
    activity: 'General',
    crop: 'Paddy',
    details: 'Prepared the main field. Leveling and bunding completed.',
  },
  {
    id: '4',
    date: new Date('2024-06-25'),
    activity: 'Harvesting',
    crop: 'Okra',
    details: 'First harvest of the season. Yield was good.',
    quantity: 50,
    unit: 'kg'
  },
  {
    id: '5',
    date: new Date('2024-06-10'),
    activity: 'Planting',
    crop: 'Chilli',
    details: 'Sowed seeds for the new batch of Guntur Sannam chillies.',
    quantity: 2,
    unit: 'kg'
  },
];
