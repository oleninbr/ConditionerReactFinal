import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConditionersProvider } from './context/ConditionersContext';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Layout from './components/layout/Layout';
import ConditionersRoutes from './pages/conditioners/ConditionersRoutes';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
      <ToastProvider>
        <ConditionersProvider>
           <ConditionersRoutes />
        </ConditionersProvider>
      </ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;