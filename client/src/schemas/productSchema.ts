import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup
    .string()
    .required('Product name is required')
    .min(1, 'Product name must be at least 1 character')
    .max(100, 'Product name must be at most 100 characters')
    .trim(),
});

export type ProductFormData = yup.InferType<typeof productSchema>;
