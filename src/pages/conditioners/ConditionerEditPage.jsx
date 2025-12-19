import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useConditioner from './hooks/useConditioner';
import useConditionerForm from './hooks/useConditionerForm';
import useConditionerMutations from './hooks/useConditionerMutations';
import useLookups from '../../hooks/useLookups';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import ConditionerForm from './components/ConditionerForm';


function ConditionerEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { conditioner, loading: loadingConditioner } = useConditioner(Number(id));
  const form = useConditionerForm();
  const { updateConditioner, loading: updating } = useConditionerMutations();
  useLookups(); // Ensure lookups are loaded

  // Populate form with existing data
  useEffect(() => {
    if (conditioner) {
      form.reset({
        name: conditioner.name,
        model: conditioner.model,
        serialNumber: conditioner.serialNumber,
        location: conditioner.location,
        installationDate: conditioner.installationDate?.split('T')[0] || '',
        statusId: conditioner.statusId,
        typeId: conditioner.typeId,
        manufacturerId: conditioner.manufacturerId,
      });
    }
  }, [conditioner, form]);

  const handleSubmit = async (data) => {
    try {
      await updateConditioner(Number(id), data);
      navigate(`/conditioners/${id}`);
    } catch {
      // Error handled by mutation hook
    }
  };

  const handleCancel = () => {
    navigate(`/conditioners/${id}`);
  };

  if (loadingConditioner) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!conditioner) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Conditioner Not Found</h2>
        <p className="text-gray-600 mb-6">The conditioner you're trying to edit doesn't exist.</p>
        <Button onClick={() => navigate('/conditioners')}>
          Back to List
        </Button>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Edit Conditioner</h1>
          <p className="text-gray-600 mt-1">Update the details for {conditioner.name}</p>
        </div>
      </div>

      {/* Form */}
      <div className="card">
        <ConditionerForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitText="Update Conditioner"
          isSubmitting={updating}
        />
      </div>
    </div>
  );
}

export default ConditionerEditPage;