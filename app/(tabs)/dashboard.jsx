// app/(tabs)/dashboard.jsx
// STUB — quick links, alerts, progress
// Replace this with: import Dashboard from "../src/screens/.../Dashboard";
//                     export default Dashboard;

import { View, Text, StyleSheet } from "react-native";

export default function DashboardStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
