import type { Patient } from '../types/patient';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://example.com/avatar1.jpg',
    description: 'Patient description for John Doe',
    website: 'https://johndoe.com',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://example.com/avatar2.jpg',
    description: 'Patient description for Jane Smith',
    website: 'https://janesmith.com',
    createdAt: '2024-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    avatar: '',
    description: 'Patient description for Bob Johnson',
    website: 'https://bobjohnson.com',
    createdAt: '2024-01-03T00:00:00.000Z',
  },
];

