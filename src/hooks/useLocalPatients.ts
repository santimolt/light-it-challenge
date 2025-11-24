import { useState, useEffect, useCallback } from 'react';
import type { Patient } from '../types/patient';

/**
 * Hook for managing local patient state (editable copy).
 * This maintains a local copy of patients that can be edited without
 * immediately affecting the server data. Syncs with fetchedPatients when they change.
 */
export const useLocalPatients = (fetchedPatients: Patient[] | undefined) => {
  const [localPatients, setLocalPatients] = useState<Patient[]>(
    fetchedPatients || []
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalPatients(fetchedPatients || []);
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

  const getPatientById = useCallback(
    (patientId: string): Patient | undefined => {
      return localPatients.find((p) => p.id === patientId);
    },
    [localPatients]
  );

  const addPatient = (patientData: {
    name: string;
    website: string;
    description: string;
    avatar: string;
  }): Patient => {
    const newPatient: Patient = {
      id: `patient-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: patientData.name,
      website: patientData.website || '',
      avatar: patientData.avatar || '',
      description: patientData.description,
      createdAt: new Date().toISOString(),
    };

    setLocalPatients((prevPatients) => [newPatient, ...prevPatients]);
    return newPatient;
  };

  return {
    localPatients,
    updatePatient,
    getPatientById,
    addPatient,
  };
};
