// app/(tabs)/courses/index.jsx
// STUB — browse care topics
// Replace this with: import CourseList from "../src/screens/.../CourseList";
//                     export default CourseList;

import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function CourseListStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CourseList</Text>
      <Link href="/courses/test123">Go to Course "test123"</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});