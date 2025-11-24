import { Toaster } from 'react-hot-toast';

export const CustomToaster = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        className: 'custom-toast',
        style: {
          background: '#fff',
          color: '#1f2937',
          fontSize: '16px',
          fontWeight: '600',
          padding: '16px 20px 20px 20px',
          borderRadius: '12px',
          boxShadow:
            '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
          border: '2px solid',
          minWidth: '300px',
          position: 'relative',
          overflow: 'hidden',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
          style: {
            borderColor: '#10b981',
            background: '#ecfdf5',
          },
          className: 'custom-toast custom-toast-success',
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
          style: {
            borderColor: '#ef4444',
            background: '#fef2f2',
          },
          className: 'custom-toast custom-toast-error',
        },
      }}
    />
  );
};
