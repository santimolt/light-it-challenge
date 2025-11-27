import { PatientList } from './components/PatientList';
import { CustomToaster } from './components/CustomToaster';
import { PatientProvider } from './contexts/PatientContext';
import { ErrorBoundary } from './components/ErrorBoundary';

export const App = () => {
  return (
    <ErrorBoundary>
      <PatientProvider>
        <PatientList />
        <CustomToaster />
      </PatientProvider>
    </ErrorBoundary>
  );
};
