import { useEffect, useRef } from 'react';
import type { Patient } from '../../types/patient';
import { XIcon } from '@phosphor-icons/react';
import { PatientForm } from './PatientForm';
import { ModalMode } from '../../types/modalMode';

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: {
    name: string;
    website: string;
    description: string;
    avatar: string;
  }) => void;
  patient: Patient | null;
  mode?: ModalMode;
}

export const PatientModal = ({
  isOpen,
  onClose,
  onSave,
  patient,
  mode = ModalMode.Edit,
}: PatientModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Show/hide modal when it's opened/closed
  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  // Reset form when modal closes with Escape key
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.addEventListener('cancel', onClose);
    return () => {
      dialog.removeEventListener('cancel', onClose);
    };
  }, [onClose]);

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target !== dialogRef.current) {
      e.stopPropagation();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleDialogClick}
      className="rounded-lg shadow-xl p-0 w-[calc(100%-2rem)] sm:w-full max-w-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0"
    >
      <div className="bg-white rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {mode === ModalMode.Create ? 'Add New Patient' : 'Edit Patient'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 shrink-0"
            aria-label="Close modal"
          >
            <XIcon size={20} weight="bold" />
          </button>
        </div>

        <PatientForm
          patient={patient}
          isOpen={isOpen}
          onSave={onSave}
          onCancel={onClose}
          mode={mode}
        />
      </div>
    </dialog>
  );
};
