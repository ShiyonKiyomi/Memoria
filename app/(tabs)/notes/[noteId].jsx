// app/notes/[noteId].jsx
// STUB — view/edit/delete a single note
// Replace this with: import NoteDetail from "../src/screens/.../NoteDetail";
//                     export default NoteDetail;

import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function NoteDetailStub() {
  const { noteId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>NoteDetail</Text>
      <Text>noteId param: {noteId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});