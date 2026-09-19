// app/notes/index.jsx
// STUB — list of patient notes
// Replace this with: import NotesList from "../src/screens/.../NotesList";
//                     export default NotesList;

import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function NotesListStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NotesList</Text>
      <Link href="/notes/new">Go to New Note</Link>
      <Link href="/notes/test1">Go to Note "test1"</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});