import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { conditionerSchema } from '../utils/validation';

/**
 * Custom hook for conditioner form management
 * Integrates React Hook Form with Zod validation
 * @param {Object} defaultValues - Initial form values
 * @returns {Object} Form methods and state
 */
export function useConditionerForm(defaultValues = {}) {
  const form = useForm({
    resolver: zodResolver(conditionerSchema),
    defaultValues: {
      name: '',
      model: '',
      serialNumber: '',
      location: '',
      installationDate: new Date().toISOString().split('T')[0],
      statusId: 0,
      typeId: 0,
      manufacturerId: 0,
      ...defaultValues,
    },
    mode: 'onBlur', // Validate on blur for better UX
  });

  return form;
}

export default useConditionerForm;