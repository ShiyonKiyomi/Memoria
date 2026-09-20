import * as React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

// Ported from the Figma "Welcome Interface" export. The GET STARTED button
// is now a real Pressable wired to navigation instead of a static View.
export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={[styles.welcomeInterfaceRevised, styles.getStartedButtonFlexBox]}>
      {/* TODO: no image source was included in the Figma export — add the
          real illustration/asset here, e.g. source={require("../../../assets/welcome.png")} */}
      <Image style={styles.welcomeImageIcon} resizeMode="cover" />
      <Text style={styles.memoria}>Memoria</Text>
      <Text style={styles.aMobileApp}>
        A mobile app to guide caregivers through daily care and emergency procedures for dementia patients.
      </Text>
      <View style={styles.spacer} />
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/login")}
        style={({ pressed }) => [
          styles.getStartedButton,
          styles.getStartedButtonFlexBox,
          pressed && styles.getStartedButtonPressed,
        ]}
      >
        <Text style={styles.getStarted}>GET STARTED</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedButtonFlexBox: {
    alignItems: "center",
    overflow: "hidden",
  },
  welcomeInterfaceRevised: {
    flex: 1,
    backgroundColor: "#eadbf9",
    paddingHorizontal: 28,
    paddingVertical: 48,
    gap: 20,
    width: "100%",
  },
  welcomeImageIcon: {
    height: 240,
    borderRadius: 24,
    alignSelf: "stretch",
    width: "100%",
  },
  memoria: {
    fontSize: 48,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    color: "#563979",
    textAlign: "center",
    alignSelf: "stretch",
  },
  aMobileApp: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "Inter-Regular",
    color: "#6b5487",
    textAlign: "center",
    alignSelf: "stretch",
  },
  spacer: {
    flex: 1,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  getStartedButton: {
    borderRadius: 68,
    backgroundColor: "#a665df",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignSelf: "stretch",
  },
  getStartedButtonPressed: {
    opacity: 0.85,
  },
  getStarted: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#fff",
    textAlign: "center",
  },
});
