import { useState, useMemo } from 'react';
import { PatientCard } from './PatientCard';
import { SkeletonCard } from './SkeletonCard';
import { PatientListHeader } from './PatientListHeader';
import { SearchBar } from './SearchBar';
import { AddPatientButton } from './AddPatientButton';
import { usePatientContext } from '../contexts/PatientContext';
import { useColumnCount } from '../hooks/useColumnCount';
import { distributePatients } from '../utils/patientDistribution';
import type { Patient } from '../types/patient';

const SKELETON_COUNT = 12;
const SKELETON_GRID_CLASSES =
  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 w-full';

/**
 * Filters patients based on search query
 */
const filterPatients = (patients: Patient[], searchQuery: string): Patient[] => {
  if (!searchQuery.trim()) {
    return patients;
  }

  const query = searchQuery.toLowerCase().trim();
  return patients.filter((patient) =>
    patient.name.toLowerCase().includes(query)
  );
};

export const PatientList = () => {
  const { localPatients, isLoading, openModal, openCreateModal } =
    usePatientContext();
  const [searchQuery, setSearchQuery] = useState('');
  const columnCount = useColumnCount();

  const filteredPatients = useMemo(
    () => filterPatients(localPatients, searchQuery),
    [localPatients, searchQuery]
  );

  // Distribute patients into columns for responsive layout and better user experience by expanding cards by column and not by row.
  const columns = useMemo(
    () => distributePatients(filteredPatients, columnCount),
    [filteredPatients, columnCount]
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8 xl:px-12 2xl:px-16">
      <div className="mx-auto w-full">
        <PatientListHeader />

        <div className="flex sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            isLoading={isLoading}
          />
          <AddPatientButton
            onClick={openCreateModal}
            disabled={isLoading}
            fullWidthMobile={false}
          />
        </div>

        {isLoading ? (
          <div className={SKELETON_GRID_CLASSES}>
            {Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </div>
        ) : filteredPatients.length > 0 ? (
          <div className="flex gap-4 sm:gap-6 w-full">
            {columns.map((column, colIndex) => (
              <div
                key={colIndex}
                className="flex-1 flex flex-col gap-4 sm:gap-6 min-w-0"
              >
                {column.map((patient) => (
                  <PatientCard
                    key={patient.id}
                    patient={patient}
                    editPatient={openModal}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              {searchQuery.trim()
                ? `No patients found matching "${searchQuery}"`
                : 'No patients found'}
            </p>
            {!searchQuery.trim() && (
              <AddPatientButton onClick={openCreateModal} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
