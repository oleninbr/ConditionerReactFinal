import { memo, useMemo } from 'react';
import { BarChart3, Package, Factory } from 'lucide-react';
import { useConditionersContext } from '../../../context/ConditionersContext';


const StatWidget = memo(({ icon, title, data, bgColor }) => {
  const Icon = icon;
  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-2">
        {Object.entries(data).length > 0 ? (
          Object.entries(data)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([key, count]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{key}</span>
                <span className="text-sm font-semibold text-gray-900">{count}</span>
              </div>
            ))
        ) : (
          <p className="text-sm text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
});

StatWidget.displayName = 'StatWidget';

/**
 * Summary widgets showing statistics by status, type, and manufacturer
 * Uses useMemo to optimize calculations
 */
const SummaryWidgets = memo(({ conditioners }) => {
  const { getStatusName, getTypeName, getManufacturer } = useConditionersContext();

  // Calculate statistics - memoized to prevent recalculation on every render
  const stats = useMemo(() => {
    const statusCounts = {};
    const typeCounts = {};
    const manufacturerCounts = {};

    conditioners.forEach(c => {
      // Count by status
      const status = getStatusName(c.statusId);
      statusCounts[status] = (statusCounts[status] || 0) + 1;

      // Count by type
      const type = getTypeName(c.typeId);
      typeCounts[type] = (typeCounts[type] || 0) + 1;

      // Count by manufacturer
      const manufacturer = getManufacturer(c.manufacturerId);
      if (manufacturer) {
        const key = manufacturer.name;
        manufacturerCounts[key] = (manufacturerCounts[key] || 0) + 1;
      }
    });

    return { statusCounts, typeCounts, manufacturerCounts };
  }, [conditioners, getStatusName, getTypeName, getManufacturer]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatWidget
        icon={BarChart3}
        title="By Status"
        data={stats.statusCounts}
        bgColor="bg-blue-500"
      />
      <StatWidget
        icon={Package}
        title="By Type"
        data={stats.typeCounts}
        bgColor="bg-green-500"
      />
      <StatWidget
        icon={Factory}
        title="By Manufacturer"
        data={stats.manufacturerCounts}
        bgColor="bg-purple-500"
      />
    </div>
  );
});

SummaryWidgets.displayName = 'SummaryWidgets';

export default SummaryWidgets;