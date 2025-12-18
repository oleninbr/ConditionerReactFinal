import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConditionersProvider } from './context/ConditionersContext';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Layout from './components/layout/Layout';
import ConditionersPage from './pages/conditioners/ConditionersPage';
import ConditionerDetailPage from './pages/conditioners/ConditionerDetailPage';
import ConditionerCreatePage from './pages/conditioners/ConditionerCreatePage';
import ConditionerEditPage from './pages/conditioners/ConditionerEditPage';

/**
 * Main App component
 * Sets up routing, global providers, and error boundary
 */
function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <ConditionersProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                {/* Redirect root to conditioners page */}
                <Route path="/" element={<Navigate to="/conditioners" replace />} />
                {/* Conditioners routes */}
                <Route path="/conditioners" element={<ConditionersPage />} />
                <Route path="/conditioners/new" element={<ConditionerCreatePage />} />
                <Route path="/conditioners/:id" element={<ConditionerDetailPage />} />
                <Route path="/conditioners/:id/edit" element={<ConditionerEditPage />} />
                {/* 404 fallback */}
                <Route path="*" element={<Navigate to="/conditioners" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ConditionersProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;