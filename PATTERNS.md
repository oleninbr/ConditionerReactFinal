# Architecture Patterns

## 1. **Provider/Context** — глобальний стан і сервіси

Централізований доступ до даних через контекст, уникнення prop drilling.

**Приклад:**
```jsx
const ConditionersContext = createContext(null);
export function ConditionersProvider({ children }) {
  const value = useConditionersStore();
  return <ConditionersContext.Provider value={value}>{children}</ConditionersContext.Provider>;
}
```

**Файли:** [src/context/ConditionersContext.jsx](src/context/ConditionersContext.jsx), [src/context/ToastContext.jsx](src/context/ToastContext.jsx)

---

## 2. **Custom Hooks** — інкапсуляція логіки та побічних ефектів

Переиспользуємі хуки для отримання даних, мутацій та управління станом.

**Приклад:**
```js
export function useConditionersList() {
  const { conditioners, updateConditioners, setLoading, setError } = useConditionersContext();
  const fetchConditioners = useCallback(async () => {
    try {
      setLoading(true);
      const data = await conditionersService.getAll();
      updateConditioners(data);
    } catch (err) {
      toast.error(err.userMessage || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [updateConditioners, setLoading, setError, toast]);
  
  useEffect(() => {
    if (conditioners.length === 0) fetchConditioners();
  }, []);
  
  return { conditioners: filteredConditioners, allConditioners: conditioners, loading };
}
```

**Хуки:** [useConditionersList](src/pages/conditioners/hooks/useConditionersList.js), [useConditioner](src/pages/conditioners/hooks/useConditioner.js), [useConditionerMutations](src/pages/conditioners/hooks/useConditionerMutations.js), [useLookups](src/hooks/useLookups.js), [useToast](src/hooks/useToast.js)

---

## 3. **Service Layer** — розділення HTTP-операцій

Інкапсуляція API-запитів у сервісних модулях, незалежних від React.

**Приклад:**
```js
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    error.userMessage = error.response?.data?.message || 'An error occurred';
    return Promise.reject(error);
  }
);

const conditionersService = {
  async getAll() { return (await apiClient.get('/conditioners')).data; },
  async getById(id) { return (await apiClient.get(`/conditioners/${id}`)).data; },
  async create(data) { return (await apiClient.post('/conditioners', data)).data; },
  async update(id, data) { return (await apiClient.put(`/conditioners/${id}`, data)).data; },
  async delete(id) { await apiClient.delete(`/conditioners/${id}`); },
};
```

**Файли:** [src/services/apiClient.js](src/services/apiClient.js), [src/services/conditionersService.js](src/services/conditionersService.js)

---

## 4. **State Store + Memoization** — оптимізація дериватних даних

`useMemo` для похідних, `useCallback` для селекторів.

**Приклад:**
```js
export function useConditionersStore() {
  const [conditioners, setConditioners] = useState([]);
  const [filters, setFilters] = useState({ search: '', statusId: null });

  const filteredConditioners = useMemo(() => {
    return conditioners.filter(c => {
      if (filters.search && !c.name?.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.statusId && c.statusId !== filters.statusId) return false;
      return true;
    });
  }, [conditioners, filters]);

  const getStatusName = useCallback((statusId) => 
    lookups.statuses.find(s => s.id === statusId)?.name || 'Unknown',
    [lookups.statuses]
  );

  return { conditioners, filteredConditioners, filters, getStatusName };
}
```

**Файл:** [src/context/useConditionersStore.js](src/context/useConditionersStore.js)

---

## 5. **Routing + Layout** — вкладена структура маршрутів

Спільний макет `Layout` з `Outlet` для рендерингу активної сторінки.

**Приклад:**
```jsx
const Layout = memo(() => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
});

export default function ConditionersRoutes() {
  return <Routes>
    <Route element={<Layout>}>
      <Route path="/conditioners" element={<ConditionersPage>} />
      <Route path="/conditioners/new" element={<ConditionerCreatePage>} />
      <Route path="/conditioners/:id" element={<ConditionerDetailPage>} />
      <Route path="/conditioners/:id/edit" element={<ConditionerEditPage>} />
    </Route>
  </Routes>;
}
```

**Файли:** [src/components/layout/Layout.jsx](src/components/layout/Layout.jsx), [src/pages/conditioners/ConditionersRoutes.jsx](src/pages/conditioners/ConditionersRoutes.jsx)

---

## 6. **Error Boundary** — перехоплення помилок рендеру

Клас-компонент для ловління помилок у дереві.

