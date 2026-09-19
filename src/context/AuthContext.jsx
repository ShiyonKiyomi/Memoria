// src/context/AuthContext.jsx
//
// PLACEHOLDER — Role 2 (Auth & Backend Lead) replaces the inside of this file
// in Section 7 with the real Supabase session logic:
//   - supabase.auth.getSession() on mount
//   - supabase.auth.onAuthStateChange subscription
//   - AppState listener for startAutoRefresh/stopAutoRefresh
//
// This stub exists so app/_layout.jsx has something real to import and wrap
// around the app from day one, and so route-guard layouts (e.g. the (tabs)
// group) can call useAuth() without crashing before auth is wired up.

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // TODO (Role 2): replace with real Supabase user/session state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // TODO: true until session check resolves

  const value = { user, setUser, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}
