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

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { AppState } from "react-native";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const appStateRef = useRef(AppState.currentState);

  useEffect(() => {
    // Read whatever session is already persisted in AsyncStorage
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Keep user state in sync with sign-in/sign-out/token-refresh events
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Refresh tokens when the app comes back to the foreground,
    // stop when it goes to the background (saves battery/network)
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextState === "active"
      ) {
        supabase.auth.startAutoRefresh();
      } else if (nextState.match(/inactive|background/)) {
        supabase.auth.stopAutoRefresh();
      }
      appStateRef.current = nextState;
    });

    return () => subscription.remove();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}