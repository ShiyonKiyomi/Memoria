// app/calendar/new.jsx
// STUB — add/edit a care event
// Replace this with: import CalendarEventForm from "../src/screens/.../CalendarEventForm";
//                     export default CalendarEventForm;

import { View, Text, StyleSheet } from "react-native";

export default function CalendarEventFormStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CalendarEventForm</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
