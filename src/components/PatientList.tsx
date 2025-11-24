import { PatientCard } from './PatientCard';
import { SkeletonCard } from './SkeletonCard';
import { PatientListHeader } from './PatientListHeader';
import { usePatientContext } from '../contexts/PatientContext';

export const PatientList = () => {
  const { localPatients, isLoading, openModal, openCreateModal } = usePatientContext();
  const hasPatients = localPatients.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8 xl:px-12 2xl:px-16">
      <div className="mx-auto w-full">
        <PatientListHeader isLoading={isLoading} onAddClick={openCreateModal} />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 w-full">
            {Array.from({ length: 12 }, (_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </div>
        ) : hasPatients ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 w-full">
            {localPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                editPatient={openModal}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600 mb-4 text-sm sm:text-base">No patients found</p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 text-sm sm:text-base text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add your first patient
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

