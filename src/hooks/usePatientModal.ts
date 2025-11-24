import { useState, useCallback } from 'react';
import type { Patient } from '../types/patient';
import { ModalMode } from '../types/modalMode';

export const usePatientModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.Edit);

  const openModal = useCallback((patient: Patient) => {
    document.body.style.overflow = 'hidden';
    setSelectedPatient(patient);
    setModalMode(ModalMode.Edit);
    setIsModalOpen(true);
  }, []);

  const openCreateModal = useCallback(() => {
    document.body.style.overflow = 'hidden';
    setSelectedPatient(null);
    setModalMode(ModalMode.Create);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    document.body.style.overflow = 'auto';
    setIsModalOpen(false);
    setSelectedPatient(null);
    setModalMode(ModalMode.Edit);
  }, []);

  return {
    isModalOpen,
    selectedPatient,
    modalMode,
    openModal,
    openCreateModal,
    closeModal,
  };
};
