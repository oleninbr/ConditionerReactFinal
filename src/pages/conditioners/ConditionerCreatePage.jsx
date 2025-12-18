import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useConditionerForm from '../../hooks/useConditionerForm';
import useConditionerMutations from '../../hooks/useConditionerMutations';
import useLookups from '../../hooks/useLookups';
import Button from '../../components/ui/Button';
import ConditionerForm from './components/ConditionerForm';


function ConditionerCreatePage() {
  const navigate = useNavigate();
  const form = useConditionerForm();
  const { createConditioner, loading } = useConditionerMutations();
  useLookups(); // Ensure lookups are loaded for form selects

  const handleSubmit = async (data) => {
    try {
      await createConditioner(data);
      navigate('/conditioners');
    } catch {
      // Error handled by mutation hook with toast
    }
  };

  const handleCancel = () => {
    navigate('/conditioners');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={handleCancel}
          className="flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Conditioner</h1>
          <p className="text-gray-600 mt-1">Fill in the details to create a new conditioner</p>
        </div>
      </div>

      {/* Form */}
      <div className="card">
        <ConditionerForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitText="Create Conditioner"
          isSubmitting={loading}
        />
      </div>
    </div>
  );
}

export default ConditionerCreatePage;