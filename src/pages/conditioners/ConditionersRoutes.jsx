import { Route } from 'react-router-dom';
import ConditionersPage from './ConditionersPage';
import ConditionerDetailPage from './ConditionerDetailPage';
import ConditionerCreatePage from './ConditionerCreatePage';
import ConditionerEditPage from './ConditionerEditPage';

export const conditionersRoutes = [
  <Route key="list" path="/conditioners" element={<ConditionersPage />} />,
  <Route key="create" path="/conditioners/new" element={<ConditionerCreatePage />} />,
  <Route key="detail" path="/conditioners/:id" element={<ConditionerDetailPage />} />,
  <Route key="edit" path="/conditioners/:id/edit" element={<ConditionerEditPage />} />,
];

export default function ConditionersRoutes() {
  return conditionersRoutes;
}
