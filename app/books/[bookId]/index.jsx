// app/books/[bookId]/index.jsx
// STUB — MODULES: list of modules within a book
// Replace this with: import ModuleList from "../src/screens/.../ModuleList";
//                     export default ModuleList;

import { View, Text, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

export default function ModuleListStub() {
  const { bookId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Modules</Text>
      <Text>bookId param: {bookId}</Text>
      <Link href={`/books/${bookId}/module/module123`}>Go to Module "module123"</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});
