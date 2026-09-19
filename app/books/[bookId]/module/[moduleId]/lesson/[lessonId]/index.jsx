// app/books/[bookId]/module/[moduleId]/lesson/[lessonId]/index.jsx
// STUB — a single lesson's two content types:
//   1. Text Based Learning  -> ./text
//   2. Videos & Resources   -> ./video
// Replace this with: import LessonOverview from "../src/screens/.../LessonOverview";
//                     export default LessonOverview;

import { View, Text, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

export default function LessonOverviewStub() {
  const { bookId, moduleId, lessonId } = useLocalSearchParams();
  const base = `/books/${bookId}/module/${moduleId}/lesson/${lessonId}`;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lesson Overview</Text>
      <Text>lessonId param: {lessonId}</Text>
      <Link href={`${base}/text`}>1. Text Based Learning</Link>
      <Link href={`${base}/video`}>2. Videos &amp; Resources</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});
