// app/settings.jsx
// STUB — preferences, notifications, sign out
// Replace this with: import Settings from "../src/screens/.../Settings";
//                     export default Settings;

import { View, Text, StyleSheet } from "react-native";

export default function SettingsStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
