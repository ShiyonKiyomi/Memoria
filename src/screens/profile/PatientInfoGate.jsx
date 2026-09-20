import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
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
  const [loadError, setLoadError] = useState("");

  const checkPatient = useCallback(async () => {
    if (!user?.id) return;
    setStatus("loading");
    setLoadError("");
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn("Failed to load patient/guardian info:", error.message);
      setPatient(null);
      setLoadError(error.message);
      setStatus("error");
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

  if (status === "error") {
    return (
      <View style={styles.errorScreen}>
        <Text style={styles.errorTitle}>Could not load saved information</Text>
        <Text style={styles.errorMessage}>{loadError}</Text>
        <Pressable accessibilityRole="button" onPress={checkPatient} style={styles.retryButton}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
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
  errorScreen: {
    alignItems: "center",
    backgroundColor: colors.bgScreen,
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  errorTitle: { color: colors.textDark, fontSize: 20, fontWeight: "700", textAlign: "center" },
  errorMessage: { color: colors.textBody, fontSize: 13, lineHeight: 19, marginTop: 10, textAlign: "center" },
  retryButton: { backgroundColor: colors.primary, borderRadius: 9, marginTop: 20, paddingHorizontal: 22, paddingVertical: 13 },
  retryText: { color: colors.white, fontSize: 14, fontWeight: "700" },
});
