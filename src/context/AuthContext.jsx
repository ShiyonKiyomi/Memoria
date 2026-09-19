import { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
