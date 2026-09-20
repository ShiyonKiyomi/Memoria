import { useState } from "react";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabaseClient";
import { colors } from "../../theme/colors";

// Combined Log In / Sign Up screen, matching the Figma "Auth Revised" frames.
// Those two frames are the SAME toggle UI in two states (active tab = filled
// purple + white text, inactive tab = transparent + muted text) — so this is
// one component with a `mode` state, not two separate screens. `initialMode`
// just decides which tab is selected when the screen first opens.
export default function AuthScreen({ initialMode = "login" }) {
  const router = useRouter();
  const [mode, setMode] = useState(initialMode); // "login" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function switchMode(nextMode) {
    if (nextMode === mode) return;
    setMode(nextMode);
    setErrorMessage("");
    setSuccessMessage("");
  }

  async function handleLogin() {
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      setErrorMessage("Enter your email and password to continue.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });
    setSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.replace("/(tabs)/dashboard");
  }

  async function handleSignUp() {
    const normalizedEmail = email.trim();
    if (!name.trim() || !normalizedEmail || !password || !confirmPassword) {
      setErrorMessage("Complete all fields to create your account.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Your password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("The passwords do not match.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: { data: { display_name: name.trim() } },
    });
    setSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (data.session) {
      router.replace("/patient-info");
      return;
    }

    // "Confirm email" is still on for this project — no session yet.
    setSuccessMessage("Account created. Check your email to confirm your address, then log in.");
  }

  async function handleForgotPassword() {
    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      setErrorMessage("Enter your email above first, then tap Forgot password.");
      return;
    }

    setErrorMessage("");
    const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail);
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    setSuccessMessage("Password reset email sent — check your inbox.");
  }

  async function handleGuest() {
    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    const { data, error } = await supabase.auth.signInAnonymously();
    setSubmitting(false);

    if (error) {
      // Most likely cause: Anonymous Sign-Ins isn't enabled in the Supabase
      // dashboard yet (Authentication → Sign In / Providers).
      setErrorMessage(error.message);
      return;
    }

    if (data.session) {
      router.replace("/patient-info");
    }
  }

  const isSignUp = mode === "signup";

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.keyboardAvoiding}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.welcome}>Welcome</Text>

        <View style={styles.tabToggle}>
          <Pressable
            accessibilityRole="button"
            onPress={() => switchMode("login")}
            style={[styles.tab, !isSignUp && styles.tabActive]}
          >
            <Text style={[styles.tabText, !isSignUp && styles.tabTextActive]}>Log In</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => switchMode("signup")}
            style={[styles.tab, isSignUp && styles.tabActive]}
          >
            <Text style={[styles.tabText, isSignUp && styles.tabTextActive]}>Sign Up</Text>
          </Pressable>
        </View>

        {isSignUp ? (
          <Field label="Your name" value={name} onChangeText={setName} placeholder="Full name" autoCapitalize="words" />
        ) : null}

        <Field
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Field
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder={isSignUp ? "Create a password" : "Enter your password"}
          secureTextEntry={!showPassword}
        />

        {isSignUp ? (
          <Field
            label="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Re-enter your password"
            secureTextEntry={!showPassword}
          />
        ) : (
          <View style={styles.utilityRow}>
            <Pressable accessibilityRole="button" onPress={() => setShowPassword((prev) => !prev)}>
              <Text style={styles.showPassword}>{showPassword ? "Hide password" : "Show password"}</Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </Pressable>
          </View>
        )}

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

        <Pressable
          accessibilityRole="button"
          onPress={isSignUp ? handleSignUp : handleLogin}
          disabled={submitting}
          style={({ pressed }) => [
            styles.continueButton,
            (pressed || submitting) && styles.continueButtonPressed,
          ]}
        >
          <Text style={styles.continueText}>
            {submitting ? "Please wait..." : isSignUp ? "SIGN UP" : "LOG IN"}
          </Text>
        </Pressable>
        {submitting ? <ActivityIndicator color={colors.primary} style={styles.loader} /> : null}

        <Pressable accessibilityRole="button" onPress={handleGuest} disabled={submitting}>
          <Text style={styles.dontWantAn}>Don't want an account? Continue as guest</Text>
        </Pressable>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({ label, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.input}>
        <TextInput
          {...props}
          placeholderTextColor={colors.placeholder}
          style={styles.inputText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.bgScreen,
    flex: 1,
  },
  keyboardAvoiding: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 56,
    paddingBottom: 40,
    gap: 20,
    backgroundColor: colors.white,
    alignItems: "flex-start",
  },
  welcome: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    color: colors.textDark,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  tabToggle: {
    backgroundColor: "rgba(166, 101, 223, 0.1)",
    padding: 4,
    gap: 6,
    borderRadius: 40,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    overflow: "hidden",
  },
  tab: {
    paddingVertical: 10,
    borderRadius: 36,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    textAlign: "center",
    color: colors.textMuted,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    fontSize: 15,
  },
  tabTextActive: {
    color: colors.white,
  },
  field: {
    gap: 8,
    backgroundColor: colors.white,
    alignSelf: "stretch",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  fieldLabel: {
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    fontSize: 13,
    textAlign: "left",
    alignSelf: "flex-start",
    color: colors.textMuted,
  },
  input: {
    borderRadius: 14,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: colors.white,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  inputText: {
    fontFamily: "Inter-Regular",
    color: colors.textDark,
    fontSize: 15,
    textAlign: "left",
    flex: 1,
    padding: 0,
  },
  utilityRow: {
    justifyContent: "space-between",
    gap: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  showPassword: {
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: "Inter-Regular",
    textAlign: "left",
  },
  forgotPassword: {
    color: colors.primary,
    fontSize: 13,
    textAlign: "left",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  continueButton: {
    paddingVertical: 18,
    borderRadius: 40,
    alignSelf: "stretch",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  continueButtonPressed: {
    opacity: 0.85,
  },
  continueText: {
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  loader: {
    marginTop: -8,
  },
  error: {
    color: colors.error,
    fontSize: 13,
    lineHeight: 19,
    alignSelf: "stretch",
  },
  success: {
    color: colors.success,
    fontSize: 13,
    lineHeight: 19,
    alignSelf: "stretch",
  },
  dontWantAn: {
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    textAlign: "center",
    alignSelf: "stretch",
    color: colors.textMuted,
    fontSize: 13,
  },
});
