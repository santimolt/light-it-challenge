import type { Patient } from '../types/patient';

/**
 * Filters patients based on search query
 * @param patients - Array of patients to filter
 * @param searchQuery - Search query string
 * @returns Filtered array of patients matching the search query
 */
export const filterPatients = (
  patients: Patient[],
  searchQuery: string
): Patient[] => {
  if (!searchQuery.trim()) {
    return patients;
  }

  const query = searchQuery.toLowerCase().trim();
  return patients.filter((patient) =>
    patient.name.toLowerCase().includes(query)
  );
};

