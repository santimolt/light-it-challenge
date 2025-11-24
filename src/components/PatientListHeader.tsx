import { PlusIcon } from '@phosphor-icons/react';

interface PatientListHeaderProps {
  /** Whether the add button should be disabled */
  isLoading?: boolean;
  /** Callback when the add button is clicked */
  onAddClick: () => void;
}

export const PatientListHeader = ({ isLoading = false, onAddClick }: PatientListHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Patient management system
      </h1>
      <button
        onClick={onAddClick}
        disabled={isLoading}
        className="px-4 py-2 flex justify-between gap-2 items-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <PlusIcon size={20} weight="bold" />
        Add new patient
      </button>
    </div>
  );
};

