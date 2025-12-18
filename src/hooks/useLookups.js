import { useEffect } from 'react';
import { useConditionersContext } from '../context/ConditionersContext';
import lookupsService from '../services/lookupsService';
import useToast from './useToast';

/**
 * Custom hook to fetch and manage lookup data (statuses, types, manufacturers)
 * Fetches data once and stores in global context
 * @returns {Object} Lookup data and loading state
 */
export function useLookups() {
  const { lookups, updateLookups, setLoading, setError } = useConditionersContext();
  const toast = useToast();

  useEffect(() => {
    // Only fetch if lookups are empty
    if (lookups.statuses.length === 0) {
      fetchLookups();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLookups = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await lookupsService.getAll();
      updateLookups(data);
    } catch (err) {
      console.error('Failed to fetch lookups:', err);
      setError(err.userMessage || 'Failed to load reference data');
      toast.error('Failed to load reference data');
    } finally {
      setLoading(false);
    }
  };

  return {
    statuses: lookups.statuses,
    types: lookups.types,
    manufacturers: lookups.manufacturers,
    refetch: fetchLookups,
  };
}

export default useLookups;