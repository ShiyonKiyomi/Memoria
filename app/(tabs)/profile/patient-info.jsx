// app/(tabs)/profile/patient-info.jsx
// STUB — nested wrapper for the SAME "Patient & Guardian Info" screen used
// during onboarding at app/patient-info.jsx (top-level, reached from
// Register before tabs exist). Reached from Profile ("Patient & Guardian
// Info" link), this route stays nested inside the Profile tab's own folder
// so the Android hardware back button returns correctly to Profile instead
// of resetting to Dashboard (same fix as settings.jsx above).
//
// Once the real screen exists, BOTH this file and app/patient-info.jsx
// should import and render the exact same component from
// src/screens/auth/PatientGuardianForm — do not duplicate the form logic:
//   import PatientGuardianForm from "../../../src/screens/auth/PatientGuardianForm";
//   export default PatientGuardianForm;

import { View, Text, StyleSheet } from "react-native";

export default function PatientInfoFromProfileStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Patient &amp; Guardian Info</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
