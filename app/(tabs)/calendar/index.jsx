// app/(tabs)/calendar/index.jsx
// STUB — SCHEDULE: calendar grid + reminders list combined on one screen,
// per the revised Figma (reminders were merged into Calendar, no separate tab)
// Replace this with: import Schedule from "../src/screens/.../Schedule";
//                     export default Schedule;

import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function ScheduleStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Schedule</Text>
      <Link href="/calendar/new">Go to New Schedule</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});
