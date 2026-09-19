// app/courses/[courseId]/week/[weekNumber].jsx
// STUB — week view for a course
// Replace this with: import CourseWeek from "../src/screens/.../CourseWeek";
//                     export default CourseWeek;

import { View, Text, StyleSheet } from "react-native";

export default function CourseWeekStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CourseWeek</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
