import { useState } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabaseClient";
import { colors } from "../../theme/colors";

export default function SettingsScreen() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogout() {
    setSubmitting(true);
    setErrorMessage("");
    const { error } = await supabase.auth.signOut();
    setSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.replace("/");
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ Profile</Text>
        </Pressable>
        <Text style={styles.eyebrow}>ACCOUNT</Text>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your account and preferences.</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Text style={styles.sectionDescription}>Signing out will remove this device's saved session.</Text>
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <Pressable
            accessibilityRole="button"
            disabled={submitting}
            onPress={handleLogout}
            style={({ pressed }) => [styles.logoutButton, (pressed || submitting) && styles.pressed]}
          >
            <Text style={styles.logoutText}>{submitting ? "Signing out..." : "Log out"}</Text>
            {submitting ? <ActivityIndicator color={colors.error} size="small" /> : null}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.bgScreen, flex: 1 },
  content: { flex: 1, padding: 24 },
  backButton: { alignSelf: "flex-start", marginBottom: 42, paddingVertical: 4 },
  backText: { color: colors.textDark, fontSize: 15, fontWeight: "600" },
  eyebrow: { color: colors.textMuted, fontSize: 11, fontWeight: "700", letterSpacing: 1.1 },
  title: { color: colors.textDark, fontSize: 30, fontWeight: "700", marginTop: 8 },
  subtitle: { color: colors.textBody, fontSize: 15, marginTop: 10 },
  section: { backgroundColor: colors.white, borderColor: colors.border, borderRadius: 12, borderWidth: 1, marginTop: 34, padding: 18 },
  sectionTitle: { color: colors.textDark, fontSize: 16, fontWeight: "700" },
  sectionDescription: { color: colors.textBody, fontSize: 13, lineHeight: 19, marginTop: 7 },
  error: { color: colors.error, fontSize: 13, lineHeight: 19, marginTop: 14 },
  logoutButton: { alignItems: "center", borderColor: colors.error, borderRadius: 9, borderWidth: 1, flexDirection: "row", gap: 10, justifyContent: "center", marginTop: 18, minHeight: 48, paddingHorizontal: 16 },
  logoutText: { color: colors.error, fontSize: 15, fontWeight: "700" },
  pressed: { opacity: 0.6 },
});
