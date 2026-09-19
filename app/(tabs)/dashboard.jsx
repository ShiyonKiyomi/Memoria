// app/(tabs)/dashboard.jsx
// STUB — quick links, alerts, progress
// Replace this with: import Dashboard from "../src/screens/.../Dashboard";
//                     export default Dashboard;

import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function DashboardStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
      <Link href="/(tabs)/courses">Go to Courses</Link>
      <Link href="/(tabs)/profile">Go to Profile</Link>
      <Link href="/calendar">Go to Calendar</Link>
      <Link href="/reminders">Go to Reminders</Link>
      <Link href="/notes">Go to Notes</Link>
      <Link href="/settings">Go to Settings</Link>
      <Link href="/videos">Go to Videos</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});