import { PatientList } from './components/PatientList';
import { CustomToaster } from './components/CustomToaster';
import { PatientProvider } from './contexts/PatientContext';

export const App = () => {
  return (
    <PatientProvider>
      <PatientList />
      <CustomToaster />
    </PatientProvider>
  );
};
