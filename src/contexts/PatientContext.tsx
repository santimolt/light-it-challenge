import {
  createContext,
  useContext,
  type ReactNode,
  useMemo,
  useCallback,
} from 'react';
import toast from 'react-hot-toast';
import { usePatients } from '../hooks/usePatients';
import { useLocalPatients } from '../hooks/useLocalPatients';
import { usePatientModal } from '../hooks/usePatientModal';
import { PatientModal } from '../components/patientModal/PatientModal';
import { ErrorPage } from '../components/ErrorPage';
import type { Patient } from '../types/patient';
import { ModalMode } from '../types/modalMode';

interface PatientContextValue {
  /** Local copy of patients for editing */
  localPatients: Patient[];
  /** Whether data is currently loading */
  isLoading: boolean;
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
  const { fetchedPatients, isPending, isError, error, refetch } = usePatients();
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

  const handleSave = useCallback(
    (updates: {
      name: string;
      website: string;
      description: string;
      avatar: string;
    }) => {
      try {
        if (modalMode === ModalMode.Create) {
          addPatient(updates);
          toast.success('Patient created successfully!');
        } else {
          if (!selectedPatient) {
            throw new Error('No patient selected for editing');
          }
          updatePatient(selectedPatient.id, updates);
          toast.success('Patient updated successfully!');
        }
        closeModal();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An error occurred while saving the patient';
        toast.error(errorMessage);
      }
    },
    [modalMode, selectedPatient, addPatient, updatePatient, closeModal]
  );

  const currentPatient = useMemo(() => {
    if (!selectedPatient) return null;
    return getPatientById(selectedPatient.id) || selectedPatient;
  }, [selectedPatient, getPatientById]);

  const value: PatientContextValue = useMemo(() => {
    // Use fetchedPatients for display if localPatients is empty (avoids flashing the add patients button)
    const displayPatients =
      localPatients.length > 0 ? localPatients : fetchedPatients || [];

    return {
      localPatients: displayPatients,
      isLoading: isPending || !fetchedPatients,
      isModalOpen,
      selectedPatient: currentPatient,
      modalMode,
      openModal,
      openCreateModal,
      closeModal,
      handleSave,
    };
  }, [
    localPatients,
    fetchedPatients,
    isPending,
    isModalOpen,
    currentPatient,
    modalMode,
    openModal,
    openCreateModal,
    closeModal,
    handleSave,
  ]);

  if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to load patients. Please check your connection and try again.';

    // Determine error type for better messaging
    let title = 'Unable to Load Patients';
    let message = errorMessage;

    if (errorMessage.includes('timeout')) {
      title = 'Request Timeout';
      message =
        'The request took too long to complete. Please check your internet connection and try again.';
    } else if (errorMessage.includes('Network error') || errorMessage.includes('fetch')) {
      title = 'Connection Error';
      message =
        'Unable to connect to the server. Please check your internet connection and try again.';
    } else if (errorMessage.includes('Invalid data format')) {
      title = 'Data Format Error';
      message =
        'The server returned data in an unexpected format. Please try again later.';
    } else if (errorMessage.includes('Invalid JSON')) {
      title = 'Response Error';
      message =
        'The server response could not be parsed. Please try again later.';
    }

    return (
      <ErrorPage
        title={title}
        message={message}
        onRetry={() => refetch()}
        showRetry={true}
      />
    );
  }

  return (
    <PatientContext.Provider value={value}>
      {children}
      <PatientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        patient={currentPatient}
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
