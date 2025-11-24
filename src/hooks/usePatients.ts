import { useQuery } from '@tanstack/react-query';
import { fetchPatients } from '../services/patientService';

/**
 * Hook for fetching patients from the API server.
 * This is the source of truth from the backend.
 * Use this for initial data loading and server state management.
 */
export const usePatients = () => {
  const queryResult = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    ...queryResult,
    /** Patients data fetched from the API server */
    fetchedPatients: queryResult.data,
  };
};
