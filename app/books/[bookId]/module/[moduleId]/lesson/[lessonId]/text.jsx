// app/books/[bookId]/module/[moduleId]/lesson/[lessonId]/text.jsx
// STUB — "1. Text Based Learning" content for this lesson (was Reading.jsx)
// Replace this with: import TextBasedLearning from "../src/screens/.../TextBasedLearning";
//                     export default TextBasedLearning;

import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function TextBasedLearningStub() {
  const { lessonId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Text Based Learning</Text>
      <Text>lessonId param: {lessonId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});
