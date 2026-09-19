// app/calendar/index.jsx
// STUB — care schedule overview
// Replace this with: import Calendar from "../src/screens/.../Calendar";
//                     export default Calendar;

import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function CalendarStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calendar</Text>
      <Link href="/calendar/new">Go to New Event</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});