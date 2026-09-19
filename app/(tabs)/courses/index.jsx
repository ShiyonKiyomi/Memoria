// app/(tabs)/courses/index.jsx
// STUB — browse care topics
// Replace this with: import CourseList from "../src/screens/.../CourseList";
//                     export default CourseList;

import { View, Text, StyleSheet } from "react-native";

export default function CourseListStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CourseList</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
