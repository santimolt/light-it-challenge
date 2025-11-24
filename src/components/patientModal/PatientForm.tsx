import { useEffect } from 'react';
import { useFormik } from 'formik';
import { patientValidationSchema } from '../../schemas/patientSchema';
import type { Patient } from '../../types/patient';
import { ModalMode } from '../../types/modalMode';
import { Button } from '../Button';

interface PatientFormProps {
  patient: Patient | null;
  isOpen: boolean;
  onSave: (updates: {
    name: string;
    website: string;
    description: string;
    avatar: string;
  }) => void;
  onCancel: () => void;
  mode?: ModalMode;
}

export const PatientForm = ({
  patient,
  isOpen,
  onSave,
  onCancel,
  mode = ModalMode.Edit,
}: PatientFormProps) => {
  const formik = useFormik({
    initialValues: {
      name: patient?.name || '',
      website: patient?.website || '',
      avatar: patient?.avatar || '',
      description: patient?.description || '',
    },
    validationSchema: patientValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSave({
        name: values.name,
        website: values.website || '',
        avatar: values.avatar || '',
        description: values.description,
      });
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleCancel = () => {
    formik.resetForm();
    onCancel();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            formik.touched.name && formik.errors.name
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
          placeholder="Enter patient name..."
        />
        {formik.touched.name && formik.errors.name && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="website"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Website
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={formik.values.website}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            formik.touched.website && formik.errors.website
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
          placeholder="https://example.com"
        />
        {formik.touched.website && formik.errors.website && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.website}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="avatar"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Avatar URL
        </label>
        <input
          type="url"
          id="avatar"
          name="avatar"
          value={formik.values.avatar}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            formik.touched.avatar && formik.errors.avatar
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
          placeholder="https://example.com/avatar.jpg"
        />
        {formik.touched.avatar && formik.errors.avatar && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.avatar}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={6}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
            formik.touched.description && formik.errors.description
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
          placeholder="Enter patient description..."
        />
        {formik.touched.description && formik.errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {formik.errors.description}
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={handleCancel}
          fullWidthMobile={true}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={formik.isSubmitting}
          fullWidthMobile={true}
        >
          {mode === ModalMode.Create ? 'Create Patient' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};
