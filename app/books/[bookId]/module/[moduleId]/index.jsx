// app/books/[bookId]/module/[moduleId]/index.jsx
// STUB — LESSONS: list of lessons within a module
// Replace this with: import LessonList from "../src/screens/.../LessonList";
//                     export default LessonList;

import { View, Text, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

export default function LessonListStub() {
  const { bookId, moduleId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lessons</Text>
      <Text>bookId: {bookId}, moduleId: {moduleId}</Text>
      <Link href={`/books/${bookId}/module/${moduleId}/lesson/lesson123`}>
        Go to Lesson "lesson123"
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});
