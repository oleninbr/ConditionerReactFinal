import { useToastContext } from '../context/ToastContext';

export function useToast() {
  const { success, error, info, warning } = useToastContext();

  return {
    success,
    error,
    info,
    warning,
  };
}

export default useToast;