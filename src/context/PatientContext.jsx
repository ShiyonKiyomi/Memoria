import { createContext, useContext } from 'react';

const PatientContext = createContext(null);

export function PatientContextProvider({ children }) {
  return <PatientContext.Provider value={null}>{children}</PatientContext.Provider>;
}

export function usePatientContext() {
  return useContext(PatientContext);
}
