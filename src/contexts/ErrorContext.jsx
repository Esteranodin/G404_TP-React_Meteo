import { createContext, useContext, useState } from 'react';

const defaultValue = {
  errors: {},
  setError: () => {},
  clearError: () => {},
  clearAllErrors: () => {}
};

const ErrorContext = createContext(defaultValue);

export function ErrorProvider({ children }) {
  const [errors, setErrors] = useState({});

  const setError = (source, errorMessage) => {
    setErrors(prev => ({
      ...prev,
      [source]: errorMessage
    }));
  };

  const clearError = (source) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[source];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  // Pas inclure le rendu des erreurs dans le Provider lui-même
  return (
    <ErrorContext.Provider 
      value={{
        errors,
        setError,
        clearError,
        clearAllErrors
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  return useContext(ErrorContext);
}