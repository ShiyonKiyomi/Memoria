// src/screens/tools/NoteEditorScreen.jsx
// Matches "Notes creator.svg" — create-only. Editing an existing note happens
// inline on NoteDetailScreen instead of routing back through here.

import { useState } from "react";
import {
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
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import { useActivePatient } from "../../lib/useActivePatient";
import { colors } from "../../theme/colors";

export default function NoteEditorScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { patientId, loading: patientLoading, missing: patientMissing } = useActivePatient();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const disabled = submitting || patientLoading || patientMissing;

  async function handleSave() {
    if (!body.trim()) {
      setErrorMessage("Write something before saving.");
      return;
    }
    if (!patientId || !user?.id) {
      setErrorMessage("Your session or patient info isn't ready yet. Try again in a moment.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    const { error } = await supabase.from("notes").insert({
      patient_id: patientId,
      author_id: user.id,
      title: title.trim(),
      body: body.trim(),
    });
    setSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.back();
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.title}>New Note</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.formWrap}>
        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Title (optional)</Text>
            <View style={styles.input}>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. Morning routine went well"
                placeholderTextColor={colors.placeholder}
                style={styles.inputText}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Note</Text>
            <View style={[styles.input, styles.bodyInput]}>
              <TextInput
                value={body}
                onChangeText={setBody}
                placeholder="What happened, what you noticed, anything the next caregiver should know..."
                placeholderTextColor={colors.placeholder}
                style={[styles.inputText, styles.bodyInputText]}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          {patientMissing ? (
            <Text style={styles.hint}>
              You'll need to add Patient &amp; Guardian info before this note can be saved.
            </Text>
          ) : null}

          <Pressable
            accessibilityRole="button"
            onPress={handleSave}
            disabled={disabled}
            style={({ pressed }) => [styles.save, (pressed || disabled) && styles.savePressed]}
          >
            <Text style={styles.saveText}>{submitting ? "SAVING..." : "SAVE NOTE"}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.bgScreen,
    flex: 1,
  },
  header: {
    backgroundColor: colors.primaryTint15,
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerSpacer: {
    flex: 1,
  },
  backArrow: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: colors.textDark,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: colors.textDark,
  },
  formWrap: {
    flex: 1,
  },
  form: {
    padding: 24,
    gap: 16,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  input: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bodyInput: {
    minHeight: 160,
  },
  inputText: {
    fontSize: 14,
    color: colors.textDark,
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    padding: 0,
  },
  bodyInputText: {
    minHeight: 130,
  },
  error: {
    color: colors.error,
    fontSize: 13,
    lineHeight: 19,
  },
  hint: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  save: {
    borderRadius: 40,
    paddingVertical: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  savePressed: {
    opacity: 0.7,
  },
  saveText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
});
