import { useState, useCallback } from 'react';
import conditionersService from '../services/conditionersService';
import useToast from './useToast';
import { useConditionersList } from './useConditionersList';


export function useConditionerMutations() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { refetch } = useConditionersList();

  // Create a new conditioner
  const createConditioner = useCallback(async (data) => {
    try {
      setLoading(true);
      const result = await conditionersService.create(data);
      toast.success('Conditioner created successfully');
      await refetch(); // Refresh the list
      return result;
    } catch (err) {
      console.error('Failed to create conditioner:', err);
      toast.error(err.userMessage || 'Failed to create conditioner');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast, refetch]);

  // Update an existing conditioner
  const updateConditioner = useCallback(async (id, data) => {
    try {
      setLoading(true);
      const result = await conditionersService.update(id, data);
      toast.success('Conditioner updated successfully');
      await refetch(); // Refresh the list
      return result;
    } catch (err) {
      console.error('Failed to update conditioner:', err);
      toast.error(err.userMessage || 'Failed to update conditioner');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast, refetch]);

  // Delete a conditioner
  const deleteConditioner = useCallback(async (id) => {
    try {
      setLoading(true);
      await conditionersService.delete(id);
      toast.success('Conditioner deleted successfully');
      await refetch(); // Refresh the list
    } catch (err) {
      console.error('Failed to delete conditioner:', err);
      toast.error(err.userMessage || 'Failed to delete conditioner');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast, refetch]);

  return {
    createConditioner,
    updateConditioner,
    deleteConditioner,
    loading,
  };
}

export default useConditionerMutations;