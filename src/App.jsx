import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConditionersProvider } from './context/ConditionersContext';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Layout from './components/layout/Layout';
import ConditionersPage from './pages/conditioners/ConditionersPage';
import ConditionerDetailPage from './pages/conditioners/ConditionerDetailPage';
import ConditionerCreatePage from './pages/conditioners/ConditionerCreatePage';
import ConditionerEditPage from './pages/conditioners/ConditionerEditPage';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
      <ToastProvider>
        <ConditionersProvider>
            <Routes>
              <Route element={<Layout />}>
                {/* Redirect root to conditioners page */}
                <Route path="/" element={<Navigate to="/conditioners" replace />} />
                {/* Conditioners routes */}
                <Route path="/conditioners" element={<ConditionersPage />} />
                <Route path="/conditioners/new" element={<ConditionerCreatePage />} />
                <Route path="/conditioners/:id" element={<ConditionerDetailPage />} />
                <Route path="/conditioners/:id/edit" element={<ConditionerEditPage />} />

                <Route path="*" element={<Navigate to="/conditioners" replace />} />
              </Route>
            </Routes>
        </ConditionersProvider>
      </ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;