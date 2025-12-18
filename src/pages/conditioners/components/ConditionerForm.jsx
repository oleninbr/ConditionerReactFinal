import { memo, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Spinner from '../../../components/ui/Spinner';
import { useConditionersContext } from '../../../context/ConditionersContext';


const ConditionerForm = memo(({
  form,
  onSubmit,
  onCancel,
  submitText = 'Save',
  isSubmitting = false
}) => {
  const { lookups } = useConditionersContext();
  const { register, handleSubmit, control, formState: { errors } } = form;

  // Memoize select options to prevent unnecessary re-renders
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <Input
          label="Name"
          {...register('name')}
          error={errors.name?.message}
          required
        />

        {/* Model */}
        <Input
          label="Model"
          {...register('model')}
          error={errors.model?.message}
          required
        />

        {/* Serial Number */}
        <Input
          label="Serial Number"
          {...register('serialNumber')}
          error={errors.serialNumber?.message}
          required
        />

        {/* Location */}
        <Input
          label="Location"
          {...register('location')}
          error={errors.location?.message}
          required
        />

        {/* Installation Date */}
        <Input
          label="Installation Date"
          type="date"
          {...register('installationDate')}
          error={errors.installationDate?.message}
          required
        />

        {/* Status */}
        <Controller
          name="statusId"
          control={control}
          render={({ field }) => (
            <Select
              label="Status"
              {...field}
              value={field.value || ''}
              onChange={(e) => field.onChange(Number(e.target.value))}
              options={statusOptions}
              error={errors.statusId?.message}
              required
            />
          )}
        />

        {/* Type */}
        <Controller
          name="typeId"
          control={control}
          render={({ field }) => (
            <Select
              label="Type"
              {...field}
              value={field.value || ''}
              onChange={(e) => field.onChange(Number(e.target.value))}
              options={typeOptions}
              error={errors.typeId?.message}
              required
            />
          )}
        />

        {/* Manufacturer */}
        <Controller
          name="manufacturerId"
          control={control}
          render={({ field }) => (
            <Select
              label="Manufacturer"
              {...field}
              value={field.value || ''}
              onChange={(e) => field.onChange(Number(e.target.value))}
              options={manufacturerOptions}
              error={errors.manufacturerId?.message}
              required
            />
          )}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-end pt-6 border-t">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner size="sm" />
              Saving...
            </>
          ) : (
            submitText
          )}
        </Button>
      </div>
    </form>
  );
});

ConditionerForm.displayName = 'ConditionerForm';

export default ConditionerForm;