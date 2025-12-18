import { memo } from 'react';
import { format } from 'date-fns';
import { MapPin, Calendar, Package, Factory, Hash, Clock, BarChart3 } from 'lucide-react';
import { useConditionersContext } from '../../../context/ConditionersContext';


const DetailRow = memo(({ icon, label, value }) => {
  const Icon = icon;
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-b-0">
      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-500 mb-1">{label}</div>
        <div className="text-base font-medium text-gray-900">{value}</div>
      </div>
    </div>
  );
});

DetailRow.displayName = 'DetailRow';

/**
 * Detailed view panel for a conditioner
 * Shows all fields with related entity information
 */
const DetailsPanel = memo(({ conditioner }) => {
  const { getStatusName, getTypeName, getManufacturer } = useConditionersContext();

  if (!conditioner) return null;

  const manufacturer = getManufacturer(conditioner.manufacturerId);
  const statusName = getStatusName(conditioner.statusId);
  const typeName = getTypeName(conditioner.typeId);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{conditioner.name}</h2>
      
      <div className="space-y-0">
        <DetailRow
          icon={Package}
          label="Model"
          value={conditioner.model}
        />
        
        <DetailRow
          icon={Hash}
          label="Serial Number"
          value={conditioner.serialNumber}
        />
        
        <DetailRow
          icon={MapPin}
          label="Location"
          value={conditioner.location}
        />
        
        <DetailRow
          icon={Calendar}
          label="Installation Date"
          value={format(new Date(conditioner.installationDate), 'MMMM dd, yyyy')}
        />
        
        <DetailRow
          icon={BarChart3}
          label="Status"
          value={statusName}
        />
        
        <DetailRow
          icon={Package}
          label="Type"
          value={typeName}
        />
        
        <DetailRow
          icon={Factory}
          label="Manufacturer"
          value={manufacturer ? `${manufacturer.name} (${manufacturer.country})` : 'Unknown'}
        />
        
        {conditioner.createdAt && (
          <DetailRow
            icon={Clock}
            label="Created At"
            value={format(new Date(conditioner.createdAt), 'MMM dd, yyyy HH:mm')}
          />
        )}
        
        {conditioner.updatedAt && (
          <DetailRow
            icon={Clock}
            label="Last Updated"
            value={format(new Date(conditioner.updatedAt), 'MMM dd, yyyy HH:mm')}
          />
        )}
      </div>
    </div>
  );
});

DetailsPanel.displayName = 'DetailsPanel';

export default DetailsPanel;