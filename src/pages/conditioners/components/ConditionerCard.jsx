import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Edit, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { useConditionersContext } from '../../../context/ConditionersContext';
import Button from '../../../components/ui/Button';


const ConditionerCard = memo(({ conditioner, onDelete }) => {
  const navigate = useNavigate();
  const { getStatusName, getTypeName, getManufacturer } = useConditionersContext();

  const manufacturer = getManufacturer(conditioner.manufacturerId);
  const statusName = getStatusName(conditioner.statusId);
  const typeName = getTypeName(conditioner.typeId);

  // Memoize callbacks to maintain referential equality
  const handleView = useCallback(() => {
    navigate(`/conditioners/${conditioner.id}`);
  }, [navigate, conditioner.id]);

  const handleEdit = useCallback((e) => {
    e.stopPropagation();
    navigate(`/conditioners/${conditioner.id}/edit`);
  }, [navigate, conditioner.id]);

  const handleDelete = useCallback((e) => {
    e.stopPropagation();
    onDelete(conditioner);
  }, [onDelete, conditioner]);

  // Status badge colors
  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Maintenance': 'bg-yellow-100 text-yellow-800',
      'Broken': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-blue-100 text-blue-800';
  };

  return (
    <div 
      className="card hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={handleView}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {conditioner.name}
          </h3>
          <p className="text-sm text-gray-500">{conditioner.model}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(statusName)}`}>
          {statusName}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{conditioner.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Installed: {format(new Date(conditioner.installationDate), 'MMM dd, yyyy')}</span>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
          {typeName}
        </span>
        <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">
          {manufacturer?.name || 'Unknown'} {manufacturer?.country && `(${manufacturer.country})`}
        </span>
      </div>

      {/* Serial Number */}
      <div className="text-xs text-gray-500 mb-4 font-mono">
        SN: {conditioner.serialNumber}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleView}
          className="flex-1"
        >
          <Eye className="w-4 h-4" />
          View
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleEdit}
          className="flex-1"
        >
          <Edit className="w-4 h-4" />
          Edit
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleDelete}
          className="flex-1 text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
  );
});

ConditionerCard.displayName = 'ConditionerCard';

export default ConditionerCard;