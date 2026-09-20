import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../theme/colors";
import PatientGuardianForm from "../auth/PatientGuardianForm";
import PersonInfo from "./PersonInfo";

// Decides which "Patient & Guardian Info" screen a user sees:
//   - No `patients` row yet for this account -> PatientGuardianForm
//     (the 2-step name/DOB -> guardian details flow).
//   - A row already exists                    -> PersonInfo (switchable
//     Guardian/Patient view, editable, no re-entering everything).
//
// This is the single source of truth for that check — used by BOTH
// app/patient-info.jsx (reached right after signup, before tabs exist) and
// app/(tabs)/profile/patient-info.jsx (reached from the Profile tab), so the
// two entry points can never disagree about which screen to show.
//
// `afterSave` controls what happens right after the form is submitted for
// the very first time:
//   - "dashboard" (onboarding route): go to the dashboard, like today.
//   - "stay" (profile route): swap straight to the PersonInfo view in
//     place — jumping to Dashboard would be jarring for someone who came
//     from Profile specifically to fill this in.
export default function PatientInfoGate({ afterSave = "dashboard" }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState("loading"); // "loading" | "form" | "info"
  const [patient, setPatient] = useState(null);

  const checkPatient = useCallback(async () => {
    if (!user?.id) return;
    setStatus("loading");
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      // Can't tell either way — fall back to the form rather than getting
      // stuck on a spinner. Any real problem (e.g. RLS) will surface again
      // clearly when SAVE is pressed.
      console.warn("Failed to load patient/guardian info:", error.message);
      setPatient(null);
      setStatus("form");
      return;
    }

    if (data) {
      setPatient(data);
      setStatus("info");
    } else {
      setPatient(null);
      setStatus("form");
    }
  }, [user?.id]);

  useEffect(() => {
    if (!authLoading) checkPatient();
  }, [authLoading, checkPatient]);

  if (authLoading || status === "loading") {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (status === "info" && patient) {
    return <PersonInfo patient={patient} onUpdated={setPatient} />;
  }

  return (
    <PatientGuardianForm
      onSaved={(row) => {
        if (afterSave === "stay") {
          if (row) {
            setPatient(row);
            setStatus("info");
          } else {
            checkPatient();
          }
          return;
        }
        router.replace("/(tabs)/dashboard");
      }}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgScreen,
  },
});
