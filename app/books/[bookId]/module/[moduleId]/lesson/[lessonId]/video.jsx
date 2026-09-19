// app/books/[bookId]/module/[moduleId]/lesson/[lessonId]/video.jsx
// STUB — "2. Videos & Resources" content for this lesson (was VideoLibrary.jsx)
// Replace this with: import VideosResources from "../src/screens/.../VideosResources";
//                     export default VideosResources;

import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function VideosResourcesStub() {
  const { lessonId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Videos &amp; Resources</Text>
      <Text>lessonId param: {lessonId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  text: { fontSize: 18, fontWeight: "600" },
});
