// app/(tabs)/calendar/new.jsx
// STUB — "New Schedule": create a calendar event + reminder together
// (combined form per the revised Figma — Title/Date/Time/Notes + a
// notification toggle, all in one save action)
// Replace this with: import NewSchedule from "../src/screens/.../NewSchedule";
//                     export default NewSchedule;

import { View, Text, StyleSheet } from "react-native";

export default function NewScheduleStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Schedule</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
