// app/notes/[noteId].jsx
// STUB — view/edit/delete a single note
// Replace this with: import NoteDetail from "../src/screens/.../NoteDetail";
//                     export default NoteDetail;

import { View, Text, StyleSheet } from "react-native";

export default function NoteDetailStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NoteDetail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
