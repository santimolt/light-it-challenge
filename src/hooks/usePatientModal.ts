import { useState, useCallback } from 'react';
import type { Patient } from '../types/patient';

export const usePatientModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const openModal = useCallback((patient: Patient) => {
    document.body.style.overflow = 'hidden';
    setSelectedPatient(patient);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    document.body.style.overflow = 'auto';
    setIsModalOpen(false);
    setSelectedPatient(null);
  }, []);

  return {
    isModalOpen,
    selectedPatient,
    openModal,
    closeModal,
  };
};
