import { useState, useEffect, useCallback } from 'react';
import conditionersService from '../services/conditionersService';
import useToast from './useToast';

/**
 * Custom hook to fetch a single conditioner by ID
 * @param {number} id - Conditioner ID
 * @returns {Object} Conditioner data, loading state, and refetch function
 */
export function useConditioner(id) {
  const [conditioner, setConditioner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const fetchConditioner = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await conditionersService.getById(id);
      setConditioner(data);
    } catch (err) {
      console.error('Failed to fetch conditioner:', err);
      const errorMessage = err.userMessage || 'Failed to load conditioner details';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    fetchConditioner();
  }, [fetchConditioner]);

  return {
    conditioner,
    loading,
    error,
    refetch: fetchConditioner,
  };
}

export default useConditioner;