**Приклад:**
```jsx
class ErrorBoundary extends Component {
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Button onClick={() => this.setState({ hasError: false })}>Try Again</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

**Файл:** [src/components/ui/ErrorBoundary.jsx](src/components/ui/ErrorBoundary.jsx)

---

## 7. **Presentational vs Container** — розділення турботи

Сторінки управляють станом (контейнери), UI-компоненти тільки відображають.

**Приклад:**
```jsx
// Container
function ConditionersPage() {
  const { filters, updateFilters } = useConditionersContext();
  const { conditioners, loading } = useConditionersList();

  return (
    <div className="space-y-6">
      <SearchBar value={filters.search} onChange={handleSearchChange} />
      <ConditionerGrid conditioners={conditioners} loading={loading} />
    </div>
  );
}

// Presentational
const ConditionerCard = memo(({ conditioner, onDelete }) => (
  <div className="card">
    <h3 className="text-lg font-semibold">{conditioner.name}</h3>
    <Button onClick={() => onDelete(conditioner)}>Delete</Button>
  </div>
));
```

**Файли:** [src/pages/conditioners/ConditionersPage.jsx](src/pages/conditioners/ConditionersPage.jsx), [src/pages/conditioners/components/ConditionerCard.jsx](src/pages/conditioners/components/ConditionerCard.jsx)

---

## 8. **Memoization** — стабільність пропсів

`memo`, `useMemo`, `useCallback` для уникнення непотрібних ре-рендерів.

**Приклад:**
```jsx
const FiltersPanel = memo(({ onFilterChange }) => {
  const { lookups } = useConditionersContext();

  const statusOptions = useMemo(() => 
    lookups.statuses.map(s => ({ value: s.id, label: s.name })),
    [lookups.statuses]
  );

  return <Select label="Status" options={statusOptions} />;
});

const ConditionerCard = memo(({ conditioner, onDelete }) => {
  const handleDelete = useCallback((e) => {
    e.stopPropagation();
    onDelete(conditioner);
  }, [onDelete, conditioner]);

  return <Button onClick={handleDelete}>Delete</Button>;
});
```

**Файли:** [src/pages/conditioners/components/FiltersPanel.jsx](src/pages/conditioners/components/FiltersPanel.jsx), [src/pages/conditioners/components/ConditionerCard.jsx](src/pages/conditioners/components/ConditionerCard.jsx)

---

## 9. **Controlled Form + react-hook-form** — керування формами

`register` + `Controller` для інтеграції з UI-компонентами.

**Приклад:**
```jsx
const ConditionerForm = memo(({ form, onSubmit, submitText = 'Save' }) => {
  const { register, handleSubmit, control, formState: { errors } } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input label="Name" {...register('name', { required: 'Name is required' })} error={errors.name?.message} required />

      <Controller
        name="statusId"
        control={control}
        rules={{ required: 'Status is required' }}
        render={({ field }) => (
          <Select label="Status" {...field} value={field.value || ''} onChange={(e) => field.onChange(Number(e.target.value))} required />
        )}
      />

      <Button type="submit">{submitText}</Button>
    </form>
  );
});
```

**Файл:** [src/pages/conditioners/components/ConditionerForm.jsx](src/pages/conditioners/components/ConditionerForm.jsx)

---

## 10. **Composition** — побудова специфічних компонентів

Базовий модал розширюється для діалогів.

**Приклад:**
```jsx
const Modal = memo(({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
});

const ConfirmDialog = memo(({ isOpen, onClose, onConfirm, title, message }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="sm">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{message}</p>
    <div className="flex gap-3 justify-center">
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <Button variant="danger" onClick={onConfirm}>Delete</Button>
    </div>
  </Modal>
));
```

**Файли:** [src/components/ui/Modal.jsx](src/components/ui/Modal.jsx), [src/components/common/ConfirmDialog.jsx](src/components/common/ConfirmDialog.jsx)

---

## 11. **Toast Notifications** — глобальні сповіщення

Контекст керує видимістю і таймерами.

**Приклад:**
```jsx
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const success = useCallback((msg) => addToast(msg, 'success'), [addToast]);
  const error = useCallback((msg) => addToast(msg, 'error'), [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, success, error }}>
      {children}
    </ToastContext.Provider>
  );
}
```

**Файл:** [src/context/ToastContext.jsx](src/context/ToastContext.jsx)

---

## 12. **Conditional Rendering** — завантаження, пусто, контент

Явна обробка всіх станів для кращого UX.

**Приклад:**
```jsx
const ConditionerGrid = memo(({ conditioners, loading, onDelete }) => {
  if (loading) return <div className="flex justify-center items-center py-20"><Spinner size="lg" /></div>;

  if (conditioners.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No conditioners found</h3>
        <p className="text-gray-600">Try adjusting your filters or add a new conditioner.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {conditioners.map(conditioner => (
        <ConditionerCard key={conditioner.id} conditioner={conditioner} onDelete={onDelete} />
      ))}
    </div>
  );
});
```

**Файл:** [src/pages/conditioners/components/ConditionerGrid.jsx](src/pages/conditioners/components/ConditionerGrid.jsx)
