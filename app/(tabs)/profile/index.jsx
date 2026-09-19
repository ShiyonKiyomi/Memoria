// app/(tabs)/profile/index.jsx
// STUB — caregiver + patient summary (moved here from app/(tabs)/profile.jsx
// so it can have a nested "manage" screen underneath it)
// Replace this with: import Profile from "../src/screens/.../Profile";
//                     export default Profile;

import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function ProfileStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <Link href="/settings">Go to Settings</Link>
      <Link href="/patient-info">Go to Patient Info</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});
