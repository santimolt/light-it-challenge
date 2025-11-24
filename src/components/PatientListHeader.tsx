import { PlusIcon } from '@phosphor-icons/react';

interface PatientListHeaderProps {
  /** Whether the add button should be disabled */
  isLoading?: boolean;
  /** Callback when the add button is clicked */
  onAddClick: () => void;
}

export const PatientListHeader = ({ isLoading = false, onAddClick }: PatientListHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Patient management system
      </h1>
      <button
        onClick={onAddClick}
        disabled={isLoading}
        className="px-4 py-2 flex justify-center sm:justify-between gap-2 items-center text-sm sm:text-base text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
      >
        <PlusIcon size={20} weight="bold" />
        <span className="whitespace-nowrap">Add new patient</span>
      </button>
    </div>
  );
};

