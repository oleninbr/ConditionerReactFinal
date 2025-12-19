import { createContext, useContext } from 'react';
import { useConditionersStore } from './useConditionersStore';

const ConditionersContext = createContext(null);

export function ConditionersProvider({ children }) {
  const value = useConditionersStore();

  return (
    <ConditionersContext.Provider value={value}>
      {children}
    </ConditionersContext.Provider>
  );
}

export function useConditionersContext() {
  const context = useContext(ConditionersContext);
  if (!context) {
    throw new Error('useConditionersContext must be used within ConditionersProvider');
  }
  return context;
}