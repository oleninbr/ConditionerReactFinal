import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useConditionersContext } from '../../context/ConditionersContext';
import useConditionersList from './hooks/useConditionersList';
import useLookups from '../../hooks/useLookups';
import useConditionerMutations from './hooks/useConditionerMutations';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import FiltersPanel from './components/FiltersPanel';
import SummaryWidgets from './components/SummaryWidgets';
import ConditionerGrid from './components/ConditionerGrid';
import ConfirmDialog from '../../components/common/ConfirmDialog';

function ConditionersPage() {
  const navigate = useNavigate();
  const { filters, updateFilters, resetFilters } = useConditionersContext();
  const { conditioners, allConditioners, loading } = useConditionersList();
  const { deleteConditioner } = useConditionerMutations();
  useLookups(); // Load lookup data
  const [conditionerToDelete, setConditionerToDelete] = useState(null);

  // Handle search input change
  const handleSearchChange = useCallback((value) => {
    updateFilters({ search: value });
  }, [updateFilters]);

  // Clear search
  const handleClearSearch = useCallback(() => {
    updateFilters({ search: '' });
  }, [updateFilters]);

  // Handle filter change
  const handleFilterChange = useCallback((key, value) => {
    updateFilters({ [key]: value });
  }, [updateFilters]);

  // Handle clear all filters
  const handleClearFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  // Handle delete click
  const handleDeleteClick = useCallback((conditioner) => {
    setConditionerToDelete(conditioner);
  }, []);

  // Confirm delete
  const handleConfirmDelete = useCallback(async () => {
    if (conditionerToDelete) {
      try {
        await deleteConditioner(conditionerToDelete.id);
        setConditionerToDelete(null);
      } catch {
        // Error handled by mutation hook
      }
    }
  }, [conditionerToDelete, deleteConditioner]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conditioners</h1>
          <p className="text-gray-600 mt-1">
            Manage your air conditioning units
          </p>
        </div>
        <Button
          onClick={() => navigate('/conditioners/new')}
          className="w-full md:w-auto"
        >
          <Plus className="w-5 h-5" />
          Add Conditioner
        </Button>
      </div>

      {/* Search */}
      <SearchBar
        value={filters.search}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
      />

      {/* Filters */}
      <FiltersPanel
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Summary Widgets */}
      <SummaryWidgets conditioners={allConditioners} />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{conditioners.length}</span> of{' '}
          <span className="font-semibold">{allConditioners.length}</span> conditioners
        </p>
      </div>

      {/* Grid */}
      <ConditionerGrid
        conditioners={conditioners}
        loading={loading}
        onDelete={handleDeleteClick}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!conditionerToDelete}
        onClose={() => setConditionerToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Conditioner"
        message={`Are you sure you want to delete "${conditionerToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}

export default ConditionersPage;