import type { Patient } from '../types/patient';

/**
 * Distributes patients across multiple columns for masonry-style layout
 * @param patients - Array of patients to distribute
 * @param columnCount - Number of columns to distribute across
 * @returns Array of arrays, where each inner array represents a column
 */
export const distributePatients = (
  patients: Patient[],
  columnCount: number
): Patient[][] => {
  const columns: Patient[][] = Array.from({ length: columnCount }, () => []);
  
  patients.forEach((patient, index) => {
    columns[index % columnCount].push(patient);
  });
  
  return columns;
};

