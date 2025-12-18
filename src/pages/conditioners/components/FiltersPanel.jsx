import { memo, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { useConditionersContext } from '../../../context/ConditionersContext';

/**
 * Filters panel for status, type, and manufacturer
 */
const FiltersPanel = memo(({ onFilterChange, onClearFilters }) => {
  const { filters, lookups } = useConditionersContext();

  // Memoize options arrays to prevent re-creation on every render
  const statusOptions = useMemo(() => 
    lookups.statuses.map(s => ({ value: s.id, label: s.name })),
    [lookups.statuses]
  );

  const typeOptions = useMemo(() => 
    lookups.types.map(t => ({ value: t.id, label: t.name })),
    [lookups.types]
  );

  const manufacturerOptions = useMemo(() => 
    lookups.manufacturers.map(m => ({ 
      value: m.id, 
      label: `${m.name} (${m.country})` 
    })),
    [lookups.manufacturers]
  );

  const hasActiveFilters = filters.statusId || filters.typeId || filters.manufacturerId;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 hover:bg-red-50"
          >
            <X className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Status"
          value={filters.statusId || ''}
          onChange={(e) => onFilterChange('statusId', e.target.value ? Number(e.target.value) : null)}
          options={statusOptions}
          placeholder="All Statuses"
        />

        <Select
          label="Type"
          value={filters.typeId || ''}
          onChange={(e) => onFilterChange('typeId', e.target.value ? Number(e.target.value) : null)}
          options={typeOptions}
          placeholder="All Types"
        />

        <Select
          label="Manufacturer"
          value={filters.manufacturerId || ''}
          onChange={(e) => onFilterChange('manufacturerId', e.target.value ? Number(e.target.value) : null)}
          options={manufacturerOptions}
          placeholder="All Manufacturers"
        />
      </div>
    </div>
  );
});

FiltersPanel.displayName = 'FiltersPanel';

export default FiltersPanel;