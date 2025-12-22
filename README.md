index.html (#root)
└─ src/main.jsx
   └─ <StrictMode>
      └─ <App>
         └─ <ErrorBoundary>
            └─ <BrowserRouter>
               └─ <ToastProvider>
                  └─ <ConditionersProvider>
                     └─ <ConditionersRoutes>
                        └─ <Routes>
                           └─ <Route element={<Layout>}>
                              ├─ <Navigate path="/" → "/conditioners" />
                              ├─ <Route path="/conditioners" element={<ConditionersPage>} />
                              ├─ <Route path="/conditioners/new" element={<ConditionerCreatePage>} />
                              ├─ <Route path="/conditioners/:id" element={<ConditionerDetailPage>} />
                              ├─ <Route path="/conditioners/:id/edit" element={<ConditionerEditPage>} />
                              └─ <Navigate path="*" → "/conditioners" />

Layout
└─ <Header> [leaf]
   ├─ <Link "/conditioners">All Conditioners</Link> [leaf]
   └─ <Link "/conditioners/new">Add New</Link> [leaf]
└─ <main>
   └─ <Outlet> (рендерить активну сторінку за маршрутом)
└─ <ToastContainer>
   └─ (<Toast> × N) [leaf, умовно]

Pages
└─ ConditionersPage
   ├─ Header: <Button> Add Conditioner [leaf]
   ├─ <SearchBar>
   │  ├─ <Input> [leaf]
   │  └─ <Button variant="ghost"> Clear [leaf, умовно]
   ├─ <FiltersPanel>
   │  ├─ <Select label="Status"> [leaf]
   │  ├─ <Select label="Type"> [leaf]
   │  ├─ <Select label="Manufacturer"> [leaf]
   │  └─ <Button variant="ghost"> Clear All [leaf, умовно]
   ├─ <SummaryWidgets>
   │  ├─ <StatWidget "By Status"> [leaf]
   │  ├─ <StatWidget "By Type"> [leaf]
   │  └─ <StatWidget "By Manufacturer"> [leaf]
   ├─ Counters (Showing N of M) [leaf]
   ├─ <ConditionerGrid>
   │  ├─ (loading) → <Spinner size="lg"> [leaf, умовно]
   │  └─ (not loading)
   │     ├─ (empty) → Empty state [leaf, умовно]
   │     └─ (list) → <ConditionerCard> × N
   │        ├─ Header (name, model, status badge) [leaf]
   │        ├─ Details (location, installed date) [leaf]
   │        ├─ Chips (type, manufacturer) [leaf]
   │        └─ Actions:
   │           ├─ <Button variant="ghost"> View [leaf]
   │           ├─ <Button variant="ghost"> Edit [leaf]
   │           └─ <Button variant="ghost" class="text-red-600"> Delete [leaf]
   └─ <ConfirmDialog> (delete, умовно)
      └─ <Modal>
         └─ Actions: <Button variant="secondary">Cancel</Button> [leaf], <Button variant="danger">Delete</Button> [leaf]

└─ ConditionerCreatePage
   ├─ Header: <Button variant="ghost">Back</Button> [leaf]
   └─ Card
      └─ <ConditionerForm>
         ├─ <Input> Name / Model / Serial / Location / Installation Date [leaf]
         ├─ <Select> Status / Type / Manufacturer [leaf]
         └─ Actions:
            ├─ <Button variant="secondary">Cancel</Button> [leaf]
            └─ <Button> Submit (під час сабміту: <Spinner size="sm">) [leaf, умовно]

└─ ConditionerEditPage
   ├─ (loading) → <Spinner size="lg"> [leaf, умовно]
   ├─ (not found) → Fallback + <Button>Back to List</Button> [leaf, умовно]
   └─ (ready)
      ├─ Header: <Button variant="ghost">Back</Button> [leaf]
      └─ Card
         └─ <ConditionerForm> (заповнено даними)
            └─ Actions: Cancel / Update [leaf]

└─ ConditionerDetailPage
   ├─ (loading) → <Spinner size="lg"> [leaf, умовно]
   ├─ (error/not found) → Fallback + <Button>Back to List</Button> [leaf, умовно]
   └─ (ready)
      ├─ Header:
      │  ├─ <Button variant="ghost">Back</Button> [leaf]
      │  ├─ <Button variant="secondary">Edit</Button> [leaf]
      │  └─ <Button variant="danger">Delete</Button> [leaf]
      ├─ <DetailsPanel>
      │  └─ <DetailRow> × (Model, Serial, Location, Installation, Status, Type, Manufacturer, Created/Updated) [leaf]
      └─ <ConfirmDialog> (delete, умовно)
         └─ <Modal> → Actions: Cancel / Delete [leaf]

UI / Common
└─ <ErrorBoundary> (глобальний)
└─ <ToastContainer> / <Toast> [leaf]
└─ <Modal> (база)
└─ <ConfirmDialog> (над Modal)
└─ <Button> / <Input> / <Select> / <Spinner> [leaf]

Context Providers
└─ <ToastProvider> (тости: success, error, info, warning)
└─ <ConditionersProvider> (стан списку, фільтри, лукапи, helper-и)