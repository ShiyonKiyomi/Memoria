// app/books/index.jsx
// STUB — BOOKS: top-level list of care books/topics (was courses/index.jsx)
// Replace this with: import BookList from "../src/screens/.../BookList";
//                     export default BookList;

import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function BookListStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Books</Text>
      <Link href="/books/book123">Go to Book "book123"</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});
