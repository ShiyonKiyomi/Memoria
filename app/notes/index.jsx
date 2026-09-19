// app/notes/index.jsx
// STUB — list of patient notes
// Replace this with: import NotesList from "../src/screens/.../NotesList";
//                     export default NotesList;

import { View, Text, StyleSheet } from "react-native";

export default function NotesListStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NotesList</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
