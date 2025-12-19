import { useEffect, useCallback } from 'react';
import { useConditionersContext } from '../../../context/ConditionersContext';
import conditionersService from '../../../services/conditionersService';
import useToast from '../../../hooks/useToast';

/**
 * Custom hook to fetch and manage the list of conditioners
 * Stores data in global context for persistence across navigation
 * @returns {Object} Conditioners data, loading state, and refetch function
 */
export function useConditionersList() {
  const {
    conditioners,
    filteredConditioners,
    updateConditioners,
    loading,
    setLoading,
    error,
    setError,
  } = useConditionersContext();
  const toast = useToast();

  // Fetch conditioners from API
  const fetchConditioners = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await conditionersService.getAll();
      updateConditioners(data);
    } catch (err) {
      console.error('Failed to fetch conditioners:', err);
      const errorMessage = err.userMessage || 'Failed to load conditioners';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [updateConditioners, setLoading, setError, toast]);

  // Fetch on mount if data is empty
  useEffect(() => {
    if (conditioners.length === 0) {
      fetchConditioners();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    conditioners: filteredConditioners,
    allConditioners: conditioners,
    loading,
    error,
    refetch: fetchConditioners,
  };
}

export default useConditionersList;