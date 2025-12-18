import { memo } from 'react';
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { useToastContext } from '../../context/ToastContext';
import Button from './Button';

/**
 * Toast notification component with auto-dismiss
 */
const Toast = memo(({ toast }) => {
  const { removeToast } = useToastContext();

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
  };

  const colors = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  };

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${colors[toast.type]} shadow-lg max-w-md`}>
      <div className="flex-shrink-0">
        {icons[toast.type]}
      </div>
      <div className="flex-1 text-sm font-medium">
        {toast.message}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 p-1 hover:bg-transparent"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
});

Toast.displayName = 'Toast';

/**
 * Toast container - renders all active toasts
 */
export function ToastContainer() {
  const { toasts } = useToastContext();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

export default Toast;