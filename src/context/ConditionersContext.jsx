import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ConditionersContext = createContext(null);

export function ConditionersProvider({ children }) {
  // Core data state
  const [conditioners, setConditioners] = useState([]);
  const [lookups, setLookups] = useState({
    statuses: [],
    types: [],
    manufacturers: [],
  });

  // Filter state - preserved across navigation
  const [filters, setFilters] = useState({
    search: '',
    statusId: null,
    typeId: null,
    manufacturerId: null,
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update conditioners data
  const updateConditioners = useCallback((data) => {
    setConditioners(data);
  }, []);

  // Update lookup data
  const updateLookups = useCallback((data) => {
    setLookups(data);
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      statusId: null,
      typeId: null,
      manufacturerId: null,
    });
  }, []);

  // Filtered conditioners based on current filter state
  const filteredConditioners = useMemo(() => {
    return conditioners.filter(conditioner => {
      // Search filter (name, model, serial number)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          conditioner.name?.toLowerCase().includes(searchLower) ||
          conditioner.model?.toLowerCase().includes(searchLower) ||
          conditioner.serialNumber?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.statusId && conditioner.statusId !== filters.statusId) {
        return false;
      }

      // Type filter
      if (filters.typeId && conditioner.typeId !== filters.typeId) {
        return false;
      }

      // Manufacturer filter
      if (filters.manufacturerId && conditioner.manufacturerId !== filters.manufacturerId) {
        return false;
      }

      return true;
    });
  }, [conditioners, filters]);

  // Helper functions to get lookup names by ID
  const getStatusName = useCallback((statusId) => {
    return lookups.statuses.find(s => s.id === statusId)?.name || 'Unknown';
  }, [lookups.statuses]);

  const getTypeName = useCallback((typeId) => {
    return lookups.types.find(t => t.id === typeId)?.name || 'Unknown';
  }, [lookups.types]);

  const getManufacturer = useCallback((manufacturerId) => {
    return lookups.manufacturers.find(m => m.id === manufacturerId);
  }, [lookups.manufacturers]);

  const value = {
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
  };

  return (
    <ConditionersContext.Provider value={value}>
      {children}
    </ConditionersContext.Provider>
  );
}

export function useConditionersContext() {
  const context = useContext(ConditionersContext);
  if (!context) {
    throw new Error('useConditionersContext must be used within ConditionersProvider');
  }
  return context;
}