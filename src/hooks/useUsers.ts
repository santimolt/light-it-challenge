import { useQuery } from '@tanstack/react-query';
import type { User } from '../types/user';

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://63bedcf7f5cfc0949b634fc8.mockapi.io/users');

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

