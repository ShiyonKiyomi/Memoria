// app/videos.jsx
// STUB — expo-video player list
// Replace this with: import VideoLibrary from "../src/screens/.../VideoLibrary";
//                     export default VideoLibrary;

import { View, Text, StyleSheet } from "react-native";

export default function VideoLibraryStub() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>VideoLibrary</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});
