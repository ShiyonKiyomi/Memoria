// app/courses/[courseId]/index.jsx
// STUB — context & tips for a course
// Replace this with: import Reading from "../src/screens/.../Reading";
//                     export default Reading;

import { View, Text, StyleSheet } from "react-native";

export default function ReadingStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reading</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
