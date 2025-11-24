import { PatientCard } from './PatientCard';
import { SkeletonCard } from './SkeletonCard';
import { PatientListHeader } from './PatientListHeader';
import { usePatientContext } from '../contexts/PatientContext';

export const PatientList = () => {
  const { localPatients, isLoading, openModal, openCreateModal } = usePatientContext();
  const hasPatients = localPatients.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-8">
      <div className="mx-auto">
        <PatientListHeader isLoading={isLoading} onAddClick={openCreateModal} />

        {isLoading ? (
          <div className="flex gap-6 w-full">
            {Array.from({ length: 4 }, (_, colIndex) => (
              <div key={colIndex} className="flex-1 flex flex-col gap-6 min-w-0">
                {Array.from({ length: 4 }, (_, index) => (
                  <SkeletonCard key={`skeleton-${colIndex}-${index}`} />
                ))}
              </div>
            ))}
          </div>
        ) : hasPatients ? (
          <div className="flex gap-6 w-full">
            {Array.from({ length: 4 }, (_, colIndex) => (
              <div key={colIndex} className="flex-1 flex flex-col gap-6 min-w-0">
                {localPatients
                  .filter((_, index) => index % 4 === colIndex)
                  .map((patient) => (
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
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No patients found</p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add your first patient
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

