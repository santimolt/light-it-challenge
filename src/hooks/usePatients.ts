import { useQuery } from '@tanstack/react-query';
import { fetchPatients } from '../services/patientService';

export const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
