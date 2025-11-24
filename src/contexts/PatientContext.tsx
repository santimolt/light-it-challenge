import { createContext, useContext, type ReactNode } from 'react';
import { usePatients } from '../hooks/usePatients';
import { useLocalPatients } from '../hooks/useLocalPatients';
import { usePatientModal } from '../hooks/usePatientModal';
import { PatientModal } from '../components/patientModal/PatientModal';
import type { Patient } from '../types/patient';
import { ModalMode } from '../types/modalMode';

interface PatientContextValue {
  /** Local copy of patients for editing */
  localPatients: Patient[];
  /** Whether the modal is currently open */
  isModalOpen: boolean;
  /** The patient currently being edited, or null */
  selectedPatient: Patient | null;
  /** Current modal mode (edit or create) */
  modalMode: ModalMode;
  /** Opens the modal for editing a specific patient */
  openModal: (patient: Patient) => void;
  /** Opens the modal for creating a new patient */
  openCreateModal: () => void;
  /** Closes the modal */
  closeModal: () => void;
  /** Handles saving patient changes */
  handleSave: (updates: {
    name: string;
    website: string;
    description: string;
    avatar: string;
  }) => void;
}

const PatientContext = createContext<PatientContextValue | undefined>(
  undefined
);

interface PatientProviderProps {
  /** Child components */
  children: ReactNode;
}

export const PatientProvider = ({ children }: PatientProviderProps) => {
  const { data: fetchedPatients, isLoading, isError, error } = usePatients();
  const { localPatients, updatePatient, getPatientById, addPatient } =
    useLocalPatients(fetchedPatients);
  const {
    isModalOpen,
    selectedPatient,
    modalMode,
    openModal,
    openCreateModal,
    closeModal,
  } = usePatientModal();

  const handleSave = (updates: {
    name: string;
    website: string;
    description: string;
    avatar: string;
  }) => {
    if (modalMode === ModalMode.Create) {
      addPatient(updates);
    } else {
      if (!selectedPatient) return;
      updatePatient(selectedPatient.id, updates);
    }
    closeModal();
  };

  const getCurrentPatient = (): Patient | null => {
    if (!selectedPatient) return null;
    return getPatientById(selectedPatient.id) || selectedPatient;
  };

  const value: PatientContextValue = {
    localPatients,
    isModalOpen,
    selectedPatient: getCurrentPatient(),
    modalMode,
    openModal,
    openCreateModal,
    closeModal,
    handleSave,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading patients...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">
          Error:{' '}
          {error instanceof Error ? error.message : 'Failed to load patients'}
        </p>
      </div>
    );
  }

  return (
    <PatientContext.Provider value={value}>
      {children}
      <PatientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        patient={getCurrentPatient()}
        mode={modalMode}
      />
    </PatientContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePatientContext = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatientContext must be used within a PatientProvider');
  }
  return context;
};
