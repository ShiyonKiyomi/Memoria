// src/lib/useActivePatient.js
//
// notes, reminders, and calendar_events all key off patient_id, but there's
// no global PatientContext yet (only AuthContext exists — see Section 7).
// Rather than wrap app/_layout.jsx in a new provider (which risks colliding
// with whatever Role 1/Role 3 are doing there), this is a small hook any
// screen can call directly. It mirrors the same query
// src/screens/profile/PatientInfoGate.jsx already runs, kept in one place
// so Notes, Calendar, and anything else that needs patientId stay in sync
// with how "the active patient" is defined.
//
// If this hook gets reused by three or more screens, it's probably time to
// promote it into a real PatientContext next to AuthContext — flagged here
// for whoever picks that up.

import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "../context/AuthContext";

export function useActivePatient() {
  const { user, loading: authLoading } = useAuth();
  const [patient, setPatient] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "missing" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  const refresh = useCallback(async () => {
    if (!user?.id) return;
    setStatus("loading");
    setErrorMessage("");

    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      setPatient(null);
      setErrorMessage(error.message);
      setStatus("error");
      return;
    }

    if (data) {
      setPatient(data);
      setStatus("ready");
    } else {
      setPatient(null);
      setStatus("missing");
    }
  }, [user?.id]);

  useEffect(() => {
    if (!authLoading) refresh();
  }, [authLoading, refresh]);

  return {
    patient,
    patientId: patient?.id ?? null,
    loading: authLoading || status === "loading",
    missing: status === "missing",
    error: status === "error" ? errorMessage : "",
    refresh,
  };
}
