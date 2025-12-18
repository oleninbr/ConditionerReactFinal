import { memo } from 'react';
import ConditionerCard from './ConditionerCard';
import Spinner from '../../../components/ui/Spinner';


const ConditionerGrid = memo(({ conditioners, loading, onDelete }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (conditioners.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No conditioners found</h3>
        <p className="text-gray-600">Try adjusting your filters or add a new conditioner.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {conditioners.map(conditioner => (
        <ConditionerCard 
          key={conditioner.id} 
          conditioner={conditioner}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
});

ConditionerGrid.displayName = 'ConditionerGrid';

export default ConditionerGrid;