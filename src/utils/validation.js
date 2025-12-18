import { z } from 'zod';

/**
 * Zod schema for conditioner form validation
 * Ensures all required fields are present and properly formatted
 */
export const conditionerSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  
  model: z.string()
    .min(1, 'Model is required')
    .max(50, 'Model must be less than 50 characters'),
  
  serialNumber: z.string()
    .min(1, 'Serial number is required')
    .max(50, 'Serial number must be less than 50 characters'),
  
  location: z.string()
    .min(1, 'Location is required')
    .max(200, 'Location must be less than 200 characters'),
  
  installationDate: z.string()
    .min(1, 'Installation date is required')
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
  
  statusId: z.number({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be selected',
  }).positive('Status is required'),
  
  typeId: z.number({
    required_error: 'Type is required',
    invalid_type_error: 'Type must be selected',
  }).positive('Type is required'),
  
  manufacturerId: z.number({
    required_error: 'Manufacturer is required',
    invalid_type_error: 'Manufacturer must be selected',
  }).positive('Manufacturer is required'),
});

/**
 * Format validation errors for display
 * @param {Object} errors - Zod validation errors
 * @returns {Object} Formatted error messages by field
 */
export function formatValidationErrors(errors) {
  const formatted = {};
  Object.keys(errors).forEach(key => {
    formatted[key] = errors[key].message;
  });
  return formatted;
}