import { useState, useEffect } from 'react';
import type { Patient } from '../types/patient';

export const useLocalPatients = (fetchedPatients: Patient[] | undefined) => {
  const [localPatients, setLocalPatients] = useState<Patient[]>(
    () => fetchedPatients || []
  );

  useEffect(() => {
    if (fetchedPatients && fetchedPatients.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalPatients(fetchedPatients);
    }
  }, [fetchedPatients]);

  const updatePatient = (
    patientId: string,
    updates: Partial<
      Pick<Patient, 'name' | 'website' | 'description' | 'avatar'>
    >
  ) => {
    setLocalPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === patientId ? { ...patient, ...updates } : patient
      )
    );
  };

  const getPatientById = (patientId: string): Patient | undefined => {
    return localPatients.find((p) => p.id === patientId);
  };

  return {
    localPatients,
    updatePatient,
    getPatientById,
  };
};
