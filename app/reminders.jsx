// app/reminders.jsx
// STUB — medication / task reminders
// Replace this with: import Reminders from "../src/screens/.../Reminders";
//                     export default Reminders;

import { View, Text, StyleSheet } from "react-native";

export default function RemindersStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reminders</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
