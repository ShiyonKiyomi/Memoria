// app/courses/[courseId]/module/[moduleId].jsx
// STUB — numbered instructional steps
// Replace this with: import Module from "../src/screens/.../Module";
//                     export default Module;

import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ModuleStub() {
  const { courseId, moduleId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Module</Text>
      <Text>courseId: {courseId}, moduleId: {moduleId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});