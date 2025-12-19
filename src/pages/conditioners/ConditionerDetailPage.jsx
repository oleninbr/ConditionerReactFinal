import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import useConditioner from './hooks/useConditioner';
import useConditionerMutations from './hooks/useConditionerMutations';
import useLookups from '../../hooks/useLookups';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import DetailsPanel from './components/DetailsPanel';
import ConfirmDialog from '../../components/common/ConfirmDialog';

function ConditionerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { conditioner, loading, error } = useConditioner(Number(id));
  const { deleteConditioner } = useConditionerMutations();
  useLookups(); // Ensure lookups are loaded
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEdit = useCallback(() => {
    navigate(`/conditioners/${id}/edit`);
  }, [navigate, id]);

  const handleDelete = useCallback(() => {
    setShowDeleteDialog(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await deleteConditioner(Number(id));
      navigate('/conditioners');
    } catch {
      setShowDeleteDialog(false);
    }
  }, [deleteConditioner, id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !conditioner) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Conditioner Not Found</h2>
        <p className="text-gray-600 mb-6">The conditioner you're looking for doesn't exist.</p>
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
          onClick={() => navigate('/conditioners')}
          className="flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 flex-1">Conditioner Details</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleEdit}>
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Details */}
      <DetailsPanel conditioner={conditioner} />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Conditioner"
        message={`Are you sure you want to delete "${conditioner.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}

export default ConditionerDetailPage;