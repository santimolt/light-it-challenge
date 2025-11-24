import { PlusIcon } from '@phosphor-icons/react';
import { PatientCard } from './components/PatientCard';
import { CustomToaster } from './components/CustomToaster';
import { PatientProvider, usePatientContext } from './contexts/PatientContext';

const PatientList = () => {
  const { localPatients, openModal, openCreateModal } = usePatientContext();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-8">
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Patient management system
          </h1>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 flex justify-between gap-2 items-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon size={20} weight="bold" />
            Add new patient
          </button>
        </div>

        {localPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            {localPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                editPatient={openModal}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No patients found</p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Your First Patient
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <PatientProvider>
      <PatientList />
      <CustomToaster />
    </PatientProvider>
  );
};
