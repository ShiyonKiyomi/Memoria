// app/courses/[courseId]/index.jsx
// STUB — context & tips for a course
// Replace this with: import Reading from "../src/screens/.../Reading";
//                     export default Reading;

import { View, Text, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

export default function ReadingStub() {
  const { courseId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reading</Text>
      <Text>courseId param: {courseId}</Text>
      <Link href={`/courses/${courseId}/week/1`}>Go to Week 1</Link>
      <Link href={`/courses/${courseId}/module/1`}>Go to Module 1</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});