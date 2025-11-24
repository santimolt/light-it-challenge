import * as Yup from 'yup';

export const patientValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  website: Yup.string().required('Website is required').url('Must be a valid URL'),
  avatar: Yup.string().url('Must be a valid URL').nullable(),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
});
