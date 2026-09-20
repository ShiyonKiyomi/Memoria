import { useState } from "react";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../theme/colors";

// Matches the Figma "Patient and Guardian Info" step 1 / step 2 frames.
// Step 1: patient name + DOB. Step 2: guardian name, DOB, relationship,
// phone — NO email field, since guardian_email is filled automatically
// from the logged-in user's session, not typed in.
//
// This form only ever CREATES the first `patients` row for an account —
// editing an existing row happens in PersonInfo instead. PatientInfoGate
// decides which of the two the user sees.
//
// `onSaved(insertedRow)`: optional. When provided, it's called instead of
// the default "go to dashboard" redirect, so callers (like PatientInfoGate)
// can decide what happens next — e.g. swap straight to the PersonInfo view
// instead of navigating away, when this form was reached from Profile
// rather than from signup.
export default function PatientGuardianForm({ onSaved } = {}) {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [patientName, setPatientName] = useState("");
  const [patientDateOfBirth, setPatientDateOfBirth] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianDateOfBirth, setGuardianDateOfBirth] = useState("");
  const [guardianRelationship, setGuardianRelationship] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function continueToGuardian() {
    if (!patientName.trim() || !patientDateOfBirth.trim()) {
      setErrorMessage("Add the patient's name and date of birth to continue.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  }

  async function savePatient() {
    if (!guardianName.trim() || !guardianRelationship.trim()) {
      setErrorMessage("Complete the guardian's name and relationship.");
      return;
    }
    if (!user?.id || !user?.email) {
      setErrorMessage("Your session has expired. Please sign in again.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    const { data, error } = await supabase
      .from("patients")
      .insert({
        user_id: user.id,
        patient_name: patientName.trim(),
        patient_date_of_birth: patientDateOfBirth.trim(),
        guardian_name: guardianName.trim(),
        guardian_date_of_birth: guardianDateOfBirth.trim() || null,
        guardian_relationship: guardianRelationship.trim(),
        guardian_phone: guardianPhone.trim() || null,
        guardian_email: user.email, // auto-filled from the session, never typed by the user
      })
      .select()
      .single();
    setSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (onSaved) {
      onSaved(data);
      return;
    }
    router.replace("/(tabs)/dashboard");
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.steps}>
          <View style={[styles.bar, styles.barActive]} />
          <View style={[styles.bar, step >= 2 && styles.barActive]} />
        </View>
        <Text style={styles.stepLabel}>STEP {step} OF 2</Text>
        <Text style={styles.title}>{step === 1 ? "Patient Information" : "Guardian Information"}</Text>
        <Text style={styles.subtitle}>
          {step === 1
            ? "Let's start with who this account is set up to care for."
            : "Now let's add the guardian who'll be managing this account."}
        </Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.formWrap}>
        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          {step === 2 ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => { setErrorMessage(""); setStep(1); }}
              style={styles.backButton}
            >
              <Text style={styles.backText}>‹ Patient details</Text>
            </Pressable>
          ) : null}

          {step === 1 ? (
            <>
              <Field label="Patient's full name" value={patientName} onChangeText={setPatientName} placeholder="e.g. Maria Santos" autoCapitalize="words" />
              <Field label="Date of birth" value={patientDateOfBirth} onChangeText={setPatientDateOfBirth} placeholder="MM / DD / YYYY" keyboardType="numbers-and-punctuation" />
              {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
              <Pressable accessibilityRole="button" onPress={continueToGuardian} style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonPressed]}>
                <Text style={styles.submitText}>CONTINUE</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Field label="Guardian's full name" value={guardianName} onChangeText={setGuardianName} placeholder="e.g. Juan Cruz" autoCapitalize="words" />
              <Field label="Date of birth" value={guardianDateOfBirth} onChangeText={setGuardianDateOfBirth} placeholder="MM / DD / YYYY" keyboardType="numbers-and-punctuation" />
              <Field label="Relationship to patient" value={guardianRelationship} onChangeText={setGuardianRelationship} placeholder="e.g. Son, Daughter, Caregiver" autoCapitalize="words" />
              <Field label="Phone number" value={guardianPhone} onChangeText={setGuardianPhone} placeholder="09XX XXX XXXX" keyboardType="phone-pad" />
              {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
              <Pressable
                accessibilityRole="button"
                onPress={savePatient}
                disabled={submitting}
                style={({ pressed }) => [styles.submitButton, (pressed || submitting) && styles.submitButtonPressed]}
              >
                <Text style={styles.submitText}>{submitting ? "SAVING..." : "SAVE"}</Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
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
    gap: 14,
    alignItems: "flex-start",
  },
  steps: {
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  bar: {
    height: 4,
    borderRadius: 4,
    flex: 1,
    backgroundColor: "rgba(166, 101, 223, 0.2)",
  },
  barActive: {
    backgroundColor: colors.primary,
  },
  stepLabel: {
    fontSize: 11,
    textAlign: "left",
    color: colors.textMuted,
    alignSelf: "flex-start",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    color: colors.textDark,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    alignSelf: "stretch",
    fontFamily: "Inter-Regular",
    textAlign: "left",
  },
  formWrap: {
    flex: 1,
  },
  form: {
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 24,
    gap: 18,
    backgroundColor: colors.white,
    alignItems: "flex-start",
    flexGrow: 1,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 4,
    paddingVertical: 4,
  },
  backText: {
    color: colors.textDark,
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  field: {
    gap: 8,
    backgroundColor: colors.white,
    alignSelf: "stretch",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  fieldLabel: {
    fontSize: 13,
    textAlign: "left",
    color: colors.textMuted,
    alignSelf: "flex-start",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  input: {
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: colors.white,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  inputText: {
    fontSize: 15,
    color: colors.textDark,
    fontFamily: "Inter-Regular",
    textAlign: "left",
    flex: 1,
    padding: 0,
  },
  submitButton: {
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    backgroundColor: colors.primary,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  submitButtonPressed: {
    opacity: 0.85,
  },
  submitText: {
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  error: {
    color: colors.error,
    fontSize: 13,
    lineHeight: 19,
    alignSelf: "stretch",
  },
});
