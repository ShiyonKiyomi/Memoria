// app/(tabs)/profile/settings.jsx
// STUB — moved here from app/settings.jsx (top-level) to fix an Android
// hardware-back-button bug: a screen that lives OUTSIDE the (tabs) group,
// when pushed to from inside a tab, re-enters the tabs group at its first
// tab (Dashboard) on back instead of returning to the tab you came from.
// Nesting the screen inside the tab's own folder (and hiding it from the
// tab bar via href: null in _layout.jsx) keeps it in that tab's own stack,
// so back correctly returns to Profile.
//
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
