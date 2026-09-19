// app/courses/[courseId]/week/[weekNumber].jsx
// STUB — week view for a course
// Replace this with: import CourseWeek from "../src/screens/.../CourseWeek";
//                     export default CourseWeek;

import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CourseWeekStub() {
  const { courseId, weekNumber } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CourseWeek</Text>
      <Text>courseId: {courseId}, weekNumber: {weekNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});