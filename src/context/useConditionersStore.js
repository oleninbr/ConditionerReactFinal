import { useState, useCallback, useMemo } from 'react';

export function useConditionersStore() {
  const [conditioners, setConditioners] = useState([]);
  const [lookups, setLookups] = useState({
    statuses: [],
    types: [],
    manufacturers: [],
  });

  const [filters, setFilters] = useState({
    search: '',
    statusId: null,
    typeId: null,
    manufacturerId: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateConditioners = useCallback((data) => {
    setConditioners(data);
  }, []);

  const updateLookups = useCallback((data) => {
    setLookups(data);
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      statusId: null,
      typeId: null,
      manufacturerId: null,
    });
  }, []);

  const filteredConditioners = useMemo(() => {
    return conditioners.filter(conditioner => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          conditioner.name?.toLowerCase().includes(searchLower) ||
          conditioner.model?.toLowerCase().includes(searchLower) ||
          conditioner.serialNumber?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.statusId && conditioner.statusId !== filters.statusId) return false;
      if (filters.typeId && conditioner.typeId !== filters.typeId) return false;
      if (filters.manufacturerId && conditioner.manufacturerId !== filters.manufacturerId) return false;

      return true;
    });
  }, [conditioners, filters]);

  const getStatusName = useCallback((statusId) => {
    return lookups.statuses.find(s => s.id === statusId)?.name || 'Unknown';
  }, [lookups.statuses]);

  const getTypeName = useCallback((typeId) => {
    return lookups.types.find(t => t.id === typeId)?.name || 'Unknown';
  }, [lookups.types]);

  const getManufacturer = useCallback((manufacturerId) => {
    return lookups.manufacturers.find(m => m.id === manufacturerId);
  }, [lookups.manufacturers]);

  const value = useMemo(() => ({
    conditioners,
    filteredConditioners,
    lookups,
    filters,
    loading,
    error,
    updateConditioners,
    updateLookups,
    updateFilters,
    resetFilters,
    setLoading,
    setError,
    getStatusName,
    getTypeName,
    getManufacturer,
  }), [
    conditioners,
    filteredConditioners,
    lookups,
    filters,
    loading,
    error,
    updateConditioners,
    updateLookups,
    updateFilters,
    resetFilters,
    setLoading,
    setError,
    getStatusName,
    getTypeName,
    getManufacturer,
  ]);

  return value;
}
