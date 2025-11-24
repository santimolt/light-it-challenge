import { PatientCard } from './components/PatientCard';
import { PatientProvider, usePatientContext } from './contexts/PatientContext';

const PatientList = () => {
  const { localPatients, openModal } = usePatientContext();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-8">
      <div className="mx-auto">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Patient management system
        </h1>

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
            <p className="text-gray-600">No patients found</p>
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
    </PatientProvider>
  );
};
