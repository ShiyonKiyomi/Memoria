// app/notes/new.jsx
// STUB — create a new note
// Replace this with: import NoteEditor from "../src/screens/.../NoteEditor";
//                     export default NoteEditor;

import { View, Text, StyleSheet } from "react-native";

export default function NoteEditorStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NoteEditor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
