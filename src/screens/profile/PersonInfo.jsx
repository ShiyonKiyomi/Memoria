import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../theme/colors";

// Matches the Figma "Person Info — Guardian / Patient" frames (the switcher
// pill with Guardian/Patient/+ tabs, purple header, avatar circle).
//
// Note on fields: the mockups show separate First/Last name, Contact number,
// Email address and Home address for BOTH the guardian and the patient. The
// `patients` table (see PatientGuardianForm) only actually stores a single
// `patient_name` / `guardian_name` string plus DOB, relationship and phone
// for the guardian — there's no patient contact/email/address or guardian
// address column. So this screen shows "Full name" (not split) and omits
// the fields that don't have anywhere to be saved, rather than displaying
// inputs that would silently do nothing on Save. Guardian email is shown
// read-only, same as in the signup form — it comes from the session, not
// from typed input.
//
// There's also no per-patient record here — one `patients` row holds BOTH
// halves, so switching tabs only changes which half of the form is visible;
// SAVE CHANGES always writes both halves together.
export default function PersonInfo({ patient, onUpdated }) {
  const { user } = useAuth();
  const [tab, setTab] = useState("guardian"); // "guardian" | "patient"

  const [guardianName, setGuardianName] = useState(patient.guardian_name ?? "");
  const [guardianDateOfBirth, setGuardianDateOfBirth] = useState(patient.guardian_date_of_birth ?? "");
  const [guardianRelationship, setGuardianRelationship] = useState(patient.guardian_relationship ?? "");
  const [guardianPhone, setGuardianPhone] = useState(patient.guardian_phone ?? "");

  const [patientName, setPatientName] = useState(patient.patient_name ?? "");
  const [patientDateOfBirth, setPatientDateOfBirth] = useState(patient.patient_date_of_birth ?? "");

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  async function saveChanges() {
    if (!patientName.trim() || !patientDateOfBirth.trim()) {
      setErrorMessage("Complete the patient's name and date of birth.");
      setTab("patient");
      return;
    }
    if (!guardianName.trim() || !guardianRelationship.trim()) {
      setErrorMessage("Complete the guardian's name and relationship.");
      setTab("guardian");
      return;
    }
    if (!user?.id) {
      setErrorMessage("Your session has expired. Please sign in again.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    setSavedMessage("");
    const { data, error } = await supabase
      .from("patients")
      .update({
        patient_name: patientName.trim(),
        patient_date_of_birth: patientDateOfBirth.trim(),
        guardian_name: guardianName.trim(),
        guardian_date_of_birth: guardianDateOfBirth.trim() || null,
        guardian_relationship: guardianRelationship.trim(),
        guardian_phone: guardianPhone.trim() || null,
      })
      .eq("user_id", user.id)
      .select()
      .single();
    setSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSavedMessage("Changes saved.");
    onUpdated?.(data);
  }

  const isGuardian = tab === "guardian";

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.backArrow}>‹</Text>
        <Text style={styles.title}>{isGuardian ? "Guardian Profile" : "Patient Profile"}</Text>
      </View>

      <View style={styles.identity}>
        <View style={styles.avatar} />
        <View style={styles.switcher}>
          <Pressable
            accessibilityRole="button"
            onPress={() => { setErrorMessage(""); setTab("guardian"); }}
            style={[styles.switchTab, isGuardian && styles.switchTabActive]}
          >
            <Text style={[styles.switchText, isGuardian && styles.switchTextActive]}>Guardian</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => { setErrorMessage(""); setTab("patient"); }}
            style={[styles.switchTab, !isGuardian && styles.switchTabActive]}
          >
            <Text style={[styles.switchText, !isGuardian && styles.switchTextActive]}>Patient</Text>
          </Pressable>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.formWrap}>
        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          {isGuardian ? (
            <>
              <Field label="Full name" value={guardianName} onChangeText={setGuardianName} placeholder="e.g. Juan Cruz" autoCapitalize="words" />
              <Field label="Date of birth" value={guardianDateOfBirth} onChangeText={setGuardianDateOfBirth} placeholder="MM / DD / YYYY" keyboardType="numbers-and-punctuation" />
              <Field label="Relationship to patient" value={guardianRelationship} onChangeText={setGuardianRelationship} placeholder="e.g. Son, Daughter, Caregiver" autoCapitalize="words" />
              <Field label="Phone number" value={guardianPhone} onChangeText={setGuardianPhone} placeholder="09XX XXX XXXX" keyboardType="phone-pad" />
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Email address</Text>
                <View style={[styles.input, styles.inputDisabled]}>
                  <Text style={styles.inputTextDisabled}>{patient.guardian_email ?? user?.email ?? "—"}</Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <Field label="Full name" value={patientName} onChangeText={setPatientName} placeholder="e.g. Maria Santos" autoCapitalize="words" />
              <Field label="Date of birth" value={patientDateOfBirth} onChangeText={setPatientDateOfBirth} placeholder="MM / DD / YYYY" keyboardType="numbers-and-punctuation" />
            </>
          )}

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          {savedMessage ? <Text style={styles.success}>{savedMessage}</Text> : null}

          <Pressable
            accessibilityRole="button"
            onPress={saveChanges}
            disabled={submitting}
            style={({ pressed }) => [styles.save, (pressed || submitting) && styles.savePressed]}
          >
            <Text style={styles.saveText}>{submitting ? "SAVING..." : "SAVE CHANGES"}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({ label, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.input}>
        <TextInput {...props} placeholderTextColor={colors.placeholder} style={styles.inputText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.bgScreen,
    flex: 1,
    width: "100%",
  },
  header: {
    backgroundColor: colors.primaryTint15,
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 24,
    gap: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  backArrow: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: colors.textDark,
  },
  title: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: colors.textDark,
    textAlign: "left",
  },
  identity: {
    paddingTop: 28,
    paddingBottom: 20,
    gap: 16,
    backgroundColor: colors.white,
    alignItems: "center",
    alignSelf: "stretch",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primaryTint10,
  },
  switcher: {
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "rgba(166, 101, 223, 0.1)",
    padding: 4,
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  switchTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  switchTabActive: {
    backgroundColor: colors.primary,
  },
  switchText: {
    color: colors.textMuted,
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  switchTextActive: {
    color: colors.white,
  },
  addTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: colors.textMuted,
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  formWrap: {
    flex: 1,
  },
  form: {
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 24,
    gap: 14,
    backgroundColor: colors.white,
    alignItems: "flex-start",
    flexGrow: 1,
  },
  field: {
    gap: 6,
    backgroundColor: colors.white,
    alignSelf: "stretch",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  fieldLabel: {
    fontSize: 12,
    textAlign: "left",
    color: colors.textMuted,
    alignSelf: "flex-start",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  input: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.bgScreen,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  inputDisabled: {
    opacity: 0.7,
  },
  inputText: {
    fontSize: 14,
    color: colors.textDark,
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    textAlign: "left",
    flex: 1,
    padding: 0,
  },
  inputTextDisabled: {
    fontSize: 14,
    color: colors.textMuted,
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    textAlign: "left",
    flex: 1,
  },
  save: {
    borderRadius: 40,
    paddingVertical: 16,
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: 4,
  },
  savePressed: {
    opacity: 0.85,
  },
  saveText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    textAlign: "center",
  },
  error: {
    color: colors.error,
    fontSize: 13,
    lineHeight: 19,
    alignSelf: "stretch",
  },
  success: {
    color: colors.success,
    fontSize: 13,
    lineHeight: 19,
    alignSelf: "stretch",
  },
});
