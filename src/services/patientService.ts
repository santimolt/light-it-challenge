import type { Patient } from '../types/patient';

export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await fetch(
    'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users'
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch patients: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

export const updatePatientDescription = async (
  patientId: string,
  description: string
): Promise<void> => {
  console.log(`Updating patient ${patientId} with description: ${description}`);
};
