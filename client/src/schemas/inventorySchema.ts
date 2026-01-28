import * as yup from 'yup';

export const inventoryItemSchema = yup.object({
  name: yup.string().required('Product name is required'),
  quantity: yup
    .number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be a whole number')
    .min(1, 'Quantity must be at least 1'),
});

export type InventoryItemFormData = yup.InferType<typeof inventoryItemSchema>;
