// app/index.jsx
// STUB — app/index.jsx — app intro / entry point
// Replace this with: import Welcome from "../src/screens/.../Welcome";
//                     export default Welcome;

import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function WelcomeStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <Link href="/login">Go to Login</Link>
      <Link href="/register">Go to Register</Link>
      <Link href="/patient-info">Go to Patient Info</Link>
      <Link href="/(tabs)/dashboard">Go to Dashboard</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});